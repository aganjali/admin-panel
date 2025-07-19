"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateOrUpdateRoleInput,
  RoleListDto,
} from "@/types/api/data-contracts";
import { useQueryStates, parseAsInteger } from "nuqs";
import { toast } from "sonner";
import { roleApi } from "@/lib/api/role";
import { RolesDataTable } from ".";
import { RoleEditSheet } from "../../edit-role/page";
import RoleCreateSheet from "../../create-role/page";
import { useUI } from "@/services/managed-ui";

export function RolesView() {
  const { openModal, setModalView } = useUI();

  const [editingRole, setEditingRole] = useState<RoleListDto | null>(null);
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

  const [urlParams, setUrlParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  });

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["roles", urlParams],
    queryFn: () => roleApi.getRoles({}).fetch(),
    select: (res) => res.result,
  });

  const deleteRole = useMutation({
    mutationFn: (roleId: number) => roleApi.deleteRole({ Id: roleId }).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role deleted successfully");
    },
    onError: () => toast.error("Failed to delete role"),
  });

  const updateRole = useMutation({
    mutationFn: (data: CreateOrUpdateRoleInput) =>
      roleApi.createOrUpdateRole(data).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role updated successfully");
      setEditingRole(null);
    },
    onError: () => toast.error("Failed to update role"),
  });

  const createRole = useMutation({
    mutationFn: (data: CreateOrUpdateRoleInput) =>
      roleApi.createOrUpdateRole(data).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role created successfully");
      setIsCreateSheetOpen(false);
    },
    onError: () => toast.error("Failed to create role"),
  });

  const roles = data?.items ?? [];
  const totalCount = data?.items?.length ?? 0;
  if (error) {
    toast.error("Failed to load roles");
  }

  const handleRoleAction = (action: "edit" | "delete", role: RoleListDto) => {
    console.log("Action triggered:", { action, role });
    if (action === "edit") {
      setEditingRole(role);
    } else if (action === "delete" && role.id) {
      console.log("Preparing to open DELETE_ROLE modal for role ID:", role.id);
      setModalView({
        name: "DELETE_ROLE",
        args: {
          roleId: role.id,
          roleName: role.displayName,
          onConfirm: async () => {
            await deleteRole.mutateAsync(role.id!);
          },
        },
      });
      openModal();
    }
  };

  const handleSaveRole = (roleId: number, newName: string) => {
    if (!editingRole) return;
    const payload: CreateOrUpdateRoleInput = {
      grantedPermissionNames: [],
      role: {
        id: editingRole.id,
        displayName: newName,
        isDefault: editingRole.isDefault,
      },
    };
    updateRole.mutate(payload);
  };

  const handleSaveNewRole = (newName: string) => {
    const payload: CreateOrUpdateRoleInput = {
      grantedPermissionNames: [],
      role: { displayName: newName, isDefault: false },
    };
    createRole.mutate(payload);
  };

  const handlePageChange = (page: number) => {
    setUrlParams({ page });
  };

  const handlePageSizeChange = (limit: number) => {
    setUrlParams({ limit, page: 1 });
  };

  return (
    <>
      <RolesDataTable
        data={roles}
        totalCount={totalCount}
        isLoading={isLoading}
        isDeleting={deleteRole.isPending || updateRole.isPending}
        currentPage={urlParams.page}
        pageSize={urlParams.limit}
        onRoleAction={handleRoleAction}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onCreate={() => setIsCreateSheetOpen(true)}
      />

      <RoleEditSheet
        role={editingRole}
        isOpen={!!editingRole}
        onOpenChange={(isOpen) => !isOpen && setEditingRole(null)}
        onSave={handleSaveRole}
      />

      <RoleCreateSheet
        isOpen={isCreateSheetOpen}
        onOpenChange={setIsCreateSheetOpen}
        onSave={handleSaveNewRole}
      />
    </>
  );
}
