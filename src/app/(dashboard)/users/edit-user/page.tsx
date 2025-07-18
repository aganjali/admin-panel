import type React from "react";
import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { EditUser } from "../components/edit";

export default function EditUserPage() {
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
      <EditUser />
    </AuthGuard>
  );
}
