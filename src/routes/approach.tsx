import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	Eye,
	FileText,
	GitBranch,
	Handshake,
	KeyRound,
	Layers,
	Lock,
	Map as MapIcon,
	Repeat,
	ScrollText,
	ShieldCheck,
	Sparkles,
	Unlock,
	Users,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import ScrollyTransformation from "../components/ScrollyTransformation";

export const Route = createFileRoute("/approach")({
	component: ApproachPage,
	head: () => ({
		meta: [
			{
				title: "Approach — How Mation builds the system your business runs on",
			},
			{
				name: "description",
				content:
					"We learn how you run, then build the system that runs it. Senior, embedded engineers accountable for measurable outcomes — discovery to a system you own.",
			},
			{
				property: "og:title",
				content:
					"Approach — How Mation builds the system your business runs on",
			},
			{
				property: "og:description",
				content:
					"We learn how you run, then build the system that runs it. Senior engineers accountable for outcomes — and you own everything we ship.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const engagementHeads = [
	{ n: "01", label: "Discover", note: "Map operations, find friction" },
	{ n: "02", label: "Blueprint", note: "Design the system + value case" },
	{ n: "03", label: "Build", note: "Ship in increments, working early" },
	{ n: "04", label: "Run & evolve", note: "Support, refine, expand" },
];

const teamPrinciples = [
	{
		icon: Users,
		title: "Senior and embedded",
		desc: "The engineers who scope your system are the ones who build it — working alongside your team, not behind a ticket queue.",
	},
	{
		icon: Eye,
		title: "Transparent by default",
		desc: "You see the work as it lands: live increments, open roadmaps, and the reasoning behind every design decision.",
	},
	{
		icon: GitBranch,
		title: "You own the code",
		desc: "The system, the source, and the data are yours. We hand over a codebase your team can read, run, and extend.",
	},
	{
		icon: Unlock,
		title: "No lock-in",
		desc: "Built on open, standard foundations. Nothing proprietary holds your business hostage — you can take it anywhere.",
	},
];

const engineeringPillars = [
	{
		icon: Layers,
		title: "Reliable, scalable foundations",
		desc: "Standard, well-understood architecture that holds up under load and grows with the business — no bespoke magic to maintain.",
	},
	{
		icon: Repeat,
		title: "Dependable automation",
		desc: "Workflows that run multi-step processes the same way every time, with retries, fallbacks, and clear failure paths.",
	},
	{
		icon: Lock,
		title: "Secure data handling",
		desc: "Least-privilege access, encrypted data, and tight control over which systems each part of the system can reach.",
	},
	{
		icon: ScrollText,
		title: "Observability & auditability",
		desc: "Every action logged and traceable. You can see what ran, why, and what it touched — with telemetry on reliability and cost.",
	},
];

const philosophy = [
	{
		icon: Sparkles,
		title: "AI as leverage",
		desc: "We use AI where it removes real work — drafting, extraction, routing, judgement at scale. It is the engine, not the pitch.",
	},
	{
		icon: KeyRound,
		title: "Open foundations",
		desc: "Standard languages, standard infrastructure, your cloud. No proprietary runtime, no platform tax, no vendor trap.",
	},
	{
		icon: GitBranch,
		title: "You own everything",
		desc: "Code, data, and infrastructure are handed to you in full. The system runs on your terms, long after we ship.",
	},
];

const blueprintDeliverables = [
	"An operations map of how your business runs today",
	"A value case — where the system pays for itself",
	"A staged delivery roadmap with clear first increments",
];

// The architecture we design FOR each client — a bespoke layered figure.
const archLayers = [
	{ tag: "EXPERIENCE", label: "Internal tools & dashboards" },
	{ tag: "AUTOMATION", label: "Workflows & AI agents" },
	{ tag: "DATA", label: "One unified model of your business" },
	{ tag: "INTEGRATION", label: "Your existing tools, connected" },
];

function ApproachPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="section-shell">
				<div className="site-wide grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
					<div className="space-y-7">
						<p className="kicker reveal-up">Approach</p>
						<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4rem]">
							We learn how you run, then{" "}
							<span className="gradient-ink">build the system</span> that runs
							it.
						</h1>
						<p className="reveal-up delay-2 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
							A senior partnership, not a hand-off. The engineers who map your
							operations are the ones who build the system — embedded with your
							team and accountable for outcomes you can measure.
						</p>
						<div className="reveal-up delay-3 flex flex-col gap-3 sm:flex-row">
							<MagneticLink to="/contact" className="button-primary">
								Start with a Blueprint
								<ArrowRight className="h-4 w-4" />
							</MagneticLink>
							<MagneticLink to="/what-we-build" className="button-secondary">
								What we build
							</MagneticLink>
						</div>
						<ul className="reveal-up delay-4 flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-xs uppercase tracking-[0.12em] text-mute">
							<li className="flex items-center gap-2">
								<Check className="h-3.5 w-3.5 text-violet-bright" /> Senior,
								embedded engineers
							</li>
							<li className="flex items-center gap-2">
								<Check className="h-3.5 w-3.5 text-violet-bright" /> Accountable
								for outcomes
							</li>
							<li className="flex items-center gap-2">
								<Check className="h-3.5 w-3.5 text-violet-bright" /> You own
								everything we ship
							</li>
						</ul>
					</div>

					{/* Hero figure — the four-stage engagement, at a glance */}
					<div className="reveal-up delay-2">
						<div className="panel ticked relative overflow-hidden rounded-[22px] p-6 sm:p-7">
							<div
								aria-hidden
								className="pointer-events-none absolute inset-0 opacity-60"
								style={{
									backgroundImage:
										"linear-gradient(rgba(123,97,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.06) 1px, transparent 1px)",
									backgroundSize: "32px 32px",
									maskImage:
										"radial-gradient(circle at 50% 40%, #000 30%, transparent 92%)",
								}}
							/>
							<p className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute">
								FIG.01 — The engagement
							</p>
							<ol className="relative mt-5 space-y-px">
								{engagementHeads.map((stage, i) => (
									<li
										key={stage.n}
										className="flex items-center gap-4 rounded-[10px] border border-line bg-panel-2/60 p-3.5"
									>
										<span className="font-mono text-sm text-violet-bright">
											{stage.n}
										</span>
										<div className="min-w-0">
											<p className="font-heading text-base font-semibold text-ink">
												{stage.label}
											</p>
											<p className="truncate text-xs text-mute">{stage.note}</p>
										</div>
										{i < engagementHeads.length - 1 && (
											<ArrowRight className="ml-auto h-4 w-4 shrink-0 rotate-90 text-violet/60" />
										)}
									</li>
								))}
							</ol>
							<div className="relative mt-4 flex items-center gap-2 text-xs text-mute">
								<span className="live-dot" />
								One partner, discovery to run.
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 01 — The engagement model (scroll-driven) */}
			<section className="site-wide section-shell pt-0">
				<div className="mb-10 max-w-2xl">
					<p className="section-index mb-4">
						<b>01</b> &nbsp;/&nbsp; The engagement model
					</p>
					<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
						Four stages, one continuous partnership.
					</h2>
					<p className="mt-4 text-mute">
						Every stage ends in something concrete you can hold — a map, a
						design, a working increment, a system that keeps getting better.
					</p>
				</div>
				<ScrollyTransformation />
			</section>

			{/* 02 — How we work with your team */}
			<section className="site-wide section-shell pt-0">
				<div className="mb-8 flex items-start gap-4">
					<div className="hidden shrink-0 rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright sm:inline-flex">
						<Handshake className="h-5 w-5" />
					</div>
					<div>
						<p className="section-index mb-4">
							<b>02</b> &nbsp;/&nbsp; How we work with your team
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							Senior people, in the room, building alongside you.
						</h2>
					</div>
				</div>
				<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
					{teamPrinciples.map((item) => (
						<div key={item.title} className="bg-panel p-6 sm:p-7">
							<div className="mb-4 inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
								<item.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-lg font-semibold text-ink">
								{item.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{item.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* 03 — How it's engineered */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>03</b> &nbsp;/&nbsp; How it's engineered
				</p>
				<h2 className="mb-3 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					The architecture we design for you.
				</h2>
				<p className="mb-10 max-w-2xl text-mute">
					Not a platform you rent. A system we engineer around your operations —
					on foundations that are reliable, secure, and entirely yours.
				</p>
				<div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
					<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
						{engineeringPillars.map((pillar) => (
							<div key={pillar.title} className="bg-panel p-6">
								<div className="mb-4 inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
									<pillar.icon className="h-5 w-5" />
								</div>
								<h3 className="font-heading text-base font-semibold text-ink">
									{pillar.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-mute">
									{pillar.desc}
								</p>
							</div>
						))}
					</div>

					{/* Bespoke layered figure — the system stack */}
					<div className="panel ticked relative overflow-hidden rounded-[22px] p-6 sm:p-7">
						<div
							aria-hidden
							className="pointer-events-none absolute inset-0 opacity-50"
							style={{
								backgroundImage:
									"linear-gradient(rgba(123,97,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.06) 1px, transparent 1px)",
								backgroundSize: "32px 32px",
								maskImage:
									"radial-gradient(circle at 50% 50%, #000 20%, transparent 90%)",
							}}
						/>
						<p className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute">
							FIG.02 — The system, layered
						</p>
						<div className="relative mt-5 space-y-3">
							{archLayers.map((layer, i) => (
								<div key={layer.tag}>
									<div className="rounded-[12px] border border-line bg-panel-2 px-4 py-3.5">
										<p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-violet-bright">
											{layer.tag}
										</p>
										<p className="mt-1 text-sm text-ink">{layer.label}</p>
									</div>
									{i < archLayers.length - 1 && (
										<div
											aria-hidden
											className="mx-auto h-3 w-px bg-gradient-to-b from-violet/50 to-violet/10"
										/>
									)}
								</div>
							))}
						</div>
						<div className="relative mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute">
							<ShieldCheck className="h-3.5 w-3.5 text-violet-bright" />
							Governed & observable end-to-end
						</div>
					</div>
				</div>
			</section>

			{/* 04 — Tech philosophy */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>04</b> &nbsp;/&nbsp; Tech philosophy
				</p>
				<h2 className="mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					AI is the engine. Ownership is the principle.
				</h2>
				<div className="grid gap-5 md:grid-cols-3">
					{philosophy.map((item) => (
						<article key={item.title} className="panel panel-hover p-6 sm:p-7">
							<div className="mb-5 inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
								<item.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-lg font-semibold text-ink">
								{item.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{item.desc}
							</p>
						</article>
					))}
				</div>
			</section>

			{/* 05 — Start with an Operations Blueprint */}
			<section className="site-wide section-shell pt-0">
				<div className="panel ticked relative overflow-hidden rounded-[22px] p-8 sm:p-12">
					<div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-violet),transparent_70%)] opacity-20 blur-3xl" />
					<div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
						<div>
							<p className="section-index mb-4">
								<b>05</b> &nbsp;/&nbsp; A low-risk way to start
							</p>
							<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
								Start with an Operations Blueprint.
							</h2>
							<p className="mt-4 max-w-xl text-pretty text-mute">
								A fixed-scope, paid discovery. We map how your business runs,
								build the value case, and hand you a roadmap — whether or not we
								build it. The clearest first step, with nothing locked in.
							</p>
							<div className="mt-7 flex flex-wrap items-center gap-3">
								<MagneticLink to="/contact" className="button-primary">
									Scope a Blueprint
									<ArrowRight className="h-4 w-4" />
								</MagneticLink>
								<span className="tag">
									<MapIcon className="h-3.5 w-3.5 text-violet-bright" />
									Fixed scope · fixed price
								</span>
							</div>
						</div>
						<div className="rounded-[14px] border border-line bg-panel-2/50 p-6 sm:p-7">
							<div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-violet-bright">
								<FileText className="h-4 w-4" />
								You walk away with
							</div>
							<ul className="mt-5 space-y-3.5">
								{blueprintDeliverables.map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-sm text-ink/90"
									>
										<Check className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" />
										<span>{item}</span>
									</li>
								))}
							</ul>
							<hr className="hairline my-6" />
							<p className="text-sm leading-relaxed text-mute">
								Yours to keep. Take it to your board, your team, or another
								builder — no obligation to continue.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* 06 — Security summary */}
			<section className="site-wide section-shell pt-0">
				<MagneticLink
					to="/security"
					className="panel panel-hover group flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between"
				>
					<div className="flex items-start gap-4">
						<div className="inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
							<ShieldCheck className="h-5 w-5" />
						</div>
						<div>
							<p className="section-index mb-2">
								<b>06</b> &nbsp;/&nbsp; Security
							</p>
							<h3 className="font-heading text-lg font-semibold text-ink">
								Enterprise-grade governance, built in.
							</h3>
							<p className="mt-1 max-w-xl text-sm leading-relaxed text-mute">
								Access control, audit trails, secure data handling, and data
								ownership engineered in from day one. Your data stays yours. No
								lock-in.
							</p>
						</div>
					</div>
					<span className="button-ghost shrink-0">
						Security & governance
						<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
					</span>
				</MagneticLink>
			</section>

			<CTASection
				title="Start by mapping how your business actually runs."
				description="Book a discovery call. We'll learn how you work today, then show you the system that could run it — and the value case behind it."
				primaryLabel="Book a discovery call"
				secondaryLabel="What we build"
			/>
		</>
	);
}
