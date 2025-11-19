"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import type { AnimalForm } from "@/src/types";

export type LostAnimalCardMode = "form" | "header";

export interface LostAnimalCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  mode: LostAnimalCardMode;
  paw: AnimalForm;
}

export const LostAnimalCard = React.forwardRef<
  HTMLDivElement,
  LostAnimalCardProps
>(({ className, mode, paw, children, ...props }, ref) => {
  const isHeader = mode === "header";

  const imageFile = paw?.imageFile?.[0];
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!imageFile) {
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-in-out",
        "bg-background/80 overflow-hidden flex items-center justify-center",
        // animate between fixed-size form card and full-width header bar
        isHeader
          ? "w-full h-16 md:h-20 border-b rounded-none shadow-none px-4"
          : "w-full max-w-[600px] h-[500px] border rounded-xl shadow-sm px-6 py-6 md:px-8 md:py-8",
        className
      )}
      {...props}
    >
      {paw ? (
        <div className="flex h-full w-full gap-4">
          <div className="relative h-full w-40 flex-shrink-0 overflow-hidden rounded-lg border bg-muted md:w-56">
            {imageUrl ? (
              // biome-ignore lint/a11y/useAltText: dynamic image from user upload
              <img src={imageUrl} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-semibold">
                {paw.name || "Unnamed friend"}
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-orange-700">
                {paw.species}
              </span>
              {paw.breed && (
                <span className="text-xs text-muted-foreground">
                  {paw.breed}
                </span>
              )}
            </div>

            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Color:</span> {paw.color}
            </div>

            {paw.description && (
              <p className="mt-1 text-sm leading-snug">{paw.description}</p>
            )}

            <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Last seen near:</span>{" "}
                {paw.location}
              </div>
              {paw.lostDate && (
                <div>
                  <span className="font-medium">Lost on:</span>{" "}
                  {paw.lostDate.toLocaleDateString()}
                </div>
              )}
              <div>
                <span className="font-medium">Contact:</span>{" "}
                {paw.contactNumber}
              </div>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
});

LostAnimalCard.displayName = "LostAnimalCard";
