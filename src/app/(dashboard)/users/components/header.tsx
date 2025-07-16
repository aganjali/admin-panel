"use client";

import { Users, Download, Plus, X, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "./types";

interface HeaderProps {
  users: User[];
  selectedUsers: number[];
  onClearSelection: () => void;
  totalEntries: number;
  onExport: (format: "excel" | "csv") => void;
  isExporting: boolean;
}

export function Header({
  users,
  selectedUsers,
  onClearSelection,
  totalEntries,
  onExport,
  isExporting,
}: HeaderProps) {
  const activeUsers = users.filter((u) => u.active).length;
  const inactiveUsers = users.filter((u) => !u.active).length;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400">
              Manage users, roles, and permissions across your organization
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {activeUsers} Active Users
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            {inactiveUsers} Inactive Users
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {totalEntries} Total Users
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <span className="text-sm text-blue-400">
              {selectedUsers.length} selected
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300"
            >
              <X className="w-4 h-4" onClick={onClearSelection} />
            </Button>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 backdrop-blur-sm"
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Export
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-600">
            <DropdownMenuItem
              className="text-white hover:bg-gray-700 focus:bg-gray-700"
              onClick={() => onExport("excel")}
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white hover:bg-gray-700 focus:bg-gray-700"
              onClick={() => onExport("csv")}
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-600" />
            <DropdownMenuItem className="text-white hover:bg-gray-700 focus:bg-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Import from Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </Button>
      </div>
    </div>
  );
}
