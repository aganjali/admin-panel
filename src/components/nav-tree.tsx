"use client";

import { IconChevronRight } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";

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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { type TreeNode } from "./tree-data";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface NavTreeProps {
  nodes: TreeNode[];
  title?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level?: number;
}

function isNodeOrChildActive(node: TreeNode, pathname: string): boolean {
  if (node.url && pathname === node.url) {
    return true;
  }

  if (node.children) {
    return node.children.some((child) => isNodeOrChildActive(child, pathname));
  }

  return false;
}

// Helper function to check if a node should be expanded (has active children)
function shouldNodeBeExpanded(node: TreeNode, pathname: string): boolean {
  if (!node.children) return false;

  return node.children.some((child) => isNodeOrChildActive(child, pathname));
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
  const ref = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
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
  useEffect(() => {
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
  const pathname = usePathname();
  const { state } = useSidebar();
  const router = useRouter();
  const hasChildren = node.children && node.children.length > 0;

  const shouldExpand = shouldNodeBeExpanded(node, pathname);
  const [isExpanded, setIsExpanded] = useState(shouldExpand);

  useEffect(() => {
    if (shouldExpand) {
      setIsExpanded(true);
    }
  }, [shouldExpand]);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (node.url) {
      router.push(node.url);
    }
  };

  const Icon = node.icon;

  if (level === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleClick}
          tooltip={state === "collapsed" ? node.name : undefined}
        >
          <Icon className="size-4" />
          <span>{node.name}</span>
          {hasChildren && (
            <IconChevronRight
              className={cn(
                "ml-auto size-4 transition-transform duration-200",
                { "rotate-90": isExpanded }
              )}
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

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        onClick={handleClick}
        className={cn(
          !hasChildren &&
            node.url &&
            pathname === node.url &&
            "bg-sidebar-accent text-sidebar-accent-foreground"
        )}
        data-active={!hasChildren && node.url && pathname === node.url}
        asChild={!hasChildren}
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
        ) : node.url ? (
          <Link href={node.url} className="flex items-center">
            <Icon className="mr-2 size-4" />
            <span>{node.name}</span>
          </Link>
        ) : (
          <a className="flex items-center">
            <Icon className="mr-2 size-4" />
            <span>{node.name}</span>
          </a>
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

export function NavTree({ nodes, title = "" }: NavTreeProps) {
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
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
