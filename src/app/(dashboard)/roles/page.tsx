import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { RolesView } from "./components/data-table/view";

export default function RolesPage() {
  return (
    <AuthGuard
      perms={{
        list: [
          perms.adminPanel.administration.view,
          perms.adminPanel.administration.roles.view,
        ],
        type: "and",
      }}
    >
      <div className="min-h-screen flex flex-col">
        <div className="mx-auto py-6 px-3">
          <RolesView />
        </div>
      </div>
    </AuthGuard>
  );
}
