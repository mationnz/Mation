import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SpotlightFX from "../components/SpotlightFX";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Mation — Bespoke software, built around your business",
			},
			{
				name: "description",
				content:
					"Mation builds AI-native operating models, autonomous workflows, and governed agent systems for ambitious organisations.",
			},
			{
				name: "theme-color",
				media: "(prefers-color-scheme: light)",
				content: "#070a18",
			},
			{
				name: "theme-color",
				media: "(prefers-color-scheme: dark)",
				content: "#070a18",
			},
			{
				property: "og:title",
				content: "Mation — AI operating systems for adaptive businesses",
			},
			{
				property: "og:description",
				content:
					"Autonomous workflows, agentic systems, and decision intelligence that accelerate growth without operational drag.",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "Mation",
			},
			{
				property: "og:image",
				content: "https://mation.nz/logo512.png",
			},
			{
				name: "twitter:card",
				content: "summary",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.png",
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
			{
				rel: "apple-touch-icon",
				href: "/logo192.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" data-theme="dark" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: pre-paint theme script prevents a flash of the wrong theme */}
				<script
					dangerouslySetInnerHTML={{
						__html:
							"(function(){document.documentElement.setAttribute('data-theme','dark');try{localStorage.setItem('theme','dark');}catch(e){}})();",
					}}
				/>
				<HeadContent />
			</head>
			<body>
				<div className="scroll-progress" aria-hidden />
				<SpotlightFX />
				<Header />
				<main className="pt-16">{children}</main>
				<Footer />

				<Scripts />
			</body>
		</html>
	);
}
