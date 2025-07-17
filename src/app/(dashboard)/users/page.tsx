"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/users";
import type { ApiServicesAppUserDeleteuserDeleteParams } from "@/types/api/data-contracts";
import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  parseAsJson,
} from "nuqs";
import { toast } from "sonner";
import { UsersDataTable } from "./components/data-table";
import { useUI } from "@/services/managed-ui";

const buildUserQueryParams = (params: {
  page: number;
  limit: number;
  search?: string;
  roles?: string[];
  sorting?: Array<{ id: string; desc: boolean }>;
}) => {
  const ROLE_NAME_TO_ID: Record<string, number> = { Admin: 2, User: 3 };

  // Map column IDs to API sort fields
  const SORT_FIELD_MAP: Record<string, string> = {
    userName: "Name",
    firstName: "Name",
    surname: "Surname",
    emailAddress: "EmailAddress",
    isEmailConfirmed: "IsEmailConfirmed",
    isActive: "IsActive",
    creationTime: "CreationTime",
    roles: "Name", // Sort by name when sorting roles
  };

  let sorting = "";
  if (params.sorting && params.sorting.length > 0) {
    const sortItem = params.sorting[0];
    const sortField = SORT_FIELD_MAP[sortItem.id];
    if (sortField) {
      sorting = `${sortField} ${sortItem.desc ? "DESC" : "ASC"}`;
    }
  }

  return {
    SkipCount: (params.page - 1) * params.limit,
    MaxResultCount: params.limit,
    Filter: params.search,
    Sorting: sorting || undefined,
    Role:
      params.roles && params.roles.length > 0
        ? ROLE_NAME_TO_ID[params.roles[0]]
        : undefined,
  };
};

export default function UsersPage() {
  const router = useRouter();
  const { openModal, setModalView } = useUI();

  const [urlParams, setUrlParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(15),
    search: parseAsString.withDefault(""),
    roles: parseAsArrayOf(parseAsString).withDefault([]),
    sorting: parseAsJson((value: any): Array<{ id: string; desc: boolean }> => {
      if (Array.isArray(value)) {
        return value.filter(
          (item) =>
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.desc === "boolean"
        );
      }
      return [];
    }).withDefault([]),
  });

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", urlParams],
    queryFn: () => usersApi.getUsers(buildUserQueryParams(urlParams)).fetch(),
    select: (res) => res.result,
  });

  const deleteUser = useMutation({
    mutationFn: (params: ApiServicesAppUserDeleteuserDeleteParams) =>
      usersApi.deleteUser(params).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: () => toast.error("Failed to delete user"),
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
        setModalView({
          name: "DELETE_USER",
          args: {
            userId,
            userName,
            onConfirm: async () => {
              await deleteUser.mutateAsync({ Id: userId });
            },
          },
          props: { cancelable: true },
        });
        openModal();
        break;
      case "permissions":
        setModalView({
          name: "USER_PERMISSIONS",
          args: {
            userId,
            userName,
          },
          props: { cancelable: true },
        });
        openModal();
        break;
    }
  };

  const handleSearchChange = (query: string) => {
    setUrlParams({ search: query, page: 1 });
  };

  const handleRoleFilterChange = (roles: string[]) => {
    setUrlParams({ roles, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setUrlParams({ page });
  };

  const handlePageSizeChange = (limit: number) => {
    setUrlParams({ limit, page: 1 });
  };

  const handleSortingChange = (
    sorting: Array<{ id: string; desc: boolean }>
  ) => {
    setUrlParams({ sorting, page: 1 });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-6 px-3">
        <UsersDataTable
          data={users}
          totalCount={totalCount}
          isLoading={isLoading}
          isDeleting={deleteUser.isPending}
          searchValue={urlParams.search}
          roleFilter={urlParams.roles}
          currentPage={urlParams.page}
          pageSize={urlParams.limit}
          sorting={urlParams.sorting}
          onUserAction={handleUserAction}
          onSearchChange={handleSearchChange}
          onRoleFilterChange={handleRoleFilterChange}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSortingChange={handleSortingChange}
        />
      </div>
    </div>
  );
}
