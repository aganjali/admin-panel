import { getCopyRightText } from "@/lib/layout";

export default function Footer() {
  return (
    <footer className="py-8 flex justify-center items-center w-full">
      <span className="text-center text-xs text-muted-foreground">
        {getCopyRightText(process.env.NEXT_PUBLIC_SITE_NAME ?? "")}
      </span>
    </footer>
  );
}
