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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/users";
import type { CreateOrUpdateUserInput } from "@/types";
import { toast } from "sonner";

export default function EditUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (!userId) {
      router.push("/users");
    }
  }, [userId, router]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersApi.getUserForEdit({ Id: Number(userId) }).fetch(),
    enabled: !!userId,
  });

  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: (input: CreateOrUpdateUserInput) =>
      usersApi.createOrUpdateUser(input).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated");
      router.push("/dashboard/users");
    },
    onError: () => toast.error("Failed to update user"),
  });

  const [avatarUrl, setAvatarUrl] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phoneNumber: "",
    username: "",
    role: "",
    setRandomPassword: false,
    changePasswordOnLogin: false,
    smtpSettingsNotProvided: false,
    active: true,
    lockoutEnabled: false,
  });

  useEffect(() => {
    if (userData?.result?.user) {
      const user = userData.result.user;
      setFormData({
        firstName: user.name ?? "",
        surname: user.surname ?? "",
        email: user.emailAddress ?? "",
        phoneNumber: user.phoneNumber ?? "",
        username: user.userName ?? "",
        role: userData.result.roles?.find((r) => r.isAssigned)?.roleName ?? "",
        setRandomPassword: false,
        changePasswordOnLogin: false,
        smtpSettingsNotProvided: false,
        active: user.isActive ?? true,
        lockoutEnabled: false,
      });
    }
  }, [userData]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    await updateUser.mutateAsync({
      user: {
        id: Number(userId),
        name: formData.firstName,
        surname: formData.surname,
        userName: formData.username,
        emailAddress: formData.email,
        phoneNumber: formData.phoneNumber,
        isActive: formData.active,
        shouldChangePasswordOnNextLogin: formData.changePasswordOnLogin,
      },
      assignedRoleNames: [formData.role],
      sendActivationEmail: false,
      setRandomPassword: formData.setRandomPassword,
    });
    router.push("/users");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit User</CardTitle>
          <CardDescription>
            Update the details below to edit the user account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={avatarUrl || "/placeholder.svg"}
                  alt="Profile avatar"
                />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <Label htmlFor="avatar-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Avatar
                    </span>
                  </Button>
                </Label>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="surname">Surname *</Label>
                <Input
                  id="surname"
                  value={formData.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  placeholder="Enter surname"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Checkboxes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">User Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="setRandomPassword"
                    checked={formData.setRandomPassword}
                    onCheckedChange={(checked) =>
                      handleInputChange("setRandomPassword", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="setRandomPassword"
                    className="text-sm font-normal"
                  >
                    Set random password
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="changePasswordOnLogin"
                    checked={formData.changePasswordOnLogin}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "changePasswordOnLogin",
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor="changePasswordOnLogin"
                    className="text-sm font-normal"
                  >
                    Should change password on next login
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smtpSettingsNotProvided"
                    checked={formData.smtpSettingsNotProvided}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "smtpSettingsNotProvided",
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor="smtpSettingsNotProvided"
                    className="text-sm font-normal"
                  >
                    SMTP settings not provided
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      handleInputChange("active", checked as boolean)
                    }
                  />
                  <Label htmlFor="active" className="text-sm font-normal">
                    Active
                  </Label>
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <Checkbox
                    id="lockoutEnabled"
                    checked={formData.lockoutEnabled}
                    onCheckedChange={(checked) =>
                      handleInputChange("lockoutEnabled", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="lockoutEnabled"
                    className="text-sm font-normal"
                  >
                    Lockout enabled
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Edit User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
