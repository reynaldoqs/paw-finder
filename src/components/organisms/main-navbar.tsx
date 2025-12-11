import Image from "next/image";
import { Suspense } from "react";
import { Skeleton, Spinner } from "../atoms";
import { AuthMenu } from "./auth-menu";
import { MobileNavigation, Navigation } from "./navigation";

export const MainNavbar: React.FC = () => {
  return (
    <nav className="w-full border-b border-b-foreground/10 backdrop-blur sticky top-0 z-50">
      <div className="flex items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
        <div className="flex flex-1 justify-start">
          <MobileNavigation />
          <Image
            src="/images/paw_logo.svg"
            alt="Paw Icon"
            width={28}
            height={28}
          />
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
