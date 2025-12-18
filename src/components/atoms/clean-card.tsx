import { cn } from "@/lib/utils";

type CleanCardProps = {
  children: React.ReactNode;
  className?: string;
};

export const CleanCard: React.FC<CleanCardProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("bg-background rounded-4xl p-6 size-fit", className)}>
      {children}
    </div>
  );
};
