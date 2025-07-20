"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { IconShield, IconLoader2 } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleApi } from "@/lib/api/role";
import type { CreateOrUpdateRoleInput } from "@/types/api/data-contracts";
import { useUI } from "@/services/managed-ui";
import Loading from "@/components/loading";

export function EditRole() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleId = searchParams.get("id");
  const queryClient = useQueryClient();
  const { openModal, setModalView } = useUI();

  useEffect(() => {
    if (!roleId) {
      router.push("/dashboard/roles");
    }
  }, [roleId, router]);

  const { data: roleForEditData, isLoading } = useQuery({
    queryKey: ["roleForEdit", roleId],
    queryFn: () => roleApi.getRoleForEdit({ Id: Number(roleId) }).fetch(),
    enabled: !!roleId,
  });

  const updateRole = useMutation({
    mutationFn: (input: CreateOrUpdateRoleInput) =>
      roleApi.createOrUpdateRole(input).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role updated successfully");
      router.push("/dashboard/roles");
    },
    onError: () => toast.error("Failed to update role"),
  });

  const [formData, setFormData] = useState({
    displayName: "",
    permissions: [] as string[],
    isDefault: false,
  });

  useEffect(() => {
    if (roleForEditData?.result) {
      const role = roleForEditData.result.role;
      const permissions = roleForEditData.result.grantedPermissionNames ?? [];

      setFormData({
        displayName: role?.displayName ?? "",
        permissions: permissions,
        isDefault: role?.isDefault ?? false,
      });
    }
  }, [roleForEditData]);

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
    if (!roleId) return;

    const payload: CreateOrUpdateRoleInput = {
      grantedPermissionNames: formData.permissions,
      role: {
        id: Number(roleId),
        displayName: formData.displayName,
        isDefault: formData.isDefault,
      },
    };

    await updateRole.mutateAsync(payload);
  };

  if (isLoading)
    return <Loading title="Loading Role" desc="Fetching role details..." />;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Role</CardTitle>
          <CardDescription>
            Make changes to the role here. Click save when you're done.
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
                disabled={updateRole.isPending}
                onClick={() => router.push("/dashboard/roles")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateRole.isPending}>
                {updateRole.isPending ? (
                  <>
                    <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
