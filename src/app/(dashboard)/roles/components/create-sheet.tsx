"use client";

import type React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { IconShield } from "@tabler/icons-react";
import { useState, useEffect } from "react";

interface RoleCreateSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (newName: string) => void;
  isLoading?: boolean;
  onSetPermissionsClick: () => void;
}

export function RoleCreateSheet({
  isOpen,
  onOpenChange,
  onSave,
  isLoading = false,
  onSetPermissionsClick,
}: RoleCreateSheetProps) {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newName = formData.get("displayName") as string;
    if (newName) {
      onSave(newName);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="sm:max-w-sm"
      >
        <SheetHeader>
          <SheetTitle>Create New Role</SheetTitle>
          <SheetDescription>
            Enter the details for the new role below.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 text-sm">
          <form
            id="create-role-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="new-displayName">Role Name</Label>
              <Input
                id="new-displayName"
                required
                name="displayName"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Permissions</Label>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={onSetPermissionsClick}
              >
                <IconShield className="mr-2 h-4 w-4" />
                Set Permissions
              </Button>
            </div>
          </form>
        </div>
        <SheetFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="create-role-form" disabled={isLoading}>
            {isLoading ? "Creating..." : "Save Role"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
