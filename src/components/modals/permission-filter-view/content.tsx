"use client";

import { TreeNode, TreeView } from "@/components/tree-view";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/lib/query";
import {
  ModalView,
  PermissionsFilterViewArgs,
  useUI,
} from "@/services/managed-ui";
import { FlatPermissionDto, FlatPermissionWithLevelDto } from "@/types";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

interface PermissionFilterViewProps {
  modalView: ModalView;
  intialSelecteds: string[];
  perms: FlatPermissionWithLevelDto[];
}
function buildPermissionTree(permissions: FlatPermissionDto[]): TreeNode[] {
  // Use a Map for efficient O(1) average time complexity lookups.
  const nodeMap = new Map<string, TreeNode>();

  // 1. First Pass: Create all nodes and store them in the map.
  // This ensures that we can reference any node by its 'name' (which becomes the 'id'),
  // regardless of the order in the input array.
  permissions.forEach((permission) => {
    nodeMap.set(permission.name ?? "", {
      id: permission.name ?? "",
      label: permission.displayName ?? permission.name ?? "",
      children: [], // Initialize children array for every node.
    });
  });

  const roots: TreeNode[] = [];

  // 2. Second Pass: Link nodes into a hierarchy.
  // We iterate through the original permissions again to establish parent-child relationships.
  permissions.forEach((permission) => {
    const node = nodeMap.get(permission.name ?? "");
    if (!node) return; // Should not happen in a consistent dataset

    // If a permission has a valid parentName that exists in our map,
    // it's a child. We find the parent node and push this node into its 'children' array.
    if (permission.parentName && nodeMap.has(permission.parentName)) {
      const parent = nodeMap.get(permission.parentName);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    } else {
      // If parentName is null, undefined, or points to a non-existent parent,
      // we consider it a root node.
      roots.push(node);
    }
  });

  return roots;
}

export const PermissionFilterViewContent: React.FC<
  PermissionFilterViewProps
> = ({ modalView, intialSelecteds, perms }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(intialSelecteds);
  const { closeModal } = useUI();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<"" | "reset" | "save">("");

  const args = modalView.args as PermissionsFilterViewArgs;
  const { submitFn, reset, userId } = args;
  const filteredPerms = useMemo(
    () =>
      buildPermissionTree(
        searchQuery.trim()
          ? perms.filter(
              (f) =>
                (f.name ?? "")
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                (f.displayName ?? "")
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
          : perms
      ),
    [searchQuery, perms]
  );

  // const updatePermissions = useMutation({
  //   mutationFn: () =>
  //     usersApi
  //       .updateUserPermissions({
  //         id: userId,
  //         grantedPermissionNames: selectedIds,
  //       })
  //       .fetch(),
  //   onSuccess: () => {
  //     toast.success("Permissions updated successfully");
  //     closeModal();
  //   },
  //   onError: () => {
  //     toast.error("Failed to update permissions");
  //   },
  // });
  const revalidateUser = () => {
    queryClient.resetQueries({
      queryKey: ["user-perms", userId],
      exact: true,
    });
    queryClient.refetchQueries({
      queryKey: ["user-perms", userId],
      exact: true,
    });
  };
  const handleReset = async () => {
    setLoading("reset");
    try {
      const res = await reset();
      if (res) setSelectedIds(res);
      else if (userId) revalidateUser();
      //   toast.success("Permissions reset successfully");
      //   closeModal();
    } catch {
    } finally {
      setLoading("");
    }
  };
  const handleSave = async () => {
    setLoading("save");
    try {
      await submitFn(selectedIds);
      if (userId) revalidateUser();
      closeModal();
    } catch {
    } finally {
      setLoading("");
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col space-y-4 min-h-0">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search permissions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 border rounded-md p-2">
          <TreeView
            data={filteredPerms}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            expansionMode="expand-selecteds"
            className="w-full"
          />
        </div>
      </div>

      <DialogFooter className="flex justify-between sm:justify-between flex-shrink-0 mt-4 w-full">
        <Button variant="outline" onClick={handleReset}>
          {loading === "reset" ? "Reseting..." : "Reset to default"}
        </Button>
        <div className="flex gap-2">
          <Button disabled={!!loading} variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={!!loading} onClick={handleSave}>
            {loading === "save" ? "Submiting..." : "submit"}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
