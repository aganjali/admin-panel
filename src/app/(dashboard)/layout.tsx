import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "./components/header";
import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard perms={{ list: [perms.adminPanel.view], type: "single" }}>
      <AppSidebar variant="inset">
        <SidebarInset variant="sticky-header">
          <DashboardHeader />
          {children}
        </SidebarInset>
      </AppSidebar>
    </AuthGuard>
  );
}
