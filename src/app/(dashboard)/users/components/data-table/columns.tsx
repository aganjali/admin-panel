import { ColumnDef } from "@tanstack/react-table";
import { UserListWithAvatarDto } from "@/types";
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
import {
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconShield,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { SortableHeader } from "./sortable-header";
import { ReactElement, useContext } from "react";
import { UserContext } from "@/services/user/context";
import { perms } from "@/lib/perms";

type OnUserAction = (userId: number, action: string) => void;

interface ActionsListProp {
  user: UserListWithAvatarDto;
  isDeleting: boolean;
  onUserAction: OnUserAction;
}
function ActionsList({ user, isDeleting, onUserAction }: ActionsListProp) {
  const { checkPerms } = useContext(UserContext);
  const items: ReactElement[] = [];
  if (
    checkPerms({
      list: [perms.adminPanel.administration.users.changePermissions],
    })
  ) {
    items.push(
      <DropdownMenuItem
        key={"change-perm"}
        onClick={() => onUserAction(user.id ?? 0, "permissions")}
      >
        <IconShield className="w-4 h-4 mr-2" />
        Permissions
      </DropdownMenuItem>
    );
  }
  if (
    checkPerms({
      list: [perms.adminPanel.administration.users.edit],
    })
  ) {
    if (items.length) {
      items.push(<DropdownMenuSeparator key="sep-edit" />);
    }
    items.push(
      <DropdownMenuItem
        key={"edit"}
        onClick={() => onUserAction(user.id ?? 0, "edit")}
      >
        <IconEdit className="w-4 h-4 mr-2" />
        Edit
      </DropdownMenuItem>
    );
  }
  if (
    checkPerms({
      list: [perms.adminPanel.administration.users.delete],
    })
  ) {
    if (items.length) {
      items.push(<DropdownMenuSeparator key="sep-delete" />);
    }
    items.push(
      <DropdownMenuItem
        key={"delete"}
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
    );
  }
  if (!items.length) return null;

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
        {items}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export const getColumns = (
  onUserAction: OnUserAction,
  isDeleting: boolean
): ColumnDef<UserListWithAvatarDto>[] => [
  {
    id: "drag",
    header: () => null,
    cell: () => null,
    size: 20,
    enableSorting: false,
  },
  {
    id: "userName",
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>User name</SortableHeader>
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="w-8 h-8 border-2 flex-shrink-0">
            {/* <AvatarImage src={user.avatar} alt={user.fullName} /> */}
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <span className="font-medium truncate" title={user.name ?? ""}>
            {user.name}
          </span>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: true,
  },
  {
    id: "firstName",
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>First Name</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="truncate block" title={row.original.name ?? ""}>
        {row.original.name}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "surname",
    header: ({ column }) => (
      <SortableHeader column={column}>Surname</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="truncate block" title={row.original.surname ?? ""}>
        {row.original.surname}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <SortableHeader column={column}>Roles</SortableHeader>
    ),
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
    sortingFn: (rowA, rowB) => {
      const rolesA = rowA.original.roles?.length ?? 0;
      const rolesB = rowB.original.roles?.length ?? 0;
      return rolesA - rolesB;
    },
    enableSorting: true,
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => (
      <SortableHeader column={column}>Email Address</SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="truncate block" title={row.original.emailAddress ?? ""}>
        {row.original.emailAddress}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "isEmailConfirmed",
    header: ({ column }) => (
      <SortableHeader column={column}>Email Confirm</SortableHeader>
    ),
    cell: ({ row }) => {
      const isConfirmed = row.original.isEmailConfirmed;
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {isConfirmed ? (
              <>
                <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                Yes
              </>
            ) : (
              <>
                {/* <IconLoader /> */}
                No
              </>
            )}
          </Badge>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <SortableHeader column={column}>Active</SortableHeader>
    ),
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {isActive ? (
                <>
                  <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                  Yes
                </>
              ) : (
                <>
                  {/* <IconLoader /> */}
                  No
                </>
              )}
            </Badge>
          </div>
        </div>
      );
    },
    enableSorting: true,
  },

  {
    accessorKey: "creationTime",
    header: ({ column }) => (
      <SortableHeader column={column}>Creation time</SortableHeader>
    ),
    cell: ({ row }) => {
      const creationTime = row.original.creationTime;
      return (
        <span className="text-sm">
          {creationTime ? format(parseISO(creationTime), "MM/dd/yyyy") : ""}
        </span>
      );
    },
    enableSorting: true,
  },

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <ActionsList
          user={row.original}
          isDeleting={isDeleting}
          onUserAction={onUserAction}
        />
      );
    },
    enableHiding: false,
  },
];
