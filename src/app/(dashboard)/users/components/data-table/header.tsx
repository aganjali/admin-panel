import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconUserPlus } from "@tabler/icons-react";

export function DataTableHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 lg:px-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage your users and their roles
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => router.push("/users/create-user")}
        >
          <IconUserPlus />
          <span className="hidden lg:inline">Create User</span>
        </Button>
      </div>
    </div>
  );
}
