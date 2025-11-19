import Link from "next/link";
import { AuthButton } from "@/src/components/auth-button";
import { ThemeSwitcher } from "@/src/components/theme-switcher";

export default function FoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen grid grid-rows-[70px_1fr] overflow-hidden">
      <nav className="w-full flex justify-center border-b border-b-foreground/10">
        <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"}>Paw Finder</Link>
          </div>
          <AuthButton />
        </div>
      </nav>
      <div className="flex overflow-hidden">{children}</div>
    </main>
  );
}
