import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
	Activity,
	BarChart3,
	Briefcase,
	CheckCircle,
	ClipboardCheck,
	HardHat,
	LineChart,
	ServerCrash,
	ShieldCheck,
	Users,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";

export const Route = createFileRoute("/solutions")({
	component: SolutionsPage,
	head: () => ({
		meta: [
			{ title: "Solutions — Mation use cases across roles" },
			{
				name: "description",
				content:
					"Explore how Mation supports executives, operations, compliance, field teams, and IT with a governed generative interface.",
			},
		],
	}),
});

const solutionTabs = [
	{
		id: "executives",
		label: "Executives",
		icon: LineChart,
		pain: "Hard to see the big picture; decisions are delayed by poor data.",
		generates: "Clear summaries, big-picture dashboards, and risk highlights.",
		outcomes: "Faster decisions, fewer surprises, and better accountability.",
		workflows: ["Weekly exec pack", "Risk hotspots", "Portfolio status"],
	},
	{
		id: "ops-pms",
		label: "Ops & PMs",
		icon: Users,
		pain: "Too much time spent on reporting, manual updates, and tracking down info.",
		generates: "Project dashboards, automated actions, and meeting follow-ups.",
		outcomes: "Less admin work, clear next steps, and nothing slips through the cracks.",
		workflows: ["Daily update rollup", "Meeting → actions", "Status to client"],
	},
	{
		id: "compliance",
		label: "Compliance",
		icon: ClipboardCheck,
		pain: "Too much paperwork; audit prep takes too long and uses too many resources.",
		generates: "Automated compliance packs, checklists, and clear audit trails.",
		outcomes: "Always ready for audits, with risks managed proactively.",
		workflows: ["Audit pack generator", "Training completion tracking", "Exception alerts"],
	},
	{
		id: "field",
		label: "Field",
		icon: HardHat,
		pain: "Daily reporting takes time away from actual work; data gets lost.",
		generates: "Fast data entry (diaries, incidents) right from the field.",
		outcomes: "Better data quality, faster responses, and clear proof of work.",
		workflows: ["Daily diary capture", "Hazard report", "Incident evidence pack"],
	},
	{
		id: "it-security",
		label: "IT & Security",
		icon: ShieldCheck,
		pain: "AI tools are often insecure, and connecting them to company data is risky.",
		generates: "Secure access controls, approval requests, and complete usage logs.",
		outcomes: "Safe AI usage that meets strict company security rules.",
		workflows: ["Read-only rollout", "Approval-gated actions", "Connector governance"],
	},
];

function SolutionsPage() {
	const [activeTab, setActiveTab] = useState(solutionTabs[0].id);
	const activeSolution = solutionTabs.find((t) => t.id === activeTab) || solutionTabs[0];

	return (
		<>
			<InteractiveAura />

			{/* 1) Hero */}
			<section className="section-shell pt-32 pb-16">
				<div className="site-shell max-w-3xl mx-auto text-center space-y-7">
					<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
						Solve real business problems. See real ROI.
					</h1>
					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80">
						Mation is built to tackle the specific bottlenecks holding back your operations, compliance, and leadership teams.
					</p>
					<div className="reveal-up delay-2 pt-4">
						<MagneticLink to="/contact" className="button-primary">
							Book a demo
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* 2) Role-based tabs */}
			<section className="site-shell section-shell pt-0">
				<div className="panel-glass rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto">
					{/* Tab Navigation */}
					<div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-6">
						{solutionTabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
									activeTab === tab.id
										? "bg-cyan-200/10 text-cyan-200 border border-cyan-200/30 shadow-[0_0_15px_rgba(91,199,255,0.15)]"
										: "bg-white/5 text-indigo-100/70 border border-white/5 hover:bg-white/10 hover:text-white"
								}`}
							>
								<tab.icon className="h-4 w-4" />
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					<div className="grid md:grid-cols-[1fr_0.8fr] gap-10 min-h-[300px]">
						<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeTab}>
							<div>
								<h3 className="text-xl font-heading text-white border-b border-white/10 pb-2 mb-4">The Challenge</h3>
								<div className="flex gap-4 items-start bg-rose-500/10 border border-rose-500/20 p-5 rounded-xl">
									<ServerCrash className="h-6 w-6 text-rose-400 shrink-0 mt-0.5" />
									<p className="text-indigo-100/90 leading-relaxed">
										<strong className="text-white">Pain:</strong> {activeSolution.pain}
									</p>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-heading text-white border-b border-white/10 pb-2 mb-4">The Mation Generation</h3>
								<div className="flex gap-4 items-start bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-xl">
									<Activity className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
									<p className="text-indigo-100/90 leading-relaxed">
										<strong className="text-white">Generates:</strong> {activeSolution.generates}
									</p>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-heading text-white border-b border-white/10 pb-2 mb-4">The Outcome</h3>
								<div className="flex gap-4 items-start bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl">
									<BarChart3 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
									<p className="text-indigo-100/90 leading-relaxed">
										<strong className="text-white">Outcomes:</strong> {activeSolution.outcomes}
									</p>
								</div>
							</div>
						</div>

						{/* Examples Sidebar */}
						<div className="bg-[#0f1230] border border-white/10 rounded-2xl p-6 self-start sticky top-24">
							<h3 className="font-heading text-lg text-white mb-5 flex items-center gap-2">
								<Briefcase className="h-5 w-5 text-cyan-200" />
								Example workflows
							</h3>
							<ul className="space-y-4">
								{activeSolution.workflows.map((wf, i) => (
									<li key={i} className="flex items-center gap-3 text-indigo-100/80 bg-white/5 p-3 rounded-lg border border-white/5">
										<CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
										<span className="text-sm font-medium">{wf}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* 3) CTA */}
			<CTASection
				title="Want a pilot that proves value and governance?"
				description="Start with a single scalable use case and prove ROI before expanding."
				primaryLabel="Book a demo"
				secondaryLabel="Talk to an architect"
			/>
		</>
	);
}
