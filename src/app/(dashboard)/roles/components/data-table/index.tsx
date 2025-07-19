"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RoleListDto } from "@/types";

import { getRoleColumns } from "./columns";
import { RolesHeader } from "./roles-header";
import { Loader2 } from "lucide-react";
import { DataTablePagination } from "@/app/(dashboard)/users/components/data-table/pagination";

interface RolesDataTableProps {
  data: RoleListDto[];
  totalCount: number;
  isLoading: boolean;
  isDeleting: boolean;
  currentPage: number;
  pageSize: number;
  onRoleAction: (action: "edit" | "delete", role: RoleListDto) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onCreate: () => void;
}

export function RolesDataTable({
  data,
  totalCount,
  isLoading,
  isDeleting,
  currentPage,
  pageSize,
  onRoleAction,
  onPageChange,
  onPageSizeChange,
  onCreate,
}: RolesDataTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => getRoleColumns(onRoleAction, isDeleting),
    [onRoleAction, isDeleting]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      if (typeof updater !== "function") return;
      const newPagination = updater({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      });
      onPageChange(newPagination.pageIndex + 1);
      onPageSizeChange(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full flex-col justify-start gap-6 space-y-4">
      <RolesHeader table={table} onCreate={onCreate} />

      <div className="relative flex flex-col gap-4 px-4 lg:px-6">
        <div className="w-full min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2"></div>
          </div>
        </div>

        <div className="w-full">
          <div className="overflow-hidden rounded-lg border">
            <Table className="w-full table-fixed">
              <colgroup>
                <col className="w-40" />
                <col className="w-24" />
                <col className="w-32" />
                <col className="w-24" />
              </colgroup>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="text-left px-3 py-2 overflow-hidden"
                      >
                        <div className="truncate">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-[50vh]">
                      <div className="flex justify-center items-center">
                        <Loader2 className="size-8 text-primary animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel()?.rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-3 py-2 overflow-hidden"
                        >
                          <div className="truncate">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No roles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
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
