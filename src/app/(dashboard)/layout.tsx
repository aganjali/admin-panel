import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "./components/header";

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
