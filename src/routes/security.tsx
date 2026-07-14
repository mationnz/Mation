import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Check,
	Database,
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

import MagneticLink from "../components/MagneticLink";
import TrustControlPanel from "../components/TrustControlPanel";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/security")({
	component: SecurityPage,
	head: () => ({
		meta: [
			{
				title: "Security & governance — Move faster, stay protected | Mation",
			},
			{
				name: "description",
				content:
					"Security and governance built into the system we ship — least-privilege access, data ownership, full audit trails, secure integrations, and approvals on sensitive actions.",
			},
			{
				property: "og:title",
				content: "Security & governance — Built in, not bolted on",
			},
			{
				property: "og:description",
				content:
					"Least-privilege access, your data and code stay yours, complete audit trails, and approval gates — engineered into what we build.",
			},
		],
	}),
});

type Tile = { icon: LucideIcon; title: string; note: string };

const builtIn: Tile[] = [
	{ icon: Key, title: "Least-privilege access", note: "Minimum access for the job. Never more." },
	{ icon: Database, title: "You own data & code", note: "Yours to keep. No lock-in." },
	{ icon: ScrollText, title: "Complete audit trails", note: "Every action recorded, ready as evidence." },
	{ icon: Network, title: "Secure integrations", note: "Scoped, encrypted, reachable only where you allow." },
	{ icon: ShieldCheck, title: "Built-in safety", note: "Sensitive actions wait for a human yes." },
	{ icon: Scale, title: "Recognised standards", note: "ISO 27001-aligned practices." },
];

const rollout: Tile[] = [
	{ icon: EyeOff, title: "Read-only first", note: "See value before anything moves." },
	{ icon: GitPullRequestArrow, title: "Approval gates", note: "Sensitive steps pause for a human." },
	{ icon: Radar, title: "Observability", note: "Every action visible and accountable." },
	{ icon: Users, title: "Scale across teams", note: "Widen access once it’s trusted." },
];

const faqs = [
	"Can we run read-only first?",
	"Can actions require approval?",
	"Can we restrict which systems are reachable?",
	"Do we own the code and data?",
];

function SecurityPage() {
	return (
		<>
			{/* ============ HERO ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
					<p className="kicker reveal-up justify-center">Security &amp; governance</p>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[16ch] text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.2rem]">
						Move faster,{" "}
						<span className="gradient-warm serif-em">stay protected.</span>
					</h1>
					<p className="reveal-up delay-2 mt-7 max-w-xl text-lg leading-relaxed text-mute">
						Security and governance built into everything we ship — so you move
						fast without putting your data or your business at risk.
					</p>
					<ul className="reveal-up delay-3 mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-mute">
						<li className="flex items-center gap-2">
							<Check className="h-4 w-4 text-violet" /> Your data stays yours
						</li>
						<li className="flex items-center gap-2">
							<Check className="h-4 w-4 text-violet" /> You own the code
						</li>
						<li className="flex items-center gap-2">
							<Check className="h-4 w-4 text-violet" /> No lock-in
						</li>
					</ul>
					<div className="reveal-up delay-4 mt-9">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Book a free call
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* ============ WHAT'S BUILT IN ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">What’s built in</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						Governance, part of the{" "}
						<span className="serif-em">build.</span>
					</h2>
				</div>
				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{builtIn.map((t) => (
						<div
							key={t.title}
							data-spotlight
							className="group bg-surface p-8 transition-colors duration-200 hover:bg-surface-2/60"
						>
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet transition-transform duration-300 group-hover:-translate-y-0.5">
								<t.icon className="h-5 w-5" />
							</div>
							<h3 className="mt-6 font-heading text-lg font-semibold text-ink">
								{t.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">{t.note}</p>
						</div>
					))}
				</div>
			</section>

			{/* ============ INTERACTIVE — you decide ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">You’re in control</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						You decide what the system{" "}
						<span className="serif-em">can do.</span>
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-lg text-base leading-relaxed text-mute">
						Toggle the guardrails to see how each one tightens what’s possible.
					</p>
				</div>
				<div className="reveal-scroll">
					<TrustControlPanel />
				</div>
			</section>

			{/* ============ ROLLOUT ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						How we roll out
					</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						Trust earned,{" "}
						<span className="serif-em">step by step.</span>
					</h2>
				</div>
				<div className="reveal-stagger grid gap-8 md:grid-cols-4">
					{rollout.map((s, i) => (
						<div key={s.title}>
							<div className="flex items-center gap-3">
								<div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
									<s.icon className="h-5 w-5" />
								</div>
								<span className="font-serif text-2xl italic text-violet/30">
									0{i + 1}
								</span>
							</div>
							<h3 className="mt-5 font-heading text-lg font-semibold text-ink">
								{s.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">{s.note}</p>
						</div>
					))}
				</div>
			</section>

			{/* ============ FAQ ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto max-w-3xl text-center">
					<p className="kicker reveal-scroll justify-center">
						Straight answers
					</p>
					<div className="reveal-stagger mt-8 grid gap-3 sm:grid-cols-2">
						{faqs.map((q) => (
							<div
								key={q}
								className="flex items-center justify-between gap-4 rounded-[14px] border border-border bg-surface p-5 text-left"
							>
								<span className="text-[0.95rem] text-ink-soft">{q}</span>
								<span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-violet-ink">
									<Check className="h-4 w-4 text-violet" /> Yes
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ============ CTA ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="reveal-scroll display text-4xl leading-[1.06] text-ink sm:text-6xl">
						Move fast on a system you can{" "}
						<span className="gradient-warm serif-em">trust.</span>
					</h2>
					<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Book a free call
							<ArrowUpRight className="h-4 w-4" />
						</MagneticLink>
						<a
							href={`mailto:${mationMeta.email}`}
							className="button-secondary !px-6 !py-3"
						>
							{mationMeta.email}
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
