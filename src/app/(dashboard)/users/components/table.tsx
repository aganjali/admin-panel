"use client";

import {
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserListDto } from "@/types";
import { format, parseISO } from "date-fns";

interface UserTableProps {
  users: UserListDto[];
  onUserAction: (userId: number, action: string) => void;
  isDeleting: boolean;
  isLoading: boolean;
}

export function UserTable({
  users,
  onUserAction,
  isDeleting,
  isLoading,
}: UserTableProps) {
  if (isLoading) {
    return (
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 9 }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 9 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <div className="p-6 text-center text-gray-500">No users found</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden !mb-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User name</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Email Confirm</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Creation time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 border-2 ">
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase()}
                      {user.surname?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-gray-300">{user.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-300">{user.surname}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {(user.roles ?? []).length > 0 ? (
                    (user.roles ?? []).map((role) => (
                      <Badge
                        key={role.roleName}
                        variant="outline"
                        className="text-xs bg-blue-600/20 text-blue-400"
                      >
                        {role.roleName}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No roles</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-gray-300">{user.emailAddress}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {user.isEmailConfirmed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <Badge
                    variant="outline"
                    className={
                      user.isEmailConfirmed
                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                        : "border-red-500/20 bg-red-500/10 text-red-400"
                    }
                  >
                    {user.isEmailConfirmed ? "Yes" : "No"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.isActive ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></div>
                  <Badge
                    variant="outline"
                    className={
                      user.isActive
                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                        : "border-gray-500/20 bg-gray-500/10 text-gray-400"
                    }
                  >
                    {user.isActive ? "Yes" : "No"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      disabled={isDeleting}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-gray-800 border-gray-600"
                    align="end"
                  >
                    <DropdownMenuItem
                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                      onClick={() => onUserAction(user.id ?? 0, "edit")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-600" />
                    <DropdownMenuItem
                      className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10"
                      onClick={() => onUserAction(user.id ?? 0, "delete")}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <span className="text-gray-300 text-sm">
                  {user.creationTime
                    ? format(parseISO(user.creationTime), "MM/dd/yyyy")
                    : ""}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
