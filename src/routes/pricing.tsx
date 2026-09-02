import { createFileRoute, Link } from "@tanstack/react-router";

import Boundary from "../components/Boundary";
import CTASection from "../components/CTASection";
import PriceLadder from "../components/PriceLadder";
import Section from "../components/Section";
import Tiers from "../components/Tiers";
import { pricing } from "../content/site";

export const Route = createFileRoute("/pricing")({
	component: PricingPage,
	head: () => ({
		meta: [
			{ title: "Pricing — Mation" },
			{
				name: "description",
				content:
					"Managed tier: NZD 25,000 setup and NZD 4,000 a month on a 24-month term, plus GST. Domain modules from NZD 35,000. Usage at cost plus 30%, capped. No per-user pricing. Owned deployment is scoped, not priced.",
			},
			{ property: "og:title", content: "Pricing — Mation" },
			{
				property: "og:description",
				content:
					"One priced tier, stated in full in NZD and exclusive of GST. No ranges, no per-user pricing.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const setupCovers = [
	{
		title: "Discovery",
		body: "We map how your business runs: the processes, the hand-offs, the records that matter, and the systems you keep.",
	},
	{
		title: "Configuration",
		body: "We write your solution pack — workflows, forms, rules, reports, roles, brand and vocabulary — on the platform.",
	},
	{
		title: "Go-live",
		body: "Your team on the system, with your data in it. The setup fee is paid before this happens.",
	},
];

const platformCovers = [
	"Hosting on Mation infrastructure, with tenant isolation enforced in the database.",
	"Monitoring and support.",
	"Platform updates — every fix every other client gets.",
	"A 24-month term, fixed monthly, so the number on the invoice matches the number on this page.",
];

const principles = [
	{
		title: "We don’t price per user.",
		body: "The price does not move when you hire. Per-user pricing punishes growth; ours ignores it.",
	},
	{
		title: "Usage is metered, visible, and capped.",
		body: "SMS, AI, OCR and scanning are passed through at cost plus 30%. You can see the meter, and there is a cap so it cannot run away.",
	},
	{
		title: "A domain module is priced only when you need one.",
		body: "Most of what a business needs is configuration. If discovery shows the platform lacks a capability you genuinely need, we quote the module separately and license the source to you.",
	},
	{
		title: "Every price carries its currency and its GST position.",
		body: "New Zealand dollars, exclusive of GST, on this page and on every invoice.",
	},
];

const questions = [
	{
		q: "Is GST included?",
		a: "No. Every price on this page is in New Zealand dollars and excludes GST. GST is added on the invoice.",
	},
	{
		q: "When is the setup fee paid?",
		a: "Before go-live. It covers discovery, configuration and go-live, and it is the only one-off charge unless you need a domain module.",
	},
	{
		q: "What counts as usage?",
		a: "Anything we pay a provider for on your behalf: SMS, AI tokens, OCR, document scanning. It is metered, shown to you, and capped.",
	},
	{
		q: "What is a domain module?",
		a: "Capability the platform doesn’t have yet, built as a module for your business. You get a perpetual licence to its source. It runs on the Mation platform.",
	},
	{
		q: "Is there a guarantee?",
		a: "Not a published one. We would rather show you the agreement, the scope and the price in writing than promise an outcome we haven’t measured.",
	},
	{
		q: "What about Owned deployment?",
		a: "It has no price on this page on purpose. If shared infrastructure is ruled out for you, we scope what is possible for your situation and tell you honestly what it costs and how long it takes.",
	},
];

function PricingPage() {
	return (
		<>
			<section className="site-wide section pt-8 sm:pt-14">
				<h1 className="display reveal-up max-w-4xl">
					The price, stated in full.
				</h1>
				<p className="lede reveal-up delay-1 mt-7">
					One priced tier, in New Zealand dollars, exclusive of GST. No ranges,
					no “from”, no per-user pricing. If the numbers below are wrong for
					you, the honest thing is to say so now, not after a discovery call.
				</p>
			</section>

			<section className="site-wide pb-6 reveal-up delay-2">
				<PriceLadder />
			</section>

			<Section label="What the setup covers">
				<ol className="m-0 grid list-none gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border p-0 md:grid-cols-3">
					{setupCovers.map((item, i) => (
						<li key={item.title} className="bg-surface p-6">
							<span className="font-mono text-sm text-mute">0{i + 1}</span>
							<h2 className="h3 mt-3 !text-[1.2rem]">{item.title}</h2>
							<p className="mt-2 text-[0.95rem] leading-relaxed text-mute">
								{item.body}
							</p>
						</li>
					))}
				</ol>
				<p className="mt-5 flex flex-wrap items-baseline gap-x-2 text-mute">
					<span className="money text-[1.2rem] text-violet-ink">
						{pricing.currency} {pricing.lines[0].amount}
					</span>
					<span className="text-sm">one-off, + GST, paid before go-live.</span>
				</p>
			</Section>

			<Section label="What the platform fee covers">
				<ul className="m-0 list-none divide-y divide-border border-y border-border-strong p-0">
					{platformCovers.map((item) => (
						<li
							key={item}
							className="py-4 text-[1.02rem] leading-relaxed text-ink-soft"
						>
							{item}
						</li>
					))}
				</ul>
				<p className="mt-5 flex flex-wrap items-baseline gap-x-2 text-mute">
					<span className="money text-[1.2rem] text-violet-ink">
						{pricing.currency} {pricing.lines[1].amount}
					</span>
					<span className="text-sm">per month, + GST, {pricing.term}.</span>
				</p>
			</Section>

			<Section label="Two tiers">
				<h2 className="h2 max-w-3xl">
					What you own is identical in both. Who runs the infrastructure is not.
				</h2>
				<div className="mt-10">
					<Tiers />
				</div>
				<p className="mt-6 text-[0.95rem] text-mute">
					The full split is on{" "}
					<Link to="/what-you-own" className="link-underline">
						what you own
					</Link>
					.
				</p>
			</Section>

			<Section label="How we price">
				<ul className="m-0 list-none divide-y divide-border p-0">
					{principles.map((item) => (
						<li key={item.title} className="py-6 first:pt-0">
							<h2 className="h3">{item.title}</h2>
							<p className="prose mt-2 text-ink-soft">{item.body}</p>
						</li>
					))}
				</ul>
			</Section>

			<Section label="Questions">
				<dl className="m-0 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2">
					{questions.map((item) => (
						<div key={item.q} className="bg-surface p-6">
							<dt className="h3 !text-[1.15rem]">{item.q}</dt>
							<dd className="m-0 mt-3 text-[0.95rem] leading-relaxed text-mute text-pretty">
								{item.a}
							</dd>
						</div>
					))}
				</dl>
			</Section>

			<Boundary />

			<CTASection
				title="Want the number for your business, in writing?"
				description="Tell us how you run. We’ll come back with a scope, a fixed price, and what you’d own — or an honest no."
				secondary={{ label: "What you own", to: "/what-you-own" }}
			/>
		</>
	);
}
