"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { Check, ChevronsUpDown, Upload, Info, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/users";
import {
  ApiResponse,
  CreateOrUpdateUserInput,
  ListResultDtoOfOrganizationUnitDto,
  ListResultDtoOfRoleListDto,
  OrganizationUnitDto,
  RoleListDto,
} from "@/types";
import { orgsApi } from "@/lib/api/orgs";
import { roleApi } from "@/lib/api/role";
import Loading from "@/components/loading";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/file-upload";
import { toast } from "sonner";
import { queryClient } from "@/lib/query";
import { notFound, useRouter } from "next/navigation";
import { TreeNode, TreeView } from "@/components/tree-view";

function buildOrgTree(orgs: OrganizationUnitDto[]): TreeNode[] {
  // Use a Map for efficient O(1) average time complexity lookups.
  const nodeMap = new Map<string, TreeNode>();

  // 1. First Pass: Create all nodes and store them in the map.
  // This ensures that we can reference any node by its 'name' (which becomes the 'id'),
  // regardless of the order in the input array.
  orgs.forEach((org) => {
    nodeMap.set((org.id ?? 0).toString(), {
      id: (org.id ?? 0).toString(),
      label: org.displayName ?? org.code ?? "",
      children: [], // Initialize children array for every node.
    });
  });

  const roots: TreeNode[] = [];

  // 2. Second Pass: Link nodes into a hierarchy.
  // We iterate through the original permissions again to establish parent-child relationships.
  orgs.forEach((org) => {
    const node = nodeMap.get((org.id ?? 0).toString());
    if (!node) return; // Should not happen in a consistent dataset

    // If a permission has a valid parentName that exists in our map,
    // it's a child. We find the parent node and push this node into its 'children' array.
    if (org.parentId && nodeMap.has(org.parentId.toString())) {
      const parent = nodeMap.get(org.parentId.toString());
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    } else {
      // If parentName is null, undefined, or points to a non-existent parent,
      // we consider it a root node.
      roots.push(node);
    }
  });

  return roots;
}

const createUserSchema = z
  .object({
    user: z.object({
      id: z.number().optional(),
      name: z.string().min(1, "Name is required"),
      surname: z.string().min(1, "Surname is required"),
      emailAddress: z.string().email("Invalid email address"),
      userName: z.string().min(3, "Username must be at least 3 characters"),
      phoneNumber: z.string().optional(),
      isActive: z.boolean(),
      isLockoutEnabled: z.boolean(),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
      shouldChangePasswordOnNextLogin: z.boolean(),
    }),
    avatar: z.string().optional(),
    assignedRoleNames: z
      .array(z.string())
      .min(1, "Please select at least one user role"),

    setRandomPassword: z.boolean(),
    sendActivationEmail: z.boolean(),
    organizationUnits: z.array(z.number()),
  })
  .refine(
    (data) => {
      if (!data.setRandomPassword) {
        return data.user.password && data.user.password.length >= 8;
      }
      return true;
    },
    {
      message:
        "Password must be at least 8 characters when not using random password",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (!data.setRandomPassword) {
        return data.user.password === data.user.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

type CreateUserFormValues = z.infer<typeof createUserSchema>;

interface CreateEditUserPageProps {
  //   mode?: "create" | "edit";
  //
  userId?: number;
}
interface LazyProps {
  initialData?: Partial<CreateUserFormValues>;
  isSmtpEnabled?: boolean;
  userId?: number;
  orgs: OrganizationUnitDto[];
  roles: RoleListDto[];
}

function CreateEditUserLazy({
  orgs,
  roles,
  initialData,
  userId,
  isSmtpEnabled = true,
}: LazyProps) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const [avatarPreview] = useState<string | null>(initialData?.avatar || null);
  const [searchOrgQuery, setSearchOrgQuery] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const filteredOrgs = useMemo(
    () =>
      buildOrgTree(
        searchOrgQuery.trim()
          ? orgs.filter(
              (f) =>
                (f.code ?? "")
                  .toLowerCase()
                  .includes(searchOrgQuery.toLowerCase()) ||
                (f.displayName ?? "")
                  .toLowerCase()
                  .includes(searchOrgQuery.toLowerCase())
            )
          : orgs
      ),
    [searchOrgQuery, orgs]
  );

  const createUser = useMutation({
    mutationFn: (input: CreateOrUpdateUserInput) =>
      usersApi.createOrUpdateUser(input).fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
      if (userId)
        queryClient.resetQueries({ queryKey: ["user", userId], exact: true });
      //   queryClient.refetchQueries({ queryKey: ["users"], exact: false });
      toast.success("User created successfully");
      router.push("/users");
    },
    onError: (error) => {
      console.error("Create user error:", error);
      toast.error("Failed to create user");
    },
  });
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      assignedRoleNames: roles
        .filter((f) => f.isDefault)
        .map((m) => m.name ?? ""),
      organizationUnits: [],
      sendActivationEmail: false,
      setRandomPassword: true,
      ...initialData,
      user: {
        isActive: true,
        isLockoutEnabled: true,
        confirmPassword: "",
        password: "",
        emailAddress: "",
        name: "",
        surname: "",
        userName: "",
        phoneNumber: "",
        shouldChangePasswordOnNextLogin: false,
        ...initialData?.user,
      },
    },
  });

  const watchSetRandomPassword = form.watch("setRandomPassword");

  //   const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const result = reader.result as string;
  //         setAvatarPreview(result);
  //         // form.setValue("avatar", result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  const onFileValidate = useCallback((file: File): string | null => {
    // Validate max files
    //   if (files.length >= 1) {
    //     return "You can only upload up to 2 files";
    //   }

    // Validate file type (only images)
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }

    // Validate file size (max 2MB)
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`;
    }

    return null;
  }, []);

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  const onSubmit = (data: CreateUserFormValues) => {
    // Remove password fields if using random password
    if (data.setRandomPassword) {
      delete data.user.password;
      delete data.user.confirmPassword;
    }
    createUser.mutate(data);
    // Handle form submission here
  };

  console.log(form.formState.errors);
  const getInitials = (name: string, surname: string) => {
    return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>{!userId ? "Create New User" : "Edit User"}</CardTitle>
          <CardDescription>
            {!userId
              ? "Fill in the information below to create a new user account."
              : "Update the user information and settings below."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs
                defaultValue="user-info"
                className="w-full flex-col justify-start gap-6"
              >
                <TabsList
                  defaultValue={"user-info"}
                  className="grid w-full grid-cols-2   px-1 "
                >
                  <TabsTrigger value="user-info">User Information</TabsTrigger>
                  <TabsTrigger value="organization-units">
                    Organization Units
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user-info" className="space-y-6">
                  <div className="w-full justify-center flex">
                    <FileUpload
                      value={files}
                      onValueChange={(f) => setFiles(f.length ? [f[0]] : [])}
                      onFileValidate={onFileValidate}
                      onFileReject={onFileReject}
                      accept="image/*"
                      maxFiles={1}
                      className="w-full max-w-md"
                      multiple
                    >
                      <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={avatarPreview || ""} />
                            <AvatarFallback>
                              {form.watch("user.name") &&
                              form.watch("user.surname") ? (
                                getInitials(
                                  form.watch("user.name"),
                                  form.watch("user.surname")
                                )
                              ) : (
                                <Upload className="h-8 w-8" />
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-sm">
                            Drag & drop avatar here
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Or click to browse
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            Browse files
                          </Button>
                        </FileUploadTrigger>
                      </FileUploadDropzone>
                      <FileUploadList>
                        {files.length ? (
                          <FileUploadItem key={files[0].name} value={files[0]}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <X />
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ) : null}
                      </FileUploadList>
                    </FileUpload>
                  </div>
                  {/* Avatar Upload */}
                  {/* <FormField
                    control={form.control}
                    name="avatar"
                    render={({}) => (
                      <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={avatarPreview || ""} />
                              <AvatarFallback>
                                {form.watch("user.name") &&
                                form.watch("user.surname") ? (
                                  getInitials(
                                    form.watch("user.name"),
                                    form.watch("user.surname")
                                  )
                                ) : (
                                  <Upload className="h-8 w-8" />
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="hidden"
                                id="avatar-upload"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  document
                                    .getElementById("avatar-upload")
                                    ?.click()
                                }
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Avatar
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="user.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Surname */}
                    <FormField
                      control={form.control}
                      name="user.surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surname *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Email Address */}
                    <FormField
                      control={form.control}
                      name="user.emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Username */}
                    <FormField
                      control={form.control}
                      name="user.userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="user.phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter phone number"
                              //   value={value ?? ""}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* User Role - Multi Select */}
                    <FormField
                      control={form.control}
                      name="assignedRoleNames"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>User Roles *</FormLabel>
                          <Popover open={roleOpen} onOpenChange={setRoleOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "justify-between",
                                    field.value.length === 0 &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  {field.value.length === 0
                                    ? "Select roles"
                                    : field.value.length === 1
                                    ? roles.find(
                                        (role) => role.name === field.value[0]
                                      )?.displayName
                                    : `${field.value.length} roles selected`}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search roles..." />
                                <CommandList>
                                  <CommandEmpty>No role found.</CommandEmpty>
                                  <CommandGroup>
                                    {roles.map((role) => (
                                      <CommandItem
                                        value={role.displayName ?? ""}
                                        key={role.name}
                                        onSelect={() => {
                                          const currentValues =
                                            field.value || [];
                                          const isSelected =
                                            !!role.name &&
                                            currentValues.includes(role.name);

                                          if (isSelected) {
                                            // Remove role
                                            form.setValue(
                                              "assignedRoleNames",
                                              currentValues.filter(
                                                (val) => val !== role.name
                                              )
                                            );
                                          } else if (role.name) {
                                            // Add role
                                            form.setValue("assignedRoleNames", [
                                              ...currentValues,
                                              role.name,
                                            ]);
                                          }
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value?.includes(
                                              role.name ?? ""
                                            )
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {role.displayName}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          {field.value.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {field.value.map((roleValue) => {
                                const role = roles.find(
                                  (r) => r.name === roleValue
                                );
                                return (
                                  <div
                                    key={roleValue}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                                  >
                                    {role?.displayName}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        form.setValue(
                                          "assignedRoleNames",
                                          field.value.filter(
                                            (val) => val !== roleValue
                                          )
                                        );
                                      }}
                                      className="ml-1 flex justify-center items-center hover:bg-primary/20 shrink-0 w-3 h-3  rounded-full p-0.5"
                                    >
                                      <span>×</span>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password Section */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="setRandomPassword"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Set random password</FormLabel>
                            <FormDescription>
                              Generate a random password for the user
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {!watchSetRandomPassword && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <FormField
                          control={form.control}
                          name="user.password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password *</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Enter password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="user.confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password *</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Confirm password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="user.shouldChangePasswordOnNextLogin"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Should change password on next login
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sendActivationEmail"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!isSmtpEnabled}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Send activation email</FormLabel>
                            {!isSmtpEnabled ? (
                              <FormDescription>
                                SMTP settings not provided, Please provided SMTP
                                settings.
                              </FormDescription>
                            ) : null}
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="user.isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Active</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="user.isLockoutEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <div className="flex items-center gap-2">
                              <FormLabel>Lockout enabled</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      User is locked for a while after a certain
                                      amount of failed login attempts.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="organization-units" className="space-y-6">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      Organization Units
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select user organization units
                    </p>
                    <div className="flex-1 flex flex-col space-y-4 ">
                      <div className="relative flex-shrink-0">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search permissions..."
                          value={searchOrgQuery}
                          onChange={(e) => setSearchOrgQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto  border rounded-md p-2">
                        {/* <TreeView
                                  data={filteredOrgs}
                                  selectedIds={field.value.map(String)}
                                  onSelectionChange={(v) =>
                                    field.onChange(v.map(Number))
                                  }
                                  expansionMode="expand-selecteds"
                                  className="w-full"
                                /> */}
                        <FormField
                          control={form.control}
                          name="organizationUnits"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TreeView
                                  data={filteredOrgs}
                                  selectedIds={field.value.map(String)}
                                  onSelectionChange={(v) =>
                                    field.onChange(v.map(Number))
                                  }
                                  expansionMode="expand-selecteds"
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  disabled={createUser.isPending}
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createUser.isPending}>
                  {!userId
                    ? createUser.isPending
                      ? "Creating user..."
                      : "Create User"
                    : createUser.isPending
                    ? "Updating user..."
                    : "Update User"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export function CreateEditUser({ userId }: CreateEditUserPageProps) {
  const [
    { data: orgsData, isPending: orgsPending },
    { data: rolesData, isPending: rolesPending },
  ] = useQueries({
    queries: [
      {
        queryKey: ["orgs"],
        queryFn: orgsApi.getOrgs().fetch,
        staleTime: Number.POSITIVE_INFINITY,
        select: (s) =>
          (s as ApiResponse<ListResultDtoOfOrganizationUnitDto>).result.items ??
          [],
      },
      {
        queryKey: ["roles"],
        queryFn: roleApi.getRoles().fetch,
        staleTime: Number.POSITIVE_INFINITY,
        select: (s) =>
          (s as ApiResponse<ListResultDtoOfRoleListDto>).result.items ?? [],
      },
    ],
    subscribed: true,
  });
  const { data, isPending, error } = useQuery({
    queryKey: ["user", userId],
    enabled: !!userId,
    queryFn: usersApi.getUserForEdit({ Id: userId }).fetch,
    select: (s) =>
      ({
        ...s.result,
        assignedRoleNames:
          s.result.roles
            ?.filter((f) => f.isAssigned)
            .map((m) => m.roleName ?? "") ?? [],
        organizationUnits:
          s.result.allOrganizationUnits
            ?.filter((f) =>
              s.result.memberedOrganizationUnits?.includes(f.code ?? "")
            )
            .map((m) => m.id ?? 0) ?? [],
        s: s.result.isSMTPSettingsProvided,
        allOrgs: s.result.allOrganizationUnits ?? [],
        roles: s.result.roles ?? [],
      } as Partial<CreateUserFormValues> & {
        isSMTPSettingsProvided: boolean;
      }),
  });

  if ((isPending && !!userId) || orgsPending || rolesPending) {
    return <Loading title="Loading" desc="Please wait ..." />;
  }
  if (error) notFound();

  return (
    <CreateEditUserLazy
      userId={userId}
      orgs={orgsData ?? []}
      roles={rolesData ?? []}
      initialData={data}
      isSmtpEnabled={data?.isSMTPSettingsProvided}
    />
  );
}
