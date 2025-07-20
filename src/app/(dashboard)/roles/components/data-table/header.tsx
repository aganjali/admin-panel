"use client";

import type { Table } from "@tanstack/react-table";
import { IconLayoutColumns, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RoleListDto } from "@/types";

interface RolesHeaderProps {
  table: Table<RoleListDto>;
  onCreate: () => void;
}

export function RolesHeader({ table, onCreate }: RolesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Roles</h2>
        <p className="text-muted-foreground">
          Manage application roles and permissions
        </p>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
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
        <Button variant="outline" size="sm" onClick={onCreate}>
          <IconPlus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>
    </div>
  );
}
