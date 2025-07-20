"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { RolesView } from "./components/view";

export default function RolesPage() {
  const { state, isMobile } = useSidebar();

  const isCollapsed = state === "collapsed";
  const isExpanded = state === "expanded";

  const getMaxWidth = () => {
    if (isMobile) {
      return "calc(100vw - 2rem)";
    }
    if (isCollapsed) {
      return "calc(100vw - var(--sidebar-width-icon) - 1rem)";
    }
    return "calc(100vw - var(--sidebar-width) - 1rem)";
  };

  const getPadding = () => {
    if (isMobile) {
      return "py-4 px-4";
    }
    if (isCollapsed) {
      return "py-6 px-8";
    }
    return "py-6 px-6";
  };

  const getContainerClasses = () => {
    const baseClasses =
      "w-full overflow-x-auto transition-all duration-200 ease-linear";
    const stateClasses = isCollapsed ? "xl:px-12" : "lg:px-6";

    const shadowClasses =
      isExpanded && !isMobile ? "md:peer-data-[variant=inset]:shadow-sm" : "";

    return `${baseClasses} ${getPadding()} ${stateClasses} ${shadowClasses}`;
  };

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
      <div className="min-h-screen flex flex-col w-full">
        <div
          className={getContainerClasses()}
          style={{
            maxWidth: getMaxWidth(),
          }}
        >
          <div
            className={`
              transition-all duration-200 ease-linear
              ${isCollapsed ? "max-w-full space-y-8" : "max-w-full space-y-6"}
              ${isExpanded ? "lg:max-w-none" : ""}
            `}
          >
            <RolesView />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
