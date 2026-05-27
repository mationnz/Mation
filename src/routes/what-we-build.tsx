import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AppWindow,
	ArrowRight,
	Blocks,
	Boxes,
	ClipboardCheck,
	Cpu,
	Database,
	GitBranch,
	HardHat,
	LayoutDashboard,
	LineChart,
	type LucideIcon,
	Network,
	PenTool,
	Plug,
	Search,
	ShieldCheck,
	Users,
	Workflow,
} from "lucide-react";

import CapabilityStack from "../components/CapabilityStack";
import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import ProcessFlow from "../components/ProcessFlow";

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
	when: string;
	changes: string;
	points: { icon: LucideIcon; label: string }[];
};

const capabilities: Capability[] = [
	{
		n: "01",
		icon: AppWindow,
		title: "Bespoke business applications",
		what: "Software built to your exact workflow — not a template you bend to fit.",
		when: "When off-the-shelf tools force your team to work around them, not with them.",
		changes: "Your process becomes the product, and the software finally fits.",
		points: [
			{
				icon: GitBranch,
				label: "Modelled on your real process, edge cases and all",
			},
			{
				icon: Boxes,
				label: "Roles, permissions, and approvals built to how you operate",
			},
			{ icon: AppWindow, label: "One place to do the work — no tab-hopping" },
		],
	},
	{
		n: "02",
		icon: Workflow,
		title: "Workflow automation & AI agents",
		what: "Automate the manual admin and hand-offs that quietly eat your team's week.",
		when: "When people re-key data, chase updates, and copy between systems by hand.",
		changes:
			"The busywork runs itself, and your team spends time on the work that counts.",
		points: [
			{
				icon: Workflow,
				label: "Triggered, multi-step workflows across your systems",
			},
			{
				icon: Cpu,
				label:
					"AI agents that draft, classify, and route — with a human in the loop",
			},
			{
				icon: ShieldCheck,
				label: "Every automated action logged, scoped, and reversible",
			},
		],
	},
	{
		n: "03",
		icon: Network,
		title: "Systems integration",
		what: "Connect the tools you already run into one reliable source of truth.",
		when: "When the same record lives in five places and none of them quite agree.",
		changes:
			"Your systems speak to each other, and everyone works from the same numbers.",
		points: [
			{
				icon: Plug,
				label: "Connectors to your CRM, ERP, finance, and support tools",
			},
			{
				icon: Network,
				label: "Two-way sync that keeps records consistent, not duplicated",
			},
			{
				icon: GitBranch,
				label: "A clean layer over legacy systems — no rip-and-replace",
			},
		],
	},
	{
		n: "04",
		icon: LayoutDashboard,
		title: "Internal tools & operations dashboards",
		what: "The control surfaces your team needs to run operations clearly.",
		when: "When status lives in someone's head, a spreadsheet, or last week's email.",
		changes: "The state of the business is visible in one place, in real time.",
		points: [
			{
				icon: LayoutDashboard,
				label: "Live dashboards built around the decisions you make",
			},
			{
				icon: ClipboardCheck,
				label: "Admin tools and back-office screens, not generic CRUD",
			},
			{
				icon: Cpu,
				label: "Alerts and rollups so issues surface before they bite",
			},
		],
	},
	{
		n: "05",
		icon: Database,
		title: "The unified data layer",
		what: "One model of your business — the ontology of how you operate.",
		when: "When every tool defines a customer, job, or invoice in its own way.",
		changes:
			"Every system speaks the same language, and your data becomes an asset.",
		points: [
			{
				icon: Database,
				label: "A shared model of your customers, jobs, assets, and money",
			},
			{
				icon: Boxes,
				label: "One definition for every entity — referenced everywhere",
			},
			{
				icon: Cpu,
				label: "The clean foundation that makes AI accurate and trustworthy",
			},
		],
	},
];

type Audience = {
	icon: LucideIcon;
	role: string;
	scenario: string;
	build: string;
};

const audiences: Audience[] = [
	{
		icon: LineChart,
		role: "Executives & owners",
		scenario:
			"You're making calls on data that's days old and scattered across reports.",
		build:
			"A single live view of the business — pipeline, delivery, and cash, side by side.",
	},
	{
		icon: Users,
		role: "Operations & project managers",
		scenario:
			"Your week disappears into status updates, re-keying, and chasing people.",
		build:
			"Workflows that capture updates once and turn hand-offs into automatic next steps.",
	},
	{
		icon: ClipboardCheck,
		role: "Compliance & quality",
		scenario:
			"Audit prep means weeks of stitching evidence together from a dozen places.",
		build:
			"Records and evidence captured as work happens — audit packs assembled on demand.",
	},
	{
		icon: HardHat,
		role: "Field & frontline teams",
		scenario:
			"Reporting from the field is slow, and what gets captured often goes missing.",
		build:
			"Fast capture on any device that flows straight into the system as the source of truth.",
	},
	{
		icon: ShieldCheck,
		role: "IT & security",
		scenario:
			"Every new tool is another integration to maintain and another surface to secure.",
		build:
			"One governed system with access control, audit trails, and data that stays yours.",
	},
];

const heroLayers = [
	{
		tag: "Applications",
		label: "Software built to your workflow",
		icon: AppWindow,
	},
	{ tag: "Automation", label: "Workflows & AI agents", icon: Workflow },
	{
		tag: "Integration",
		label: "Your existing tools, connected",
		icon: Network,
	},
	{
		tag: "Tools",
		label: "Dashboards & operations screens",
		icon: LayoutDashboard,
	},
	{ tag: "Data", label: "One unified model of your business", icon: Database },
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
			<InteractiveAura />

			{/* Hero */}
			<section className="glow section-shell">
				<div className="site-wide">
					<div className="dimline reveal-up mb-10">
						What we build — one bespoke system, five layers
					</div>
					<div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
						<div className="space-y-7">
							<p className="kicker reveal-up">What we build</p>
							<h1 className="reveal-up delay-1 display text-[2.6rem] text-ink sm:text-6xl lg:text-[3.9rem]">
								We don't sell a product. We build the{" "}
								<span className="gradient-ink">
									system your business needs.
								</span>
							</h1>
							<p className="reveal-up delay-2 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
								No two businesses run the same way, so no two systems should. We
								engineer software around exactly how you operate — your tools,
								your data, your workflows, unified into one — with AI as the
								engine underneath.
							</p>
							<div className="reveal-up delay-3 flex flex-col gap-3 sm:flex-row">
								<MagneticLink to="/contact" className="button-primary">
									Book a discovery call
									<ArrowRight className="h-4 w-4" />
								</MagneticLink>
								<MagneticLink to="/approach" className="button-secondary">
									See our approach
								</MagneticLink>
							</div>
						</div>

						<div className="reveal-up delay-2 relative">
							<div className="bracket">
								<CapabilityStack layers={heroLayers} />
							</div>
							<div className="absolute -right-3 -top-3 hidden rounded-lg border border-line bg-canvas px-3 py-2 sm:block">
								<span className="bp-coord">Engineered around you</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Capabilities */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-10 flex flex-wrap items-end justify-between gap-4">
					<div className="max-w-2xl">
						<p className="section-index mb-4">
							<b>01</b> &nbsp;/&nbsp; Capabilities
						</p>
						<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							Five ways we build the system you run on.
						</h2>
						<p className="mt-4 text-pretty text-mute">
							We don't pick from a menu. We combine these into one system,
							engineered for your business — not a product you adopt.
						</p>
					</div>
					<p className="dimline hidden max-w-xs md:flex">
						Combined · not à la carte
					</p>
				</div>

				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)]">
					{capabilities.map((cap) => (
						<article
							key={cap.n}
							className="group relative bg-panel p-7 transition-colors duration-200 hover:bg-panel-2/40 sm:p-9 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
						>
							<span className="bp-coord absolute right-6 top-6 hidden sm:block">
								FIG.{cap.n}
							</span>
							<div>
								<div className="flex items-center gap-4">
									<span className="font-mono text-sm text-violet-bright">
										{cap.n}
									</span>
									<span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-line bg-white/[0.03] text-violet-bright">
										<span
											aria-hidden
											className="pointer-events-none absolute inset-0 opacity-40"
											style={{
												backgroundImage:
													"linear-gradient(rgba(123,97,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.18) 1px, transparent 1px)",
												backgroundSize: "8px 8px",
											}}
										/>
										<cap.icon className="relative h-5 w-5" />
									</span>
								</div>
								<h3 className="mt-5 font-heading text-2xl font-semibold text-ink">
									{cap.title}
								</h3>
								<dl className="mt-5 space-y-4">
									<div>
										<dt className="font-mono text-xs uppercase tracking-[0.16em] text-violet-bright/90">
											What it is
										</dt>
										<dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/85">
											{cap.what}
										</dd>
									</div>
									<div>
										<dt className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
											When you need it
										</dt>
										<dd className="mt-1.5 text-[0.95rem] leading-relaxed text-mute">
											{cap.when}
										</dd>
									</div>
									<div>
										<dt className="font-mono text-xs uppercase tracking-[0.16em] text-mute">
											What changes for you
										</dt>
										<dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/85">
											{cap.changes}
										</dd>
									</div>
								</dl>
							</div>

							<ul className="mt-7 flex flex-col gap-px self-start overflow-hidden rounded-[12px] border border-line bg-[var(--color-line)] lg:mt-0">
								{cap.points.map((point) => (
									<li
										key={point.label}
										className="flex items-start gap-3 bg-panel p-4"
									>
										<point.icon className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" />
										<span className="text-sm leading-relaxed text-ink/80">
											{point.label}
										</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			{/* Who it's for */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-10 flex flex-wrap items-end justify-between gap-6">
					<div className="max-w-2xl">
						<p className="section-index mb-4">
							<b>02</b> &nbsp;/&nbsp; Who it's for
						</p>
						<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							What we'd build for you.
						</h2>
						<p className="mt-4 text-pretty text-mute">
							The same capabilities, shaped to the people who run the work. A
							few of the places a bespoke system earns its keep.
						</p>
					</div>
					<div className="shrink-0">
						<div className="font-heading text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">
							<span className="gradient-ink">5</span>
						</div>
						<p className="bp-coord mt-2">Teams it earns its keep</p>
					</div>
				</div>

				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
					{audiences.map((aud) => (
						<article
							key={aud.role}
							className="group bg-panel p-7 transition-colors duration-200 hover:bg-panel-2/40"
						>
							<div className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-line bg-white/[0.03] text-violet-bright">
								<span
									aria-hidden
									className="pointer-events-none absolute inset-0 opacity-40"
									style={{
										backgroundImage:
											"linear-gradient(rgba(123,97,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.18) 1px, transparent 1px)",
										backgroundSize: "8px 8px",
									}}
								/>
								<aud.icon className="relative h-5 w-5" />
							</div>
							<h3 className="mt-5 font-heading text-lg font-semibold text-ink">
								{aud.role}
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-mute">
								{aud.scenario}
							</p>
							<hr className="hairline my-4" />
							<p className="font-mono text-xs uppercase tracking-[0.16em] text-violet-bright/90">
								We'd build
							</p>
							<p className="mt-2 text-sm leading-relaxed text-ink/85">
								{aud.build}
							</p>
						</article>
					))}
					<Link
						to="/work"
						className="panel-hover group flex flex-col justify-between bg-panel bg-[radial-gradient(circle_at_80%_-10%,rgba(123,97,255,0.12),transparent_55%)] p-7"
					>
						<ArrowRight className="h-6 w-6 text-violet-bright transition-transform duration-200 group-hover:translate-x-0.5" />
						<span className="mt-8 font-heading text-lg font-semibold text-ink">
							See systems we've built
						</span>
					</Link>
				</div>
			</section>

			{/* How a build comes together */}
			<section className="glow site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<div className="reveal-scroll mb-10 flex flex-wrap items-end justify-between gap-4">
						<div>
							<p className="section-index mb-4">
								<b>03</b> &nbsp;/&nbsp; How a build comes together
							</p>
							<h2 className="max-w-xl font-heading text-3xl font-semibold text-ink sm:text-[2.2rem]">
								We learn how you run, then build the system that runs it.
							</h2>
						</div>
						<Link to="/approach" className="button-ghost shrink-0">
							The full approach <ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<p className="dimline mb-8">Discovery → live system</p>
					<div className="reveal-scroll">
						<ProcessFlow steps={buildSteps} />
					</div>
				</div>
			</section>

			<CTASection
				title="Tell us how your business runs. We'll show you the system it deserves."
				description="Start with a discovery call. We'll learn how you work today and map what one bespoke system could change."
				primaryLabel="Book a discovery call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
