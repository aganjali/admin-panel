"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import {
  Loader2,
  FileSpreadsheet,
  Settings2,
  Upload,
  Download,
  XSquare,
  Trash,
  Shield,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";
import type { UserListWithAvatarDto } from "@/types";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { roleApi } from "@/lib/api/role";
import { useUI } from "@/services/managed-ui";

interface DataTableToolbarProps {
  searchValue: string | null;
  roleFilter: number;
  permissionsFilter: string[];
  onlyLockedUsers: boolean | null;
  table: Table<UserListWithAvatarDto>;
  onSearchChange: (value: string | null) => void;
  onRoleFilterChange: (role: number) => void;
  onPermissionFilterChange: (perms: string[]) => void;
  onOnlyLockedUsersChange: (value: boolean | null) => void;
  onImportExcel?: () => void;
  onExportExcel?: () => void;
  isExporting?: boolean;
}

export function DataTableToolbar({
  searchValue,
  roleFilter,
  onlyLockedUsers,
  permissionsFilter,
  table,
  onSearchChange,
  onRoleFilterChange,
  onOnlyLockedUsersChange,
  onPermissionFilterChange,
  onImportExcel,
  onExportExcel,
  isExporting = false,
}: DataTableToolbarProps) {
  const { openModal, setModalView } = useUI();
  // const router = useRouter();
  const [localSearchValue, setLocalSearchValue] = useState(searchValue ?? "");
  const handleSearchChange = (v: string) => {
    setLocalSearchValue(v);
    onSearchChange(v);
  };
  const { data: roles = null } = useQuery({
    queryKey: ["roles"],
    queryFn: roleApi.getRoles().fetch,
    staleTime: Number.POSITIVE_INFINITY,
    select: (s) => s.result.items ?? [],
  });
  // const [permissionFilter, setPermissionFilter] = useQueryState("permissions", {
  //   serialize: (value: string[]) => value.join(","),
  //   parse: (value: string) => (value ? value.split(",") : []),
  //   shallow: true,
  // });

  const hasPermissionFilter = permissionsFilter.length > 0;
  // const permissionCount = hasPermissionFilter ? permissionFilter.length : 0;

  const hasActiveFilters =
    !!searchValue || !!roleFilter || hasPermissionFilter || !!onlyLockedUsers;

  const hasColumnSizing =
    Object.keys(table.getState().columnSizing).length > 0 ||
    table.getState().columnSizingInfo?.isResizingColumn;

  const handleReset = () => {
    onRoleFilterChange(0);
    onOnlyLockedUsersChange(false);
    handleSearchChange("");
    onPermissionFilterChange([]);
    // const currentPath = window.location.pathname;
    // router.push(currentPath);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 flex-1">
        <div className="relative w-full max-w-[15rem]">
          <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={localSearchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <Select
            value={roleFilter.toString()}
            onValueChange={(v) => onRoleFilterChange(+v)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter roles" />
            </SelectTrigger>
            <SelectContent>
              {roles ? (
                <>
                  <SelectItem value={"0"}>All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id?.toString() ?? ""}>
                      {role.displayName}
                    </SelectItem>
                  ))}
                </>
              ) : (
                <SelectGroup>
                  <SelectLabel>Loading ...</SelectLabel>
                </SelectGroup>
              )}
            </SelectContent>
          </Select>

          <Button
            variant={hasPermissionFilter ? "secondary" : "outline"}
            onClick={() => {
              setModalView({
                name: "PERMISSIONS_FILTER",
                args: {
                  title: "Select Permissions",
                  desc: <>Filter users by permissions</>,
                  selectedIds: permissionsFilter,
                  reset: async () => {
                    return [];
                  },
                  submitFn: async (perms) => {
                    onPermissionFilterChange(perms);
                  },
                },
                props: { cancelable: true },
              });
              openModal();
            }}
            className={
              hasPermissionFilter
                ? "relative whitespace-nowrap"
                : "whitespace-nowrap"
            }
          >
            <Shield className="size-5" />
            <span>Filter by Permissions</span>
            {hasPermissionFilter && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
                {permissionsFilter.length}
              </span>
            )}
          </Button>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="onlyLockedUsers"
              checked={onlyLockedUsers ?? false}
              onCheckedChange={(checked) =>
                onOnlyLockedUsersChange(checked as boolean)
              }
            />
            <label
              htmlFor="onlyLockedUsers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
            >
              Locked Users
            </label>
          </div>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleReset}
            size={"icon"}
            className="flex items-center gap-2"
          >
            <Trash className="h-4 w-4 text-orange-500" />
            {/* <span>Clear</span> */}
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
        {hasColumnSizing && (
          <Button
            variant="secondary"
            onClick={() => table.resetColumnSizing()}
            className="flex items-center gap-2"
          >
            <XSquare className="h-4 w-4" />
            <span>Reset Column Sizes</span>
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-max justify-between bg-transparent"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                <span>Excel</span>
              </div>
              <IconChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              onClick={() => {
                console.log("Import Excel menu item clicked", onImportExcel); // Debug log
                onImportExcel?.();
              }}
              className="cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              <span>Import Excel</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                console.log("Export Excel menu item clicked", onExportExcel);
                onExportExcel?.();
              }}
              className="cursor-pointer"
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              <span>{isExporting ? "Exporting..." : "Export Excel"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-max justify-between bg-transparent"
            >
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                <span>View</span>
              </div>
              <IconChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
