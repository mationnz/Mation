import { BadgeCheck, Bot, Radar, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import DepthCard from "./DepthCard";

type CockpitDomain = {
	id: string;
	label: string;
	subtitle: string;
	command: string;
	agents: string[];
	metrics: Array<{ label: string; value: string }>;
};

const domains: CockpitDomain[] = [
	{
		id: "revenue",
		label: "Revenue",
		subtitle: "Lead -> proposal -> expansion automation",
		command:
			"Prioritize enterprise leads, draft branded proposals, and escalate low-confidence pricing decisions.",
		agents: [
			"Pipeline Intelligence Agent",
			"Proposal Composer Agent",
			"Deal Risk Escalation Agent",
		],
		metrics: [
			{ label: "Cycle acceleration", value: "2.1x" },
			{ label: "Manual handoffs removed", value: "63%" },
			{ label: "Conversion uplift", value: "+14%" },
		],
	},
	{
		id: "operations",
		label: "Operations",
		subtitle: "Dispatch, QA, SLA recovery, reporting",
		command:
			"Coordinate exception handling across systems, route tasks autonomously, and alert humans for policy-gated approvals.",
		agents: [
			"Workflow Orchestrator Agent",
			"Quality Validation Agent",
			"SLA Recovery Agent",
		],
		metrics: [
			{ label: "Throughput increase", value: "+72%" },
			{ label: "SLA breach reduction", value: "-41%" },
			{ label: "Team context switching", value: "-57%" },
		],
	},
	{
		id: "finance",
		label: "Finance",
		subtitle: "Close tasks, reconciliation, executive reporting",
		command:
			"Run invoice intelligence, reconcile exceptions, and publish CFO-ready reporting packs with full audit trails.",
		agents: [
			"Reconciliation Agent",
			"Exception Resolution Agent",
			"Board Report Agent",
		],
		metrics: [
			{ label: "Close process speed", value: "3.0x" },
			{ label: "Exception auto-resolution", value: "79%" },
			{ label: "Reporting prep time", value: "-88%" },
		],
	},
	{
		id: "customer",
		label: "Customer",
		subtitle: "Service orchestration and proactive interventions",
		command:
			"Monitor satisfaction signals, generate context-aware responses, and trigger proactive retention workflows.",
		agents: [
			"Sentiment Monitoring Agent",
			"Response Quality Agent",
			"Retention Trigger Agent",
		],
		metrics: [
			{ label: "First response speed", value: "+48%" },
			{ label: "First-contact resolution", value: "+31%" },
			{ label: "Customer satisfaction", value: "+19 pts" },
		],
	},
];

export default function CockpitSimulator() {
	const [activeId, setActiveId] = useState(domains[0].id);
	const activeDomain = useMemo(
		() => domains.find((domain) => domain.id === activeId) ?? domains[0],
		[activeId],
	);

	return (
		<div className="grid gap-4 xl:grid-cols-[0.34fr_0.66fr]">
			<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
				{domains.map((domain) => (
					<button
						key={domain.id}
						type="button"
						onClick={() => setActiveId(domain.id)}
						className={`rounded-2xl border px-4 py-4 text-left transition ${
							activeDomain.id === domain.id
								? "border-cyan-200/70 bg-cyan-200/10"
								: "border-white/10 bg-white/5 hover:border-cyan-200/45"
						}`}
					>
						<p className="font-tech text-[0.63rem] uppercase tracking-[0.2em] text-indigo-100/62">
							{domain.label}
						</p>
						<p className="mt-2 text-sm text-indigo-100/82">{domain.subtitle}</p>
					</button>
				))}
			</div>

			<DepthCard className="panel-glass cockpit-card rounded-3xl p-6 sm:p-7">
				<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-indigo-100/80">
						<Radar className="h-3.5 w-3.5 text-cyan-200" />
						Live cockpit simulation
					</div>
					<div className="inline-flex items-center gap-2 text-xs text-cyan-100">
						<span className="badge-dot" />
						Agents active
					</div>
				</div>

				<div className="rounded-2xl border border-white/10 bg-[rgba(7,10,28,0.82)] p-4">
					<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/60">
						Command stream
					</p>
					<p className="mt-3 text-sm leading-relaxed text-indigo-100/84">
						{activeDomain.command}
					</p>
				</div>

				<div className="mt-4 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
					<div className="space-y-3">
						<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/60">
							Agent queue
						</p>
						{activeDomain.agents.map((agent) => (
							<div key={agent} className="data-card flex items-center gap-3">
								<div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-200/10">
									<Bot className="h-4 w-4 text-cyan-100" />
								</div>
								<div>
									<p className="text-sm font-semibold text-white">{agent}</p>
									<p className="text-xs text-indigo-100/70">
										Autonomous with policy guardrails
									</p>
								</div>
								<BadgeCheck className="ml-auto h-4 w-4 text-cyan-200" />
							</div>
						))}
					</div>

					<div className="space-y-3">
						<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/60">
							Outcome telemetry
						</p>
						{activeDomain.metrics.map((metric) => (
							<article key={metric.label} className="data-card">
								<p className="text-xs uppercase tracking-[0.18em] text-indigo-100/62">
									{metric.label}
								</p>
								<div className="mt-2 flex items-center justify-between">
									<p className="font-heading text-3xl font-semibold text-white">
										{metric.value}
									</p>
									<Sparkles className="h-4 w-4 text-cyan-200" />
								</div>
							</article>
						))}
					</div>
				</div>
			</DepthCard>
		</div>
	);
}
