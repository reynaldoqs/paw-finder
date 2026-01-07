import type { Metadata } from "next";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
	title: "Found Pets - Browse Found Animals",
	description:
		"Browse found pets in your area. Help reunite lost pets with their families by checking our database of found animals.",
	openGraph: {
		title: "Found Pets - Browse Found Animals",
		description:
			"Browse found pets in your area. Help reunite lost pets with their families by checking our database of found animals.",
		url: getAbsoluteUrl("/animal/found"),
	},
	twitter: {
		title: "Found Pets - Browse Found Animals",
		description:
			"Browse found pets in your area. Help reunite lost pets with their families by checking our database of found animals.",
	},
	alternates: {
		canonical: getAbsoluteUrl("/animal/found"),
	},
};

type FoundLayoutProps = {
  children: React.ReactNode;
};

export default function FoundLayout({ children }: FoundLayoutProps) {
  return <div className="h-full bg-gray-50 w-full">{children}</div>;
}
