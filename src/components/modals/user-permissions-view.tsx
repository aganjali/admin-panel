"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Shield, Search } from "lucide-react";
import { toast } from "sonner";
import type { ModalView } from "@/services/managed-ui/context";
import { useUI } from "@/services/managed-ui";
import { usersApi } from "@/lib/api/users";
import { TreeView, type TreeNode } from "@/components/tree-view";
import { useQuery, useMutation } from "@tanstack/react-query";

interface UserPermissionsViewProps {
  modalView: ModalView;
}

export const UserPermissionsView: React.FC<UserPermissionsViewProps> = ({
  modalView,
}) => {
  const { closeModal } = useUI();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isPermissionsModal = modalView.name === "USER_PERMISSIONS";
  const args = isPermissionsModal
    ? (modalView.args as { userId: number; userName?: string })
    : { userId: 0, userName: "" };
  const { userId, userName } = args;

  const { data, isLoading, error } = useQuery({
    queryKey: ["userPermissions", userId],
    queryFn: () => usersApi.getUserPermissionsForEdit({ Id: userId }).fetch(),
    select: (res) => res.result,
    enabled: isPermissionsModal && userId > 0,
  });

  const updatePermissions = useMutation({
    mutationFn: () =>
      usersApi
        .updateUserPermissions({
          id: userId,
          grantedPermissionNames: selectedIds,
        })
        .fetch(),
    onSuccess: () => {
      toast.success("Permissions updated successfully");
      closeModal();
    },
    onError: () => {
      toast.error("Failed to update permissions");
    },
  });

  // Convert flat permissions to tree structure and filter based on search
  const treeData = useMemo<TreeNode[]>(() => {
    if (!data?.permissions) return [];

    const permissionMap = new Map<string, TreeNode>();
    const rootNodes: TreeNode[] = [];

    // Filter permissions based on search query
    const filteredPermissions = data.permissions.filter((permission) => {
      if (!searchQuery) return true;
      const displayName = permission.displayName || permission.name || "";
      return displayName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // First pass: create all filtered nodes
    filteredPermissions.forEach((permission) => {
      permissionMap.set(permission.name || "", {
        id: permission.name || "",
        label: permission.displayName || permission.name || "",
        children: [],
      });
    });

    // Second pass: build tree structure
    filteredPermissions.forEach((permission) => {
      const node = permissionMap.get(permission.name || "");
      if (!node) return;

      if (permission.parentName && permissionMap.has(permission.parentName)) {
        const parent = permissionMap.get(permission.parentName)!;
        parent.children?.push(node);
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  }, [data, searchQuery]);

  // Set initial selected permissions
  useEffect(() => {
    if (data?.grantedPermissionNames) {
      setSelectedIds(data.grantedPermissionNames);
    }
  }, [data]);

  const handleSave = async () => {
    await updatePermissions.mutateAsync();
  };

  const handleReset = async () => {
    try {
      await usersApi.resetUserSpecificPermissions({ id: userId }).fetch();
      toast.success("Permissions reset successfully");
      closeModal();
    } catch {
      toast.error("Failed to reset permissions");
    }
  };

  if (error) {
    toast.error("Failed to load permissions");
  }

  if (!isPermissionsModal) return null;

  return (
    <DialogContent
      {...modalView.props}
      className="w-[700px] h-[600px] max-w-none max-h-none flex flex-col"
    >
      <DialogHeader className="flex-shrink-0">
        <DialogTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          User Permissions
        </DialogTitle>
        <DialogDescription>
          Manage permissions for{" "}
          <span className="font-semibold">{userName || "user"}</span>
        </DialogDescription>
      </DialogHeader>

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
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <TreeView
              data={treeData}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              expansionMode="expand-selecteds"
              className="w-full"
            />
          )}
        </div>
      </div>

      <DialogFooter className="flex justify-between flex-shrink-0 mt-4">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isLoading || updatePermissions.isPending}
        >
          Reset to Default
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={closeModal}
            disabled={updatePermissions.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || updatePermissions.isPending}
          >
            {updatePermissions.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Permissions
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};
