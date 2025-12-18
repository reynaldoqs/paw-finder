import Link from "next/link";
import { Suspense } from "react";
import { Skeleton, Spinner } from "../atoms";
import { Logo } from "../atoms/logo";
import { AuthMenu } from "./auth-menu";
import { MobileNavigation, Navigation } from "./navigation";

export const MainNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
        <div className="flex flex-1 justify-start">
          <MobileNavigation />
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-3 justify-center gap-2 sm:gap-4">
          <Navigation />
        </div>
        <div className="flex flex-1 justify-end">
          <Suspense fallback={<Skeleton className="size-10 rounded-full" />}>
            <AuthMenu />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};
