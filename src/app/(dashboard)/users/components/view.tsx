"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/users";
import type {
  ApiServicesAppUserDeleteuserDeleteParams,
  ApiServicesAppUserGetusersGetParams,
  ApiServicesAppUserGetuserstoexcelGetParams,
  UpdateUserPermissionsInput,
} from "@/types/api/data-contracts";
import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  parseAsBoolean,
} from "nuqs";
import { toast } from "sonner";
import { useUI } from "@/services/managed-ui";
import { UsersDataTable } from "./data-table";
import { getAvatar } from "@/lib/imgs";
import { queryClient } from "@/lib/query";
import { usePaginationSortFilter } from "@/hooks/use-pagintaion-sort";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

export function UsersView() {
  const router = useRouter();
  const { openModal, setModalView } = useUI();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const {
    query: psfQuery,
    params: psf,
    handleFilterChange,
    resetPage,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,
  } = usePaginationSortFilter();

  const [urlParams, setUrlParams] = useQueryStates({
    role: parseAsInteger.withDefault(0),
    permissions: parseAsArrayOf(parseAsString).withDefault([]),
    onlyLockedUsers: parseAsBoolean,
  });
  const query: ApiServicesAppUserGetusersGetParams = {
    ...psfQuery,
    OnlyLockedUsers: urlParams.onlyLockedUsers ?? undefined,
    Permissions: urlParams.permissions ?? undefined,
    Role: urlParams.role || undefined,
  };
  const { data, isPlaceholderData, isFetching, isLoading, error } = useQuery({
    queryKey: ["users", urlParams, psf],
    queryFn: () => usersApi.getUsers(query).fetch(),
    select: (res) => ({
      ...res.result,
      items: (res.result.items ?? []).map((m) => ({
        ...m,
        id: m.id ?? 0,
        avatar: m.id ? getAvatar(m.id) : "",
        fullName: ((m.name ?? "") + " " + (m.surname ?? "")).trim(),
        initials:
          (m.name?.charAt(0).toUpperCase() ?? "") +
          (m.surname?.charAt(0).toUpperCase() ?? ""),
      })),
    }),
    placeholderData: keepPreviousData,
  });

  const deleteUser = useMutation({
    mutationFn: (params: ApiServicesAppUserDeleteuserDeleteParams) =>
      usersApi.deleteUser(params).fetch(),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      if (params.Id)
        queryClient.resetQueries({
          queryKey: ["user", params.Id],
          exact: true,
        });
      toast.success("User deleted successfully");
    },
    onError: () => toast.error("Failed to delete user"),
  });

  const exportToExcel = useMutation({
    mutationFn: async () => {
      const exportParams = {
        ...query,
        SelectedColumns: ["Name", "Surname", "UserName"],
      };
      delete exportParams.MaxResultCount;
      delete exportParams.SkipCount;
      const response = await usersApi
        .getUsersToExcel(
          exportParams as ApiServicesAppUserGetuserstoexcelGetParams
        )
        .fetch();
      console.log("Export response:", response);
      return response.result;
    },
    onSuccess: async (fileDto) => {
      //TODO: Download the file
      console.log(fileDto.fileName);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Failed to export users";
      toast.error(message);
    },
  });

  const resetPerm = useMutation({
    mutationFn: (id: number) =>
      usersApi
        .resetUserSpecificPermissions({
          id,
        })
        .fetch(),
    onSuccess: () => {
      toast.success("Permissions reset successfully");
    },
    onError: (e) => {
      toast.error("Failed to reset permissions", { description: e?.message });
    },
  });
  const updatePerms = useMutation({
    mutationFn: (data: UpdateUserPermissionsInput) =>
      usersApi.updateUserPermissions(data).fetch(),
    onSuccess: () => {
      toast.success("Permissions updated successfully");
    },
    onError: (e) => {
      toast.error("Failed to update permissions", { description: e?.message });
    },
  });

  const users = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;

  if (error) {
    toast.error("Failed to load users");
  }

  const handleUserAction = async (userId: number, action: string) => {
    const user = users.find((u) => u.id === userId);
    const userName = user ? `${user.name} ${user.surname}`.trim() : undefined;

    switch (action) {
      case "edit":
        router.push(`/users/edit-user?id=${userId}`);
        break;
      case "delete":
        setDeleteId(userId);
        break;
      case "permissions":
        setModalView({
          name: "PERMISSIONS_FILTER",
          args: {
            userId,
            title: "Change User Permissions",
            desc: (
              <>
                Manage permissions for{" "}
                <span className="font-semibold">{userName || "user"}</span>
              </>
            ),
            reset: async () => {
              await resetPerm.mutateAsync(userId);
              return null;
            },
            submitFn: async (grantedPermissionNames) => {
              await updatePerms.mutateAsync({
                id: userId,
                grantedPermissionNames,
              });
            },
          },
          props: { cancelable: true },
        });
        openModal();
        break;
    }
  };

  const handleImportExcel = () => {
    console.log("Import Excel clicked");
    setModalView({
      name: "IMPORT_EXCEL",
      args: {},
      props: { cancelable: true },
    });
    openModal();
  };

  const handleExportExcel = () => {
    console.log("Export Excel clicked");
    exportToExcel.mutate();
  };

  const handleRoleFilterChange = (role: number) => {
    setUrlParams({ role });
    resetPage();
  };

  const handleOnlyLockedUsersChange = (onlyLockedUsers: boolean | null) => {
    setUrlParams({ onlyLockedUsers });
    resetPage();
  };
  const handlePermissionsChange = (permissions: string[]) => {
    setUrlParams({ permissions });
    resetPage();
  };

  return (
    <>
      <UsersDataTable
        data={users}
        totalCount={totalCount}
        isLoading={isLoading || (isFetching && isPlaceholderData)}
        isDeleting={deleteUser.isPending}
        roleFilter={urlParams.role}
        onlyLockedUsers={urlParams.onlyLockedUsers}
        permissions={urlParams.permissions}
        currentPage={psf.page}
        pageSize={psf.pageSize}
        searchValue={psf.q}
        sorting={psf.sort ? [psf.sort] : []}
        onUserAction={handleUserAction}
        onSearchChange={handleFilterChange}
        onRoleFilterChange={handleRoleFilterChange}
        onPermissionsChange={handlePermissionsChange}
        onOnlyLockedUsersChange={handleOnlyLockedUsersChange}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSortingChange={handleSortChange}
        onImportExcel={handleImportExcel}
        onExportExcel={handleExportExcel}
        isExporting={exportToExcel.isPending}
      />
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete user
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteUser.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteUser.mutate({ Id: deleteId })}
              disabled={deleteUser.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteUser.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
