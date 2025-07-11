"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const NewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(32, { message: "Password cannot exceed 32 characters." })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must include at least one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function NewPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  function onSubmit(_: z.infer<typeof NewPasswordSchema>) {
    router.push("/");
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Set new password</h1>
        <p className="text-muted-foreground">
          Please choose a strong password and verify
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Set New Password</h1>
          <p className="text-muted-foreground">
            Please enter your new password.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Setting..." : "Set Password"}
        </Button>
      </form>
    </>
  );
}
