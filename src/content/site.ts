export type RoutePath =
	| "/"
	| "/what-we-build"
	| "/approach"
	| "/work"
	| "/plans"
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
	{ label: "Plans", to: "/plans" },
	{ label: "About", to: "/about" },
];

/** Full sitemap used in the footer. */
export const footerLinks: NavLink[] = [
	{ label: "What we build", to: "/what-we-build" },
	{ label: "Approach", to: "/approach" },
	{ label: "Work", to: "/work" },
	{ label: "Plans", to: "/plans" },
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

/** Cross-site commercial themes — kept in one place for consistent copy. */
export const offer = {
	priceLow: "$1,000",
	priceHigh: "$100,000+",
	guaranteeShort: "60-day double-value guarantee",
	guarantee:
		"If you’re not seeing double your investment in value within the first 60 days, we’ll give you your money back.",
	meetingShort:
		"Free exploration meeting · in-person or via Teams · no obligation",
	meeting:
		"A free exploration meeting — in-person or via Teams. Our team walks through your systems, identifies the opportunities, captures the value, and proposes a clear path forward. No obligations, no expectations.",
	cadence: [
		{ phase: "Prototype", time: "in days" },
		{ phase: "Launch", time: "in weeks" },
		{ phase: "Results", time: "in months" },
		{ phase: "Profit", time: "for years" },
	],
	models: [
		{
			name: "SaaS",
			tag: "Subscribe",
			desc: "Pay monthly. We host, run, and maintain it — scale up or down as your needs change.",
		},
		{
			name: "Rent-to-buy",
			tag: "Subscribe, then own",
			desc: "Start on a subscription and put what you pay toward owning the system outright.",
		},
		{
			name: "Purchase outright",
			tag: "Own it",
			desc: "Own the system and the code from day one. It’s yours — no lock-in, no ongoing licence.",
		},
	],
};
