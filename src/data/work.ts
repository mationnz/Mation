export type CaseStudy = {
	slug: string;
	/** Sector descriptor, not a real brand name (e.g. "A NZ logistics operator"). */
	client: string;
	industry: string;
	year: string;
	summary: string;
	problem: string;
	whatWeBuilt: string[];
	results: { metric: string; label: string }[];
	capabilities: string[];
	quote?: { text: string; name: string; role: string };
	/**
	 * Marks a sample case used while a real, named case study is pending
	 * client publication. Keep true until the client supplies approved
	 * details — the UI renders a clear notice whenever this is set.
	 */
	isPlaceholder: boolean;
};

/**
 * Placeholder case studies.
 *
 * The client has real, named engagements but has not yet supplied approved
 * details. Until then these use generic sector descriptors (no invented brand
 * names, logos, or metrics presented as fact) and carry `isPlaceholder: true`.
 *
 * To publish a real case: replace `client` with the named client, swap in the
 * supplied copy and metrics, then set `isPlaceholder: false`.
 */
export const caseStudies: CaseStudy[] = [
	{
		slug: "logistics-operations-os",
		client: "A NZ logistics operator",
		industry: "Logistics & freight",
		year: "2025",
		summary:
			"Replaced a tangle of spreadsheets, a legacy TMS, and email with one system for dispatch, tracking, and billing.",
		problem:
			"Dispatch lived in spreadsheets, tracking lived in a legacy system, and billing lived in email. Every job was re-keyed three times, updates lagged the truck by hours, and month-end reconciliation took a week of manual work.",
		whatWeBuilt: [
			"A unified operations system covering quoting, dispatch, live tracking, and invoicing — one record per job, end to end.",
			"Integrations into the existing telematics, accounting, and customer-portal tools, so each system reads from one source of truth.",
			"Automated billing that turns a completed job into a reconciled invoice without manual re-keying.",
			"An AI assistant that drafts customer ETAs and flags at-risk deliveries before they slip.",
		],
		results: [
			{ metric: "3 → 1", label: "Times each job is entered" },
			{ metric: "~12 hrs", label: "Admin recovered per week" },
			{ metric: "1 week → 1 day", label: "Month-end reconciliation" },
		],
		capabilities: [
			"Systems integration",
			"Workflow automation",
			"Bespoke business application",
			"AI assistance",
		],
		quote: {
			text: "We stopped running the business out of spreadsheets. Everyone now works from the same live picture.",
			name: "Operations lead",
			role: "NZ logistics operator",
		},
		isPlaceholder: true,
	},
	{
		slug: "professional-services-delivery-hub",
		client: "A professional-services firm",
		industry: "Professional services",
		year: "2025",
		summary:
			"Connected CRM, time, and finance into one delivery hub so partners see project health and margin in real time.",
		problem:
			"Client data sat in the CRM, time in one tool, and financials in another. Partners couldn't see project margin without a manual export, so over-servicing was only caught after it had already eaten the budget.",
		whatWeBuilt: [
			"A delivery hub that joins CRM, time tracking, and finance into a single, live view of every engagement.",
			"Real-time project margin and utilisation, calculated from the systems the firm already runs.",
			"An approval-gated workflow for scope changes, so budget impact is visible before work begins.",
			"Automated client status updates, composed from project data instead of assembled by hand.",
		],
		results: [
			{ metric: "Real-time", label: "Margin visibility per project" },
			{ metric: "~8 hrs", label: "Reporting recovered per week" },
			{ metric: "1 view", label: "CRM, time & finance unified" },
		],
		capabilities: [
			"Internal tools & dashboards",
			"The unified data layer",
			"Workflow automation",
			"AI assistance",
		],
		quote: {
			text: "For the first time, partners can see margin while a project is live — not three weeks after it's gone wrong.",
			name: "Managing partner",
			role: "Professional-services firm",
		},
		isPlaceholder: true,
	},
	{
		slug: "field-services-job-system",
		client: "A field-services & manufacturing business",
		industry: "Manufacturing & field services",
		year: "2024",
		summary:
			"Built a job system that runs from quote to invoice across the office, the workshop, and crews in the field.",
		problem:
			"Quotes, work orders, and asset history lived in separate tools that didn't talk. Field crews worked from paper, the workshop chased updates by phone, and jobs regularly stalled waiting on information that already existed somewhere.",
		whatWeBuilt: [
			"A job system spanning quoting, scheduling, asset history, and invoicing — shared across office, workshop, and field.",
			"A mobile-first view for crews to capture job progress, photos, and sign-off on site.",
			"Integration with the existing inventory and accounting systems so stock and billing stay in sync automatically.",
			"AI-assisted scheduling that suggests the next best job for each crew based on location, skills, and parts on hand.",
		],
		results: [
			{ metric: "Paper → live", label: "Field job capture" },
			{ metric: "~30%", label: "Faster quote-to-invoice cycle" },
			{ metric: "One system", label: "Office, workshop & field" },
		],
		capabilities: [
			"Bespoke business application",
			"Systems integration",
			"Workflow automation",
			"AI assistance",
		],
		quote: {
			text: "The crews, the workshop, and the office finally run off one system. Nothing falls through the cracks between them.",
			name: "General manager",
			role: "Field-services business",
		},
		isPlaceholder: true,
	},
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
	return caseStudies.find((c) => c.slug === slug);
}

export function getRelatedCases(slug: string, count = 2): CaseStudy[] {
	const current = getCaseBySlug(slug);
	if (!current) return caseStudies.slice(0, count);

	const sameIndustry = caseStudies.filter(
		(c) => c.industry === current.industry && c.slug !== slug,
	);
	const others = caseStudies.filter(
		(c) => c.industry !== current.industry && c.slug !== slug,
	);

	return [...sameIndustry, ...others].slice(0, count);
}
