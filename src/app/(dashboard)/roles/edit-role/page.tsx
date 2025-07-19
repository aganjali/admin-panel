import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { EditRole } from "../components/edit";

export default function EditRolePage() {
  return (
    <AuthGuard
      perms={{
        list: [
          perms.adminPanel.administration.view,
          perms.adminPanel.administration.roles.edit,
        ],
        type: "and",
      }}
    >
      <EditRole />
    </AuthGuard>
  );
}
