"use client";

import type * as React from "react";
import { cn } from "@/src/lib/utils";

const NAVBAR_HEIGHT = 60;

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
          ? `top-[${NAVBAR_HEIGHT}px] left-0 right-0 h-[100px] w-full translate-x-0 translate-y-0 border-b border-b-foreground/10 backdrop-blur`
          : `h-[580px] w-[480px] max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-foreground/10 bg-beige-low rounded-lg`,
        className
      )}
    >
      {children}
    </div>
  );
};
