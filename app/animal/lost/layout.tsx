import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Lost Pet - Paw Finder",
  description: "Report a lost pet and help reunite them with their family",
};

type LostLayoutProps = {
  children: React.ReactNode;
};

export default function LostLayout({ children }: LostLayoutProps) {
  return <div className="h-full bg-gray-50 w-full">{children}</div>;
}
