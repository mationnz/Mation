import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2,
	Database,
	Key,
	Lock,
	Network,
	Search,
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
			{ title: "Security — Governed, auditable AI with Mation" },
			{
				name: "description",
				content:
					"Mation is built for enterprise deployment with access control, approval gates, audit trails, and a secure tool gateway for integrations.",
			},
		],
	}),
});

const securityPillars = [
	{
		title: "Strict permissions",
		description: "You choose exactly who can see what and take action",
		icon: Key,
	},
	{
		title: "Safe data storage",
		description: "Your information is kept secure, private, and controlled",
		icon: Database,
	},
	{
		title: "Complete audit trails",
		description: "A clear, detailed record of every action taken",
		icon: Search,
	},
	{
		title: "Secure connections",
		description: "Every connection to your existing tools is carefully monitored",
		icon: Network,
	},
	{
		title: "Built-in safety",
		description: "Clear rules and approvals to prevent mistakes before they happen",
		icon: ShieldCheck,
	},
];

const faqs = [
	{ q: "Can we run read-only first?", a: "Yes." },
	{ q: "Can actions require approval?", a: "Yes." },
	{ q: "Can we restrict which systems are reachable?", a: "Yes." },
	{ q: "Can we log everything?", a: "Yes." },
];

function SecurityPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="section-shell pt-32 pb-16">
				<div className="site-shell max-w-4xl mx-auto text-center space-y-7">
					<div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(91,199,255,0.15)]">
						<Lock className="h-7 w-7 text-cyan-200" />
					</div>
					<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
						Protect your business while moving faster.
					</h1>
					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80 max-w-2xl mx-auto">
						Gain the speed of intelligent automation without compromising on compliance, data privacy, or control.
					</p>
					<div className="reveal-up delay-2 pt-4">
						<MagneticLink to="/contact" className="button-primary">
							Talk to an architect
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* Pillars */}
			<section className="site-shell section-shell pt-0">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
					{securityPillars.map((pillar, i) => (
						<article key={i} className="panel-glass rounded-2xl p-6 border border-white/5">
							<div className="mb-4 text-cyan-200 bg-cyan-200/10 border border-cyan-200/20 w-fit p-3 rounded-xl">
								<pillar.icon className="h-5 w-5" />
							</div>
							<h4 className="font-heading text-xl font-semibold text-white mb-2">{pillar.title}</h4>
							<p className="text-sm text-indigo-100/70">{pillar.description}</p>
						</article>
					))}
				</div>
			</section>

			{/* Governed action simulator widget */}
			<section className="site-shell section-shell pt-0">
				<div className="panel-glass rounded-3xl p-8 sm:p-12 border-t-2 border-t-cyan-500/30 text-center">
					<p className="kicker justify-center mb-4">Governed Action Simulator</p>
					<h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-10">
						Safety at every step of execution.
					</h2>
					<TrustControlPanel />
				</div>
			</section>

			{/* Deployment approach */}
			<section className="site-shell section-shell pt-0 grid md:grid-cols-2 gap-12 items-center">
				<div className="space-y-6">
					<h2 className="font-heading text-3xl font-semibold text-white">Deployment approach</h2>
					<p className="text-lg text-indigo-100/78">Platform + Services implementation pathway:</p>
					<ul className="space-y-4">
						{[
							"Start read-only with limited connectors",
							"Expand capabilities with approval gates",
							"Harden observability and audit coverage",
							"Scale to more workflows and teams"
						].map((step, i) => (
							<li key={i} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5 text-indigo-100/90 text-sm font-medium">
								<div className="w-8 h-8 rounded-full bg-cyan-500/10 flex justify-center items-center text-cyan-200 font-bold text-xs shrink-0">{i + 1}</div>
								{step}
							</li>
						))}
					</ul>
				</div>
				
				{/* FAQ */}
				<div className="panel-glass rounded-3xl p-8 space-y-6">
					<h3 className="font-heading text-2xl font-semibold text-white mb-2">Security FAQ</h3>
					{faqs.map((faq, i) => (
						<div key={i} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
							<p className="font-medium text-white text-[0.95rem] mb-2">{faq.q}</p>
							<p className="text-cyan-300 font-semibold flex items-center gap-2 text-sm">
								<CheckCircle2 className="h-4 w-4" /> {faq.a}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* CTA */}
			<CTASection
				title="Ready to deploy AI safely?"
				description="Connect with our architecture team to validate Mation in your security posture."
				primaryLabel="Talk to an architect"
				secondaryLabel="Book a demo"
			/>
		</>
	);
}
