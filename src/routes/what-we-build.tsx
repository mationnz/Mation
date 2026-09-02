import { createFileRoute, Link } from "@tanstack/react-router";

import CTASection from "../components/CTASection";
import Section from "../components/Section";

export const Route = createFileRoute("/what-we-build")({
	component: WhatWeBuildPage,
	head: () => ({
		meta: [
			{ title: "What we build — Mation" },
			{
				name: "description",
				content:
					"Operational software for the people who run the work: applications, workflows with approval gates, one record of every job and customer, integrations to the tools you keep, and AI assistance behind a governed gate — configured on the Mation platform.",
			},
			{ property: "og:title", content: "What we build — Mation" },
			{
				property: "og:description",
				content:
					"Not a product you adapt to. A system configured around how your business runs, on a platform we maintain for every client.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const audiences = [
	{
		role: "Operations and project managers",
		scenario:
			"Your week disappears into status updates, re-keying, and chasing people.",
		build:
			"Workflows that capture updates once and turn hand-offs into automatic next steps.",
	},
	{
		role: "Owners and executives",
		scenario:
			"You’re making calls on data that’s days old and scattered across reports.",
		build:
			"A single live view of the business — pipeline, delivery, and cash, side by side.",
	},
	{
		role: "Compliance and quality",
		scenario:
			"Audit prep means weeks of stitching evidence together from a dozen places.",
		build:
			"Records and evidence captured as work happens — audit packs assembled on demand.",
	},
	{
		role: "Field and frontline teams",
		scenario:
			"Reporting from the field is slow, and what gets captured often goes missing.",
		build:
			"Fast capture on any device that flows straight into the system as the source of truth.",
	},
	{
		role: "IT and security",
		scenario:
			"Every new tool is another integration to maintain and another surface to secure.",
		build:
			"One governed system with access control, audit trails, and data that stays yours.",
	},
];

const parts = [
	{
		name: "Applications",
		desc: "The screens your team works in — one place to do the work, in your brand, on any device.",
	},
	{
		name: "Workflows and approvals",
		desc: "Multi-step processes that run the same way every time, with approval gates on the steps that matter.",
	},
	{
		name: "Records and reporting",
		desc: "One definition of every job, customer, asset and invoice, and reports built on it rather than exported from it.",
	},
	{
		name: "Roles and permissions",
		desc: "Who can see and do what, by role, enforced in the platform rather than agreed in a meeting.",
	},
	{
		name: "Integrations",
		desc: "Connections to the tools you keep, scoped to what you approve. We’ll tell you in discovery which ones exist today and which we would build.",
	},
	{
		name: "AI assistance",
		desc: "Drafting, extraction, classification and routing, behind the platform’s AI gate and recorded in the audit trail — with a person in the loop where you want one.",
	},
];

const isnt = [
	{
		lead: "Not a template.",
		body: "Your solution pack describes how your business runs. Nobody else’s does.",
	},
	{
		lead: "Not a per-user tool you bend your process around.",
		body: "The process is the product, and the price does not move when you hire.",
	},
	{
		lead: "Not a codebase we hand over and leave.",
		body: "You own your data, your configuration and your domain code. We run the platform they sit on.",
	},
];

function WhatWeBuildPage() {
	return (
		<>
			<section className="site-wide section pt-8 sm:pt-14">
				<h1 className="display reveal-up max-w-4xl">
					Operational software for the people who run the work.
				</h1>
				<p className="lede reveal-up delay-1 mt-7">
					Not a product you adapt to. A system configured around how your
					business runs, built from the platform’s capabilities so it arrives in
					weeks, and run by us so it keeps working.
				</p>
			</section>

			<Section label="Who it’s for">
				<h2 className="h2 max-w-3xl">
					Where the week goes, and what we’d build.
				</h2>
				<div className="mt-10 ledger">
					<div className="ledger-row ledger-head hidden sm:grid">
						<span>Who</span>
						<span>Today</span>
						<span>We’d build</span>
					</div>
					{audiences.map((item) => (
						<div key={item.role} className="ledger-row">
							<span className="ledger-layer !text-[1.05rem]">{item.role}</span>
							<span className="ledger-detail">{item.scenario}</span>
							<span className="text-ink-soft leading-relaxed">
								{item.build}
							</span>
						</div>
					))}
				</div>
			</Section>

			<Section label="What it’s made of">
				<h2 className="h2 max-w-3xl">
					Six parts, configured together. Not a menu.
				</h2>
				<dl className="m-0 mt-10 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{parts.map((part) => (
						<div key={part.name} className="bg-surface p-6">
							<dt className="h3 !text-[1.15rem]">{part.name}</dt>
							<dd className="m-0 mt-3 text-[0.95rem] leading-relaxed text-mute text-pretty">
								{part.desc}
							</dd>
						</div>
					))}
				</dl>
			</Section>

			<Section label="What it isn’t">
				<ul className="m-0 list-none divide-y divide-border border-y border-border-strong p-0">
					{isnt.map((item) => (
						<li key={item.lead} className="py-5 text-[1.05rem] leading-relaxed">
							<span className="font-semibold text-ink">{item.lead}</span>{" "}
							<span className="text-ink-soft">{item.body}</span>
						</li>
					))}
				</ul>
				<Link to="/what-you-own" className="button-ghost mt-6">
					Exactly what you own
				</Link>
			</Section>

			<Section label="How it’s built">
				<h2 className="h2 max-w-3xl">
					Discovery, configuration, go-live. Weeks, not quarters.
				</h2>
				<p className="prose mt-6 text-ink-soft">
					Every client runs on the same tested platform, so a new system is
					configuration rather than a new codebase. Where the platform lacks a
					capability you genuinely need, we build it as a domain module and
					license the source to you.
				</p>
				<Link to="/how-it-works" className="button-ghost mt-6">
					How it works, step by step
				</Link>
			</Section>

			<CTASection
				title="Tell us where the week goes."
				description="Describe how your business runs today and what isn’t working. We’ll tell you what we’d configure, what we’d build, and what it would cost."
				secondary={{ label: "See pricing", to: "/pricing" }}
			/>
		</>
	);
}
