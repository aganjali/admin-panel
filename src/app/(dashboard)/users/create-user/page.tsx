import type React from "react";
import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { CreateUser } from "../components/create";

export default function CreateUserPage() {
  return (
    <AuthGuard
      perms={{
        list: [
          perms.adminPanel.administration.view,
          perms.adminPanel.administration.users.create,
        ],
        type: "and",
      }}
    >
      <CreateUser />
    </AuthGuard>
  );
}
