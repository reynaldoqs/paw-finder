import Image from "next/image";
import { Badge } from "./badge";

export const Logo: React.FC = () => {
  return (
    <div className="size-[54px] place-content-center flex rounded-full bg-gray-100 relative">
      <Image src="/images/paw_logo.svg" alt="Paw Icon" width={28} height={28} />
      <Badge className="absolute left-[42px] top-[12px] text-xs -rotate-12">
        Paw finder 👋
      </Badge>
    </div>
  );
};
