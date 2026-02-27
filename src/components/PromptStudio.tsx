import {
	AppWindow,
	FileText,
	LoaderCircle,
	Presentation,
	Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import DepthCard from "./DepthCard";

type StudioPrompt = {
	id: string;
	label: string;
	command: string;
	reportOutput: string;
	presentationOutput: string;
	appOutput: string;
};

const prompts: StudioPrompt[] = [
	{
		id: "board-qbr",
		label: "QBR Automation",
		command:
			"Generate the branded QBR report, build a 12-slide executive presentation, and deploy a customer-churn watch app.",
		reportOutput: "QBR report generated with brand styling and KPI commentary",
		presentationOutput:
			"Executive deck assembled with narrative + trend visuals",
		appOutput: "Churn watch app scaffolded with live scorecards and alerts",
	},
	{
		id: "ops-command",
		label: "Ops Command Pack",
		command:
			"Summarize weekly operational bottlenecks, build an incident review deck, and launch an escalation routing app.",
		reportOutput: "Operations report generated with anomaly highlights",
		presentationOutput:
			"Incident deck produced with root-cause and action plan",
		appOutput: "Escalation routing app published for team handoff control",
	},
	{
		id: "finance-brief",
		label: "Finance Briefing",
		command:
			"Produce monthly board finance report, create investor update presentation, and launch cash-flow planning app.",
		reportOutput: "Finance report compiled with variance explanations",
		presentationOutput: "Investor presentation created with scenario views",
		appOutput: "Cash-flow planning app deployed with model assumptions",
	},
];

export default function PromptStudio() {
	const [activeId, setActiveId] = useState(prompts[0].id);
	const [stage, setStage] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const timersRef = useRef<number[]>([]);

	const activePrompt = useMemo(
		() => prompts.find((prompt) => prompt.id === activeId) ?? prompts[0],
		[activeId],
	);

	const clearTimers = () => {
		timersRef.current.forEach((timer) => window.clearTimeout(timer));
		timersRef.current = [];
	};

	const runPrompt = () => {
		clearTimers();
		setStage(0);
		setIsRunning(true);

		timersRef.current.push(
			window.setTimeout(() => setStage(1), 650),
			window.setTimeout(() => setStage(2), 1650),
			window.setTimeout(() => setStage(3), 2600),
			window.setTimeout(() => setIsRunning(false), 2850),
		);
	};

	useEffect(() => {
		return () => clearTimers();
	}, []);

	return (
		<div className="grid gap-4 lg:grid-cols-[0.36fr_0.64fr]">
			<div className="panel-glass rounded-2xl p-5">
				<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/62">
					Prompt presets
				</p>
				<div className="mt-4 space-y-2">
					{prompts.map((prompt) => (
						<button
							key={prompt.id}
							type="button"
							onClick={() => {
								setActiveId(prompt.id);
								setStage(0);
								setIsRunning(false);
								clearTimers();
							}}
							className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
								activeId === prompt.id
									? "border-cyan-200/60 bg-cyan-200/10 text-cyan-100"
									: "border-white/10 bg-white/5 text-indigo-100/78 hover:border-cyan-200/35"
							}`}
						>
							{prompt.label}
						</button>
					))}
				</div>

				<button
					type="button"
					onClick={runPrompt}
					disabled={isRunning}
					className="button-primary mt-5 inline-flex w-full justify-center disabled:cursor-not-allowed disabled:opacity-75"
				>
					{isRunning ? (
						<>
							<LoaderCircle className="h-4 w-4 animate-spin" />
							Running prompt
						</>
					) : (
						<>
							<Sparkles className="h-4 w-4" />
							Run in cockpit
						</>
					)}
				</button>
			</div>

			<DepthCard className="panel-glass rounded-3xl p-6 sm:p-7">
				<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/62">
					Command line
				</p>
				<div className="mt-3 rounded-2xl border border-white/12 bg-[rgba(6,8,24,0.88)] p-4">
					<p className="text-sm leading-relaxed text-indigo-100/84">
						{activePrompt.command}
					</p>
				</div>

				<div className="mt-5 flex flex-col gap-3">
					<article className={`studio-output ${stage >= 1 ? "is-ready" : ""}`}>
						<div className="flex items-start gap-4">
							<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-500/20">
								<FileText className="h-4 w-4" />
							</div>
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<p className="font-tech text-[0.66rem] uppercase tracking-[0.15em] text-cyan-200/80">Step 1: Branded report</p>
									<p className="font-tech text-[0.66rem] tracking-[0.05em] text-indigo-100/40">~38s</p>
								</div>
								<p className="mt-1 text-sm text-indigo-100/90">{activePrompt.reportOutput}</p>
							</div>
						</div>
					</article>

					<article className={`studio-output flex items-start gap-4 ${stage >= 2 ? "is-ready" : ""}`}>
						<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-500/20">
							<Presentation className="h-4 w-4 text-cyan-200" />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<p className="font-tech text-[0.66rem] uppercase tracking-[0.15em] text-cyan-200/80">Step 2: Executive deck</p>
								<p className="font-tech text-[0.66rem] tracking-[0.05em] text-indigo-100/40">~3m</p>
							</div>
							<p className="mt-1 text-sm text-indigo-100/90">
								{activePrompt.presentationOutput}
							</p>
						</div>
					</article>

					<article className={`studio-output flex items-start gap-4 ${stage >= 3 ? "is-ready" : ""}`}>
						<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-500/20">
							<AppWindow className="h-4 w-4 text-cyan-200" />
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<p className="font-tech text-[0.66rem] uppercase tracking-[0.15em] text-cyan-200/80">Step 3: New App</p>
								<p className="font-tech text-[0.66rem] tracking-[0.05em] text-indigo-100/40">~2.5h</p>
							</div>
							<p className="mt-1 text-sm text-indigo-100/90">{activePrompt.appOutput}</p>
						</div>
					</article>
				</div>
			</DepthCard>
		</div>
	);
}
