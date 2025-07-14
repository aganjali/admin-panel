"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import Timer from "@/components/ui/timer";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";
import type { ApiError } from "@/lib/http";

const OTPSchema = z.object({
  pin: z.string().regex(/^\d{6}$/, {
    message: "Code must be exactly 6 digits.",
  }),
});

interface Props {
  email: string;
  onDone: (code: string) => void;
}

export function VerifyOtpForm({ email, onDone }: Props) {
  const [expired, setExpired] = useState(false);
  const [expiration, setExpiration] = useState(() =>
    new Date(new Date().getTime() + 120000).toISOString()
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  const resendCode = useMutation({
    mutationFn: (data: { emailAddress: string }) =>
      authApi.sendPasswordResetCode(data).fetch(),
    onError: (error: ApiError) => {
      console.error("Resend code error:", error);
      toast.error(error.message ?? "Failed to resend code. Please try again.");
    },
    onSuccess: () => {
      toast.success(
        "Reset code sent! Check your email for the verification code."
      );
      setExpiration(new Date(new Date().getTime() + 120000).toISOString());
      setExpired(false);
    },
  });

  function onSubmit(values: z.infer<typeof OTPSchema>) {
    // For now, we'll assume the code is valid and pass it to the parent
    // In a real implementation, you might want to verify the code against the server
    onDone(values.pin);
  }

  const handleResend = () => {
    if (email) {
      resendCode.mutate({ emailAddress: email });
    } else {
      toast.error("Email address is required to resend code.");
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Enter Verification Code</h1>
        <p className="text-muted-foreground">
          A 6-digit code was sent to {email ? email : "your email"}.
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

        <Button type="submit" className="w-full">
          Verify Code
        </Button>
        <div className="text-center text-sm">
          {!expired ? (
            <p className="text-muted-foreground">
              Time remaining:{" "}
              <Timer expiration={expiration} onDone={() => setExpired(true)} />
            </p>
          ) : (
            <button
              type="button"
              className="text-primary"
              onClick={handleResend}
              disabled={resendCode.isPending}
            >
              <span>{"Didn't receive the code?"} </span>
              <span className="hover:underline underline-offset-4">
                {resendCode.isPending ? "Sending..." : "Resend"}
              </span>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
