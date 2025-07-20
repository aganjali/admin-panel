"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconShield } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleApi } from "@/lib/api/role";
import type { CreateOrUpdateRoleInput } from "@/types/api/data-contracts";
import { useUI } from "@/services/managed-ui";
import Loading from "@/components/loading";

export function CreateRole() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, setModalView } = useUI();

  const createRole = useMutation({
    mutationFn: (input: CreateOrUpdateRoleInput) =>
      roleApi.createOrUpdateRole(input).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role created successfully");
      router.push("/dashboard/roles");
    },
    onError: () => toast.error("Failed to create role"),
  });

  const [formData, setFormData] = useState({
    displayName: "",
    permissions: [] as string[],
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSetPermissionsClick = () => {
    setModalView({
      name: "FILTER_PERMISSIONS",
      args: {
        initialPermissions: formData.permissions,
        onSave: (permissions: string[]) => {
          handleInputChange("permissions", permissions);
        },
      },
    });
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateOrUpdateRoleInput = {
      grantedPermissionNames: formData.permissions,
      role: {
        displayName: formData.displayName,
        isDefault: false,
      },
    };

    await createRole.mutateAsync(payload);
  };

  if (createRole.isPending) {
    return (
      <Loading
        title="Creating Role"
        desc="Please wait while we create the role..."
      />
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Role</CardTitle>
          <CardDescription>
            Enter the details for the new role below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Role Name *</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) =>
                    handleInputChange("displayName", e.target.value)
                  }
                  placeholder="Enter role name"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleSetPermissionsClick}
                >
                  <IconShield className="mr-2 h-4 w-4" />
                  Set Permissions
                  {formData.permissions.length > 0 && (
                    <span className="ml-auto text-sm text-muted-foreground">
                      ({formData.permissions.length} selected)
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/roles")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createRole.isPending}>
                {createRole.isPending ? "Creating..." : "Save Role"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
