import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AppWindow,
	ArrowRight,
	ArrowUpRight,
	Check,
	Database,
	LayoutDashboard,
	Minus,
	Network,
	ShieldCheck,
	Workflow,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import SystemMap from "../components/SystemMap";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{
				title: "Mation — The operating system your business runs on",
			},
			{
				name: "description",
				content:
					"Mation builds bespoke software that unifies your tools, data, and workflows into one operating system — engineered around exactly how you operate, powered by AI.",
			},
			{
				property: "og:title",
				content: "Mation — The operating system your business runs on",
			},
			{
				property: "og:description",
				content:
					"Bespoke software that unifies your tools, data, and workflows into one system — engineered around exactly how you operate, powered by AI.",
			},
			{
				property: "og:type",
				content: "website",
			},
		],
	}),
});

const problems = [
	"Your data is trapped across a dozen tools that were never meant to talk to each other.",
	"Your team loses hours every week to manual admin, re-keying, and chasing updates.",
	"Every hand-off between systems is another chance for delay, error, and lost context.",
	"AI pilots never stick, because they live outside how your business actually works.",
];

const steps = [
	{
		n: "01",
		title: "Learn",
		desc: "We map how your business actually runs — every process, hand-off, and spreadsheet.",
	},
	{
		n: "02",
		title: "Blueprint",
		desc: "We design the system and the value case, so you see the path before we build.",
	},
	{
		n: "03",
		title: "Build",
		desc: "We ship in increments. You see it working early — not at the very end.",
	},
	{
		n: "04",
		title: "Run & evolve",
		desc: "We support, refine, and extend the system as your business grows.",
	},
];

const capabilities = [
	{
		icon: AppWindow,
		title: "Bespoke business applications",
		desc: "Software built to your exact workflow — not a template you bend to fit.",
	},
	{
		icon: Workflow,
		title: "Workflow automation & AI agents",
		desc: "Automate the manual admin and hand-offs that quietly eat your week.",
	},
	{
		icon: Network,
		title: "Systems integration",
		desc: "Connect the tools you already run into one reliable source of truth.",
	},
	{
		icon: LayoutDashboard,
		title: "Internal tools & dashboards",
		desc: "The control surfaces your team needs to run operations clearly.",
	},
	{
		icon: Database,
		title: "The unified data layer",
		desc: "One model of your business — every system speaking the same language.",
	},
];

const metrics = [
	{ value: "1", label: "system your business runs on" },
	{ value: "0", label: "off-the-shelf templates" },
	{ value: "100%", label: "your code — you own it" },
	{ value: "End-to-end", label: "one partner, discovery to run" },
];

const weAre = [
	"A senior product-engineering partner",
	"Builders of bespoke systems, end-to-end",
	"AI-native in how we build and what we ship",
	"A partner who learns your operations first",
	"Accountable for outcomes you can measure",
];

const weArent = [
	"A staff-augmentation body shop",
	"A one-size-fits-all SaaS product to adopt",
	"An “AI services” vendor selling chatbots",
	"A team that ships a generic template faster",
	"Owners of tickets and hourly output",
];

function HomePage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="section-shell">
				<div className="site-wide grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
					<div className="space-y-7">
						<span className="pill reveal-up">
							<span className="live-dot" /> Auckland, NZ · Bespoke software
							studio
						</span>
						<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4.1rem]">
							The <span className="gradient-ink">operating system</span> your
							business actually runs on.
						</h1>
						<p className="reveal-up delay-2 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
							Mation builds bespoke software that unifies your tools, data, and
							workflows into one system — engineered around exactly how you
							operate, powered by AI.
						</p>
						<div className="reveal-up delay-3 flex flex-col gap-3 sm:flex-row">
							<MagneticLink to="/contact" className="button-primary">
								Map your operating system
								<ArrowRight className="h-4 w-4" />
							</MagneticLink>
							<MagneticLink to="/approach" className="button-secondary">
								See how we work
							</MagneticLink>
						</div>
						<ul className="reveal-up delay-4 flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-xs uppercase tracking-[0.12em] text-mute">
							<li className="flex items-center gap-2">
								<Check className="h-3.5 w-3.5 text-violet-bright" /> No
								off-the-shelf product
							</li>
							<li className="flex items-center gap-2">
								<Check className="h-3.5 w-3.5 text-violet-bright" /> Senior
								engineers, end-to-end
							</li>
							<li className="flex items-center gap-2">
								<Check className="h-3.5 w-3.5 text-violet-bright" />{" "}
								Enterprise-grade governance
							</li>
						</ul>
					</div>

					<div className="reveal-up delay-2">
						<SystemMap />
					</div>
				</div>
			</section>

			{/* Problem */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-5">
					<b>01</b> &nbsp;/&nbsp; The problem
				</p>
				<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
					<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.6rem] sm:leading-[1.08]">
						Most businesses don’t need more software. They need it to work as
						one.
					</h2>
					<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
						{problems.map((problem) => (
							<div key={problem} className="bg-panel p-6">
								<Minus className="mb-3 h-4 w-4 text-violet-bright" />
								<p className="text-[0.95rem] leading-relaxed text-ink/85">
									{problem}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Approach */}
			<section className="site-wide section-shell pt-0">
				<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>02</b> &nbsp;/&nbsp; How we work
						</p>
						<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							We learn how you run, then build the system that runs it.
						</h2>
					</div>
					<Link to="/approach" className="button-ghost">
						The full approach <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
				<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] md:grid-cols-4">
					{steps.map((step) => (
						<div key={step.n} className="bg-panel p-6">
							<span className="font-mono text-sm text-violet-bright">
								{step.n}
							</span>
							<h3 className="mt-3 font-heading text-xl font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* What we build */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>03</b> &nbsp;/&nbsp; What we build
				</p>
				<h2 className="mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					One partner for everything your operating system needs.
				</h2>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{capabilities.map((cap) => (
						<article key={cap.title} className="panel panel-hover p-6">
							<div className="mb-5 inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
								<cap.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-lg font-semibold text-ink">
								{cap.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{cap.desc}
							</p>
						</article>
					))}
					<Link
						to="/what-we-build"
						className="panel panel-hover group flex flex-col justify-between p-6"
					>
						<ArrowUpRight className="h-6 w-6 text-violet-bright transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						<span className="mt-8 font-heading text-lg font-semibold text-ink">
							Explore everything we build
						</span>
					</Link>
				</div>
			</section>

			{/* Proof */}
			<section className="site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<p className="section-index mb-8">
						<b>04</b> &nbsp;/&nbsp; What working with us means
					</p>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{metrics.map((m) => (
							<div key={m.label}>
								<div className="metric-value">{m.value}</div>
								<p className="mt-2 text-sm leading-snug text-mute">{m.label}</p>
							</div>
						))}
					</div>
					<hr className="hairline my-9" />
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<p className="max-w-xl text-pretty text-ink/85">
							See how we’ve unified businesses into a single system — from the
							first map to a system the whole team runs on.
						</p>
						<Link to="/work" className="button-secondary shrink-0">
							View our work <ArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>
			</section>

			{/* Positioning — we are / we aren't */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>05</b> &nbsp;/&nbsp; What we are
				</p>
				<h2 className="mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					A different kind of software partner.
				</h2>
				<div className="grid gap-5 md:grid-cols-2">
					<div className="panel p-7">
						<p className="kicker">We are</p>
						<ul className="mt-5 space-y-3.5">
							{weAre.map((item) => (
								<li key={item} className="flex items-start gap-3 text-ink/90">
									<Check className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="panel-line p-7">
						<p className="kicker !text-mute before:!bg-[var(--color-line)]">
							We are not
						</p>
						<ul className="mt-5 space-y-3.5">
							{weArent.map((item) => (
								<li key={item} className="flex items-start gap-3 text-mute">
									<Minus className="mt-0.5 h-5 w-5 shrink-0 text-mute/60" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Security strip */}
			<section className="site-wide section-shell pt-0">
				<Link
					to="/security"
					className="panel panel-hover group flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between"
				>
					<div className="flex items-start gap-4">
						<div className="inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
							<ShieldCheck className="h-5 w-5" />
						</div>
						<div>
							<h3 className="font-heading text-lg font-semibold text-ink">
								Enterprise-grade by default
							</h3>
							<p className="mt-1 max-w-xl text-sm leading-relaxed text-mute">
								Security, access control, auditability, and data ownership built
								in from day one. Your data stays yours. No lock-in.
							</p>
						</div>
					</div>
					<span className="button-ghost shrink-0">
						Security & governance
						<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
					</span>
				</Link>
			</section>

			<CTASection
				title="Let’s map the operating system your business should run on."
				description="Start with a conversation. We’ll learn how you work today and show you what one unified system could change."
				primaryLabel="Book a discovery call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
