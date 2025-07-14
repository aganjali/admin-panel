"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";
import type { ApiError } from "@/lib/http";

const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotFormValues = z.infer<typeof ForgotPasswordSchema>;

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendResetCode = useMutation({
    mutationFn: (data: { emailAddress: string }) =>
      authApi.sendPasswordResetCode(data).fetch(),
    onError: (error: ApiError) => {
      console.error("Password reset error:", error);
      toast.error(
        error.message ?? "Failed to send reset code. Please try again."
      );
    },
    onSuccess: () => {
      toast.success(
        "Reset code sent! Check your email for the verification code."
      );
    },
  });

  function onSubmit(values: ForgotFormValues) {
    sendResetCode.mutate(
      { emailAddress: values.email },
      {
        onSuccess: () => {
          router.push(
            `/reset-password?email=${encodeURIComponent(values.email)}`
          );
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <div className="text-center text-sm">Forgot your password?</div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={sendResetCode.isPending}
            >
              {sendResetCode.isPending ? "Sending..." : "Request reset link"}
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid sm:grid-cols-1">
            <Button variant="outline" type="button" className="w-full" asChild>
              <Link href={"/login"}>Back To Login</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
