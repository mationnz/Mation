import { createFileRoute, Link } from "@tanstack/react-router";

import Boundary from "../components/Boundary";
import CTASection from "../components/CTASection";
import OwnershipLedger, { OwnershipSplit } from "../components/OwnershipLedger";
import PlatformFacts from "../components/PlatformFacts";
import PriceLadder from "../components/PriceLadder";
import Section from "../components/Section";
import Tiers from "../components/Tiers";
import { cta, mationMeta, ownershipProse, pricing } from "../content/site";
import { getArticleBySlug } from "../data/articles";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{ title: `Mation — ${mationMeta.tagline}` },
			{ name: "description", content: mationMeta.description },
			{ property: "og:title", content: `Mation — ${mationMeta.tagline}` },
			{ property: "og:description", content: mationMeta.description },
			{ property: "og:type", content: "website" },
		],
	}),
});

const pains = [
	{
		who: "Operations and project managers",
		what: "Your week disappears into status updates, re-keying, and chasing people.",
	},
	{
		who: "Owners and executives",
		what: "You’re making calls on data that’s days old and scattered across reports.",
	},
	{
		who: "Compliance and quality",
		what: "Audit prep means weeks of stitching evidence together from a dozen places.",
	},
	{
		who: "Field and frontline teams",
		what: "Reporting from the field is slow, and what gets captured often goes missing.",
	},
];

const reading = [
	"measuring-ai-roi",
	"read-only-first",
	"auditability-ai-deployable",
]
	.map((slug) => getArticleBySlug(slug))
	.filter((article) => article !== undefined);

function HomePage() {
	const setup = pricing.lines[0];
	const platform = pricing.lines[1];

	return (
		<>
			{/* Hero */}
			<section className="site-wide section pt-8 sm:pt-14">
				<div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
					<div>
						<h1 className="display reveal-up">
							Operational software your business runs on.
						</h1>
						<p className="lede reveal-up delay-1 mt-7">
							Built on our platform, owned where it matters. Your system arrives
							in weeks, not quarters. You own your data, your configuration, and
							the domain code we write for you. We own and run the platform
							underneath it.
						</p>
						<div className="reveal-up delay-2 mt-9 flex flex-col gap-3 sm:flex-row">
							<Link to={cta.primary.to} className="button-primary">
								{cta.primary.label}
							</Link>
							<Link to="/what-you-own" className="button-secondary">
								What you own
							</Link>
						</div>
						<p className="reveal-up delay-3 mt-7 font-mono text-sm text-mute">
							Managed tier: {pricing.currency} {setup.amount} setup, then{" "}
							{pricing.currency} {platform.amount} a month. Both + GST.
						</p>
					</div>

					<figure className="reveal-up delay-2 m-0">
						<OwnershipSplit />
						<figcaption className="mt-3 text-sm text-mute">
							Where ownership divides. Same split in both tiers.
						</figcaption>
					</figure>
				</div>
			</section>

			{/* The problem */}
			<Section label="The problem">
				<h2 className="h2 max-w-3xl">
					Most businesses don’t need more software. They need the software they
					have to work as one system, and someone accountable for running it.
				</h2>
				<dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2">
					{pains.map((pain) => (
						<div key={pain.who} className="bg-surface p-6">
							<dt className="label">{pain.who}</dt>
							<dd className="m-0 mt-2 text-[1.05rem] leading-snug text-ink text-pretty">
								{pain.what}
							</dd>
						</div>
					))}
				</dl>
				<Link to="/what-we-build" className="button-ghost mt-6">
					What we build for each of them
				</Link>
			</Section>

			{/* The platform */}
			<Section label="The platform">
				<h2 className="h2 max-w-3xl">
					One tested platform. Your system on it.
				</h2>
				<p className="prose mt-6 text-ink-soft">
					Every Mation client runs on the same spine: tenancy, identity,
					permissions, audit, events, entitlements and an AI gate. Your business
					gets a solution pack that describes how it runs — workflows, forms,
					rules, reports, roles, brand — and, only where the platform lacks a
					capability you need, a domain module written for you. A new system is
					configuration, not a new codebase. That is why it arrives in weeks,
					and why every client gets every fix.
				</p>
				<div className="mt-10">
					<PlatformFacts />
				</div>
				<Link to="/how-it-works" className="button-ghost mt-6">
					How it works, layer by layer
				</Link>
			</Section>

			{/* What you own — the centrepiece */}
			<Section label="What you own">
				<h2 className="h2 max-w-3xl">{ownershipProse.title}</h2>
				<p className="prose mt-6 text-ink-soft">{ownershipProse.intro}</p>
				<div className="mt-10">
					<OwnershipLedger />
				</div>
				<p className="prose mt-8 text-ink-soft">
					<strong className="font-semibold text-ink">
						The limit, out loud.
					</strong>{" "}
					{ownershipProse.limit} So we don’t make the usual claim about “the
					code”. We say: you own your domain module’s source under a perpetual
					licence, and it runs on the Mation platform.
				</p>
				<Link to="/what-you-own" className="button-ghost mt-6">
					The full answer, including what happens if we’re not here
				</Link>
			</Section>

			{/* Two tiers */}
			<Section label="Two tiers">
				<h2 className="h2 max-w-3xl">
					One tier is priced. The other is a conversation.
				</h2>
				<p className="prose mt-6 text-ink-soft">
					What you own is identical in both. The only thing that changes is who
					operates the infrastructure.
				</p>
				<div className="mt-10">
					<Tiers />
				</div>
			</Section>

			{/* Pricing */}
			<Section label="Pricing">
				<h2 className="h2 max-w-3xl">The price, stated in full.</h2>
				<p className="prose mt-6 text-ink-soft">
					We don’t price per user, so the price does not move when you hire.
					Usage is metered, visible, and capped.
				</p>
				<div className="mt-10">
					<PriceLadder compact />
				</div>
				<Link to="/pricing" className="button-ghost mt-6">
					What each line covers
				</Link>
			</Section>

			<Boundary />

			{/* Security */}
			<Section label="Security">
				<h2 className="h2 max-w-3xl">Part of the platform, not a bolt-on.</h2>
				<p className="prose mt-6 text-ink-soft">
					Least-privilege access by role, approval gates on sensitive actions, a
					full audit trail of every action, and tenant isolation enforced in the
					database. We start read-only and widen access one deliberate step at a
					time.
				</p>
				<Link to="/security" className="button-ghost mt-6">
					Security and governance, in detail
				</Link>
			</Section>

			{/* Reading */}
			{reading.length > 0 ? (
				<Section label="Reading">
					<h2 className="h2 max-w-3xl">Written from the work.</h2>
					<ul className="m-0 mt-8 list-none divide-y divide-border border-y border-border-strong p-0">
						{reading.map((article) => (
							<li key={article.slug}>
								<Link
									to="/insights/$slug"
									params={{ slug: article.slug }}
									className="group grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_8rem] sm:items-baseline"
								>
									<span>
										<span className="h3 block !text-[1.25rem] transition-colors group-hover:text-violet-ink">
											{article.title}
										</span>
										<span className="mt-1.5 block text-[0.95rem] leading-relaxed text-mute">
											{article.excerpt}
										</span>
									</span>
									<span className="font-mono text-sm text-mute sm:text-right">
										{article.readTime}
									</span>
								</Link>
							</li>
						))}
					</ul>
					<Link to="/insights" className="button-ghost mt-6">
						All insights
					</Link>
				</Section>
			) : null}

			<CTASection
				title="Tell us how your business runs."
				description="We’ll tell you what a system on our platform would cost, what you’d own, and how long it would take. If we’re the wrong fit, we’ll say so and tell you who to call."
				secondary={{ label: "See pricing", to: "/pricing" }}
			/>
		</>
	);
}
