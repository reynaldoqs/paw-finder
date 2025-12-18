"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

type TransitionContainerProps = {
  isExpanded: boolean;
  children: React.ReactNode;
  className?: string;
};

export const TransitionContainer: React.FC<TransitionContainerProps> = ({
  isExpanded,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed transition-all duration-500 ease-in-out z-50",
        isExpanded
          ? `top-[70px] md:top-[86px] left-0 right-0 h-[110px] w-full translate-x-0 translate-y-0 backdrop-blur bg-amber-400`
          : `h-[600px] w-[480px] max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
        className
      )}
    >
      {children}
    </div>
  );
};
