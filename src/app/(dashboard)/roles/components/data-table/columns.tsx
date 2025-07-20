"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { Loader2 } from "lucide-react";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconEdit,
  IconShield,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { UserContext } from "@/services/user/context";
import { perms } from "@/lib/perms";

export interface RoleListDto {
  id?: number;
  name?: string | null;
  displayName?: string | null;
  isStatic?: boolean;
  isDefault?: boolean;
  creationTime?: string;
}

type OnRoleAction = (action: "edit" | "delete", role: RoleListDto) => void;

export const getRoleColumns = (
  onRoleAction: OnRoleAction,
  isDeleting: boolean
): ColumnDef<RoleListDto, any>[] => [
  {
    accessorKey: "name",
    header: "Role Name",
    cell: ({ row }) => {
      const role = row.original;
      const { checkPerms } = useContext(UserContext);

      const canEdit = checkPerms({
        list: [perms.adminPanel.administration.roles.edit],
      });

      return (
        <div className="flex items-center gap-3">
          <IconShield className="w-5 h-5 text-muted-foreground" />
          {canEdit ? (
            <Button
              variant="link"
              className="h-auto p-0 font-medium"
              onClick={() => onRoleAction("edit", role)}
            >
              {role.displayName ?? "Unnamed Role"}{" "}
            </Button>
          ) : (
            <span className="font-medium">
              {role.displayName ?? "Unnamed Role"}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isStatic",
    header: "Type",
    cell: ({ row }) => {
      const isStatic = row.original.isStatic;
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-1.5">
            {isStatic ? (
              <>
                <IconCircleCheckFilled className="fill-blue-500 dark:fill-blue-400 mr-1 h-3 w-3" />
                System
              </>
            ) : (
              <>Custom</>
            )}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "creationTime",
    header: "Creation Time",
    cell: ({ row }) => {
      const creationTime = row.original.creationTime;
      return creationTime
        ? format(parseISO(creationTime), "MM/dd/yyyy")
        : "N/A";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const role = row.original;
      const { checkPerms } = useContext(UserContext);

      const canEdit = checkPerms({
        list: [perms.adminPanel.administration.roles.edit],
      });

      const canDelete = checkPerms({
        list: [perms.adminPanel.administration.roles.delete],
      });

      if (!canEdit && !canDelete) {
        return null;
      }

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex h-8 w-8 p-0"
                disabled={isDeleting}
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canEdit && (
                <DropdownMenuItem onClick={() => onRoleAction("edit", role)}>
                  <IconEdit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              )}
              {canEdit && canDelete && <DropdownMenuSeparator />}
              {canDelete && (
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onRoleAction("delete", role)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <IconTrash className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
