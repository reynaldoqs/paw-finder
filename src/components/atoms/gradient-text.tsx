import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};
