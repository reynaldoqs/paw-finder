import type { Metadata } from "next";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
	title: "Report Found Pet",
	description:
		"Report a found pet and help reunite them with their family. Submit details about the animal you found to help owners locate their missing pets.",
	openGraph: {
		title: "Report Found Pet - Paw Finder",
		description:
			"Report a found pet and help reunite them with their family. Submit details about the animal you found to help owners locate their missing pets.",
		url: getAbsoluteUrl("/animal/report/found"),
	},
	twitter: {
		title: "Report Found Pet - Paw Finder",
		description:
			"Report a found pet and help reunite them with their family. Submit details about the animal you found to help owners locate their missing pets.",
	},
	alternates: {
		canonical: getAbsoluteUrl("/animal/report/found"),
	},
};

type FoundLayoutProps = {
  children: React.ReactNode;
};

export default function FoundLayout({ children }: FoundLayoutProps) {
  return <div className="h-full bg-gray-50 w-full">{children}</div>;
}
