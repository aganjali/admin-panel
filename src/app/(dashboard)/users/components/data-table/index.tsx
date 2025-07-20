"use client";

import { useState, useMemo } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
  ColumnSizingState,
  ColumnSort,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserListWithAvatarDto } from "@/types";
import { cn } from "@/lib/utils";

import { getColumns } from "./columns";
import { Row } from "./row";
import { DataTableHeader } from "./header";
import { DataTableToolbar } from "./toolbar";
import { DataTablePagination } from "./pagination";

interface UsersDataTableProps {
  data: UserListWithAvatarDto[];
  totalCount: number;
  isLoading: boolean;
  isDeleting: boolean;
  searchValue: string | null;
  roleFilter: number;
  onlyLockedUsers: boolean | null;
  permissions: string[];
  currentPage: number;
  pageSize: number;
  sorting: ColumnSort[] | null;
  onUserAction: (userId: number, action: string) => void;
  onSearchChange: (value: string | null) => void;
  onRoleFilterChange: (role: number) => void;
  onPermissionsChange: (permissions: string[]) => void;
  onOnlyLockedUsersChange: (value: boolean | null) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSortingChange: (sorting: Array<{ id: string; desc: boolean }>) => void;
  onImportExcel?: () => void;
  onExportExcel?: () => void;
  isExporting?: boolean;
}

export function UsersDataTable({
  data,
  totalCount,
  isLoading,
  isDeleting,
  searchValue,
  roleFilter,
  onlyLockedUsers,
  permissions,
  currentPage,
  pageSize,
  sorting,
  onUserAction,
  onSearchChange,
  onRoleFilterChange,
  onOnlyLockedUsersChange,
  onPermissionsChange,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
  onImportExcel,
  onExportExcel,
  isExporting,
}: UsersDataTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  const columns = useMemo(
    () => getColumns(onUserAction, isDeleting),
    [onUserAction, isDeleting]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting ?? [],
      columnVisibility,
      columnSizing,
    },
    getRowId: (row, index) => (row.id ?? `temp-${index}`).toString(),
    onSortingChange: (updaterOrValue) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting ?? [])
          : updaterOrValue;

      onSortingChange(
        newSorting.map((sort) => ({ id: sort.id, desc: sort.desc }))
      );
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: Math.ceil(totalCount / pageSize),
    // enableColumnResizing: true,
    // columnResizeMode: "onChange",
    // columnResizeDirection: "ltr",
  });

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;
  //   if (active && over && active.id !== over.id) {
  //     setData((currentData) => {
  //       const oldIndex = currentData.findIndex(
  //         (item, index) => (item.id ?? `temp-${index}`).toString() === active.id
  //       );
  //       const newIndex = currentData.findIndex(
  //         (item, index) => (item.id ?? `temp-${index}`).toString() === over.id
  //       );
  //       if (oldIndex !== -1 && newIndex !== -1) {
  //         return arrayMove(currentData, oldIndex, newIndex);
  //       }
  //       return currentData;
  //     });
  //   }
  // }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full flex-col justify-start  space-y-4 flex-1 flex ">
      <DataTableHeader />

      <div className="relative flex flex-col gap-4 w-full flex-1 ">
        <DataTableToolbar
          searchValue={searchValue}
          roleFilter={roleFilter}
          onlyLockedUsers={onlyLockedUsers}
          permissionsFilter={permissions}
          table={table}
          onSearchChange={onSearchChange}
          onRoleFilterChange={onRoleFilterChange}
          onOnlyLockedUsersChange={onOnlyLockedUsersChange}
          onPermissionFilterChange={onPermissionsChange}
          onImportExcel={onImportExcel}
          onExportExcel={onExportExcel}
          isExporting={isExporting}
        />

        <div className="w-full overflow-hidden relative flex-1 rounded-lg border max-h-[480px]">
          <Table
            className="relative "
            containerClassName={cn("relative overflow-y-auto h-full", {
              "no-scrollbar": isLoading,
            })}
          >
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // const isDragColumn = headerIndex === 0;
                    // const isActionColumn = header.column.id === "actions";

                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: header.getSize(),
                        }}
                        className={cn(
                          "group/th relative",
                          // isDragColumn
                          //   ? "text-center px-2 py-2 w-auto"
                          //   :
                          "text-left px-3 py-2 whitespace-nowrap w-auto"
                          // isActionColumn &&
                          //   "sticky -right-0.5 bg-muted z-20 border-l shadow-[-4px_0_8px_0_rgba(0,0,0,0.1)] dark:shadow-[-4px_0_8px_0_rgba(0,0,0,0.3)]"
                        )}
                      >
                        <div className="flex items-center w-full relative">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="relative">
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => <Row key={row.id} row={row} />)
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-[438px]"
                  >
                    {!isLoading ? "No users found." : ""}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {isLoading ? (
            <div className="absolute inset-x-0 bottom-0 top-10 bg-background/5 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-600">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white font-medium">Loading users...</span>
              </div>
            </div>
          ) : null}
        </div>

        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
