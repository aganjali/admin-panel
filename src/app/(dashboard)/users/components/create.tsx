"use client";

import type React from "react";
import { useState, useCallback } from "react";
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
import { Upload, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersApi } from "@/lib/api/users";
import type { CreateOrUpdateUserInput, UserEditDto } from "@/types";
import Loading from "@/components/loading";

interface FormData {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  organizationUnits: number[];
  setRandomPassword: boolean;
  changePasswordOnLogin: boolean;
  sendActivationEmail: boolean;
  active: boolean;
  lockoutEnabled: boolean;
  twoFactorEnabled: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  surname: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "",
  organizationUnits: [],
  setRandomPassword: false,
  changePasswordOnLogin: false,
  sendActivationEmail: false,
  active: true,
  lockoutEnabled: false,
  twoFactorEnabled: false,
  showPassword: false,
  showConfirmPassword: false,
};

export function CreateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createUser = useMutation({
    mutationFn: (input: CreateOrUpdateUserInput) =>
      usersApi.createOrUpdateUser(input).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
      router.push("/users");
    },
    onError: (error) => {
      console.error("Create user error:", error);
      toast.error("Failed to create user");
    },
  });

  const [avatarUrl, setAvatarUrl] = useState("");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | boolean | number[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAvatarUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size must be less than 5MB");
          return;
        }

        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }

        const url = URL.createObjectURL(file);
        setAvatarUrl(url);

        return () => URL.revokeObjectURL(url);
      }
    },
    []
  );

  const togglePasswordVisibility = useCallback(() => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.surname.trim() ||
      !formData.email.trim() ||
      !formData.username.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.setRandomPassword) {
      if (!formData.password.trim()) {
        toast.error("Password is required when not using random password");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
    }

    const userEditDto: UserEditDto = {
      name: formData.firstName.trim(),
      surname: formData.surname.trim(),
      userName: formData.username.trim(),
      emailAddress: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim() || null,
      password: formData.setRandomPassword
        ? null
        : formData.password.trim() || null,
      isActive: formData.active,
      shouldChangePasswordOnNextLogin: formData.changePasswordOnLogin,
      isTwoFactorEnabled: formData.twoFactorEnabled,
      isLockoutEnabled: formData.lockoutEnabled,
    };

    const input: CreateOrUpdateUserInput = {
      user: userEditDto,
      assignedRoleNames: formData.role ? [formData.role] : [],
      sendActivationEmail: formData.sendActivationEmail,
      setRandomPassword: formData.setRandomPassword,
      organizationUnits: formData.organizationUnits,
    };

    try {
      await createUser.mutateAsync(input);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleCancel = useCallback(() => {
    router.push("/users");
  }, [router]);

  if (createUser.isPending) {
    return (
      <Loading
        title="Creating User"
        desc="Please wait while we create the user account..."
      />
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New User</CardTitle>
          <CardDescription>
            Fill in the details below to create a new user account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
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
                    maxLength={64}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Surname *</Label>
                  <Input
                    id="surname"
                    value={formData.surname}
                    onChange={(e) =>
                      handleInputChange("surname", e.target.value)
                    }
                    placeholder="Enter surname"
                    required
                    maxLength={64}
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
                    maxLength={256}
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
                    maxLength={24}
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
                    maxLength={256}
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
            </div>

            {!formData.setRandomPassword && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={formData.showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Enter password"
                      required={!formData.setRandomPassword}
                      maxLength={32}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {formData.showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={formData.showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm password"
                      required={!formData.setRandomPassword}
                      maxLength={32}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {formData.showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">User Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="setRandomPassword"
                    checked={formData.setRandomPassword}
                    onCheckedChange={(checked) => {
                      handleInputChange(
                        "setRandomPassword",
                        checked as boolean
                      );
                      if (checked) {
                        handleInputChange("password", "");
                        handleInputChange("confirmPassword", "");
                      }
                    }}
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
                    Change password on next login
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendActivationEmail"
                    checked={formData.sendActivationEmail}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "sendActivationEmail",
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor="sendActivationEmail"
                    className="text-sm font-normal"
                  >
                    Send activation email
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
                    User active
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="twoFactorEnabled"
                    checked={formData.twoFactorEnabled}
                    onCheckedChange={(checked) =>
                      handleInputChange("twoFactorEnabled", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="twoFactorEnabled"
                    className="text-sm font-normal"
                  >
                    Two-factor authentication
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={createUser.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createUser.isPending}
                className="min-w-[120px]"
              >
                {createUser.isPending ? "Creating..." : "Create User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
