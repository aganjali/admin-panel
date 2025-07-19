"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roleApi } from "@/lib/api/role";
import { toast } from "sonner";
import { useUI } from "@/services/managed-ui";
import { RolesDataTable } from "./data-table";
import { RoleCreateSheet } from "./create-sheet";
import { RoleEditSheet } from "./edit-sheet";
import type {
  RoleListDto,
  CreateOrUpdateRoleInput,
} from "@/types/api/data-contracts";

export function RolesView() {
  const { openModal, setModalView } = useUI();
  const queryClient = useQueryClient();

  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleListDto | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["roles"],
    queryFn: () => roleApi.getRoles({}).fetch(),
    select: (res) => ({
      items: (res.result?.items ?? []).map((role) => ({
        ...role,
        id: role.id ?? 0,
      })),
      totalCount: res.result?.items?.length ?? 0,
    }),
  });

  const { data: roleForEditData } = useQuery({
    queryKey: ["roleForEdit", selectedRole?.id],
    queryFn: () => roleApi.getRoleForEdit({ Id: selectedRole!.id! }).fetch(),
    enabled: !!selectedRole && editSheetOpen,
  });

  const createRole = useMutation({
    mutationFn: (input: CreateOrUpdateRoleInput) =>
      roleApi.createOrUpdateRole(input).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role created successfully");
      setCreateSheetOpen(false);
      setPermissions([]);
    },
    onError: () => toast.error("Failed to create role"),
  });

  const updateRole = useMutation({
    mutationFn: (input: CreateOrUpdateRoleInput) =>
      roleApi.createOrUpdateRole(input).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role updated successfully");
      setEditSheetOpen(false);
      setSelectedRole(null);
      setPermissions([]);
    },
    onError: () => toast.error("Failed to update role"),
  });

  const deleteRole = useMutation({
    mutationFn: (roleId: number) => roleApi.deleteRole({ Id: roleId }).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role deleted successfully");
    },
    onError: () => toast.error("Failed to delete role"),
  });

  const roles = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;

  if (error) {
    toast.error("Failed to load roles");
  }

  const handleRoleAction = async (
    action: "edit" | "delete",
    role: RoleListDto
  ) => {
    switch (action) {
      case "edit":
        setSelectedRole(role);
        setEditSheetOpen(true);
        break;
      case "delete":
        if (role.id) {
          setModalView({
            name: "DELETE_ROLE",
            args: {
              roleId: role.id,
              roleName: role.displayName,
              onConfirm: async () => {
                await deleteRole.mutateAsync(role.id!);
              },
            },
            props: { cancelable: true },
          });
          openModal();
        }
        break;
    }
  };

  const handleCreate = () => {
    setCreateSheetOpen(true);
  };

  const handleCreateSave = async (newName: string) => {
    const payload: CreateOrUpdateRoleInput = {
      grantedPermissionNames: permissions,
      role: {
        displayName: newName,
        isDefault: false,
      },
    };
    await createRole.mutateAsync(payload);
  };

  const handleEditSave = async (roleId: number, newName: string) => {
    const payload: CreateOrUpdateRoleInput = {
      grantedPermissionNames: permissions,
      role: {
        id: roleId,
        displayName: newName,
        isDefault: selectedRole?.isDefault ?? false,
      },
    };
    await updateRole.mutateAsync(payload);
  };

  const handleSetPermissions = (isEdit = false) => {
    const initialPermissions = isEdit
      ? roleForEditData?.result?.grantedPermissionNames ?? []
      : permissions;

    setModalView({
      name: "FILTER_PERMISSIONS",
      args: {
        initialPermissions,
        onSave: (newPermissions: string[]) => {
          setPermissions(newPermissions);
        },
      },
    });
    openModal();
  };

  const handleCreateSheetClose = () => {
    setCreateSheetOpen(false);
    setPermissions([]);
  };

  const handleEditSheetClose = () => {
    setEditSheetOpen(false);
    setSelectedRole(null);
    setPermissions([]);
  };

  return (
    <>
      <RolesDataTable
        data={roles}
        totalCount={totalCount}
        isLoading={isLoading}
        isDeleting={deleteRole.isPending}
        currentPage={1}
        pageSize={roles.length}
        onRoleAction={handleRoleAction}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        onCreate={handleCreate}
      />

      <RoleCreateSheet
        isOpen={createSheetOpen}
        onOpenChange={handleCreateSheetClose}
        onSave={handleCreateSave}
        isLoading={createRole.isPending}
        onSetPermissionsClick={() => handleSetPermissions(false)}
      />

      <RoleEditSheet
        role={selectedRole}
        isOpen={editSheetOpen}
        isLoading={updateRole.isPending}
        onOpenChange={handleEditSheetClose}
        onSave={handleEditSave}
        onSetPermissionsClick={() => handleSetPermissions(true)}
      />
    </>
  );
}
