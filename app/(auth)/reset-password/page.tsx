"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";

const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your code must be 6 digits.",
  }),
});

export default function ResetPasswordPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof OTPSchema>) {}

  return (
    <div className="w-full max-w-xs space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Enter Verification Code</h1>
        <p className="text-muted-foreground">
          A 6-digit code was sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Label htmlFor="pin">Verification Code</Label>

          <Controller
            control={control}
            name="pin"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.pin && (
            <p className="text-sm text-red-500">{errors.pin.message}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Please enter the code sent to your email address.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
}
