import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Factory, ShieldCheck, Zap } from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";

export const Route = createFileRoute("/company")({
	component: CompanyPage,
	head: () => ({
		meta: [
			{ title: "Company — About Mation" },
			{
				name: "description",
				content:
					"Mation builds AI operating systems that make work clearer, faster, and safer through a governed generative interface.",
			},
		],
	}),
});

const principles = [
	"Clarity over noise",
	"Workflow over handoffs",
	"Trust through governance",
	"Modular systems that compound",
	"Foundations over hacks (scope creep creates technical debt)"
];

const approaches = [
	"Start with a pilot that proves value and governance",
	"Build reusable components and connectors",
	"Scale across teams when trust is established",
	"Treat adoption as UX design, not training"
];

function CompanyPage() {
	return (
		<>
			<InteractiveAura />

			<section className="section-shell pt-32 pb-16">
				<div className="site-shell max-w-4xl mx-auto text-center space-y-7">
					<div className="mx-auto w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
						<Factory className="h-7 w-7 text-purple-300" />
					</div>
					<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
						Mation exists to make AI operational.
					</h1>
					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80 max-w-2xl mx-auto">
						AI shouldn’t be a side tool. It should be the operating layer that makes work clearer, faster, and safer.
					</p>
				</div>
			</section>

			<section className="site-shell section-shell pt-0 grid md:grid-cols-2 gap-8">
				<article className="panel-glass rounded-3xl p-8 sm:p-12">
					<h2 className="font-heading text-3xl font-semibold text-white mb-8 flex items-center gap-3">
						<ShieldCheck className="text-cyan-400 h-8 w-8" />
						Principles
					</h2>
					<ul className="space-y-5">
						{principles.map((p, i) => (
							<li key={i} className="flex gap-4 items-center">
								<span className="text-cyan-200">/</span>
								<span className="text-lg text-indigo-100/90">{p}</span>
							</li>
						))}
					</ul>
				</article>

				<article className="panel-glass rounded-3xl p-8 sm:p-12 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_70%)]">
					<h2 className="font-heading text-3xl font-semibold text-white mb-8 flex items-center gap-3">
						<Zap className="text-purple-400 h-8 w-8" />
						Our approach
					</h2>
					<ul className="space-y-6">
						{approaches.map((a, i) => (
							<li key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5">
								<CheckCircle2 className="h-6 w-6 text-purple-400 shrink-0" />
								<span className="text-indigo-100/90 leading-relaxed">{a}</span>
							</li>
						))}
					</ul>
				</article>
			</section>

			<CTASection
				title="Become an operational enterprise."
				description="Join the organizations rewriting how complex work gets done."
				primaryLabel="Book a demo"
				secondaryLabel="Talk to an architect"
			/>
		</>
	);
}
