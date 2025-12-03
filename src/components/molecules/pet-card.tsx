import { cn } from "@/lib/utils";

type PetCardProps = {
  name: string;
  type: string;
  status: "lost" | "found";
  emoji: string;
  location: string;
  className?: string;
};

export const PetCard: React.FC<PetCardProps> = ({
  name,
  type,
  status,
  emoji,
  location,
  className,
}) => {
  const statusColors = {
    lost: "bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800",
    found:
      "bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800",
  };

  const statusEmojis = {
    lost: "😢",
    found: "🎉",
  };

  return (
    <div
      className={cn(
        "flex-shrink-0 w-64 p-4 rounded-xl border-2 shadow-lg transition-transform hover:scale-105",
        statusColors[status],
        className
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{emoji}</span>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
        <span className="text-2xl">{statusEmojis[status]}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>📍</span>
        <span className="text-muted-foreground">{location}</span>
      </div>
      <div className="mt-2">
        <span
          className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase",
            status === "lost"
              ? "bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200"
              : "bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200"
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
};
