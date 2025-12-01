import { cn } from "@/src/lib/utils";
import { species, speciesColors, speciesIcons } from "@/src/constants";

type AnimalButtonProps = {
  specie: (typeof species)[number];
  isSelected: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AnimalButton: React.FC<AnimalButtonProps> = ({
  specie,
  isSelected,
  ...props
}) => {
  return (
    <button
      type="button"
      data-selected={isSelected}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-border transition-all duration-200",
        "hover:scale-105 active:scale-95",
        speciesColors[specie]
      )}
      {...props}
    >
      <span className="text-5xl">{speciesIcons[specie]}</span>
      <span className="text-sm font-medium capitalize">{specie}</span>
    </button>
  );
};
