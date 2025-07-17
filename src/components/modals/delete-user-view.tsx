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
import type { ModalView } from "@/services/managed-ui/context";
import { useUI } from "@/services/managed-ui";

interface DeleteUserViewProps {
  modalView: ModalView;
}

export const DeleteUserView: React.FC<DeleteUserViewProps> = ({
  modalView,
}) => {
  const { closeModal } = useUI();
  const [isLoading, setIsLoading] = useState(false);

  if (modalView.name !== "DELETE_USER") return null;

  const { userName, onConfirm } = modalView.args as {
    userId: number;
    userName?: string;
    onConfirm: () => Promise<void>;
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      closeModal();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent {...modalView.props}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Delete User
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete{" "}
          <span className="font-semibold">{userName || "this user"}</span>? This
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
          Delete User
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
