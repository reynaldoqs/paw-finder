import { cn } from "@/lib/utils";

type LoaderProps = {
  label?: string;
};
export const Loader = ({ label = "Loading..." }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn("paw-loader text-3xl")}></div>
      <p className="text-foreground font-semibold">{label}</p>
    </div>
  );
};
