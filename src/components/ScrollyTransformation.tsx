import { useEffect, useRef, useState } from "react";

type SequenceStep = {
	id: string;
	title: string;
	subtitle: string;
	duration: string;
	detail: string;
	outcome: string;
};

const steps: SequenceStep[] = [
	{
		id: "discover",
		title: "Discover",
		subtitle: "Map how you actually run",
		duration: "1–2 weeks",
		detail:
			"We sit with your team and trace every process, hand-off, and spreadsheet — finding the friction and the data that never connects.",
		outcome: "Operations map and a value case ranked by impact",
	},
	{
		id: "blueprint",
		title: "Blueprint",
		subtitle: "Design the system before we build it",
		duration: "2–3 weeks",
		detail:
			"We design the data model, workflows, and integrations into one coherent system — with the value case and a roadmap you can sign off.",
		outcome: "System design, value case, and a staged delivery roadmap",
	},
	{
		id: "build",
		title: "Build",
		subtitle: "Ship in increments, working early",
		duration: "Iterative",
		detail:
			"We build in tight increments against your real workflows. You see it working in weeks — not at the very end — and steer as it lands.",
		outcome: "Production increments your team uses as they ship",
	},
	{
		id: "evolve",
		title: "Run & evolve",
		subtitle: "Support, refine, and extend",
		duration: "Ongoing",
		detail:
			"We run the system with you, tune it against live telemetry, and extend it into new corners of the business as you grow.",
		outcome: "A maintained system that compounds in value over time",
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

					const element = entry.target as HTMLDivElement;
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

		elements.forEach((element) => {
			observer.observe(element);
		});
		return () => observer.disconnect();
	}, []);

	const active = steps[activeIndex] ?? steps[0];

	return (
		<div className="scrolly-grid">
			<aside className="scrolly-sticky">
				<div className="bracket">
					<div className="panel ticked relative overflow-hidden rounded-[22px] p-6 sm:p-7">
						<div
							aria-hidden
							className="pointer-events-none absolute inset-0 opacity-50"
							style={{
								backgroundImage:
									"linear-gradient(rgba(123,97,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.06) 1px, transparent 1px)",
								backgroundSize: "32px 32px",
								maskImage:
									"radial-gradient(circle at 50% 0%, #000 30%, transparent 92%)",
							}}
						/>
						<div className="relative flex items-center justify-between">
							<p className="bp-coord">FIG.03 · ENGAGEMENT SEQUENCE</p>
							<span className="bp-coord">
								{`0${activeIndex + 1}`} / {`0${steps.length}`}
							</span>
						</div>
						{/* progress segments — fill as the reader scrolls (JS-driven, reduced-motion-safe) */}
						<div className="relative mt-4 flex gap-1.5" aria-hidden>
							{steps.map((step, i) => (
								<span
									key={step.id}
									className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
										i <= activeIndex
											? "bg-violet-bright"
											: "bg-[var(--color-line)]"
									}`}
								/>
							))}
						</div>
						<div className="relative mt-5 flex items-baseline gap-3">
							<span className="font-mono text-sm text-violet-bright">
								{`0${activeIndex + 1}`}
							</span>
							<h3 className="font-heading text-4xl font-semibold text-ink">
								{active.title}
							</h3>
						</div>
						<div className="relative mt-3 flex flex-wrap items-center gap-3">
							<p className="text-base font-semibold text-ink/85">
								{active.subtitle}
							</p>
							<span className="tag">{active.duration}</span>
						</div>
						<p className="relative mt-4 text-sm leading-relaxed text-mute sm:text-base">
							{active.detail}
						</p>
						<div className="relative mt-5 rounded-[14px] border border-line bg-white/[0.03] p-4">
							<p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-violet-bright">
								Deliverable
							</p>
							<p className="mt-2 text-sm text-ink/90">{active.outcome}</p>
						</div>
					</div>
				</div>
			</aside>

			<div className="space-y-24 pb-6">
				{steps.map((step, index) => (
					<div
						key={step.id}
						ref={(element) => {
							refs.current[index] = element;
						}}
						data-step-index={index}
						className={`panel scrolly-step rounded-[22px] p-6 sm:p-7 ${
							activeIndex === index ? "is-active" : ""
						}`}
					>
						<div className="flex items-center justify-between gap-3">
							<p className="bp-coord">STAGE {`0${index + 1}`}</p>
							<span className="tag">{step.duration}</span>
						</div>
						<h4 className="mt-3 font-heading text-3xl font-semibold text-ink">
							{step.title}
						</h4>
						<p className="mt-2 text-sm font-semibold text-ink/85">
							{step.subtitle}
						</p>
						<p className="mt-4 text-sm leading-relaxed text-mute sm:text-base">
							{step.detail}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
