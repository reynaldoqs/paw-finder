"use client";
import { format } from "date-fns";
import { speciesIcons } from "@/constants";
import { cn } from "@/lib/utils";
import type { FoundAnimalForm, LostAnimalForm } from "@/types";
import { Emoji, Separator } from "../atoms";
import { Badge } from "../atoms/badge";
import { Spinner } from "../atoms/spinner";

type AnimalSummaryCardProps = {
  data: Partial<LostAnimalForm> | Partial<FoundAnimalForm>;
  showFullData?: boolean;
  className?: string;
  actions?: React.ReactNode;
  loading?: boolean;
};

const isLostAnimalForm = (
  data: Partial<LostAnimalForm> | Partial<FoundAnimalForm>
): data is Partial<LostAnimalForm> => {
  return (data as Partial<LostAnimalForm>).lostDate !== undefined;
};

export const AnimalSummaryCard: React.FC<AnimalSummaryCardProps> = ({
  data,
  showFullData = true,
  className,
  actions,
  loading = false,
}) => {
  const isLostAnimal = isLostAnimalForm(data);

  return (
    <div
      className={cn(
        "@container w-full relative",
        showFullData ? "p-4" : "p-0",
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/20 rounded-lg">
          <Spinner className="size-8" />
        </div>
      )}
      <div
        className={cn(
          "flex gap-4 justify-between transition-all",
          showFullData ? "flex-col" : "flex-row items-center",
          loading && "grayscale pointer-events-none opacity-60"
        )}
      >
        <div className="flex justify-between gap-3 sm:gap-4">
          {data.imageBase64 && (
            <div className="flex justify-center shrink-0">
              {/** biome-ignore lint/performance/noImgElement: it happens in FE is not necessary to validate use Image */}
              <img
                src={data.imageBase64}
                alt={isLostAnimal ? "Lost pet" : "Found pet"}
                className={cn(
                  "w-full object-cover rounded-3xl border border-border",
                  showFullData
                    ? "size-[64px] sm:size-[90px]"
                    : "size-[56px] sm:size-[72px]"
                )}
              />
            </div>
          )}
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="flex gap-2 items-center">
              {data.specie && showFullData && (
                <Emoji emoji={speciesIcons[data.specie]} size={22} />
              )}
              {isLostAnimal ? (
                <h3 className="text-base sm:text-lg font-bold capitalize inline-block truncate">
                  {data.name}
                </h3>
              ) : null}
            </div>

            <div className="hidden md:flex flex-wrap gap-1.5 sm:gap-2 mt-1">
              {data.breed && <Badge className="text-xs">{data.breed}</Badge>}
              {data.color && <Badge className="text-xs">{data.color}</Badge>}
            </div>
          </div>
        </div>
        {showFullData && <Separator />}
        {showFullData && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <p className="text-sm text-foreground font-bold">Description</p>
              <p className="text-sm mt-1 font-medium text-muted-foreground">
                {data.description || "—"}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-foreground font-bold">Location</p>
              <p className="text-sm mt-1 font-medium text-muted-foreground">
                {isLostAnimal ? data.lastSeenLocation : data.foundLocation}
              </p>
            </div>
            {isLostAnimal ? (
              <div className="col-span-1">
                <p className="text-sm text-foreground font-bold">Date lost</p>
                <p className="text-sm mt-1 font-medium text-muted-foreground">
                  {data.lostDate ? format(data.lostDate, "PPP") : "—"}
                </p>
              </div>
            ) : null}
            <div className="col-span-1">
              <p className="text-sm text-foreground font-bold">Contact</p>
              <p className="text-sm mt-1 font-medium text-muted-foreground">
                {data.contactNumber || "—"}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-foreground font-bold">Size</p>
              <p className="text-sm mt-1 font-medium text-muted-foreground capitalize">
                {data.size || "—"}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-foreground font-bold">Estimated Age</p>
              <p className="text-sm mt-1 font-medium text-muted-foreground capitalize">
                {data.estimatedAge || "—"}
              </p>
            </div>
          </div>
        )}
        {!showFullData && <div>{actions}</div>}
      </div>
    </div>
  );
};
