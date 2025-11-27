"use client";

import type React from "react";
import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { LostAnimalCard } from ".";

type MagicLayoutProps = {
  state: "expanded" | "collapsed";
  header: ReactNode;
  content: ReactNode;
  className?: string;
};

export const MagicLayout: React.FC<MagicLayoutProps> = ({
  state,
  header,
  content,
  className,
}) => {
  const isExpanded = state === "expanded";

  return (
    <main className={cn("flex relative flex-col flex-1", className)}>
      <div
        className={cn(
          "transition-all duration-800 ease-in flex justify-center items-center bg-red-300",
          isExpanded ? "h-full" : "h-fit"
        )}
      >
        <LostAnimalCard
          mode="header"
          paw={{
            name: "Buddy",
            species: "dog",
            breed: "Golden Retriever",
            color: "Golden",
            description: "Friendly dog looking for owner",
            location: "Downtown",
            coords: { lat: 0, lng: 0 },
            imageFile: [],
            lostDate: new Date(),
            contactNumber: "123-456-7890",
          }}
        />
      </div>

      <section
        className={cn(
          "transition-all duration-800 ease-in overflow-hidden",
          isExpanded
            ? "h-0 visibility-hidden opacity-0"
            : "h-full visibility-visible opacity-100"
        )}
      >
        {content}
      </section>
    </main>
  );
};
