"use client";

import { Filter, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { useQueryStates, parseAsArrayOf, parseAsString } from "nuqs";

interface FilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleOptions: string[];
}

export function FilterSidebar({
  open,
  onOpenChange,
  roleOptions,
}: FilterSidebarProps) {
  const [urlParams, setUrlParams] = useQueryStates({
    roles: parseAsArrayOf(parseAsString).withDefault([]),
  });

  // Local selection state so filters apply only when button is pressed
  const [selectedRoles, setSelectedRoles] = useState<string[]>(urlParams.roles);

  // When dialog opens, sync local state with URL params
  useEffect(() => {
    if (open) {
      setSelectedRoles(urlParams.roles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const activeFiltersCount = selectedRoles.length;

  const handleRoleChange = (role: string, checked: boolean) => {
    setSelectedRoles((prev) =>
      checked ? [...prev, role] : prev.filter((r) => r !== role)
    );
  };

  const clearFilters = () => {
    setSelectedRoles([]);
  };

  const applyFilters = () => {
    setUrlParams({ roles: selectedRoles });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] p-4">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-400" />
            Advanced Filters
          </SheetTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {activeFiltersCount} active filters
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          )}
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
                <Shield className="w-5 h-5 text-blue-400" />
                <Label className="text-base font-semibold text-white">
                  Roles
                </Label>
                {urlParams.roles.length > 0 && (
                  <Badge className="bg-blue-600/20 text-blue-400 text-xs">
                    {urlParams.roles.length}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((role) => (
                  <div
                    key={role}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50"
                  >
                    <Checkbox
                      id={`role-${role}`}
                      checked={selectedRoles.includes(role)}
                      onCheckedChange={(checked) =>
                        handleRoleChange(role, checked as boolean)
                      }
                      className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor={`role-${role}`}
                      className="text-sm text-gray-300 cursor-pointer flex-1"
                    >
                      {role}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <Button
                onClick={applyFilters}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Filters
                {selectedRoles.length > 0 && (
                  <Badge className="ml-2 bg-blue-800 text-blue-100">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
