"use client";

import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserListDto } from "@/types";

interface HeaderProps {
  users: UserListDto[];
  totalEntries: number;
}

export function Header({ users, totalEntries }: HeaderProps) {
  const router = useRouter();
  const activeUsers = users.filter((u) => u.isActive).length;
  const inactiveUsers = users.filter((u) => !u.isActive).length;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="w-6 h-6 " />
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
        <Button onClick={() => router.push("/users/create-user")}>
          <Plus className="w-4 h-4 mr-2" />
          Create User
        </Button>
      </div>
    </div>
  );
}
