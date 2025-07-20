"use client";
import type React from "react";
import { AuthGuard } from "@/components/guards/auth-gurad";
import { perms } from "@/lib/perms";
import { CreateEditUser } from "../components/create-edit";
import { use } from "react";
import { notFound } from "next/navigation";

export default function EditUserPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = use(searchParams);
  if (!id || Number.isSafeInteger(Number(id))) notFound();

  return (
    <AuthGuard
      perms={{
        list: [
          perms.adminPanel.administration.view,
          perms.adminPanel.administration.users.create,
        ],
        type: "and",
      }}
    >
      <CreateEditUser userId={+id} />
    </AuthGuard>
  );
}
