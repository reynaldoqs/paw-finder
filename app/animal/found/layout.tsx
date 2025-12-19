import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Found Pet - Paw Finder",
  description: "Report a found pet and help reunite them with their family",
};

type FoundLayoutProps = {
  children: React.ReactNode;
};

export default function FoundLayout({ children }: FoundLayoutProps) {
  return <div className="h-full bg-gray-50 w-full">{children}</div>;
}
