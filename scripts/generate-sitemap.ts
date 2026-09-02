/**
 * Generates public/sitemap.xml from the static route list plus one entry per
 * Insights article. Run with `bun run scripts/generate-sitemap.ts` (wired up
 * as the `prebuild` script in package.json).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { articles } from "../src/data/articles";

const ORIGIN = "https://mation.nz";

const STATIC_ROUTES = [
	"/",
	"/what-we-build",
	"/how-it-works",
	"/what-you-own",
	"/pricing",
	"/security",
	"/insights",
	"/about",
	"/contact",
	"/privacy",
	"/terms",
];

type Entry = { loc: string; lastmod: string };

/** Today's date as YYYY-MM-DD in the machine's local timezone. */
function localIsoDate(date = new Date()): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

const today = localIsoDate();

const entries: Entry[] = [
	...STATIC_ROUTES.map((path) => ({ loc: `${ORIGIN}${path}`, lastmod: today })),
	...articles.map((article) => ({
		loc: `${ORIGIN}/insights/${article.slug}`,
		lastmod: article.publishDate,
	})),
];

const xml = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
	...entries.map(
		({ loc, lastmod }) =>
			`  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
	),
	"</urlset>",
	"",
].join("\n");

const outPath = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url));
writeFileSync(outPath, xml);
console.log(`Wrote ${entries.length} URLs to ${outPath}`);
