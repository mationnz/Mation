export type RoutePath =
	| "/"
	| "/what-we-build"
	| "/approach"
	| "/work"
	| "/about"
	| "/security"
	| "/insights"
	| "/contact";

export type NavLink = {
	label: string;
	to: RoutePath;
};

/** Primary header navigation — kept lean. */
export const navLinks: NavLink[] = [
	{ label: "What we build", to: "/what-we-build" },
	{ label: "Approach", to: "/approach" },
	{ label: "Work", to: "/work" },
	{ label: "About", to: "/about" },
];

/** Full sitemap used in the footer. */
export const footerLinks: NavLink[] = [
	{ label: "What we build", to: "/what-we-build" },
	{ label: "Approach", to: "/approach" },
	{ label: "Work", to: "/work" },
	{ label: "About", to: "/about" },
	{ label: "Security & governance", to: "/security" },
	{ label: "Insights", to: "/insights" },
	{ label: "Contact", to: "/contact" },
];

export const mationMeta = {
	name: "Mation",
	tagline: "The operating system your business actually runs on.",
	description:
		"Mation is a software-engineering partner that builds bespoke systems — unifying your tools, data, and workflows into one operating system, engineered around exactly how you operate and powered by AI.",
	email: "cam@mation.nz",
	phone: "+64 21 307 804",
	location: "Auckland, New Zealand",
};
