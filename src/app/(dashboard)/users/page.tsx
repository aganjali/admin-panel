"use client";

import { useState } from "react";
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
import { UserTable } from "./components/table";
import { Pagination } from "./components/pagination";
import { SearchBar } from "./components/search-bar";
import { Header } from "./components/header";
import { FilterSidebar } from "./components/filter-sidebar";
import { toast } from "sonner";

const roleOptions = ["Admin", "User"];

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
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

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
  const totalEntries = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalEntries / urlParams.limit);

  const activeFiltersCount = urlParams.roles.length;

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

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-6 px-3 space-y-8">
        <Header users={users} totalEntries={totalEntries} />

        <SearchBar
          searchQuery={urlParams.search ?? ""}
          onSearchChange={(query) => setUrlParams({ search: query, page: 1 })}
          onFilterToggle={() => setFilterSidebarOpen(true)}
          activeFiltersCount={activeFiltersCount}
        />

        <FilterSidebar
          open={filterSidebarOpen}
          onOpenChange={setFilterSidebarOpen}
          roleOptions={roleOptions}
        />

        <UserTable
          users={users}
          onUserAction={handleUserAction}
          isDeleting={deleteUser.isPending}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={urlParams.page}
          totalPages={totalPages}
          entriesPerPage={urlParams.limit.toString()}
          totalEntries={totalEntries}
          onPageChange={(page) => setUrlParams({ page })}
          onEntriesPerPageChange={(limit) =>
            setUrlParams({ limit: Number(limit), page: 1 })
          }
        />
      </div>
    </div>
  );
}
