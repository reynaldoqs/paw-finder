/**
 * Get the site URL for SEO purposes
 * Uses NEXT_PUBLIC_SITE_URL if available, falls back to VERCEL_URL or localhost
 */
export function getSiteUrl(): string {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL;
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	return "http://localhost:3000";
}

/**
 * Generate absolute URL from a path
 */
export function getAbsoluteUrl(path: string): string {
	const baseUrl = getSiteUrl();
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	return `${baseUrl}${cleanPath}`;
}
