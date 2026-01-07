import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { MainNavbar } from "@/components";
import { StructuredData } from "@/components/atoms/structured-data";
import Providers from "./providers";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Paw Finder - Find Lost Pets",
		template: "%s | Paw Finder",
	},
	description:
		"Help reunite lost pets with their families. Report found pets and search for lost pets in your area.",
	keywords: [
		"lost pets",
		"found pets",
		"pet finder",
		"lost animals",
		"found animals",
		"pet recovery",
		"reunite pets",
	],
	authors: [{ name: "Paw Finder" }],
	creator: "Paw Finder",
	publisher: "Paw Finder",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: "Paw Finder",
		title: "Paw Finder - Find Lost Pets",
		description:
			"Help reunite lost pets with their families. Report found pets and search for lost pets in your area.",
		images: [
			{
				url: `${siteUrl}/images/pets.webp`,
				width: 1200,
				height: 630,
				alt: "Paw Finder - Find Lost Pets",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Paw Finder - Find Lost Pets",
		description:
			"Help reunite lost pets with their families. Report found pets and search for lost pets in your area.",
		images: [`${siteUrl}/images/pets.webp`],
	},
	alternates: {
		canonical: siteUrl,
	},
};

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const siteUrl = getSiteUrl();

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Paw Finder",
		url: siteUrl,
		logo: `${siteUrl}/images/paw_logo.svg`,
		description:
			"Help reunite lost pets with their families. Report found pets and search for lost pets in your area.",
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Paw Finder",
		url: siteUrl,
		description:
			"Help reunite lost pets with their families. Report found pets and search for lost pets in your area.",
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${lato.className} antialiased h-screen w-full`}>
				<StructuredData data={organizationSchema} />
				<StructuredData data={websiteSchema} />
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					forcedTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<div className="h-dvh grid grid-rows-[auto_1fr]">
						<MainNavbar />
						<div className="overflow-auto h-full">
							<Providers>{children}</Providers>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
