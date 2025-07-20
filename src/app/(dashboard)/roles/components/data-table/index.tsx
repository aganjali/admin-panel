import { DataTablePagination } from "@/app/(dashboard)/users/components/data-table/pagination";
import { Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RolesHeader } from "./header";
import { getRoleColumns } from "./columns";
import type { VisibilityState, SortingState } from "@tanstack/react-table";
import { RoleListDto } from "@/types";

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
    <div className="w-full space-y-4 sm:space-y-6">
      <RolesHeader table={table} onCreate={onCreate} />

      <div className="space-y-4">
        <div className="rounded-lg border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel()?.rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-4 align-middle">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
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
