import Footer from "./components/footer";
import Header from "./components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-svh ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Header />
        <div className="flex flex-1 items-center justify-center pt-12">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
