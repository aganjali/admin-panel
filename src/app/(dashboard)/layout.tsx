import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "./components/header";
import { AuthGuard } from "@/components/guards/auth-gurad";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <AppSidebar variant="inset">
        <SidebarInset variant="sticky-header">
          <DashboardHeader />
          {children}
        </SidebarInset>
      </AppSidebar>
    </AuthGuard>
  );
}
