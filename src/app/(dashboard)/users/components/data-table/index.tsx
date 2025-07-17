"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserListDto } from "@/types";

import { getColumns } from "./columns";
import { DraggableRow } from "./draggable-row";
import { DataTableHeader } from "./header";
import { DataTableToolbar } from "./toolbar";
import { DataTablePagination } from "./pagination";

interface UsersDataTableProps {
  data: UserListDto[];
  totalCount: number;
  isLoading: boolean;
  isDeleting: boolean;
  searchValue: string;
  roleFilter: string[];
  currentPage: number;
  pageSize: number;
  onUserAction: (userId: number, action: string) => void;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (roles: string[]) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const roleOptions = ["Admin", "User"];

export function UsersDataTable({
  data: initialData,
  totalCount,
  isLoading,
  isDeleting,
  searchValue,
  roleFilter,
  currentPage,
  pageSize,
  onUserAction,
  onSearchChange,
  onRoleFilterChange,
  onPageChange,
  onPageSizeChange,
}: UsersDataTableProps) {
  const [data, setData] = useState(() => initialData);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const [isSearching, setIsSearching] = useState(false);
  const sortableId = useId();

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () =>
      data?.map((item, index) => (item.id ?? `temp-${index}`).toString()) || [],
    [data]
  );

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (localSearchValue !== searchValue) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      if (localSearchValue !== searchValue) {
        onSearchChange(localSearchValue);
      }
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [localSearchValue, searchValue, onSearchChange]);

  useEffect(() => {
    setLocalSearchValue(searchValue);
    setIsSearching(false);
  }, [searchValue]);

  const columns = useMemo(
    () => getColumns(onUserAction, isDeleting),
    [onUserAction, isDeleting]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters: [
        {
          id: "roles",
          value: roleFilter,
        },
      ],
    },
    getRowId: (row, index) => (row.id ?? `temp-${index}`).toString(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((currentData) => {
        const oldIndex = currentData.findIndex(
          (item, index) => (item.id ?? `temp-${index}`).toString() === active.id
        );
        const newIndex = currentData.findIndex(
          (item, index) => (item.id ?? `temp-${index}`).toString() === over.id
        );
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(currentData, oldIndex, newIndex);
        }
        return currentData;
      });
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full flex-col justify-start gap-6 space-y-4">
      <DataTableHeader table={table} />

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <DataTableToolbar
          searchValue={localSearchValue}
          isSearching={isSearching}
          roleFilter={roleFilter}
          roleOptions={roleOptions}
          onSearchChange={setLocalSearchValue}
          onRoleFilterChange={onRoleFilterChange}
        />

        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
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
                  Array.from({ length: pageSize }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      {columns.map((_, j) => (
                        <TableCell key={`skeleton-cell-${i}-${j}`}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
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
