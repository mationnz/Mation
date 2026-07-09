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
	MapPin,
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

const stats = [
	{ value: "100%", label: "yours — the code, the data, the system" },
	{ value: "0", label: "off-the-shelf templates, ever" },
	{ value: "1:1", label: "you work directly with the engineers building it" },
];

function AboutPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="glow section-shell pt-10 sm:pt-14">
				<div className="site-wide">
					<p className="kicker reveal-up mb-8">
						The people behind the system · Auckland, NZ
					</p>
					<div className="max-w-4xl space-y-7">
						<span className="pill reveal-up">
							<MapPin className="h-3.5 w-3.5 text-violet" /> Auckland, New
							Zealand
						</span>
						<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4rem]">
							Senior engineers who build the{" "}
							<span className="gradient-ink">system your business runs on</span>
							.
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
				</div>
			</section>

			{/* Biography / manifesto */}
			<section className="site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12 lg:p-16">
					<p className="kicker reveal-scroll mb-6">Who we are</p>
					<h2 className="reveal-scroll max-w-3xl font-heading text-3xl font-semibold text-ink sm:text-[2.6rem] sm:leading-[1.1]">
						The next generation of business{" "}
						<span className="gradient-ink">starts here</span>.
					</h2>
					<div className="reveal-stagger mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-mute">
						<p>
							At Mation, we’re building the operating system for modern
							organisations.
						</p>
						<p>
							We believe technology should adapt to the way people work — not
							the other way around. That’s why we partner with ambitious teams to
							design intelligent ecosystems that bring people, processes, data,
							and technology together into one connected environment.
						</p>
						<p>
							By combining AI, custom software, and intelligent automation, we
							eliminate complexity, streamline operations, and create the
							capacity for organisations to innovate, grow, and scale with
							confidence.
						</p>
						<p>
							Our mission is to create the digital home where modern work happens
							— a place where every workflow, every project, every customer, and
							every decision is seamlessly connected through systems designed
							around the way your organisation operates.
						</p>
						<p>
							We don’t believe in one-size-fits-all solutions. We believe every
							organisation deserves technology that is purpose-built to unlock its
							full potential.
						</p>
						<p className="text-pretty text-xl font-medium text-ink sm:text-2xl">
							We don’t just improve the way organisations work. We transform the
							way they operate. We redefine what’s possible.
						</p>
						<p className="text-lg font-semibold text-ink">
							Welcome to the future of work.{" "}
							<span className="gradient-ink">Welcome to Mation.</span>
						</p>
					</div>
				</div>
			</section>

			{/* We are / we are not */}
			<section className="site-wide section-shell pt-0">
				<p className="kicker reveal-scroll mb-4">What we are</p>
				<h2 className="reveal-scroll mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					A different kind of software partner.
				</h2>
				<div className="reveal-stagger grid gap-5 md:grid-cols-2">
					<div className="panel p-7">
						<p className="kicker">We are</p>
						<ul className="mt-5 space-y-3.5">
							{weAre.map((item) => (
								<li key={item} className="flex items-start gap-3 text-ink/90">
									<Check className="mt-0.5 h-5 w-5 shrink-0 text-violet" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="panel-line p-7">
						<p className="kicker !text-mute before:!bg-border-strong">
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

			{/* Oversized stats — the positioning, made visual */}
			<section className="site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<div className="reveal-scroll mb-10 flex flex-wrap items-center justify-between gap-4">
						<p className="kicker">What the partnership means</p>
						<span className="hidden text-sm text-mute sm:block">
							The ownership model, in three numbers
						</span>
					</div>
					<div className="reveal-stagger grid gap-10 sm:grid-cols-3">
						{stats.map((stat, idx) => (
							<div key={stat.label}>
								<div className="font-heading text-[clamp(3.2rem,7vw,5rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
									{stat.value}
								</div>
								<span
									aria-hidden
									className={`mt-4 block h-[3px] w-12 rounded-full ${
										idx === 1 ? "bg-warm" : "bg-violet"
									}`}
								/>
								<p className="mt-3 max-w-[16rem] text-sm leading-snug text-mute">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Principles */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-8 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="kicker mb-4">Principles</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							The convictions that shape what we build.
						</h2>
					</div>
					<p className="hidden max-w-xs text-sm text-mute md:block">
						Conviction and craft, in equal measure.
					</p>
				</div>
				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{principles.map((principle) => (
						<div key={principle.title} className="group bg-surface p-6">
							<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
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
				<p className="kicker reveal-scroll mb-4">How we engage</p>
				<h2 className="reveal-scroll mb-8 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
					A partnership, not a project queue.
				</h2>
				<div className="reveal-stagger grid gap-5 sm:grid-cols-2">
					{engagement.map((item, idx) => (
						<article
							key={item.title}
							className="panel panel-hover group relative p-7"
						>
							<span
								aria-hidden
								className={`card-node${idx === 0 ? " is-warm" : ""}`}
							/>
							<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
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
				<div className="reveal-scroll mb-8 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="kicker mb-4">The people who build it</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							Small, senior, and close to the work.
						</h2>
					</div>
					<span className="tag">Bios to be added</span>
				</div>
				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-3">
					{team.map((member) => (
						<div key={member.role} className="bg-surface p-7">
							<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
								<Users aria-hidden className="h-5 w-5" />
							</div>
							<p className="text-sm font-semibold text-violet">{member.role}</p>
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
			<section className="glow site-wide section-shell pt-0">
				<p className="kicker reveal-scroll mb-4">
					Security &amp; data ownership
				</p>
				<div className="panel ticked relative overflow-hidden rounded-[22px] p-8 sm:p-12">
					<span className="absolute right-6 top-6 hidden text-sm text-mute sm:block">
						How your data stays governed
					</span>
					<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
						<div className="reveal-scroll">
							<div className="mb-5 inline-flex rounded-xl border border-border bg-surface-violet p-3 text-violet">
								<ShieldCheck className="h-5 w-5" />
							</div>
							<h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
								Serious security — and yours to keep.
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
						<ul className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2">
							{dataPoints.map((point) => (
								<li
									key={point}
									className="flex items-start gap-3 bg-surface p-5 text-sm leading-relaxed text-ink/85"
								>
									<Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
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
				primaryLabel="Book a free exploration meeting"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
