import { cn } from "@/lib/utils";
import { Emoji } from "../atoms";

type PawHeaderProps = {
  title: string;
  description: string;
  emoji?: string;
  className?: string;
};
export const PawHeader: React.FC<PawHeaderProps> = ({
  title,
  description,
  emoji,
  className,
}) => {
  return (
    <header className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        {emoji && <Emoji emoji={emoji} label="paw" size={32} />}
        <h2 className="font-semibold text-3xl">{title}</h2>
      </div>
      <p className="text-muted-foreground leading-5">{description}</p>
    </header>
  );
};
