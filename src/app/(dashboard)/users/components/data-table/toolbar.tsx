"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
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
  Shield,
  FileSpreadsheet,
  Settings2,
  RotateCcw,
  Upload,
  Download,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";
import type { UserListWithAvatarDto } from "@/types";
import { useUI } from "@/services/managed-ui";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";

interface DataTableToolbarProps {
  searchValue: string;
  isSearching: boolean;
  roleFilter: string[];
  roleOptions: string[];
  onlyLockedUsers: boolean;
  table: Table<UserListWithAvatarDto>;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (roles: string[]) => void;
  onOnlyLockedUsersChange: (value: boolean) => void;
  onImportExcel?: () => void;
  onExportExcel?: () => void;
  isExporting?: boolean;
}

export function DataTableToolbar({
  searchValue,
  isSearching,
  roleFilter,
  roleOptions,
  onlyLockedUsers,
  table,
  onSearchChange,
  onRoleFilterChange,
  onOnlyLockedUsersChange,
  onImportExcel,
  onExportExcel,
  isExporting = false,
}: DataTableToolbarProps) {
  const { openModal, setModalView } = useUI();
  const router = useRouter();

  const [permissionFilter, setPermissionFilter] = useQueryState("permissions", {
    serialize: (value: string[]) => value.join(","),
    parse: (value: string) => (value ? value.split(",") : []),
    shallow: true,
  });

  const hasPermissionFilter = permissionFilter && permissionFilter.length > 0;
  const permissionCount = hasPermissionFilter ? permissionFilter.length : 0;

  const hasActiveFilters =
    searchValue ||
    roleFilter.length > 0 ||
    hasPermissionFilter ||
    onlyLockedUsers;

  const handleReset = () => {
    // Clear all filters and query params
    onSearchChange("");
    onRoleFilterChange([]);
    onOnlyLockedUsersChange(false);
    setPermissionFilter(null); // Clear permissions query param

    // Optional: Navigate to clean URL without query params
    const currentPath = window.location.pathname;
    router.push(currentPath);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
      {/* Left side - Search and Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
        <div className="relative w-full max-w-sm">
          {isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
          ) : (
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          )}
          <Input
            placeholder="Search users..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <Select
            value={roleFilter.length > 0 ? roleFilter[0] : "all"}
            onValueChange={(value) => {
              const roles = value === "all" ? [] : [value];
              onRoleFilterChange(roles);
            }}
          >
            <SelectTrigger className="min-w-40">
              <SelectValue placeholder="Filter by role">
                {roleFilter.length > 0 ? roleFilter[0] : "All roles"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {roleOptions.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={hasPermissionFilter ? "secondary" : "outline"}
            onClick={() => {
              setModalView({
                name: "FILTER_PERMISSIONS",
                args: {},
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
            <Shield className="h-5 w-5" />
            <span>Filter by Permissions</span>
            {hasPermissionFilter && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
                {permissionCount}
              </span>
            )}
          </Button>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="onlyLockedUsers"
              checked={onlyLockedUsers}
              onCheckedChange={(checked) =>
                onOnlyLockedUsersChange(checked as boolean)
              }
            />
            <label
              htmlFor="onlyLockedUsers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
            >
              Only Locked Users
            </label>
          </div>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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

        {hasActiveFilters && (
          <Button
            variant="secondary"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        )}
      </div>
    </div>
  );
}
