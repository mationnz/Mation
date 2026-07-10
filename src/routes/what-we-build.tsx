import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AppWindow,
	ArrowRight,
	Blocks,
	ClipboardCheck,
	Database,
	HardHat,
	LayoutDashboard,
	LineChart,
	type LucideIcon,
	Network,
	PenTool,
	Search,
	ShieldCheck,
	Users,
	Workflow,
} from "lucide-react";

import CTASection from "../components/CTASection";
import MagneticLink from "../components/MagneticLink";

export const Route = createFileRoute("/what-we-build")({
	component: WhatWeBuildPage,
	head: () => ({
		meta: [
			{ title: "What we build — Bespoke systems engineered around you" },
			{
				name: "description",
				content:
					"We don't sell a product. We build the system your business needs — bespoke applications, automation, integrations, and one unified data layer, powered by AI.",
			},
			{
				property: "og:title",
				content: "What we build — The system your business needs",
			},
			{
				property: "og:description",
				content:
					"Bespoke applications, workflow automation and AI agents, systems integration, internal tools, and one unified data layer — engineered around exactly how you operate.",
			},
		],
	}),
});

type Capability = {
	n: string;
	icon: LucideIcon;
	title: string;
	what: string;
	points: string[];
};

const capabilities: Capability[] = [
	{
		n: "01",
		icon: AppWindow,
		title: "Bespoke business applications",
		what: "Software built to your exact workflow — not a template you bend to fit.",
		points: [
			"Modelled on your real process, edge cases and all",
			"Roles, permissions, and approvals built to how you operate",
			"One place to do the work — no tab-hopping",
		],
	},
	{
		n: "02",
		icon: Workflow,
		title: "Workflow automation & AI agents",
		what: "Automate the manual admin and hand-offs that quietly eat your team's week.",
		points: [
			"Triggered, multi-step workflows across your systems",
			"AI agents that draft, classify, and route — human in the loop",
			"Every automated action logged, scoped, and reversible",
		],
	},
	{
		n: "03",
		icon: Network,
		title: "Systems integration",
		what: "Connect the tools you already run into one reliable source of truth.",
		points: [
			"Connectors to your CRM, ERP, finance, and support tools",
			"Two-way sync that keeps records consistent, not duplicated",
			"A clean layer over legacy systems — no rip-and-replace",
		],
	},
	{
		n: "04",
		icon: LayoutDashboard,
		title: "Internal tools & operations dashboards",
		what: "The control surfaces your team needs to run operations clearly.",
		points: [
			"Live dashboards built around the decisions you make",
			"Admin tools and back-office screens, not generic CRUD",
			"Alerts and rollups so issues surface before they bite",
		],
	},
	{
		n: "05",
		icon: Database,
		title: "The unified data layer",
		what: "One shared model of your business — a single, agreed definition of how you operate.",
		points: [
			"A shared model of your customers, jobs, assets, and money",
			"One definition for every entity — referenced everywhere",
			"The clean foundation that makes AI accurate and trustworthy",
		],
	},
];

type Audience = {
	icon: LucideIcon;
	role: string;
	build: string;
};

const audiences: Audience[] = [
	{
		icon: LineChart,
		role: "Executives & owners",
		build:
			"A single live view of the business — pipeline, delivery, and cash, side by side.",
	},
	{
		icon: Users,
		role: "Operations & project managers",
		build:
			"Workflows that capture updates once and turn hand-offs into automatic next steps.",
	},
	{
		icon: ClipboardCheck,
		role: "Compliance & quality",
		build:
			"Records and evidence captured as work happens — audit packs assembled on demand.",
	},
	{
		icon: HardHat,
		role: "Field & frontline teams",
		build:
			"Fast capture on any device that flows straight into the system as the source of truth.",
	},
	{
		icon: ShieldCheck,
		role: "IT & security",
		build:
			"One governed system with access control, audit trails, and data that stays yours.",
	},
];

const buildSteps = [
	{
		n: "01",
		title: "Learn",
		desc: "We map how your business actually runs before we design anything.",
		icon: Search,
	},
	{
		n: "02",
		title: "Blueprint",
		desc: "We design the system and the value case, so you see the path first.",
		icon: PenTool,
	},
	{
		n: "03",
		title: "Build",
		desc: "We ship in increments — you see it working early, not at the end.",
		icon: Blocks,
	},
];

function WhatWeBuildPage() {
	return (
		<>
			{/* ---------- Hero ---------- */}
			<section className="relative overflow-hidden">
				<div className="aurora" aria-hidden />
				<div className="site-wide relative flex min-h-[72vh] flex-col items-center justify-center py-24 text-center">
					<p className="kicker reveal-up justify-center">What we build</p>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[18ch] text-[2.7rem] leading-[1.04] text-ink sm:text-6xl lg:text-[4.4rem]">
						We don’t sell a product. We build the{" "}
						<span className="gradient-ink">system your business needs.</span>
					</h1>
					<p className="reveal-up delay-2 mt-7 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
						No two businesses run the same way, so no two systems should. We
						engineer software around exactly how you operate — with AI as the
						engine underneath.
					</p>
					<div className="reveal-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Book a free call
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink to="/approach" className="button-secondary !px-6 !py-3">
							See our approach
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* ---------- Capabilities ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						The system, layer by layer
					</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						Five ways we build the system you run on.
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute">
						Not a menu to pick from. We combine these into one system, engineered
						for your business.
					</p>
				</div>

				<div className="reveal-stagger grid gap-5">
					{capabilities.map((cap) => (
						<article
							key={cap.n}
							data-spotlight
							className="panel panel-hover p-8 sm:p-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
						>
							<div>
								<div className="flex items-center gap-4">
									<span className="font-heading text-lg font-semibold text-violet/40">
										{cap.n}
									</span>
									<span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
										<cap.icon className="h-5 w-5" />
									</span>
								</div>
								<h3 className="mt-6 font-heading text-2xl font-semibold text-ink">
									{cap.title}
								</h3>
								<p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mute">
									{cap.what}
								</p>
							</div>

							<ul className="mt-7 space-y-3 lg:mt-0 lg:self-center">
								{cap.points.map((point) => (
									<li key={point} className="flex items-start gap-3">
										<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
										<span className="text-[0.95rem] leading-relaxed text-ink-soft">
											{point}
										</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			{/* ---------- Who it's for ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						Who it’s for
					</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						What we’d build for you.
					</h2>
				</div>

				<div className="reveal-stagger grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{audiences.map((aud) => (
						<article
							key={aud.role}
							data-spotlight
							className="panel panel-hover p-7"
						>
							<div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
								<aud.icon className="h-5 w-5" />
							</div>
							<h3 className="mt-5 font-heading text-lg font-semibold text-ink">
								{aud.role}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-mute">
								{aud.build}
							</p>
						</article>
					))}
					<Link
						to="/work"
						className="panel panel-hover group flex flex-col justify-between bg-surface-violet p-7"
					>
						<ArrowRight className="h-6 w-6 text-violet transition-transform duration-200 group-hover:translate-x-0.5" />
						<span className="mt-8 font-heading text-lg font-semibold text-ink">
							See systems we’ve built
						</span>
					</Link>
				</div>
			</section>

			{/* ---------- How a build comes together ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">How we help</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						We learn how you run, then build what runs it.
					</h2>
				</div>
				<div className="reveal-stagger grid gap-10 md:grid-cols-3">
					{buildSteps.map((step) => (
						<div key={step.n}>
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
								<step.icon className="h-5 w-5" />
							</div>
							<div className="mt-5 flex items-baseline gap-3">
								<span className="font-heading text-2xl font-semibold text-violet/30">
									{step.n}
								</span>
								<h3 className="font-heading text-2xl font-semibold text-ink">
									{step.title}
								</h3>
							</div>
							<p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			<CTASection
				title="Tell us how your business runs. We’ll show you the system it deserves."
				description="Start with a discovery call. We’ll learn how you work today and map what one bespoke system could change."
				primaryLabel="Book a free call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
