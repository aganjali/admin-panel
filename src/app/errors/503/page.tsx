"use client";

import { ShieldX, Home, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthGuard } from "@/components/guards/auth-gurad";

export default function AccessDenied() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <AuthGuard useReturn="next">
      <div className="w-full max-w-md space-y-6">
        {/* Main Error Card */}
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <ShieldX className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-destructive">
                Access Denied
              </CardTitle>
              <CardDescription className="text-base">
                {"You don't have permission to access this resource"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertDescription>
                This page is restricted. Please contact your administrator if
                you believe you should have access to this content.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleGoBack}
                variant="default"
                className="w-full"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" asChild>
                  <Link href={"/"}>
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </Button>

                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:support@company.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Support
                  </a>
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>Error Code: 403</p>
              <p>If you need access, please contact your administrator</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
