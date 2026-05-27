import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AppWindow,
	ArrowRight,
	ArrowUpRight,
	Blocks,
	Check,
	Database,
	LayoutDashboard,
	Minus,
	Network,
	PenTool,
	RefreshCw,
	Search,
	ShieldCheck,
	Workflow,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import ProcessFlow from "../components/ProcessFlow";
import SystemMap from "../components/SystemMap";
import ToolsMarquee from "../components/ToolsMarquee";
import VelocityTimeline from "../components/VelocityTimeline";
import { offer } from "../content/site";

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
	{
		k: "01",
		t: "Disconnected tools",
		d: "Your data is trapped across a dozen apps that were never meant to talk.",
	},
	{
		k: "02",
		t: "Manual admin",
		d: "Hours every week lost to re-keying, reconciling, and chasing updates.",
	},
	{
		k: "03",
		t: "Fragile hand-offs",
		d: "Every gap between systems is a chance for delay, error, and lost context.",
	},
	{
		k: "04",
		t: "Pilots that don't stick",
		d: "AI experiments stall because they live outside how you actually work.",
	},
];

const steps = [
	{
		n: "01",
		title: "Learn",
		desc: "We map how your business actually runs — every process and hand-off.",
		icon: Search,
	},
	{
		n: "02",
		title: "Blueprint",
		desc: "We design the system and the value case before a line is built.",
		icon: PenTool,
	},
	{
		n: "03",
		title: "Build",
		desc: "We ship in increments. You see it working early — not at the end.",
		icon: Blocks,
	},
	{
		n: "04",
		title: "Run & evolve",
		desc: "We support, refine, and extend the system as you grow.",
		icon: RefreshCw,
	},
];

const capabilities = [
	{
		icon: AppWindow,
		title: "Bespoke applications",
		desc: "Software built to your exact workflow — not a template you bend to fit.",
	},
	{
		icon: Workflow,
		title: "Automation & AI agents",
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
	{ value: "100%", label: "yours — the code, the data, the system" },
	{ value: "0", label: "off-the-shelf templates, ever" },
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
			<section className="glow section-shell pt-10 sm:pt-14">
				<div className="site-wide">
					<div className="dimline reveal-up mb-10">
						Mation — bespoke systems · est. Auckland NZ
					</div>
					<div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
						<div className="space-y-7">
							<span className="pill reveal-up">
								<span className="live-dot" /> The operating system your business
								runs on
							</span>
							<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4.15rem]">
								We build the{" "}
								<span className="gradient-ink">operating system</span> your
								business runs on.
							</h1>
							<p className="reveal-up delay-2 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
								Bespoke software that unifies your tools, data, and workflows
								into one system — engineered around exactly how you operate,
								powered by AI.
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

						<div className="reveal-up delay-2 relative">
							<div className="bracket">
								<SystemMap />
							</div>
							<div className="absolute -left-3 -top-3 hidden rounded-lg border border-line bg-canvas px-3 py-2 sm:block">
								<span className="bp-coord">12 tools → 1</span>
							</div>
							<p className="bp-coord mt-3 text-center">
								FIG.01 · SYSTEM TOPOLOGY — SCATTERED → UNIFIED
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Tools marquee */}
			<section className="section-tight">
				<div className="site-wide">
					<p className="dimline mb-6">Connects the tools you already run</p>
					<ToolsMarquee />
				</div>
			</section>

			{/* Problem */}
			<section className="site-wide section-shell pt-10">
				<div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
					<div className="reveal-scroll">
						<p className="section-index mb-4">
							<b>01</b> &nbsp;/&nbsp; The problem
						</p>
						<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.7rem] sm:leading-[1.06]">
							Most businesses don’t need more software. They need it to{" "}
							<span className="gradient-ink">work as one.</span>
						</h2>
					</div>
					<div className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
						{problems.map((p) => (
							<div key={p.k} className="bg-panel p-6">
								<div className="flex items-center gap-3">
									<span className="font-mono text-xs text-violet-bright">
										{p.k}
									</span>
									<Minus className="h-3 w-8 text-violet-bright/40" />
								</div>
								<h3 className="mt-4 font-heading text-lg font-semibold text-ink">
									{p.t}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-mute">{p.d}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Approach */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-12 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>02</b> &nbsp;/&nbsp; How we work
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							We learn how you run, then build the system that runs it.
						</h2>
					</div>
					<Link to="/approach" className="button-ghost">
						The full approach <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
				<div className="reveal-scroll">
					<ProcessFlow steps={steps} />
				</div>
			</section>

			{/* What we build */}
			<section className="site-wide section-shell pt-4">
				<div className="reveal-scroll mb-10 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>03</b> &nbsp;/&nbsp; What we build
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							One partner for every layer of your operating system.
						</h2>
					</div>
					<p className="dimline hidden max-w-xs md:flex">
						Modular · compounding
					</p>
				</div>
				<div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{capabilities.map((cap) => (
						<article key={cap.title} className="panel panel-hover group p-6">
							<div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-line bg-white/[0.03] text-violet-bright">
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
						className="panel panel-hover group flex flex-col justify-between bg-[radial-gradient(circle_at_80%_-10%,rgba(123,97,255,0.12),transparent_55%)] p-6"
					>
						<ArrowUpRight className="h-6 w-6 text-violet-bright transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
						<span className="mt-8 font-heading text-lg font-semibold text-ink">
							Explore everything we build
						</span>
					</Link>
				</div>
			</section>

			{/* Velocity */}
			<section className="site-wide section-shell pt-4">
				<div className="reveal-scroll mb-12">
					<p className="section-index mb-4">
						<b>04</b> &nbsp;/&nbsp; Velocity
					</p>
					<h2 className="max-w-3xl font-heading text-3xl font-semibold text-ink sm:text-[2.5rem] sm:leading-[1.08]">
						Prototype in days. Launch in weeks. Results in months.{" "}
						<span className="gradient-ink">Profit for years.</span>
					</h2>
				</div>
				<div className="reveal-scroll">
					<VelocityTimeline />
				</div>
			</section>

			{/* Plans & guarantee */}
			<section className="site-wide section-shell pt-4">
				<p className="section-index reveal-scroll mb-4">
					<b>05</b> &nbsp;/&nbsp; Flexible by design
				</p>
				<div className="reveal-stagger grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
					<article className="panel p-7 sm:p-8">
						<p className="bp-coord">Plans</p>
						<h3 className="mt-3 font-heading text-2xl font-semibold text-ink sm:text-[1.8rem]">
							Start small. Scale as it proves out.
						</h3>
						<p className="mt-3 text-mute">
							Custom, pilotable software from{" "}
							<span className="font-semibold gradient-ink">
								{offer.priceLow}
							</span>{" "}
							to {offer.priceHigh} — on a SaaS, rent-to-buy, or purchase model.
						</p>
						<div className="mt-5 flex flex-wrap gap-2">
							{offer.models.map((m) => (
								<span key={m.name} className="tag">
									{m.name}
								</span>
							))}
						</div>
						<Link to="/plans" className="button-secondary mt-7 inline-flex">
							See plans & pricing <ArrowRight className="h-4 w-4" />
						</Link>
					</article>
					<article className="panel-line flex flex-col justify-center p-7 sm:p-8">
						<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(166,146,255,0.5)] bg-white/[0.03] text-violet-bright">
							<ShieldCheck className="h-6 w-6" />
						</div>
						<h3 className="mt-5 font-heading text-2xl font-semibold leading-tight text-ink">
							Double your value in 60 days —{" "}
							<span className="gradient-ink">or your money back.</span>
						</h3>
						<p className="mt-3 text-sm leading-relaxed text-mute">
							{offer.guarantee}
						</p>
					</article>
				</div>
			</section>

			{/* Proof — oversized stats */}
			<section className="glow site-wide section-shell pt-4">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<p className="section-index mb-10">
						<b>06</b> &nbsp;/&nbsp; What working with us means
					</p>
					<div className="reveal-stagger grid gap-10 sm:grid-cols-3">
						{metrics.map((m) => (
							<div key={m.label}>
								<div className="font-heading text-[clamp(3.2rem,7vw,5rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
									<span className="gradient-ink">{m.value}</span>
								</div>
								<p className="mt-3 max-w-[16rem] text-sm leading-snug text-mute">
									{m.label}
								</p>
							</div>
						))}
					</div>
					<hr className="hairline my-10" />
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
			<section className="site-wide section-shell pt-4">
				<p className="section-index reveal-scroll mb-4">
					<b>07</b> &nbsp;/&nbsp; What we are
				</p>
				<h2 className="reveal-scroll mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					A different kind of software partner.
				</h2>
				<div className="reveal-stagger grid gap-5 md:grid-cols-2">
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
			<section className="site-wide section-shell pt-4">
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
				primaryLabel="Book a free exploration meeting"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
