"use client";

import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { UsersView } from "./components/view";
import { useSidebar } from "@/components/ui/sidebar";

export default function UsersPage() {
  const { state, isMobile } = useSidebar();

  const isCollapsed = state === "collapsed";
  const isExpanded = state === "expanded";

  // Dynamic width calculations based on sidebar state
  const getMaxWidth = () => {
    if (isMobile) {
      return "calc(100vw - 2rem)"; // Mobile: just account for padding
    }
    if (isCollapsed) {
      return "calc(100vw - var(--sidebar-width-icon) - 1rem)"; // Icon sidebar + minimal padding
    }
    return "calc(100vw - var(--sidebar-width) - 1rem)"; // Full sidebar + padding
  };

  // Dynamic padding based on sidebar state and screen size
  const getPadding = () => {
    if (isMobile) {
      return "py-4 px-4"; // Compact padding on mobile
    }
    if (isCollapsed) {
      return "py-6 px-8"; // More generous padding when sidebar is collapsed
    }
    return "py-6 px-6"; // Standard padding when sidebar is expanded
  };

  // Container classes for different states
  const getContainerClasses = () => {
    const baseClasses =
      "w-full overflow-x-auto transition-all duration-200 ease-linear";
    const stateClasses = isCollapsed
      ? "xl:px-12" // Extra padding on large screens when collapsed
      : "lg:px-6"; // Standard padding when expanded

    const shadowClasses =
      isExpanded && !isMobile ? "md:peer-data-[variant=inset]:shadow-sm" : "";

    return `${baseClasses} ${getPadding()} ${stateClasses} ${shadowClasses}`;
  };

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
            <UsersView />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
