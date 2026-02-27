import { createFileRoute } from "@tanstack/react-router";
import {
	Activity,
	Blocks,
	Bot,
	Database,
	Layout,
	Layers,
	ShieldCheck,
	Workflow,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import ScrollyTransformation from "../components/ScrollyTransformation";

export const Route = createFileRoute("/product")({
	component: ProductPage,
	head: () => ({
		meta: [
			{ title: "Product — Mation AI Operating System" },
			{
				name: "description",
				content:
					"Mation is an AI operating system for complex work. Chat becomes dashboards, artifacts, and governed actions across your existing systems.",
			},
		],
	}),
});

const featureList = [
	{
		title: "Generative UI rendering",
		description: "UI spec + component registry",
		icon: Layout,
	},
	{
		title: "Instant reports & documents",
		description: "Reports, evidence packs, SOP outputs",
		icon: Layers,
	},
	{
		title: "Workflow execution",
		description: "Automations, approvals, handoffs",
		icon: Workflow,
	},
	{
		title: "Behind-the-scenes teamwork",
		description: "Routing and execution at scale",
		icon: Bot,
	},
	{
		title: "Memory & retrieval layer",
		description: "Architecture for scale and context",
		icon: Database,
	},
	{
		title: "Observability",
		description: "Cost, latency, reliability, auditability",
		icon: Activity,
	},
];

function ProductPage() {
	return (
		<>
			<InteractiveAura />

			{/* 1) Hero */}
			<section className="section-shell pt-32 pb-20">
				<div className="site-shell max-w-4xl mx-auto text-center space-y-8">
					<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
						Scale your operations without scaling your headcount.
					</h1>
					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80 max-w-3xl mx-auto">
						Mation automates the most complex, time-consuming parts of your business, turning bottlenecks into streamlined workflows.
					</p>
					<div className="reveal-up delay-2 flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
						<MagneticLink to="/contact" className="button-primary">
							Book a demo
						</MagneticLink>
						<MagneticLink to="/demo" className="button-secondary">
							See the interface
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* 2) Chat-first, not chat-only */}
			<section className="site-shell section-shell pt-10">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="order-2 md:order-1 panel-glass rounded-3xl p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
						{/* Placeholder for visual */}
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,199,255,0.1),transparent_70%)]" />
						<div className="relative z-10 w-full max-w-sm space-y-4">
							<div className="bg-[#0f1230] border border-white/10 rounded-xl p-4 flex gap-3 opacity-70">
								<div className="w-8 h-8 rounded-full bg-cyan-200/20 flex items-center justify-center shrink-0">
									<Bot className="h-4 w-4 text-cyan-200" />
								</div>
								<div className="h-4 w-3/4 bg-white/10 rounded mt-2" />
							</div>
							<div className="bg-[#0f1230] border border-cyan-500/30 rounded-xl p-5 shadow-[0_0_30px_rgba(91,199,255,0.15)]">
								<div className="h-6 w-1/2 bg-white/20 rounded mb-4" />
								<div className="grid grid-cols-2 gap-3 mb-4">
									<div className="h-16 bg-white/5 border border-white/10 rounded-lg" />
									<div className="h-16 bg-white/5 border border-white/10 rounded-lg" />
								</div>
								<div className="h-10 w-full bg-gradient-to-r from-brand-violet to-brand-cyan rounded-lg opacity-90" />
							</div>
						</div>
					</div>
					<div className="order-1 md:order-2 space-y-5">
						<h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white">
							Empower your team without long training sessions.
						</h2>
						<p className="text-lg text-indigo-100/78 leading-relaxed">
							If they can type a request, they can run complex workflows. Mation instantly provides the right tools, charts, and actions exactly when they are needed.
						</p>
					</div>
				</div>
			</section>

			{/* 3) The Generative Interface */}
			<section className="site-shell section-shell pt-0">
				<div className="panel-glass rounded-3xl p-8 sm:p-12 text-center max-w-5xl mx-auto border-t-2 border-t-cyan-500/30">
					<p className="kicker justify-center w-full mb-4 text-cyan-200 text-sm">The Generative Interface</p>
					<h2 className="font-heading text-4xl font-semibold text-white sm:text-5xl mb-6">
						Ask once. Get the right interface.
					</h2>
					<p className="text-xl text-indigo-100/78 max-w-2xl mx-auto mb-12">
						Mation generates a canvas view tailored to the request — with clear actions, evidence badges, and traceable outputs.
					</p>
					
					{/* Mation Component rendering */}
					<div className="max-w-4xl mx-auto">
						<ScrollyTransformation />
					</div>
				</div>
			</section>

			{/* 4) Modular platform & 5) Governed execution */}
			<section className="site-shell section-shell pt-0 grid md:grid-cols-2 gap-8">
				<article className="panel-glass rounded-3xl p-8 flex flex-col">
					<div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
						<Blocks className="h-7 w-7 text-cyan-200" />
					</div>
					<h3 className="font-heading text-3xl font-semibold text-white mb-4">Build once. Reuse everywhere.</h3>
					<p className="text-lg text-indigo-100/78">
						Every workflow, connector, and UI component becomes a reusable building block. Capability compounds across teams and use cases.
					</p>
				</article>

				<article className="panel-glass rounded-3xl p-8 flex flex-col">
					<div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
						<ShieldCheck className="h-7 w-7 text-cyan-200" />
					</div>
					<h3 className="font-heading text-3xl font-semibold text-white mb-4">Safe action beats clever action.</h3>
					<p className="text-lg text-indigo-100/78">
						Read-only first. Approval-gated actions for sensitive workflows. Full audit trails and observability.
					</p>
				</article>
			</section>

			{/* 6) Feature list */}
			<section className="site-shell section-shell pt-0">
				<div className="space-y-4 mb-10 text-center">
					<h2 className="font-heading text-4xl font-semibold text-white">Full-stack capabilities</h2>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{featureList.map((feature, i) => (
						<article key={i} className="panel-glass rounded-2xl p-6 border border-white/5">
							<div className="mb-4 text-cyan-200 bg-cyan-200/10 w-fit p-3 rounded-xl">
								<feature.icon className="h-5 w-5" />
							</div>
							<h4 className="font-heading text-xl font-semibold text-white mb-2">{feature.title}</h4>
							<p className="text-sm text-indigo-100/70 block">{feature.description}</p>
						</article>
					))}
				</div>
			</section>

			{/* CTA */}
			<CTASection
				title="Ready to transform your operations?"
				description="Connect with our architecture team to see how Mation can be deployed in your environment."
				primaryLabel="Book a demo"
				secondaryLabel="Talk to an architect"
			/>
		</>
	);
}
