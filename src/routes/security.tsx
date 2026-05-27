import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	Database,
	Eye,
	EyeOff,
	GitPullRequestArrow,
	Key,
	type LucideIcon,
	Network,
	Radar,
	Scale,
	ScrollText,
	ShieldCheck,
	Users,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import ProcessFlow from "../components/ProcessFlow";
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
	icon: LucideIcon;
};

const rollout: Stage[] = [
	{
		n: "01",
		title: "Read-only first",
		desc: "We start by reading from your systems — no writes, no changes. You see value before anything moves.",
		icon: EyeOff,
	},
	{
		n: "02",
		title: "Approval gates",
		desc: "When the system starts taking action, sensitive steps pause for a human to approve.",
		icon: GitPullRequestArrow,
	},
	{
		n: "03",
		title: "Observability",
		desc: "We harden logging and audit coverage so every action is visible and accountable.",
		icon: Radar,
	},
	{
		n: "04",
		title: "Scale across teams",
		desc: "Once it's proven and trusted, we widen access to more workflows and more of your team.",
		icon: Users,
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
			<section className="glow section-shell">
				<div className="site-wide">
					<div className="dimline reveal-up mb-10">
						Mation — security & governance · built in, not bolted on
					</div>
					<div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
						<div className="space-y-7">
							<span className="pill reveal-up">
								<ShieldCheck className="h-3.5 w-3.5 text-violet-bright" />
								Security & governance
							</span>
							<h1 className="reveal-up delay-1 display text-[2.6rem] text-ink sm:text-6xl lg:text-[3.9rem]">
								Protect your business while{" "}
								<span className="gradient-ink">moving faster.</span>
							</h1>
							<p className="reveal-up delay-2 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
								You shouldn't have to trade speed for control. We build security
								and governance into the system we ship for you — so you move
								fast without putting compliance, your data, or your business at
								risk.
							</p>
							<div className="reveal-up delay-3 flex flex-col gap-3 sm:flex-row">
								<MagneticLink to="/contact" className="button-primary">
									Book a free exploration meeting
									<ArrowRight className="h-4 w-4" />
								</MagneticLink>
								<MagneticLink to="/approach" className="button-secondary">
									See how we work
								</MagneticLink>
							</div>
							<ul className="reveal-up delay-4 flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-xs uppercase tracking-[0.12em] text-mute">
								<li className="flex items-center gap-2">
									<Check className="h-3.5 w-3.5 text-violet-bright" /> Your data
									stays yours
								</li>
								<li className="flex items-center gap-2">
									<Check className="h-3.5 w-3.5 text-violet-bright" /> You own
									the code
								</li>
								<li className="flex items-center gap-2">
									<Check className="h-3.5 w-3.5 text-violet-bright" /> No
									lock-in
								</li>
							</ul>
						</div>

						{/* Oversized exposure stat — the signature security visual */}
						<div className="reveal-up delay-2 relative">
							<div className="bracket">
								<div className="panel ticked relative overflow-hidden rounded-[22px] p-8 sm:p-9">
									<div
										aria-hidden
										className="pointer-events-none absolute inset-0 opacity-60"
										style={{
											backgroundImage:
												"linear-gradient(rgba(123,97,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.06) 1px, transparent 1px)",
											backgroundSize: "32px 32px",
											maskImage:
												"radial-gradient(circle at 50% 30%, #000 30%, transparent 90%)",
										}}
									/>
									<div className="relative">
										<p className="bp-coord">Exposure with controls on</p>
										<div className="mt-4 font-heading text-[clamp(4rem,9vw,6.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
											<span className="gradient-ink">5%</span>
										</div>
										<p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-mute">
											Every guardrail on — least privilege, scoped reach,
											approvals, and full audit. The more controls, the less
											surface area exposed.
										</p>
										<div className="trust-meter mt-6">
											<div style={{ width: "95%" }} />
										</div>
										<div className="mt-4 flex items-center gap-2 font-mono text-xs text-violet-bright">
											<ShieldCheck className="h-3.5 w-3.5" />5 / 5 controls
											active
										</div>
									</div>
								</div>
							</div>
							<div className="absolute -left-3 -top-3 hidden rounded-lg border border-line bg-canvas px-3 py-2 sm:block">
								<span className="bp-coord">Risk ↓ 90%</span>
							</div>
							<p className="bp-coord mt-3 text-center">
								FIG.01 · SURFACE AREA — CONTROLS ENGAGED
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Pillars */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-10 max-w-2xl">
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

				<div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{pillars.map((pillar) => (
						<article key={pillar.n} className="panel panel-hover group p-6">
							<div className="flex items-center justify-between">
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
									<pillar.icon className="relative h-5 w-5" />
								</div>
								<span className="bp-coord">{pillar.n}</span>
							</div>
							<h3 className="mt-5 font-heading text-lg font-semibold text-ink">
								{pillar.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{pillar.description}
							</p>
						</article>
					))}
					<article className="panel group flex flex-col justify-between bg-[radial-gradient(circle_at_80%_-10%,rgba(123,97,255,0.12),transparent_55%)] p-6">
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
							<Scale className="relative h-5 w-5" />
						</div>
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
			<section className="glow site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<div className="reveal-scroll mb-8 max-w-2xl">
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
				<div className="reveal-scroll mb-12 max-w-2xl">
					<p className="section-index mb-4">
						<b>03</b> &nbsp;/&nbsp; How we roll out safely
					</p>
					<h2 className="font-heading text-3xl font-semibold text-ink sm:text-[2.2rem]">
						We earn trust before we widen reach.
					</h2>
					<p className="mt-4 text-pretty text-mute">
						Nothing goes straight to full access. We expand capability one
						deliberate step at a time, with you in control at every gate.
					</p>
				</div>

				<div className="reveal-scroll mb-6">
					<p className="dimline">Read-only → approvals → observed → scaled</p>
				</div>
				<div className="reveal-scroll">
					<ProcessFlow steps={rollout} />
				</div>

				<hr className="hairline my-12" />

				<div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
					<div className="reveal-scroll">
						<p className="section-index mb-4">
							<b>04</b> &nbsp;/&nbsp; Straight answers
						</p>
						<h3 className="font-heading text-3xl font-semibold text-ink sm:text-[2.2rem]">
							The questions we get asked first.
						</h3>
						<p className="mt-4 max-w-md text-pretty text-mute">
							Short answers to the controls most teams ask about before they
							start. Need one we haven't listed?
						</p>
						<p className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-mute">
							<GitPullRequestArrow className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" />
							Have a control your auditors require? Tell us and we'll build to
							it.
						</p>
					</div>

					<dl className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
						{faqs.map((faq) => (
							<div key={faq.q} className="bg-panel p-6">
								<div className="flex items-center gap-3">
									<span className="inline-flex rounded-lg border border-line bg-white/[0.03] p-2 text-violet-bright">
										<Eye className="h-4 w-4" />
									</span>
									<dt className="text-[0.95rem] font-medium text-ink">
										{faq.q}
									</dt>
								</div>
								<dd className="mt-4 flex items-center gap-2 font-mono text-sm text-violet-bright">
									<Check className="h-4 w-4" /> {faq.a}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<CTASection
				title="Move fast on a system you can actually trust."
				description="Start with a discovery call. We'll learn how you operate and show you how security and governance get built into what we ship for you."
				primaryLabel="Book a free exploration meeting"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
