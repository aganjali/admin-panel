"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  CreateOrUpdateRoleInput,
  RoleListDto,
} from "@/types/api/data-contracts";
import { useQueryStates, parseAsInteger } from "nuqs";
import { toast } from "sonner";
import { RolesDataTable } from "./components/data-table";
import { roleApi } from "@/lib/api/role";
import { RoleEditSheet } from "./edit-role/page";

export default function RolesPage() {
  const router = useRouter();
  const [editingRole, setEditingRole] = useState<RoleListDto | null>(null);

  const [urlParams, setUrlParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  });

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["roles"],
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

  const allRoles = data?.items ?? [];

  const paginatedRoles = useMemo(() => {
    const startIndex = (urlParams.page - 1) * urlParams.limit;
    return allRoles.slice(startIndex, startIndex + urlParams.limit);
  }, [allRoles, urlParams.page, urlParams.limit]);

  const totalCount = allRoles.length;

  if (error) {
    toast.error("Failed to load roles");
  }

  const handleRoleAction = (action: "edit" | "delete", role: RoleListDto) => {
    if (action === "edit") {
      setEditingRole(role);
    } else if (action === "delete" && role.id) {
      if (
        window.confirm(
          `Are you sure you want to delete the role "${role.displayName}"?`
        )
      ) {
        deleteRole.mutate(role.id);
      }
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

  const handlePageChange = (page: number) => {
    setUrlParams({ page });
  };

  const handlePageSizeChange = (limit: number) => {
    setUrlParams({ limit, page: 1 });
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto px-3 py-6">
          <RolesDataTable
            data={paginatedRoles}
            totalCount={totalCount}
            isLoading={isLoading}
            isDeleting={deleteRole.isPending || updateRole.isPending}
            currentPage={urlParams.page}
            pageSize={urlParams.limit}
            onRoleAction={handleRoleAction}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>

        <RoleEditSheet
          role={editingRole}
          isOpen={!!editingRole}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setEditingRole(null);
            }
          }}
          onSave={handleSaveRole}
        />
      </div>
    </>
  );
}
