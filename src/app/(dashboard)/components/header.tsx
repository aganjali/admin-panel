"use client";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { NotificationPanel } from "@/components/notification-panel";
import { SettingsDrawer } from "@/components/settings/settings-drawer";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="sticky  backdrop-blur-2xl z-50 top-0 left-0 overflow-hidden flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="relative flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumb />
        {/* <h1 className="text-base font-medium">Documents</h1> */}
        <div className="ml-auto flex items-center gap-2">
          {/* <LanguageSwitch /> */}
          <NotificationPanel />
          {/* <ThemeToggle /> */}
          <SettingsDrawer />
        </div>
      </div>
    </header>
  );
}
