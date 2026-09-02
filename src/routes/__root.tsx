import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { mationMeta } from "../content/site";

import appCss from "../styles.css?url";

const organisationJsonLd = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "Organization",
	name: mationMeta.name,
	url: mationMeta.url,
	email: mationMeta.email,
	telephone: mationMeta.phone,
	description: mationMeta.description,
	address: {
		"@type": "PostalAddress",
		addressLocality: mationMeta.address.locality,
		addressRegion: mationMeta.address.region,
		addressCountry: mationMeta.address.country,
	},
	logo: `${mationMeta.url}/logo512.png`,
});

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: `Mation — ${mationMeta.tagline}` },
			{ name: "description", content: mationMeta.description },
			{
				name: "theme-color",
				media: "(prefers-color-scheme: light)",
				content: "#f5f4f0",
			},
			{
				name: "theme-color",
				media: "(prefers-color-scheme: dark)",
				content: "#17161b",
			},
			{ property: "og:title", content: `Mation — ${mationMeta.tagline}` },
			{ property: "og:description", content: mationMeta.description },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "Mation" },
			{ property: "og:locale", content: "en_NZ" },
			{ property: "og:image", content: `${mationMeta.url}/og-card.png` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{
				property: "og:image:alt",
				content: "Mation — operational software your business runs on",
			},
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.png" },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "apple-touch-icon", href: "/logo192.png" },
			{ rel: "manifest", href: "/manifest.json" },
			{ rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-NZ" data-theme="light" suppressHydrationWarning>
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: pre-paint theme script prevents a flash of the wrong theme; the string is a constant
					dangerouslySetInnerHTML={{
						__html:
							"(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();",
					}}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: structured data serialised from a constant
					dangerouslySetInnerHTML={{ __html: organisationJsonLd }}
				/>
				<HeadContent />
			</head>
			<body>
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<Header />
				{/* biome-ignore lint/correctness/useUniqueElementIds: the skip link targets this landmark; it is rendered exactly once */}
				<main id="main" className="pt-20">
					{children}
				</main>
				<Footer />

				{import.meta.env.DEV ? (
					<TanStackDevtools
						config={{ position: "bottom-right" }}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				) : null}
				<Scripts />
			</body>
		</html>
	);
}
