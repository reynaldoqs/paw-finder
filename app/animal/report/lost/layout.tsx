import type { Metadata } from "next";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
	title: "Report Lost Pet",
	description:
		"Report a lost pet and help reunite them with their family. Submit details about your missing pet to help others identify and return them.",
	openGraph: {
		title: "Report Lost Pet - Paw Finder",
		description:
			"Report a lost pet and help reunite them with their family. Submit details about your missing pet to help others identify and return them.",
		url: getAbsoluteUrl("/animal/report/lost"),
	},
	twitter: {
		title: "Report Lost Pet - Paw Finder",
		description:
			"Report a lost pet and help reunite them with their family. Submit details about your missing pet to help others identify and return them.",
	},
	alternates: {
		canonical: getAbsoluteUrl("/animal/report/lost"),
	},
};

type LostLayoutProps = {
  children: React.ReactNode;
};

export default function LostLayout({ children }: LostLayoutProps) {
  return <div className="h-full bg-gray-50 w-full">{children}</div>;
}
