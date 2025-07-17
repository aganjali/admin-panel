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
} from "nuqs";
import { toast } from "sonner";
import { UsersDataTable } from "./components/data-table";

const buildUserQueryParams = (params: {
  page: number;
  limit: number;
  search?: string;
  roles?: string[];
}) => {
  const ROLE_NAME_TO_ID: Record<string, number> = { Admin: 2, User: 3 };

  return {
    SkipCount: (params.page - 1) * params.limit,
    MaxResultCount: params.limit,
    Filter: params.search,
    Role:
      params.roles && params.roles.length > 0
        ? ROLE_NAME_TO_ID[params.roles[0]]
        : undefined,
  };
};

export default function UsersPage() {
  const router = useRouter();

  const [urlParams, setUrlParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    search: parseAsString.withDefault(""),
    roles: parseAsArrayOf(parseAsString).withDefault([]),
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
    switch (action) {
      case "edit":
        router.push(`/users/edit-user?id=${userId}`);
        break;
      case "delete":
        await deleteUser.mutateAsync({ Id: userId });
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
          onUserAction={handleUserAction}
          onSearchChange={handleSearchChange}
          onRoleFilterChange={handleRoleFilterChange}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
