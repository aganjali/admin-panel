import { ColumnDef } from "@tanstack/react-table";
import { UserListDto } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { format, parseISO } from "date-fns";

type OnUserAction = (userId: number, action: string) => void;

export const getColumns = (
  onUserAction: OnUserAction,
  isDeleting: boolean
): ColumnDef<UserListDto>[] => [
  {
    id: "drag",
    header: () => null,
    cell: () => null, // Handled in DraggableRow
    size: 40,
  },
  {
    id: "userName",
    accessorKey: "name",
    header: "User name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border-2">
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
              {user.surname?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    id: "firstName",
    accessorKey: "name",
    header: "First Name",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "surname",
    header: "Surname",
    cell: ({ row }) => <span>{row.original.surname}</span>,
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => {
      const roles = row.original.roles ?? [];
      return (
        <div className="flex flex-wrap gap-1">
          {roles.length > 0 ? (
            roles.map((role) => (
              <Badge key={role.roleName} variant="outline" className="text-xs">
                {role.roleName}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">No roles</span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const userRoles = row.original.roles?.map((r) => r.roleName) ?? [];
      return (
        value.length === 0 ||
        value.some((role: string) => userRoles.includes(role))
      );
    },
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
    cell: ({ row }) => <span>{row.original.emailAddress}</span>,
  },
  {
    accessorKey: "isEmailConfirmed",
    header: "Email Confirm",
    cell: ({ row }) => {
      const isConfirmed = row.original.isEmailConfirmed;
      return (
        <div className="flex items-center gap-2">
          {isConfirmed ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <Badge
            variant="outline"
            className={
              isConfirmed
                ? "border-green-500/20 bg-green-500/10 text-green-600"
                : "border-red-500/20 bg-red-500/10 text-red-600"
            }
          >
            {isConfirmed ? "Yes" : "No"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isActive ? "bg-green-500" : "bg-gray-500"
            }`}
          />
          <Badge
            variant="outline"
            className={
              isActive
                ? "border-green-500/20 bg-green-500/10 text-green-600"
                : "border-gray-500/20 bg-gray-500/10 text-gray-600"
            }
          >
            {isActive ? "Yes" : "No"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
              disabled={isDeleting}
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-max">
            <DropdownMenuItem
              onClick={() => onUserAction(user.id ?? 0, "edit")}
            >
              <IconEdit className="w-4 h-4 mr-2" />
              Login as this user
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUserAction(user.id ?? 0, "edit")}
            >
              <IconEdit className="w-4 h-4 mr-2" />
              Permisions
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUserAction(user.id ?? 0, "edit")}
            >
              <IconEdit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onUserAction(user.id ?? 0, "delete")}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <IconTrash className="w-4 h-4 mr-2" />
              )}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "creationTime",
    header: "Creation time",
    cell: ({ row }) => {
      const creationTime = row.original.creationTime;
      return (
        <span className="text-sm">
          {creationTime ? format(parseISO(creationTime), "MM/dd/yyyy") : ""}
        </span>
      );
    },
  },
];
