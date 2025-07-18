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
import { RoleListDto } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

interface RoleEditSheetProps {
  role: RoleListDto | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (roleId: number, newName: string) => void;
}

export function RoleEditSheet({
  role,
  isOpen,
  onOpenChange,
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
      onOpenChange(false);
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
          </form>
        </div>
        <SheetFooter>
          <Button form="edit-role-form" type="submit">
            Submit
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel{" "}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
