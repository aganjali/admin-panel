"use client";

import { NewPasswordForm } from "./components/new-password";
import { VerifyOtpForm } from "./components/verify-otp";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="w-full max-w-xs space-y-6">
      {isVerified ? (
        <NewPasswordForm />
      ) : (
        <VerifyOtpForm onDone={() => setIsVerified(true)} />
      )}
    </div>
  );
}
