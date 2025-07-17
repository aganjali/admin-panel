import { GuestGuard } from "@/components/guards/guest-guard";
import AuthHeader from "./components/auth-header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GuestGuard>
      <main className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <AuthHeader />
          <div className="flex flex-1 items-center justify-center">
            {children}
          </div>
        </div>
        <div className="relative hidden lg:flex bg-black justify-center items-center">
          <video
            src="/Tokenise Video.webm"
            className="h-[70%] w-[70%] object-contain bg-black"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </main>
    </GuestGuard>
  );
}
