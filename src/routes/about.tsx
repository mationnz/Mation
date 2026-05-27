import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
	ArrowRight,
	Boxes,
	Check,
	Compass,
	Eye,
	GitBranch,
	KeyRound,
	Layers,
	Minus,
	ShieldCheck,
	Target,
	Users,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{
				title: "About — Senior engineers who build the system you run on",
			},
			{
				name: "description",
				content:
					"Mation is a senior software-engineering partner in Auckland, NZ. We build the bespoke system your business runs on — accountable for outcomes, not tickets and hours.",
			},
			{
				property: "og:title",
				content: "About Mation — A senior software-engineering partner",
			},
			{
				property: "og:description",
				content:
					"Auckland-based senior engineers who learn how you operate, then build the bespoke system your business runs on. A partnership accountable for measurable outcomes.",
			},
		],
	}),
});

const weAre = [
	"A senior product-engineering partner",
	"Builders of bespoke systems, end-to-end",
	"AI-native in how we build and what we ship",
	"A partner who learns your operations first",
	"Accountable for outcomes you can measure",
];

const weArent = [
	"A staff-augmentation body shop for hire",
	"A one-size-fits-all SaaS product to adopt",
	"An “AI services” vendor selling chatbots",
	"A team that ships a generic template faster",
	"Owners of tickets and hourly output",
];

type Principle = {
	icon: LucideIcon;
	title: string;
	desc: string;
};

const principles: Principle[] = [
	{
		icon: Compass,
		title: "Clarity over noise",
		desc: "We make the work legible — one source of truth, not another dashboard to ignore.",
	},
	{
		icon: GitBranch,
		title: "Workflow over hand-offs",
		desc: "We design for how work actually moves, removing the gaps where context gets lost.",
	},
	{
		icon: ShieldCheck,
		title: "Trust through governance",
		desc: "Access control, approvals, and audit trails are built in — not bolted on later.",
	},
	{
		icon: Boxes,
		title: "Modular systems that compound",
		desc: "Reusable components and connectors, so each build makes the next one faster.",
	},
	{
		icon: Layers,
		title: "Foundations over hacks",
		desc: "We engineer to last. Unchecked scope creep is just technical debt with a deadline.",
	},
];

type Engagement = {
	icon: LucideIcon;
	title: string;
	desc: string;
};

const engagement: Engagement[] = [
	{
		icon: Users,
		title: "Senior and embedded",
		desc: "You work directly with the engineers building your system — no layers, no hand-offs to a junior bench.",
	},
	{
		icon: Eye,
		title: "Transparent by default",
		desc: "You see it working in increments. Progress, decisions, and trade-offs stay in the open.",
	},
	{
		icon: KeyRound,
		title: "You own the code",
		desc: "Every line ships to you. No proprietary runtime, no licence to keep paying, no lock-in.",
	},
	{
		icon: Target,
		title: "Outcomes you can measure",
		desc: "We define what success looks like up front, then hold ourselves to it — hours saved, errors removed, time recovered.",
	},
];

type Role = {
	role: string;
	focus: string;
};

const team: Role[] = [
	{
		role: "Founder & Principal Engineer",
		focus:
			"System architecture, technical direction, and the value case behind every build.",
	},
	{
		role: "Head of Delivery",
		focus:
			"Discovery, planning, and the rhythm that keeps each engagement transparent.",
	},
	{
		role: "Lead Engineer",
		focus:
			"End-to-end delivery — applications, integrations, and the unified data layer.",
	},
];

const dataPoints = [
	"You own the code and the data — in full.",
	"Role-based access: people see and do only what they should.",
	"Audit trails record every action, end to end.",
	"Read-only first, with approval gates on anything that writes.",
];

function AboutPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="section-shell">
				<div className="site-wide max-w-4xl space-y-7">
					<span className="kicker reveal-up">About</span>
					<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4rem]">
						Senior engineers who build the{" "}
						<span className="gradient-ink">system your business runs on</span>.
					</h1>
					<p className="reveal-up delay-2 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
						Mation is a software-engineering partner based in Auckland, New
						Zealand. We learn how you operate, then build the bespoke system
						that runs it — and we stay accountable for the outcomes, not the
						hours.
					</p>
					<div className="reveal-up delay-3 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary">
							Start a conversation
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink to="/approach" className="button-secondary">
							See how we work
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* We are / we are not */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>01</b> &nbsp;/&nbsp; What we are
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

			{/* Principles */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>02</b> &nbsp;/&nbsp; Principles
				</p>
				<h2 className="mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					The convictions that shape what we build.
				</h2>
				<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
					{principles.map((principle) => (
						<div key={principle.title} className="bg-panel p-6">
							<div className="mb-5 inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
								<principle.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-lg font-semibold text-ink">
								{principle.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{principle.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* How we engage */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>03</b> &nbsp;/&nbsp; How we engage
				</p>
				<h2 className="mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					A partnership, not a project queue.
				</h2>
				<div className="grid gap-5 sm:grid-cols-2">
					{engagement.map((item) => (
						<article key={item.title} className="panel panel-hover p-7">
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

			{/* Team */}
			<section className="site-wide section-shell pt-0">
				<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>04</b> &nbsp;/&nbsp; The people who build it
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							Small, senior, and close to the work.
						</h2>
					</div>
					<span className="tag">Bios to be added</span>
				</div>
				<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] md:grid-cols-3">
					{team.map((member) => (
						<div key={member.role} className="bg-panel p-7">
							<div
								aria-hidden
								className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] font-mono text-sm text-violet-bright"
							>
								[ ]
							</div>
							<p className="font-mono text-xs uppercase tracking-[0.14em] text-violet-bright">
								{member.role}
							</p>
							<p className="mt-2 font-heading text-lg font-semibold text-ink/70">
								[Name — placeholder]
							</p>
							<p className="mt-3 text-sm leading-relaxed text-mute">
								{member.focus}
							</p>
						</div>
					))}
				</div>
				<p className="mt-5 max-w-2xl text-sm leading-relaxed text-mute">
					Placeholder roles shown above. Real names and bios for the team are to
					be added.
				</p>
			</section>

			{/* Security & data ownership */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>05</b> &nbsp;/&nbsp; Security & data ownership
				</p>
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
						<div>
							<div className="mb-5 inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
								<ShieldCheck className="h-5 w-5" />
							</div>
							<h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
								Enterprise-grade, and yours to keep.
							</h2>
							<p className="mt-4 max-w-xl text-pretty text-ink/85">
								Security, access control, and auditability are part of the build
								from day one. Your data stays yours, the code ships to you, and
								there is no lock-in.
							</p>
							<Link to="/security" className="button-ghost mt-6">
								Security & governance
								<ArrowRight className="h-4 w-4" />
							</Link>
						</div>
						<ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
							{dataPoints.map((point) => (
								<li
									key={point}
									className="ticked flex items-start gap-3 bg-panel p-5 text-sm leading-relaxed text-ink/85"
								>
									<Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" />
									<span>{point}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
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
