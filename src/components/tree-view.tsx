"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  Users,
  User,
  Settings,
  Home,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: TreeNode[];
}

export type ExpansionMode = "collapsed" | "expanded" | "expand-selecteds";

export interface TreeViewProps {
  data: TreeNode[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  expansionMode?: ExpansionMode;
  className?: string;
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  onToggleExpanded: (id: string) => void;
  onToggleSelected: (id: string) => void;
  getNodeState: (node: TreeNode) => {
    isSelected: boolean;
    isIndeterminate: boolean;
    hasChildren: boolean;
  };
}

function TreeNodeComponent({
  node,
  level,
  selectedIds,
  expandedIds,
  onToggleExpanded,
  onToggleSelected,
  getNodeState,
}: TreeNodeProps) {
  const { isSelected, isIndeterminate, hasChildren } = getNodeState(node);
  const isExpanded = expandedIds.has(node.id);
  const IconComponent =
    node.icon || (hasChildren ? (isExpanded ? FolderOpen : Folder) : File);

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-1 px-2 hover:bg-accent hover:text-accent-foreground rounded-sm",
          "group cursor-pointer"
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onToggleExpanded(node.id)}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        ) : (
          <div className="w-4" />
        )}

        <Checkbox
          checked={isIndeterminate ? "indeterminate" : isSelected}
          onCheckedChange={() => onToggleSelected(node.id)}
          className="h-4 w-4"
        />

        <IconComponent className="h-4 w-4 text-muted-foreground" />

        <span className="text-sm select-none ">{node.label}</span>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggleExpanded={onToggleExpanded}
              onToggleSelected={onToggleSelected}
              getNodeState={getNodeState}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({
  data,
  selectedIds = [],
  onSelectionChange,
  expansionMode = "collapsed",
  className,
}: TreeViewProps) {
  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, TreeNode>();
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        map.set(node.id, node);
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(data);
    return map;
  }, [data]);

  const parentMap = useMemo(() => {
    const map = new Map<string, string>();
    const traverse = (nodes: TreeNode[], parentId?: string) => {
      nodes.forEach((node) => {
        if (parentId) {
          map.set(node.id, parentId);
        }
        if (node.children) {
          traverse(node.children, node.id);
        }
      });
    };
    traverse(data);
    return map;
  }, [data]);

  const getDescendants = useCallback(
    (nodeId: string): string[] => {
      const node = nodeMap.get(nodeId);
      if (!node?.children) return [];

      const descendants: string[] = [];
      const traverse = (children: TreeNode[]) => {
        children.forEach((child) => {
          descendants.push(child.id);
          if (child.children) {
            traverse(child.children);
          }
        });
      };
      traverse(node.children);
      return descendants;
    },
    [nodeMap]
  );

  const getAncestors = useCallback(
    (nodeId: string): string[] => {
      const ancestors: string[] = [];
      let currentId = nodeId;
      while (parentMap.has(currentId)) {
        const parentId = parentMap.get(currentId)!;
        ancestors.push(parentId);
        currentId = parentId;
      }
      return ancestors;
    },
    [parentMap]
  );

  const getInitialExpandedIds = useCallback(() => {
    const expandedIds = new Set<string>();

    if (expansionMode === "expanded") {
      nodeMap.forEach((node, id) => {
        if (node.children && node.children.length > 0) {
          expandedIds.add(id);
        }
      });
    } else if (expansionMode === "expand-selecteds") {
      selectedIds.forEach((selectedId) => {
        const ancestors = getAncestors(selectedId);
        ancestors.forEach((ancestorId) => {
          expandedIds.add(ancestorId);
        });
      });
    }

    return expandedIds;
  }, [expansionMode, selectedIds, nodeMap, getAncestors]);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    getInitialExpandedIds
  );

  React.useEffect(() => {
    if (expansionMode === "expand-selecteds") {
      setExpandedIds((prev) => {
        const newExpanded = new Set(prev);
        selectedIds.forEach((selectedId) => {
          const ancestors = getAncestors(selectedId);
          ancestors.forEach((ancestorId) => {
            newExpanded.add(ancestorId);
          });
        });
        return newExpanded;
      });
    }
  }, [selectedIds, expansionMode, getAncestors]);

  const handleToggleExpanded = useCallback((nodeId: string) => {
    setExpandedIds((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      return newExpanded;
    });
  }, []);

  const handleToggleSelected = useCallback(
    (nodeId: string) => {
      const newSelectedIds = new Set(selectedIds);
      const isCurrentlySelected = newSelectedIds.has(nodeId);

      if (isCurrentlySelected) {
        newSelectedIds.delete(nodeId);
        const descendants = getDescendants(nodeId);
        descendants.forEach((id) => newSelectedIds.delete(id));
      } else {
        newSelectedIds.add(nodeId);
        const descendants = getDescendants(nodeId);
        descendants.forEach((id) => newSelectedIds.add(id));
      }

      const updateParentStates = (childId: string) => {
        const parentId = parentMap.get(childId);
        if (!parentId) return;

        const parent = nodeMap.get(parentId);
        if (!parent?.children) return;

        const childrenIds = parent.children.map((child) => child.id);
        const selectedChildren = childrenIds.filter((id) =>
          newSelectedIds.has(id)
        );

        if (selectedChildren.length === 0) {
          newSelectedIds.delete(parentId);
        } else if (selectedChildren.length === childrenIds.length) {
          newSelectedIds.add(parentId);
        }

        updateParentStates(parentId);
      };

      updateParentStates(nodeId);

      onSelectionChange?.(Array.from(newSelectedIds));
    },
    [selectedIds, getDescendants, parentMap, nodeMap, onSelectionChange]
  );

  const getNodeState = useCallback(
    (node: TreeNode) => {
      const isSelected = selectedIdsSet.has(node.id);
      const hasChildren = Boolean(node.children && node.children.length > 0);

      let isIndeterminate = false;
      if (hasChildren && !isSelected) {
        // Check if some but not all children are selected
        const childrenIds = node.children!.map((child) => child.id);
        const selectedChildren = childrenIds.filter((id) =>
          selectedIdsSet.has(id)
        );
        const hasSelectedDescendants = childrenIds.some((childId) => {
          const descendants = getDescendants(childId);
          return descendants.some((id) => selectedIdsSet.has(id));
        });
        isIndeterminate = selectedChildren.length > 0 || hasSelectedDescendants;
      }

      return { isSelected, isIndeterminate, hasChildren };
    },
    [selectedIdsSet, getDescendants]
  );

  return (
    <div className={cn("w-full", className)}>
      {data.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
          selectedIds={selectedIdsSet}
          expandedIds={expandedIds}
          onToggleExpanded={handleToggleExpanded}
          onToggleSelected={handleToggleSelected}
          getNodeState={getNodeState}
        />
      ))}
    </div>
  );
}

export default function TreeViewDemo() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["2", "4"]);
  const [expansionMode, setExpansionMode] =
    useState<ExpansionMode>("expand-selecteds");

  const sampleData: TreeNode[] = [
    {
      id: "1",
      label: "Documents",
      icon: Folder,
      children: [
        {
          id: "2",
          label: "Projects",
          icon: Folder,
          children: [
            { id: "3", label: "Project A.pdf", icon: File },
            { id: "4", label: "Project B.docx", icon: File },
          ],
        },
        { id: "5", label: "Resume.pdf", icon: File },
      ],
    },
    {
      id: "6",
      label: "Team",
      icon: Users,
      children: [
        { id: "7", label: "John Doe", icon: User },
        { id: "8", label: "Jane Smith", icon: User },
        {
          id: "9",
          label: "Managers",
          icon: Users,
          children: [
            { id: "10", label: "Alice Johnson", icon: User },
            { id: "11", label: "Bob Wilson", icon: User },
          ],
        },
      ],
    },
    {
      id: "12",
      label: "Settings",
      icon: Settings,
      children: [
        { id: "13", label: "General", icon: Settings },
        { id: "14", label: "Security", icon: Settings },
      ],
    },
    { id: "15", label: "Home", icon: Home },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">TreeView Demo</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium">Expansion Mode:</label>
          <div className="flex gap-2">
            {(
              ["collapsed", "expanded", "expand-selecteds"] as ExpansionMode[]
            ).map((mode) => (
              <Button
                key={mode}
                variant={expansionMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setExpansionMode(mode)}
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Selected IDs:</label>
          <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
            {selectedIds.length > 0 ? selectedIds.join(", ") : "None"}
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <TreeView
          data={sampleData}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          expansionMode={expansionMode}
        />
      </div>

      <div className="space-y-2">
        <Button variant="outline" size="sm" onClick={() => setSelectedIds([])}>
          Clear Selection
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedIds(["1", "6", "12", "15"])}
        >
          Select Top Level
        </Button>
      </div>
    </div>
  );
}
