import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "./components/header";
import { ProtectedRoute } from "./components/protected-route";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppSidebar variant="inset">
      <SidebarInset variant="sticky-header">
        <DashboardHeader />
        {children}
      </SidebarInset>
    </AppSidebar>
  );
}
