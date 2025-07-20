"use client";

import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { UsersView } from "./components/view";

export default function UsersPage() {
  return (
    <AuthGuard
      perms={{
        list: [
          perms.adminPanel.administration.view,
          perms.adminPanel.administration.users.view,
        ],
        type: "and",
      }}
    >
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6 h-full">
            <UsersView />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
