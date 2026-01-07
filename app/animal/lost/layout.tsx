import type { Metadata } from "next";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
	title: "Lost Pets - Search for Missing Animals",
	description:
		"Search for lost pets in your area. Browse our database of missing animals and help reunite them with their families.",
	openGraph: {
		title: "Lost Pets - Search for Missing Animals",
		description:
			"Search for lost pets in your area. Browse our database of missing animals and help reunite them with their families.",
		url: getAbsoluteUrl("/animal/lost"),
	},
	twitter: {
		title: "Lost Pets - Search for Missing Animals",
		description:
			"Search for lost pets in your area. Browse our database of missing animals and help reunite them with their families.",
	},
	alternates: {
		canonical: getAbsoluteUrl("/animal/lost"),
	},
};

type LostLayoutProps = {
  children: React.ReactNode;
};

export default function LostLayout({ children }: LostLayoutProps) {
  return <div className="h-full bg-gray-50 w-full">{children}</div>;
}
