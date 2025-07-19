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
import type { RoleListDto } from "@/types/api/data-contracts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { IconLoader2, IconShield } from "@tabler/icons-react";

interface RoleEditSheetProps {
  role: RoleListDto | null;
  isOpen: boolean;
  isLoading: boolean;
  onSetPermissionsClick: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (roleId: number, newName: string) => void;
}

export function RoleEditSheet({
  role,
  isOpen,
  isLoading,
  onOpenChange,
  onSetPermissionsClick,
  onSave,
}: RoleEditSheetProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newName = formData.get("displayName") as string;
    if (role?.id && newName) {
      onSave(role.id, newName);
    }
  };

  if (!hasMounted) {
    return null;
  }

  if (!role) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="sm:max-w-sm"
      >
        <SheetHeader>
          <SheetTitle>Edit Role</SheetTitle>
          <SheetDescription>
            Make changes to the role here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 text-sm">
          <form
            id="edit-role-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="displayName" className="text-right">
                Role Name
              </Label>
              <Input
                id="displayName"
                name="displayName"
                defaultValue={role?.displayName ?? ""}
                className="col-span-2"
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
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button form="edit-role-form" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
