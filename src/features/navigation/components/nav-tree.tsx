"use client";

import * as React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { type TreeNode } from "../data/tree-data";

interface NavTreeProps {
  nodes: TreeNode[];
  title?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level?: number;
}

function CollapsibleSubMenu({
  isExpanded,
  children,
  className,
}: {
  isExpanded: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLUListElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;

    // Measure the full height of the content when expanded.
    const contentHeight = ref.current.scrollHeight;

    if (isExpanded) {
      setHeight(contentHeight);
    } else {
      // Collapse to 0 for the closing animation.
      setHeight(0);
    }
  }, [isExpanded, children]);

  // Update height on window resize so the animation stays accurate.
  React.useEffect(() => {
    if (!isExpanded) return;

    const handleResize = () => {
      if (ref.current) setHeight(ref.current.scrollHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  return (
    <ul
      ref={ref}
      style={{ maxHeight: height }}
      // Re-use the same base styles from SidebarMenuSub, plus animation tweaks.
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5 overflow-hidden group-data-[collapsible=icon]:hidden transition-[max-height] duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </ul>
  );
}

function TreeNodeItem({ node, level = 0 }: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.url ? pathname === node.url : false;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (node.url) {
      router.push(node.url);
    }
  };

  const Icon = node.icon;

  // For top-level items (level 0)
  if (level === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleClick}
          tooltip={state === "collapsed" ? node.name : undefined}
          className="group/item"
          isActive={isActive}
        >
          <Icon className="size-4" />
          <span>{node.name}</span>
          {hasChildren && (
            <IconChevronRight
              className={`ml-auto size-4 transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          )}
        </SidebarMenuButton>
        {hasChildren && (
          <CollapsibleSubMenu isExpanded={isExpanded}>
            {node.children!.map((child) => (
              <TreeNodeItem key={child.id} node={child} level={level + 1} />
            ))}
          </CollapsibleSubMenu>
        )}
      </SidebarMenuItem>
    );
  }

  // For nested items (level > 0)
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        onClick={hasChildren ? handleClick : undefined}
        className="group/subitem"
        asChild={!hasChildren}
        isActive={isActive}
      >
        {hasChildren ? (
          <div className="flex w-full items-center">
            <Icon className="mr-2 size-4" />
            <span className="flex-1">{node.name}</span>
            <IconChevronRight
              className={`size-4 transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <Link href={node.url || "#"} className="flex items-center">
            <Icon className="mr-2 size-4" />
            <span>{node.name}</span>
          </Link>
        )}
      </SidebarMenuSubButton>
      {hasChildren && (
        <CollapsibleSubMenu isExpanded={isExpanded} className="ml-4">
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} level={level + 1} />
          ))}
        </CollapsibleSubMenu>
      )}
    </SidebarMenuSubItem>
  );
}

export function NavTree({ nodes, title = "Documents" }: NavTreeProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {nodes.map((node) => (
            <TreeNodeItem key={node.id} node={node} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
