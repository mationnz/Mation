import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	Database,
	Eye,
	GitPullRequestArrow,
	Key,
	type LucideIcon,
	Network,
	Scale,
	ScrollText,
	ShieldCheck,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import TrustControlPanel from "../components/TrustControlPanel";

export const Route = createFileRoute("/security")({
	component: SecurityPage,
	head: () => ({
		meta: [
			{
				title:
					"Security & governance — Protect your business while moving faster",
			},
			{
				name: "description",
				content:
					"Mation builds security and governance into the system we ship for you — least-privilege access, data ownership, full audit trails, secure integrations, and approvals on sensitive actions.",
			},
			{
				property: "og:title",
				content: "Security & governance — Built in, not bolted on",
			},
			{
				property: "og:description",
				content:
					"Least-privilege access, your data and code stay yours, complete audit trails, secure integrations, and approval gates — engineered into the system we build for you.",
			},
		],
	}),
});

type Pillar = {
	n: string;
	icon: LucideIcon;
	title: string;
	description: string;
};

const pillars: Pillar[] = [
	{
		n: "01",
		icon: Key,
		title: "Least-privilege access",
		description:
			"Every person and process gets the minimum access the job needs — scoped by role, never more.",
	},
	{
		n: "02",
		icon: Database,
		title: "You own your data and code",
		description:
			"Your data stays yours and the code is yours to keep. No lock-in, no hostage situation.",
	},
	{
		n: "03",
		icon: ScrollText,
		title: "Complete audit trails",
		description:
			"Every action is recorded against the user who took it — evidence ready whenever you need it.",
	},
	{
		n: "04",
		icon: Network,
		title: "Secure integrations",
		description:
			"Connections to your existing tools are scoped, encrypted, and reachable only where you allow.",
	},
	{
		n: "05",
		icon: ShieldCheck,
		title: "Built-in safety",
		description:
			"Sensitive actions wait for approval, so nothing irreversible happens without a human saying yes.",
	},
];

type Stage = {
	n: string;
	title: string;
	desc: string;
};

const rollout: Stage[] = [
	{
		n: "01",
		title: "Read-only first",
		desc: "We start by reading from your systems — no writes, no changes. You see value before anything moves.",
	},
	{
		n: "02",
		title: "Approval gates",
		desc: "When the system starts taking action, sensitive steps pause for a human to approve.",
	},
	{
		n: "03",
		title: "Observability",
		desc: "We harden logging and audit coverage so every action is visible and accountable.",
	},
	{
		n: "04",
		title: "Scale across teams",
		desc: "Once it's proven and trusted, we widen access to more workflows and more of your team.",
	},
];

const faqs = [
	{ q: "Can we run read-only first?", a: "Yes." },
	{ q: "Can actions require approval?", a: "Yes." },
	{ q: "Can we restrict which systems are reachable?", a: "Yes." },
	{ q: "Do we own the code and data?", a: "Yes." },
];

function SecurityPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="section-shell">
				<div className="site-wide max-w-4xl">
					<span className="pill reveal-up">
						<ShieldCheck className="h-3.5 w-3.5 text-violet-bright" />
						Security & governance
					</span>
					<h1 className="reveal-up delay-1 mt-6 display text-[2.6rem] text-ink sm:text-6xl lg:text-[3.9rem]">
						Protect your business while{" "}
						<span className="gradient-ink">moving faster.</span>
					</h1>
					<p className="reveal-up delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
						You shouldn't have to trade speed for control. We build security and
						governance into the system we ship for you — so you move fast
						without putting compliance, your data, or your business at risk.
					</p>
					<div className="reveal-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary">
							Book a discovery call
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink to="/approach" className="button-secondary">
							See how we work
						</MagneticLink>
					</div>
					<ul className="reveal-up delay-4 mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-mute">
						<li className="flex items-center gap-2">
							<Check className="h-3.5 w-3.5 text-violet-bright" /> Your data
							stays yours
						</li>
						<li className="flex items-center gap-2">
							<Check className="h-3.5 w-3.5 text-violet-bright" /> You own the
							code
						</li>
						<li className="flex items-center gap-2">
							<Check className="h-3.5 w-3.5 text-violet-bright" /> No lock-in
						</li>
					</ul>
				</div>
			</section>

			{/* Pillars */}
			<section className="site-wide section-shell pt-0">
				<div className="mb-10 max-w-2xl">
					<p className="section-index mb-4">
						<b>01</b> &nbsp;/&nbsp; What's built in
					</p>
					<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
						Governance is part of the build, not a bolt-on.
					</h2>
					<p className="mt-4 text-pretty text-mute">
						Because we build the system around how you operate, we build control
						into it from day one. Five things we engineer into everything we
						ship for you.
					</p>
				</div>

				<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-3">
					{pillars.map((pillar) => (
						<article key={pillar.n} className="bg-panel p-7">
							<div className="flex items-center gap-4">
								<span className="font-mono text-sm text-violet-bright">
									{pillar.n}
								</span>
								<span className="inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
									<pillar.icon className="h-5 w-5" />
								</span>
							</div>
							<h3 className="mt-5 font-heading text-lg font-semibold text-ink">
								{pillar.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{pillar.description}
							</p>
						</article>
					))}
					<article className="flex flex-col justify-between bg-panel p-7">
						<span className="inline-flex w-fit rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
							<Scale className="h-5 w-5" />
						</span>
						<div className="mt-8">
							<h3 className="font-heading text-lg font-semibold text-ink">
								Built to recognised standards
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								We build to ISO 27001-aligned practices, so what we ship stands
								up to the controls your auditors expect.
							</p>
						</div>
					</article>
				</div>
			</section>

			{/* Interactive governance illustration */}
			<section className="site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<div className="mb-8 max-w-2xl">
						<p className="section-index mb-4">
							<b>02</b> &nbsp;/&nbsp; Safety at every step
						</p>
						<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.2rem]">
							You decide what the system can do — and we can prove it did only
							that.
						</h2>
						<p className="mt-4 text-pretty text-mute">
							Toggle the guardrails to see how each one tightens what's
							possible. In a real build, these are configured to your policy and
							enforced in code.
						</p>
					</div>
					<TrustControlPanel />
				</div>
			</section>

			{/* Rollout approach + FAQ */}
			<section className="site-wide section-shell pt-0">
				<div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
					<div>
						<p className="section-index mb-4">
							<b>03</b> &nbsp;/&nbsp; How we roll out safely
						</p>
						<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.2rem]">
							We earn trust before we widen reach.
						</h2>
						<p className="mt-4 max-w-xl text-pretty text-mute">
							Nothing goes straight to full access. We expand capability one
							deliberate step at a time, with you in control at every gate.
						</p>
						<ol className="mt-8 flex flex-col gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)]">
							{rollout.map((stage) => (
								<li
									key={stage.n}
									className="flex items-start gap-4 bg-panel p-5"
								>
									<span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.03] font-mono text-xs text-violet-bright">
										{stage.n}
									</span>
									<div>
										<h3 className="font-heading text-base font-semibold text-ink">
											{stage.title}
										</h3>
										<p className="mt-1 text-sm leading-relaxed text-mute">
											{stage.desc}
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>

					<div className="panel rounded-[22px] p-7 sm:p-8">
						<div className="mb-2 flex items-center gap-3">
							<span className="inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
								<Eye className="h-5 w-5" />
							</span>
							<p className="font-mono text-xs uppercase tracking-[0.16em] text-violet-bright/90">
								Straight answers
							</p>
						</div>
						<h3 className="font-heading text-2xl font-semibold text-ink">
							The questions we get asked first.
						</h3>
						<dl className="mt-6 flex flex-col gap-px overflow-hidden rounded-[12px] border border-line bg-[var(--color-line)]">
							{faqs.map((faq) => (
								<div key={faq.q} className="bg-panel p-5">
									<dt className="text-[0.95rem] font-medium text-ink">
										{faq.q}
									</dt>
									<dd className="mt-2 flex items-center gap-2 font-mono text-sm text-violet-bright">
										<Check className="h-4 w-4" /> {faq.a}
									</dd>
								</div>
							))}
						</dl>
						<hr className="hairline my-6" />
						<p className="flex items-start gap-3 text-sm leading-relaxed text-mute">
							<GitPullRequestArrow className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" />
							Have a control your auditors require? Tell us and we'll build to
							it.
						</p>
					</div>
				</div>
			</section>

			<CTASection
				title="Move fast on a system you can actually trust."
				description="Start with a discovery call. We'll learn how you operate and show you how security and governance get built into what we ship for you."
				primaryLabel="Book a discovery call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
