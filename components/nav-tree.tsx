"use client";

import * as React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type TreeNode } from "./tree-data";

interface NavTreeProps {
  nodes: TreeNode[];
  title?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  level?: number;
}

function TreeNodeItem({ node, level = 0 }: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { state } = useSidebar();
  const router = useRouter();
  const hasChildren = node.children && node.children.length > 0;

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
        {hasChildren && isExpanded && (
          <SidebarMenuSub>
            {node.children!.map((child) => (
              <TreeNodeItem key={child.id} node={child} level={level + 1} />
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  }

  // For nested items (level > 0)
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        onClick={handleClick}
        className="group/subitem"
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
        ) : (
          <a href={node.url} className="flex items-center">
            <Icon className="mr-2 size-4" />
            <span>{node.name}</span>
          </a>
        )}
      </SidebarMenuSubButton>
      {hasChildren && isExpanded && (
        <SidebarMenuSub className="ml-4">
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} level={level + 1} />
          ))}
        </SidebarMenuSub>
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
