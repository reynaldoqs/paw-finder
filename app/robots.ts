import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = getSiteUrl();

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: [
					"/auth/",
					"/api/",
					"/profile/",
				],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
