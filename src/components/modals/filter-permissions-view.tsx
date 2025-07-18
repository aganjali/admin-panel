"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useTransition,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Shield, Search } from "lucide-react";
import { toast } from "sonner";
import type { ModalView } from "@/services/managed-ui/context";
import { useUI } from "@/services/managed-ui";
import { TreeView, type TreeNode } from "@/components/tree-view";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { permissionsApi } from "@/lib/api/permissions";
import type { FlatPermissionWithLevelDto } from "@/types";

interface FilterPermissionsViewProps {
  modalView: ModalView;
}

export const FilterPermissionsView: React.FC<FilterPermissionsViewProps> = ({
  modalView,
}) => {
  const { closeModal } = useUI();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use nuqs for managing filter query parameters with debouncing
  const [permissionFilter, setPermissionFilter] = useQueryState("permissions", {
    serialize: (value: string[]) => value.join(","),
    parse: (value: string) => (value ? value.split(",") : []),
    shallow: true, // Prevent page refresh
    throttleMs: 300, // Debounce URL updates
    history: "replace", // Use replace instead of push to prevent navigation
  });

  const isPermissionsModal = modalView.name === "FILTER_PERMISSIONS";

  const { data, isLoading, error } = useQuery({
    queryKey: ["allPermissions"],
    queryFn: () => permissionsApi.getAllPermissions().fetch(),
    select: (res) => res.result,
    enabled: isPermissionsModal,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const filteredPermissions = useMemo(() => {
    if (!data?.items) return [];

    if (!searchQuery) return data.items;

    const query = searchQuery.toLowerCase();
    return data.items.filter((permission: FlatPermissionWithLevelDto) => {
      const displayName = permission.displayName || permission.name || "";
      return displayName.toLowerCase().includes(query);
    });
  }, [data?.items, searchQuery]);

  const treeData = useMemo<TreeNode[]>(() => {
    if (!filteredPermissions.length) return [];

    const permissionMap = new Map<string, TreeNode>();
    const rootNodes: TreeNode[] = [];

    filteredPermissions.forEach((permission: FlatPermissionWithLevelDto) => {
      const name = permission.name || "";
      const node: TreeNode = {
        id: name,
        label: permission.displayName || name,
        children: [],
      };
      permissionMap.set(name, node);
    });

    filteredPermissions.forEach((permission: FlatPermissionWithLevelDto) => {
      const node = permissionMap.get(permission.name || "");
      if (!node) return;

      if (permission.parentName && permissionMap.has(permission.parentName)) {
        const parent = permissionMap.get(permission.parentName)!;
        parent.children?.push(node);
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  }, [filteredPermissions]);

  useEffect(() => {
    if (
      permissionFilter &&
      Array.isArray(permissionFilter) &&
      permissionFilter.length > 0
    ) {
      setSelectedIds(permissionFilter);
    }
  }, [permissionFilter]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectionChange = useCallback(
    (newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
      startTransition(() => {
        setPermissionFilter(newSelectedIds);
      });
    },
    [setPermissionFilter]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout for debounced search
      searchTimeoutRef.current = setTimeout(() => {
        startTransition(() => {
          setSearchQuery(value);
        });
      }, 300);
    },
    []
  );

  const handleClose = useCallback(() => {
    // Reset search query when modal closes
    setSearchQuery("");

    // Clear any pending search timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    closeModal();
  }, [closeModal]);

  const handleReset = useCallback(() => {
    setSelectedIds([]);

    startTransition(() => {
      setPermissionFilter(null);
    });
  }, [setPermissionFilter]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load permissions");
    }
  }, [error]);

  if (!isPermissionsModal) return null;

  return (
    <DialogContent
      {...modalView.props}
      className="w-[700px] h-[600px] max-w-none max-h-none flex flex-col"
    >
      <DialogHeader className="flex-shrink-0">
        <DialogTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Filter Permissions
        </DialogTitle>
        <DialogDescription>Select permissions to filter by</DialogDescription>
      </DialogHeader>

      <div className="flex-1 flex flex-col space-y-4 min-h-0">
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search permissions..."
            onChange={handleSearchChange}
            className="pl-9 transition-all duration-200"
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 border rounded-md p-2 transition-opacity duration-200">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div
              className={`transition-opacity duration-200 ${
                isPending ? "opacity-70" : "opacity-100"
              }`}
            >
              <TreeView
                data={treeData}
                selectedIds={selectedIds}
                onSelectionChange={handleSelectionChange}
                expansionMode="expand-selecteds"
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="flex justify-between flex-shrink-0 mt-4">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isLoading}
          className="transition-all duration-200 hover:scale-105"
        >
          Reset
        </Button>
        <Button
          variant="outline"
          onClick={handleClose}
          className="transition-all duration-200 hover:scale-105"
        >
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
