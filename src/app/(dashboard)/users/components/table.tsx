"use client";

import {
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Eye,
  Edit,
  KeyRound,
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
import type { User } from "./types";

interface UserTableProps {
  users: User[];
  selectedUsers: number[];
  onSelectAll: () => void;
  onSelectUser: (userId: number) => void;
  onUserAction: (userId: number, action: string) => void;
  isDeleting: boolean;
}

export function UserTable({ users, onUserAction, isDeleting }: UserTableProps) {
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
              {/* User name Column */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 border-2 ">
                    <AvatarFallback>
                      {user.firstName?.charAt(0).toUpperCase()}
                      {user.surname?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white font-medium">
                    {user.username}
                  </span>
                </div>
              </TableCell>

              {/* First Name Column */}
              <TableCell>
                <span className="text-gray-300">{user.firstName}</span>
              </TableCell>

              {/* Surname Column */}
              <TableCell>
                <span className="text-gray-300">{user.surname}</span>
              </TableCell>

              {/* Roles Column - FIXED */}
              <TableCell>
                {/* <div className="flex flex-wrap gap-1">
                  {user.roles.length > 0 ? (
                    user.roles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className={`text-xs ${getRoleColor(role)}`}
                      >
                        {role}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No roles</span>
                  )}
                </div> */}
              </TableCell>

              {/* Email Address Column */}
              <TableCell>
                <span className="text-gray-300">{user.email}</span>
              </TableCell>

              {/* Email Confirm Column */}
              <TableCell>
                <div className="flex items-center gap-2">
                  {user.emailConfirm ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <Badge
                    variant="outline"
                    className={
                      user.emailConfirm
                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                        : "border-red-500/20 bg-red-500/10 text-red-400"
                    }
                  >
                    {user.emailConfirm ? "Yes" : "No"}
                  </Badge>
                </div>
              </TableCell>

              {/* Active Column */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.active ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></div>
                  <Badge
                    variant="outline"
                    className={
                      user.active
                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                        : "border-gray-500/20 bg-gray-500/10 text-gray-400"
                    }
                  >
                    {user.active ? "Yes" : "No"}
                  </Badge>
                </div>
              </TableCell>

              {/* Actions Column */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
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
                      onClick={() => onUserAction(user.id, "view")}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                      onClick={() => onUserAction(user.id, "edit")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                      onClick={() => onUserAction(user.id, "reset-password")}
                    >
                      <KeyRound className="w-4 h-4 mr-2" />
                      Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-600" />
                    <DropdownMenuItem
                      className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10"
                      onClick={() => onUserAction(user.id, "delete")}
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

              {/* Creation time Column */}
              <TableCell>
                <span className="text-gray-300 text-sm">
                  {user.creationTime}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
