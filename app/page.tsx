import type { Metadata } from "next";
import { Suspense } from "react";
import { PromotedSection, PromotedSectionSkeleton } from "@/components";
import { HeroSection } from "@/components/organisms/hero-section";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
	title: "Find Lost Pets - Reunite Pets with Their Families",
	description:
		"Paw Finder helps reunite lost pets with their families. Browse found pets, report a lost pet, or report a found pet in your area.",
	openGraph: {
		title: "Find Lost Pets - Reunite Pets with Their Families",
		description:
			"Paw Finder helps reunite lost pets with their families. Browse found pets, report a lost pet, or report a found pet in your area.",
		url: getAbsoluteUrl("/"),
	},
	twitter: {
		title: "Find Lost Pets - Reunite Pets with Their Families",
		description:
			"Paw Finder helps reunite lost pets with their families. Browse found pets, report a lost pet, or report a found pet in your area.",
	},
	alternates: {
		canonical: getAbsoluteUrl("/"),
	},
};

export default function Home() {
	return (
		<main className="flex flex-col justify-between h-full py-2 md:py-4">
			<HeroSection />
			<Suspense fallback={<PromotedSectionSkeleton />}>
				<PromotedSection />
			</Suspense>
		</main>
	);
}
