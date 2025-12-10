import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Animal } from "@/types";

type PetCardProps = {
  animal: Animal;
  className?: string;
};

export const PetCard: React.FC<PetCardProps> = ({ animal, className }) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center gap-4 max-w-[280px] h-[100px] group rounded-full border border-b-foreground/10 ",
        className
      )}
    >
      <Image
        src={animal.imageUrl}
        alt={animal.name}
        width={70}
        height={70}
        className="object-cover size-12 rounded-full"
      />

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-bold text-foreground">{animal.name}</h3>
          <p className="line-clamp-3 gap-1 text-xs text-muted-foreground">
            {animal.description}
          </p>
        </div>
      </div>
    </div>
  );
};
