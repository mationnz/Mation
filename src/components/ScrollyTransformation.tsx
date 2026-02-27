import { useEffect, useRef, useState } from "react";

type SequenceStep = {
	id: string;
	title: string;
	subtitle: string;
	detail: string;
	outcome: string;
};

const steps: SequenceStep[] = [
	{
		id: "discover",
		title: "Discover",
		subtitle: "Map software sprawl and hidden drag",
		detail:
			"Identify high-friction process paths, context gaps, and repetitive task load across every function.",
		outcome: "Cross-domain opportunity map with ROI-ranked automation targets",
	},
	{
		id: "architect",
		title: "Architect",
		subtitle: "Design one cockpit operating model",
		detail:
			"Create the AI command architecture: context fabric, workflow graph, agent roles, and governance controls.",
		outcome:
			"Blueprint for a unified cockpit replacing fragmented app-driven execution",
	},
	{
		id: "activate",
		title: "Activate",
		subtitle: "Launch production workflows and agents",
		detail:
			"Deploy agents inside existing systems, automate handoffs, and establish live telemetry from day one.",
		outcome:
			"Enterprise-wide automation cells producing measurable value in weeks",
	},
	{
		id: "compound",
		title: "Compound",
		subtitle: "Scale intelligence and velocity every quarter",
		detail:
			"Use trend analysis and operational telemetry to continuously optimize decisions, flows, and team capacity.",
		outcome: "Compounding productivity, stronger margin, and strategic speed",
	},
];

export default function ScrollyTransformation() {
	const [activeIndex, setActiveIndex] = useState(0);
	const refs = useRef<Array<HTMLDivElement | null>>([]);

	useEffect(() => {
		const elements = refs.current.filter(
			(element): element is HTMLDivElement => element !== null,
		);

		if (!elements.length || typeof IntersectionObserver === "undefined") {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					const element = entry.target as HTMLElement;
					const index = Number(element.dataset.stepIndex);
					if (!Number.isNaN(index)) {
						setActiveIndex(index);
					}
				});
			},
			{
				rootMargin: "-38% 0px -38% 0px",
				threshold: 0.22,
			},
		);

		elements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, []);

	const active = steps[activeIndex] ?? steps[0];

	return (
		<div className="scrolly-grid">
			<aside className="panel-glass scrolly-sticky rounded-3xl p-6 sm:p-7">
				<p className="kicker">Transformation Sequence</p>
				<h3 className="mt-4 font-heading text-4xl font-semibold text-white">
					{active.title}
				</h3>
				<p className="mt-3 text-base font-semibold text-cyan-100">
					{active.subtitle}
				</p>
				<p className="mt-4 text-sm leading-relaxed text-indigo-100/78 sm:text-base">
					{active.detail}
				</p>
				<div className="mt-5 rounded-2xl border border-cyan-200/25 bg-cyan-200/10 p-4">
					<p className="font-tech text-[0.62rem] uppercase tracking-[0.2em] text-cyan-100/85">
						Expected outcome
					</p>
					<p className="mt-2 text-sm text-cyan-50">{active.outcome}</p>
				</div>
			</aside>

			<div className="space-y-24 pb-6">
				{steps.map((step, index) => (
					<article
						key={step.id}
						ref={(element) => {
							refs.current[index] = element;
						}}
						data-step-index={index}
						className={`panel-glass scrolly-step rounded-3xl p-6 sm:p-7 ${
							activeIndex === index ? "is-active" : ""
						}`}
					>
						<p className="font-tech text-[0.62rem] uppercase tracking-[0.2em] text-indigo-100/62">
							Stage {`0${index + 1}`}
						</p>
						<h4 className="mt-3 font-heading text-3xl font-semibold text-white">
							{step.title}
						</h4>
						<p className="mt-2 text-sm font-semibold text-cyan-100">
							{step.subtitle}
						</p>
						<p className="mt-4 text-sm leading-relaxed text-indigo-100/74 sm:text-base">
							{step.detail}
						</p>
					</article>
				))}
			</div>
		</div>
	);
}
