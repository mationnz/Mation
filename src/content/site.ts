/**
 * Site-wide copy and commercial facts. Everything a buyer's lawyer could ask
 * us to demonstrate lives here, in one place. Every sentence in this file has
 * been checked against what the Mation platform actually does — keep it that
 * way: if you change a claim, re-check it against docs/handover.
 */

export type RoutePath =
	| "/"
	| "/what-we-build"
	| "/how-it-works"
	| "/what-you-own"
	| "/pricing"
	| "/security"
	| "/insights"
	| "/about"
	| "/contact"
	| "/privacy"
	| "/terms";

export type NavLink = {
	label: string;
	to: RoutePath;
};

/** Primary header navigation — kept lean. */
export const navLinks: NavLink[] = [
	{ label: "What we build", to: "/what-we-build" },
	{ label: "How it works", to: "/how-it-works" },
	{ label: "What you own", to: "/what-you-own" },
	{ label: "Pricing", to: "/pricing" },
	{ label: "About", to: "/about" },
];

/** Full sitemap used in the footer. */
export const footerLinks: { heading: string; links: NavLink[] }[] = [
	{
		heading: "The platform",
		links: [
			{ label: "What we build", to: "/what-we-build" },
			{ label: "How it works", to: "/how-it-works" },
			{ label: "What you own", to: "/what-you-own" },
			{ label: "Pricing", to: "/pricing" },
			{ label: "Security", to: "/security" },
		],
	},
	{
		heading: "Mation",
		links: [
			{ label: "About", to: "/about" },
			{ label: "Insights", to: "/insights" },
			{ label: "Contact", to: "/contact" },
			{ label: "Privacy", to: "/privacy" },
			{ label: "Terms", to: "/terms" },
		],
	},
];

export const mationMeta = {
	name: "Mation",
	url: "https://mation.nz",
	tagline:
		"Operational software your business runs on. Built on our platform, owned where it matters.",
	description:
		"Mation builds bespoke operational software for New Zealand businesses on a shared, tested platform — so your system arrives in weeks, not quarters. You own your data, your configuration, and the domain code we write for you. We own and run the platform underneath it.",
	email: "cam@mation.nz",
	phone: "+64 21 307 804",
	location: "Auckland, New Zealand",
	/** ISO 3166-2 region + locality for structured data. */
	address: { locality: "Auckland", region: "Auckland", country: "NZ" },
};

/**
 * Calls to action. There is no calendar behind any button on this site, so the
 * verb is "talk", and the button goes to a form that reaches a person.
 */
export const cta = {
	primary: { label: "Talk to us about your system", to: "/contact" as const },
	short: { label: "Talk to us", to: "/contact" as const },
	replyPromise: "We reply within one business day.",
};

/** The two commercial tiers. One is priced. The other is a conversation. */
export type Tier = {
	name: string;
	tag: string;
	desc: string;
	/** Present only on the tier that is built and priced. */
	priced: boolean;
};

export const tiers: Tier[] = [
	{
		name: "Managed",
		tag: "Our infrastructure",
		desc: "We host, run, monitor and maintain your system on the Mation platform. Fixed setup, fixed monthly. You own your data, your configuration and your domain code.",
		priced: true,
	},
	{
		name: "Owned deployment",
		tag: "Your infrastructure",
		desc: "If shared infrastructure is ruled out by your regulator, your procurement team or your data-residency rules, talk to us before you assume we can’t help. We’ll scope what’s possible for your situation and tell you honestly what it costs and how long it takes.",
		priced: false,
	},
];

/** The pricing ladder for the Managed tier. All prices NZD, exclusive of GST. */
export type PriceLine = {
	line: string;
	amount: string;
	/** Rendered after the amount, in text: "/month", "one-off", etc. */
	unit: string;
	gst: boolean;
	note: string;
};

export const pricing: {
	currency: "NZD";
	gstNote: string;
	term: string;
	lines: PriceLine[];
} = {
	currency: "NZD",
	gstNote: "All prices are in New Zealand dollars and exclude GST.",
	term: "24-month term",
	lines: [
		{
			line: "Setup",
			amount: "25,000",
			unit: "one-off",
			gst: true,
			note: "Paid before go-live. Covers discovery, configuration, your solution pack, and go-live.",
		},
		{
			line: "Platform",
			amount: "4,000",
			unit: "per month",
			gst: true,
			note: "24-month term. Hosting, monitoring, support, and platform updates — every fix every other client gets.",
		},
		{
			line: "Domain module",
			amount: "from 35,000",
			unit: "one-off",
			gst: true,
			note: "Only if your business needs capability the platform doesn’t have yet. The source is licensed to you.",
		},
		{
			line: "Usage",
			amount: "cost + 30%",
			unit: "capped",
			gst: false,
			note: "SMS, AI, OCR, scanning. Metered, visible, and capped so it can’t run away.",
		},
	],
};

/** The ownership seam — the intellectual core of the site. */
export type OwnershipLayer = {
	layer: string;
	owner: "you" | "mation";
	ownerLabel: string;
	detail: string;
};

export const ownership: OwnershipLayer[] = [
	{
		layer: "Your data",
		owner: "you",
		ownerLabel: "You, unconditionally",
		detail:
			"Every row. Exportable in full, in open formats, at any time — including during a payment dispute.",
	},
	{
		layer: "Your solution pack",
		owner: "you",
		ownerLabel: "You, perpetual royalty-free licence",
		detail:
			"The manifest that describes how your business runs: workflows, forms, rules, reports, roles, brand, and vocabulary. Real, portable, and yours to modify or take elsewhere.",
	},
	{
		layer: "Your domain module",
		owner: "you",
		ownerLabel: "You, perpetual licence to the source",
		detail:
			"If we build a module specifically for your business, the source is yours. It runs on the Mation platform.",
	},
	{
		layer: "Your app surfaces",
		owner: "you",
		ownerLabel: "You",
		detail:
			"The front-end applications built for your business, and their brand theme.",
	},
	{
		layer: "The Mation platform",
		owner: "mation",
		ownerLabel: "Mation",
		detail:
			"Tenancy, identity, permissions, audit, events, entitlements, and the AI gate; the shared engines and packages; the provider adapters; the schema. Licensed to you for use, never sold.",
	},
];

/** Block C — the ownership section, as prose. */
export const ownershipProse = {
	title: "What you own, and what you don’t.",
	intro:
		"Most software firms tell you that you own everything. Almost none of them mean it, and the ones who do charge you three times as much for the privilege. Here is the actual split.",
	points: [
		{
			lead: "Your data is yours.",
			body: "Always, and unconditionally. You can export all of it at any time in open, documented formats. If you leave, it’s delivered in full within 30 days at no charge — and that obligation isn’t conditional on any invoice being settled first, including one we’re arguing about.",
		},
		{
			lead: "Your solution is yours.",
			body: "The workflows, forms, rules, reports, roles and brand that describe how your business runs are yours under a perpetual, royalty-free licence. Modify them, build on them, take them with you.",
		},
		{
			lead: "The domain code we write for you is yours.",
			body: "If we build a module specifically for your business, the source is yours under a perpetual licence. It runs on the Mation platform — we’re telling you that plainly rather than letting you discover it later.",
		},
		{
			lead: "The Mation platform is ours.",
			body: "The tenancy, identity, permissions, audit, event and AI-governance layers underneath your system are our product, licensed to you for as long as you’re a client. It is also the entire reason your system costs a fraction of a custom build and arrives in weeks: every client runs on the same tested spine, so every client gets every fix.",
		},
	],
	limit:
		"A domain module cannot run without the platform. Handing over the source is real and worth something; it is not the same as handing over something that runs on its own.",
};

/** Block D — continuity. The real question behind “do we own it”. */
export const continuity = {
	title: "What happens if we’re not here.",
	intro:
		"It’s the real question behind “do we own it,” so here’s the real answer.",
	body: [
		{
			lead: "Your data leaves whenever you ask,",
			body: "in full, in open formats, no conditions.",
		},
		{
			lead: "Your solution pack and your domain source go into escrow,",
			body: "released to you on agreed triggers.",
		},
		{
			lead: "We name a continuity successor in your agreement",
			body: "— a specific party, not a promise — so there is a documented path that doesn’t depend on us existing.",
		},
	],
	close: "That is a better answer than a repository you couldn’t run anyway.",
};

/** Block E — the anti-guarantee. It will lose deals. That is the point. */
export const antiGuarantee = {
	title: "We’ll talk you out of this.",
	body: "If what you actually want is a codebase in your own repository with your own developers on it, don’t buy from us. Buy it from a contract development shop. It will cost you more, it will take longer, and it will be the right decision. We’ll tell you who to call.",
	close:
		"We’re not the cheapest way to own software. We’re the cheapest way to run it.",
};

/**
 * Verifiable facts about the platform underneath every tenant. Each one can be
 * demonstrated by running a tool against the repository. Floors, not counts,
 * so they stay true as the platform grows. Measured September 2026.
 */
export const platformFacts = [
	{ value: "15,000+", label: "automated test cases" },
	{ value: "400+", label: "schema migrations" },
	{ value: "390+", label: "row-level tenant-isolation policies" },
	{
		value: "0",
		label: "architectural boundary violations across 4,000+ modules",
	},
];

export const platformFactsMeasured = "Measured September 2026.";

/** Legal pages. Dates are the last time a human reviewed the text. */
export const legal = {
	privacyUpdated: "2 September 2026",
	termsUpdated: "2 September 2026",
	privacyCommissionerUrl: "https://www.privacy.org.nz",
};
