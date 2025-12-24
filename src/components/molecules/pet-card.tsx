import Image from "next/image";
import { cn } from "@/lib/utils";
import type { LostAnimal } from "@/types";
import { Skeleton } from "../atoms";

type PetCardProps = {
  animal: LostAnimal;
  className?: string;
};

export const PetCard: React.FC<PetCardProps> = ({ animal, className }) => {
  return (
    <div
      className={cn(
        "group relative size-full rounded-3xl overflow-hidden bg-gray-500 cursor-pointer",
        className
      )}
    >
      <Image
        src={animal.imageUrl || "/placeholder.png"}
        alt={animal.name || "Lost pet"}
        fill
        style={{
          objectFit: "cover",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
          <h3 className="font-bold text-sm truncate">{animal.name}</h3>
          <p className="text-xs text-white/90 truncate mt-0.5">
            {animal.lastSeenLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

type PetCardSkeletonProps = {
  className?: string;
};

export const PetCardSkeleton: React.FC<PetCardSkeletonProps> = ({
  className,
}) => {
  return <Skeleton className={cn("rounded-3xl", className)} />;
};
