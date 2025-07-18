import { useRouter } from "next/navigation";
import { Table } from "@tanstack/react-table";
import {
  IconLayoutColumns,
  IconPlus, // آیکون عوض شد
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleListDto } from "@/types";

interface RolesHeaderProps {
  table: Table<RoleListDto>;
}

export function RolesHeader({ table }: RolesHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
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

        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/roles/create-role")}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>
    </div>
  );
}
