"use client";
import { format } from "date-fns";
import type { ImageListType } from "react-images-uploading";
import { animalBgs, speciesColors, speciesIcons } from "@/constants";
import { cn } from "@/lib/utils";
import type { AnimalForm } from "@/types";
import { Emoji, Separator } from "../atoms";
import { Badge } from "../atoms/badge";

type AnimalSummaryCardProps = {
  data: Partial<AnimalForm>;
  showFullData?: boolean;
  className?: string;
  actions?: React.ReactNode;
};

export const AnimalSummaryCard: React.FC<AnimalSummaryCardProps> = ({
  data,
  showFullData = true,
  className,
  actions,
}) => {
  return (
    <div
      className={cn(
        "@container w-full",
        showFullData ? "p-4" : "p-0",
        className
      )}
    >
      <div
        className={cn(
          "flex gap-4 justify-between",
          showFullData ? "flex-col" : "flex-row items-center"
        )}
      >
        <div className="flex justify-between gap-4">
          {data.imageBase64 && (
            <div className="flex justify-center">
              {/** biome-ignore lint/performance/noImgElement: it happens in FE is not necessary to validate use Image */}
              <img
                src={data.imageBase64}
                alt={data.name || "Pet"}
                className={cn(
                  "w-full  object-cover rounded-full border border-border",
                  showFullData
                    ? "max-w-[90px] h-[90px]"
                    : "max-w-[72px] h-[72px]"
                )}
              />
            </div>
          )}
          <div className="flex flex-col justify-center flex-1">
            <div className="flex gap-2">
              {data.specie && showFullData && (
                <Emoji emoji={speciesIcons[data.specie]} size={22} />
              )}
              <h3 className="text-lg font-bold capitalize inline-block">
                {data.name || "—"}
              </h3>
            </div>
            <div className="flex gap-2 mt-1">
              {data.breed && <Badge>{data.breed}</Badge>}
              {data.color && <Badge>{data.color}</Badge>}
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
                {data.location || "—"}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-sm text-foreground font-bold">Date lost</p>
              <p className="text-sm mt-1 font-medium text-muted-foreground">
                {data.lostDate ? format(data.lostDate, "PPP") : "—"}
              </p>
            </div>
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
