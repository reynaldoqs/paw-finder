import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Animal } from "@/types";
import { Skeleton } from "../atoms";

type PetCardProps = {
  animal: Animal;
  className?: string;
};

export const PetCard: React.FC<PetCardProps> = ({ animal, className }) => {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 w-[280px] h-[90px] overflow-hidden rounded-xl border border-b-foreground/10",
        className
      )}
    >
      <div className="relative size-[90px]">
        <div
          className="w-full h-full bg-red-300"
          style={{
            clipPath:
              "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 0 100%, 0 0)",
          }}
        >
          <Image
            src={animal.imageUrl}
            alt={animal.name}
            width={90}
            height={90}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center pr-4 overflow-hidden">
        <h3 className="text-base font-semibold text-foreground truncate">
          {animal.name}
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground mt-1">
          {animal.description}
        </p>
      </div>
    </div>
  );
};

export const PetCardSkeleton: React.FC = () => {
  return <Skeleton className="w-[280px] h-[90px] rounded-xl" />;
};
