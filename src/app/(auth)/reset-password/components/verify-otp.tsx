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

const OTPSchema = z.object({
  pin: z.string().regex(/^\d{6}$/, {
    message: "Code must be exactly 6 digits.",
  }),
});

interface Props {
  onDone: () => void;
}

export function VerifyOtpForm({ onDone }: Props) {
  const [expired, setExpired] = useState(false);
  const [expiration, setExpiration] = useState(() =>
    new Date(new Date().getTime() + 120000).toISOString()
  );
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

  function onSubmit(_: z.infer<typeof OTPSchema>) {
    onDone();
  }

  return (
    <>
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
        <div className="text-center text-sm">
          {expired ? (
            <p className="text-muted-foreground">
              Time remaining:{" "}
              <Timer expiration={expiration} onDone={() => setExpired(true)} />
            </p>
          ) : (
            <button
              type="button"
              className="text-primary"
              onClick={() => {
                setExpiration(
                  new Date(new Date().getTime() + 120000).toISOString()
                );
                setExpired(false);
              }}
            >
              <span>{"Didn't receive the code?"} </span>
              <span className="hover:underline underline-offset-4">Resend</span>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
