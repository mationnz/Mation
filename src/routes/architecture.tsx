import { createFileRoute } from "@tanstack/react-router";
import {
	Bot,
	Database,
	Layers,
	LayoutDashboard,
	Lock,
	Network,
	ShieldCheck,
} from "lucide-react";

import AgentNetwork from "../components/AgentNetwork";
import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";

export const Route = createFileRoute("/architecture")({
	component: ArchitecturePage,
	head: () => ({
		meta: [
			{ title: "Architecture — Mation Agent & User Harness Platform" },
			{
				name: "description",
				content:
					"See how Mation combines an agent harness and user harness to generate UI, artifacts, and governed actions across enterprise systems.",
			},
		],
	}),
});

const coreModelBullets = [
	{
		title: "Dependable workflows",
		description: "Understands intent and flawlessly executes multi-step processes.",
		icon: Network,
	},
	{
		title: "Specialized tasks",
		description: "Dedicated processes for securing data, generating reports, and taking action.",
		icon: Bot,
	},
	{
		title: "Dynamic interfaces",
		description: "Builds a clear, simple layout perfectly matched to the user's need.",
		icon: LayoutDashboard,
	},
	{
		title: "Scalable infrastructure",
		description: "Built on reliable architecture that grows alongside your business.",
		icon: Layers,
	},
	{
		title: "Secure data handling",
		description: "Keeps a close watch on permissions and maintains complete audit logs.",
		icon: ShieldCheck,
	},
];

function ArchitecturePage() {
	return (
		<>
			<InteractiveAura />

			{/* 1) Hero */}
			<section className="section-shell pt-32 pb-16">
				<div className="site-shell max-w-4xl mx-auto text-center space-y-7">
					<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
						Enterprise-grade automation you can trust.
					</h1>
					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80 max-w-3xl mx-auto">
						Designed for scale, reliability, and complete visibility. Mation is the secure foundation for your company's growth.
					</p>
					<div className="reveal-up delay-2 pt-4">
						<MagneticLink to="/contact" className="button-primary">
							Talk to an architect
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* 2) The core model */}
			<section className="site-shell section-shell pt-0">
				<div className="panel-glass rounded-3xl p-8 sm:p-12 lg:p-16">
					<div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
						<div className="space-y-8">
							<div>
								<p className="kicker">The Generative Interface</p>
								<h2 className="mt-4 font-heading text-3xl sm:text-4xl font-semibold text-white">
									Agent Harness + User Harness
								</h2>
							</div>
							<div className="grid gap-4">
								{coreModelBullets.map((bullet, i) => (
									<div key={i} className="flex gap-4 items-start bg-white/5 border border-white/5 rounded-xl p-4 transition-colors hover:bg-white/10">
										<div className="w-10 h-10 rounded-full bg-cyan-200/10 flex items-center justify-center shrink-0 border border-cyan-200/20">
											<bullet.icon className="h-4 w-4 text-cyan-200" />
										</div>
										<div>
											<h4 className="font-heading text-lg font-semibold text-white">{bullet.title}</h4>
											<p className="text-sm text-indigo-100/70 mt-1">{bullet.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
						
						{/* Architecture Explorer Widget / Agent Network fallback */}
						<div className="relative">
							{/* Node connection lines underlying glow */}
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-glow),transparent_60%)] opacity-50 pointer-events-none" />
							<AgentNetwork />
						</div>
					</div>
				</div>
			</section>

			{/* 3) Server-driven UI */}
			<section className="site-shell section-shell pt-0 grid md:grid-cols-2 gap-8">
				<article className="panel-glass rounded-3xl p-8 sm:p-10 flex flex-col justify-center">
					<div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
						<LayoutDashboard className="h-6 w-6 text-cyan-300" />
					</div>
					<h3 className="font-heading text-3xl font-semibold text-white mb-4">
						Stop juggling apps. Get the right screen at the right time.
					</h3>
					<p className="text-lg text-indigo-100/78 leading-relaxed">
						Instead of forcing you to hunt through fifty different screens, Mation generates exactly the interface you need on the spot, using your company's safe, approved components.
					</p>
				</article>

				{/* 4) Memory + context management */}
				<article className="panel-glass rounded-3xl p-8 sm:p-10 flex flex-col justify-center bg-[radial-gradient(circle_at_bottom_right,rgba(91,199,255,0.1),transparent_70%)]">
					<div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
						<Database className="h-6 w-6 text-violet-300" />
					</div>
					<h3 className="font-heading text-3xl font-semibold text-white mb-4">
						Smart details that don't get mixed up.
					</h3>
					<p className="text-lg text-indigo-100/78 leading-relaxed">
						Mation keeps track of what you're doing without confusing one task with another, so it always provides accurate, relevant help.
					</p>
				</article>
			</section>

			{/* 5) Governed execution */}
			<section className="site-shell section-shell pt-0">
				<div className="panel-glass rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border-b-2 border-b-cyan-500/30">
					<div className="mx-auto w-16 h-16 rounded-2xl bg-[#0f1230] border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(91,199,255,0.15)]">
						<Lock className="h-7 w-7 text-cyan-200" />
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-5">
						Read-only first. Approval-gated actions next.
					</h2>
					<p className="text-lg text-indigo-100/78 max-w-2xl mx-auto leading-relaxed">
						High-risk actions require explicit approval. Every action is logged with evidence references. Observability shows reliability, cost, and latency.
					</p>
				</div>
			</section>

			{/* 6) CTA */}
			<CTASection
				title="Want the technical blueprint for your environment?"
				description="See how Mation fits seamlessly into your enterprise architecture."
				primaryLabel="Talk to an architect"
				secondaryLabel="Book a demo"
			/>
		</>
	);
}
