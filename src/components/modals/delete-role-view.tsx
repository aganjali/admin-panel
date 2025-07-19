"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type {
  ModalView,
  DeleteRoleViewArgs,
} from "@/services/managed-ui/context";
import { useUI } from "@/services/managed-ui";

interface DeleteRoleViewProps {
  modalView: ModalView;
}

export const DeleteRoleView: React.FC<DeleteRoleViewProps> = ({
  modalView,
}) => {
  const { closeModal } = useUI();
  const [isLoading, setIsLoading] = useState(false);

  if (modalView.name !== "DELETE_ROLE") return null;

  const { roleName, onConfirm } = modalView.args as DeleteRoleViewArgs;

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      closeModal();
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent {...modalView.props}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Delete Role
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the role{" "}
          <span className="font-semibold">{roleName || "this role"}</span>? This
          action cannot be undone.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" onClick={closeModal} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Delete Role
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
