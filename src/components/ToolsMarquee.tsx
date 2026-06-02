/**
 * ToolsMarquee — a continuously scrolling strip of the tools a bespoke
 * Mation system typically unifies. Decorative (aria-hidden); the section
 * heading carries the meaning. Pauses on hover; stops under reduced-motion.
 */

const TOOLS = [
	"Salesforce",
	"HubSpot",
	"Xero",
	"MYOB",
	"Microsoft 365",
	"Google Workspace",
	"Slack",
	"Jira",
	"SAP",
	"NetSuite",
	"Shopify",
	"Stripe",
	"Power BI",
	"Notion",
	"monday.com",
	"Zendesk",
];

export default function ToolsMarquee() {
	// Duplicated so the -50% translate loops seamlessly; build stable keys.
	const row = [...TOOLS, ...TOOLS].map((label, i) => ({
		label,
		id: `${label}-${i}`,
		// Two-ink rhythm: every third marker picks up coral, the rest violet.
		warm: i % 3 === 2,
	}));

	return (
		<div className="marquee" aria-hidden>
			<div className="marquee-track">
				{row.map((item) => (
					<span key={item.id} className="marquee-chip">
						<span
							className={`h-1.5 w-1.5 rounded-full ${
								item.warm ? "bg-warm" : "bg-violet"
							}`}
						/>
						{item.label}
					</span>
				))}
			</div>
		</div>
	);
}
