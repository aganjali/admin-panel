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
      <div className="min-h-screen flex flex-col">
        <div className="mx-auto py-6 px-3">
          <UsersView />
        </div>
      </div>
    </AuthGuard>
  );
}
