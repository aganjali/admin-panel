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
import { Loader2, Shield } from "lucide-react";
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

  // Convert flat permissions to tree structure
  const treeData = useMemo<TreeNode[]>(() => {
    if (!data?.permissions) return [];

    const permissionMap = new Map<string, TreeNode>();
    const rootNodes: TreeNode[] = [];

    // First pass: create all nodes
    data.permissions.forEach((permission) => {
      permissionMap.set(permission.name || "", {
        id: permission.name || "",
        label: permission.displayName || permission.name || "",
        children: [],
      });
    });

    // Second pass: build tree structure
    data.permissions.forEach((permission) => {
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
  }, [data]);

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
    <DialogContent {...modalView.props} className="max-w-2xl max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          User Permissions
        </DialogTitle>
        <DialogDescription>
          Manage permissions for{" "}
          <span className="font-semibold">{userName || "user"}</span>
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 max-h-[50vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
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

      <DialogFooter className="flex justify-between">
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
