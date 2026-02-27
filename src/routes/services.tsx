import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Rocket, ShieldCheck, Target, Workflow } from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";

export const Route = createFileRoute("/services")({
	component: ServicesPage,
	head: () => ({
		meta: [
			{ title: "Services — Platform + implementation with Mation" },
			{
				name: "description",
				content:
					"Mation combines a modular AI platform with services to implement integrations, governance, and pilots that ship outcomes.",
			},
		],
	}),
});

const engagementStages = [
	{
		title: "Stage 1 — Discovery Sprint",
		duration: "1–2 weeks",
		activities: [
			"Workflow mapping",
			"Integration constraints and risk model",
			"Governance requirements (permissions, approvals, audit trails)",
			"Pilot scope and success metrics",
		],
		deliverables: [
			"Pilot plan + architecture outline",
			"Success metrics and rollout timeline",
			"Security posture summary",
		],
	},
	{
		title: "Stage 2 — Pilot Build",
		duration: "4–6 weeks",
		activities: [
			"1–2 high-impact workflows end-to-end",
			"Read-only integrations first",
			"UI components + artifacts shipped for real users",
			"Observability baseline and audit trail coverage",
		],
		deliverables: [
			"Live pilot workflow(s)",
			"Dashboard/canvas views and artifacts",
			"Integration + governance documentation",
		],
	},
	{
		title: "Stage 3 — Production Rollout",
		duration: "8–12 weeks",
		activities: [
			"Hardened deployment patterns",
			"Expanded connectors",
			"Approval-gated actions where appropriate",
			"Adoption enablement and operating standards",
		],
		deliverables: [
			"Production-ready system",
			"Operating playbook",
			"Monitoring + alerting",
		],
	},
	{
		title: "Stage 4 — Managed Evolution",
		duration: "Ongoing",
		activities: [
			"New modules, integrations, workflows",
			"Cost/latency optimisation",
			"Governance tuning as org scales",
		],
	},
];

const pilotCriteria = [
	{ title: "High friction today", desc: "Pain points with lots of manual handoffs", icon: Target },
	{ title: "High value outputs", desc: "Reports, evidence packs, strategic decisions", icon: Rocket },
	{ title: "Clear ownership", desc: "Dedicated stakeholders and success metrics", icon: CheckCircle2 },
	{ title: "Safe to start", desc: "Workflows where read-only is initially sufficient", icon: ShieldCheck },
];

function ServicesPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="section-shell pt-32 pb-16">
				<div className="site-shell max-w-4xl mx-auto text-center space-y-7">
					<div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
						<Workflow className="h-7 w-7 text-indigo-300" />
					</div>
					<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
						Platform + Services that ship outcomes.
					</h1>
					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80 max-w-2xl mx-auto">
						Mation isn’t “here’s software, good luck.” We implement, integrate, and roll it out properly.
					</p>
					<div className="reveal-up delay-2 pt-4">
						<MagneticLink to="/contact" className="button-primary">
							Book a demo
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* Engagement model */}
			<section className="site-shell section-shell pt-0">
				<div className="space-y-4 mb-12 text-center">
					<p className="kicker justify-center">Implementation Pathway</p>
					<h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white">
						Engagement model
					</h2>
				</div>
				<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{engagementStages.map((stage, i) => (
						<article key={i} className="panel-glass rounded-3xl p-8 relative overflow-hidden">
							<div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 to-indigo-500 opacity-80" />
							<div className="flex justify-between items-start mb-6">
								<h3 className="font-heading text-2xl font-semibold text-white">{stage.title}</h3>
								<span className="text-xs font-tech tracking-wider text-cyan-200 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{stage.duration}</span>
							</div>
							
							<div className="space-y-6">
								<div>
									<h4 className="text-sm uppercase tracking-wider text-indigo-100/60 font-semibold mb-3">Activities</h4>
									<ul className="space-y-2">
										{stage.activities.map((act, j) => (
											<li key={j} className="flex items-start gap-2 text-indigo-100/80 text-sm">
												<span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
												<span>{act}</span>
											</li>
										))}
									</ul>
								</div>
								
								{stage.deliverables && (
									<div>
										<h4 className="text-sm uppercase tracking-wider text-cyan-100/60 font-semibold mb-3">Deliverables</h4>
										<ul className="space-y-2">
											{stage.deliverables.map((del, k) => (
												<li key={k} className="flex items-start gap-2 text-indigo-100/90 text-sm font-medium">
													<CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
													<span>{del}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</article>
					))}
				</div>
			</section>

			{/* What makes a good pilot */}
			<section className="site-shell section-shell pt-0">
				<div className="panel-glass rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto border-t-2 border-t-indigo-500/30">
					<h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white text-center mb-10">
						What makes a good pilot?
					</h2>
					<div className="grid sm:grid-cols-2 gap-6">
						{pilotCriteria.map((crit, i) => (
							<div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex gap-4 items-start">
								<div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
									<crit.icon className="h-5 w-5 text-indigo-300" />
								</div>
								<div>
									<h4 className="font-heading text-xl font-semibold text-white">{crit.title}</h4>
									<p className="text-indigo-100/70 mt-2">{crit.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<CTASection
				title="Ready to scope your pilot?"
				description="Work with our team to map your workflows and define a secure, high-ROI implementation plan."
				primaryLabel="Book a demo"
				secondaryLabel="Talk to an architect"
			/>
		</>
	);
}
