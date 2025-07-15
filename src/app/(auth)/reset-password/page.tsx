"use client";

import { NewPasswordForm } from "./components/new-password";
import { VerifyOtpForm } from "./components/verify-otp";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface ResetData {
  email: string;
  resetCode: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [isVerified, setIsVerified] = useState(false);
  const [resetData, setResetData] = useState<ResetData>({
    email: email,
    resetCode: "",
  });

  const handleVerificationSuccess = (code: string) => {
    setResetData((prev) => ({ ...prev, resetCode: code }));
    setIsVerified(true);
  };

  return (
    <div className="w-full max-w-xs space-y-6">
      {isVerified ? (
        <NewPasswordForm resetData={resetData} />
      ) : (
        <VerifyOtpForm
          email={resetData.email}
          onDone={handleVerificationSuccess}
        />
      )}
    </div>
  );
}
