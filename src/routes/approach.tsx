import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	Eye,
	FileText,
	GitBranch,
	Layers,
	Lock,
	Map as MapIcon,
	Repeat,
	ScrollText,
	ShieldCheck,
	Unlock,
	Users,
} from "lucide-react";

import CTASection from "../components/CTASection";
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

const teamPrinciples = [
	{
		icon: Users,
		title: "Senior and embedded",
		desc: "The engineers who scope your system are the ones who build it — alongside your team, not behind a ticket queue.",
	},
	{
		icon: Eye,
		title: "Transparent by default",
		desc: "You see the work as it lands: live increments, open roadmaps, and the reasoning behind every decision.",
	},
	{
		icon: GitBranch,
		title: "You own the code",
		desc: "The system, the source, and the data are yours — a codebase your team can read, run, and extend.",
	},
	{
		icon: Unlock,
		title: "No lock-in",
		desc: "Built on open, standard foundations. Nothing proprietary holds your business hostage.",
	},
];

const engineeringPillars = [
	{
		icon: Layers,
		title: "Reliable, scalable foundations",
		desc: "Proven foundations that hold up under load and grow with you — nothing fragile to maintain.",
	},
	{
		icon: Repeat,
		title: "Dependable automation",
		desc: "Workflows that run the same way every time, with retries, fallbacks, and clear failure paths.",
	},
	{
		icon: Lock,
		title: "Secure data handling",
		desc: "Least-privilege access, encrypted data, and tight control over what each part can reach.",
	},
	{
		icon: ScrollText,
		title: "Observability & auditability",
		desc: "Every action logged and traceable — you can see what ran, why, and what it touched.",
	},
];

const blueprintDeliverables = [
	"An operations map of how your business runs today",
	"A value case — where the system pays for itself",
	"A staged delivery roadmap with clear first increments",
];

function ApproachPage() {
	return (
		<>
			{/* ---------- Hero ---------- */}
			<section className="relative overflow-hidden">
				<div className="aurora" aria-hidden />
				<div className="site-wide relative flex min-h-[72vh] flex-col items-center justify-center py-24 text-center">
					<span className="pill reveal-up">
						<span className="live-dot" /> One partner, discovery to run
					</span>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[18ch] text-[2.7rem] leading-[1.04] text-ink sm:text-6xl lg:text-[4.4rem]">
						We learn how you run, then{" "}
						<span className="gradient-ink">build the system</span> that runs it.
					</h1>
					<p className="reveal-up delay-2 mt-7 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
						A senior partnership, not a hand-off. The engineers who map your
						operations are the ones who build the system — embedded with your
						team and accountable for outcomes you can measure.
					</p>
					<div className="reveal-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Start with a Blueprint
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink
							to="/what-we-build"
							className="button-secondary !px-6 !py-3"
						>
							What we build
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* ---------- The engagement model (interactive) ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						The engagement model
					</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						Four stages, one continuous partnership.
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute">
						Every stage ends in something concrete — a map, a design, a working
						increment, a system that keeps getting better.
					</p>
				</div>
				<ScrollyTransformation />
			</section>

			{/* ---------- How we work with your team ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						How we work with you
					</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						Senior people, building alongside you.
					</h2>
				</div>
				<div className="reveal-stagger grid gap-5 sm:grid-cols-2">
					{teamPrinciples.map((item) => (
						<article
							key={item.title}
							data-spotlight
							className="panel panel-hover p-7 sm:p-8"
						>
							<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
								<item.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-lg font-semibold text-ink">
								{item.title}
							</h3>
							<p className="mt-2 text-[0.95rem] leading-relaxed text-mute">
								{item.desc}
							</p>
						</article>
					))}
				</div>
			</section>

			{/* ---------- How it's engineered ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						How it’s engineered
					</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						AI is the engine. Ownership is the principle.
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute">
						Not a platform you rent — a system we engineer around your
						operations, on foundations that are reliable, secure, and entirely
						yours.
					</p>
				</div>
				<div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{engineeringPillars.map((pillar) => (
						<article
							key={pillar.title}
							data-spotlight
							className="panel panel-hover p-6"
						>
							<div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
								<pillar.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-base font-semibold text-ink">
								{pillar.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{pillar.desc}
							</p>
						</article>
					))}
				</div>

				<div className="reveal-scroll mt-6 flex flex-col items-center gap-6 rounded-[20px] border border-border bg-surface-2/50 px-8 py-10 text-center sm:flex-row sm:text-left">
					<div className="font-heading text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-none text-violet-ink">
						100%
					</div>
					<p className="max-w-xl text-pretty text-ink-soft">
						Yours — the code, the data, and the infrastructure, handed over in
						full. The system runs on your terms, long after we ship.
					</p>
				</div>
			</section>

			{/* ---------- Start with a Blueprint ---------- */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked overflow-hidden rounded-[24px] p-8 sm:p-14"
				>
					<div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
						<div>
							<p className="kicker">A low-risk way to start</p>
							<h2 className="mt-5 font-heading text-3xl font-semibold text-ink sm:text-[2.6rem]">
								Start with an Operations Blueprint.
							</h2>
							<p className="mt-5 max-w-xl text-pretty leading-relaxed text-mute">
								A fixed-scope, paid discovery. We map how your business runs,
								build the value case, and hand you a roadmap — whether or not we
								build it.
							</p>
							<div className="mt-8 flex flex-wrap items-center gap-3">
								<MagneticLink
									to="/contact"
									className="button-primary !px-6 !py-3"
								>
									Scope a Blueprint
									<ArrowRight className="h-4 w-4" />
								</MagneticLink>
								<span className="tag">
									<MapIcon className="h-3.5 w-3.5 text-violet" />
									Fixed scope · fixed price
								</span>
							</div>
						</div>
						<div className="rounded-[16px] border border-border bg-surface-2 p-7">
							<div className="flex items-center gap-2 text-sm font-semibold text-violet-ink">
								<FileText className="h-4 w-4" />
								You walk away with
							</div>
							<ul className="mt-5 space-y-4">
								{blueprintDeliverables.map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-[0.95rem] text-ink-soft"
									>
										<Check className="mt-0.5 h-5 w-5 shrink-0 text-violet" />
										<span>{item}</span>
									</li>
								))}
							</ul>
							<hr className="hairline my-6" />
							<p className="text-sm leading-relaxed text-mute">
								Yours to keep — take it to your board, your team, or another
								builder. No obligation to continue.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ---------- Security link ---------- */}
			<section className="site-wide section-shell pt-0">
				<MagneticLink
					to="/security"
					className="panel panel-hover group flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between"
				>
					<div className="flex items-start gap-4">
						<div className="inline-flex rounded-xl border border-border bg-surface-violet p-3 text-violet">
							<ShieldCheck className="h-5 w-5" />
						</div>
						<div>
							<h3 className="font-heading text-lg font-semibold text-ink">
								Your data protected, every action tracked.
							</h3>
							<p className="mt-1 max-w-xl text-sm leading-relaxed text-mute">
								Access control, audit trails, and data ownership engineered in
								from day one. Your data stays yours. No lock-in.
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
				description="Book a free exploration meeting. We’ll learn how you work today, then show you the system that could run it — and the value case behind it."
				primaryLabel="Book a free call"
				secondaryLabel="What we build"
			/>
		</>
	);
}
