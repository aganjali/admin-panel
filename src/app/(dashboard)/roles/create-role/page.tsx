import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { CreateRole } from "../components/create";

export default function CreateRolePage() {
  return (
    <AuthGuard
      perms={{
        list: [
          perms.adminPanel.administration.view,
          perms.adminPanel.administration.roles.create,
        ],
        type: "and",
      }}
    >
      <CreateRole />
    </AuthGuard>
  );
}
