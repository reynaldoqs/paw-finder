import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getSiteUrl();

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/animal/found`,
			lastModified: new Date(),
			changeFrequency: "hourly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/animal/lost`,
			lastModified: new Date(),
			changeFrequency: "hourly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/animal/report/found`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/animal/report/lost`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];
}
