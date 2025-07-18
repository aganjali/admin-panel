import Loading from "@/components/loading";

export default function LoadingLayout() {
  return (
    <div className="min-h-screen  p-4 md:p-6 ">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto space-y-8">
        <Loading desc="Please wait" title="Loading dashboard" />
      </div>
    </div>
  );
}
