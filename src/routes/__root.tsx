import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Footer from "../components/Footer";
import Header from "../components/Header";

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
					"Mation is a software-engineering partner that builds the operating system your business actually runs on — bespoke systems that unify your tools, data, and workflows, engineered around how you operate and powered by AI.",
			},
			{
				name: "theme-color",
				media: "(prefers-color-scheme: light)",
				content: "#faf6ef",
			},
			{
				name: "theme-color",
				media: "(prefers-color-scheme: dark)",
				content: "#1c1822",
			},
			{
				property: "og:title",
				content: "Mation — The operating system your business runs on",
			},
			{
				property: "og:description",
				content:
					"We're the engineering partner that turns disconnected tools and manual admin into one custom system, built around exactly how you work — powered by AI.",
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
		<html lang="en" data-theme="light" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: pre-paint theme script prevents a flash of the wrong theme */}
				<script
					dangerouslySetInnerHTML={{
						__html:
							"(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();",
					}}
				/>
				<HeadContent />
			</head>
			<body>
				<Header />
				<main className="pt-20">{children}</main>
				<Footer />

				{import.meta.env.DEV ? (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
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
