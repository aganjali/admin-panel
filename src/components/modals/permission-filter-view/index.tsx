"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import type {
  ModalView,
  PermissionsFilterViewArgs,
} from "@/services/managed-ui/context";
import { useUI } from "@/services/managed-ui";
import { usersApi } from "@/lib/api/users";
import { useQuery } from "@tanstack/react-query";
import { permissionsApi } from "@/lib/api/permissions";

import { PermissionFilterViewContent } from "./content";

interface PermissionFilterViewProps {
  modalView: ModalView;
}

function PermissionFilterViewLazy({ modalView }: PermissionFilterViewProps) {
  const args = modalView.args as PermissionsFilterViewArgs;
  const { userId = 0, selectedIds = null } = args;

  const { data: allPerms = null, isPending } = useQuery({
    queryKey: ["all-perms"],
    queryFn: () => permissionsApi.getAllPermissions().fetch(),
    select: (res) => res.result.items ?? [],
  });
  const { data, isPending: isPendingUser } = useQuery({
    queryKey: ["user-perms", userId],
    queryFn: () => usersApi.getUserPermissionsForEdit({ Id: userId }).fetch(),
    select: (res) => res.result,
    enabled: !!userId,
    refetchOnMount: true,
  });
  if (isPending || (isPendingUser && userId))
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  return (
    <PermissionFilterViewContent
      intialSelecteds={selectedIds ?? data?.grantedPermissionNames ?? []}
      perms={allPerms ?? []}
      modalView={modalView}
    />
  );
}
export const PermissionFilterView: React.FC<PermissionFilterViewProps> = ({
  modalView,
}) => {
  const { displayModal } = useUI();
  const open = displayModal && modalView.name === "PERMISSIONS_FILTER";
  const args = modalView.args as PermissionsFilterViewArgs;
  const { title, desc } = args;
  if (!open) return null;

  return (
    <DialogContent
      {...modalView.props}
      className="w-[700px] h-[600px] max-w-none max-h-none flex flex-col"
    >
      <DialogHeader className="flex-shrink-0">
        <DialogTitle className="flex items-center gap-2">{title}</DialogTitle>

        <DialogDescription>{desc}</DialogDescription>
      </DialogHeader>
      <PermissionFilterViewLazy modalView={modalView} />
    </DialogContent>
  );
};
