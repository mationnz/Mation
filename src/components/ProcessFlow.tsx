import type { LucideIcon } from "lucide-react";

type Step = {
	n: string;
	title: string;
	desc: string;
	icon: LucideIcon;
};

/** A horizontal "nodes on a wire" schematic of a process. Stacks on mobile. */
export default function ProcessFlow({ steps }: { steps: Step[] }) {
	return (
		<div className="relative">
			{/* hand-routed connector hairline behind the nodes (desktop) */}
			<div className="flow-line absolute left-[11%] right-[11%] top-7 hidden md:block" />
			<div className="grid gap-8 md:grid-cols-4 md:gap-5">
				{steps.map((step, i) => {
					// roughly a third of the nodes resolve in coral
					const warm = i % 3 === 2;
					return (
						<div key={step.n} className="relative">
							<div
								className={`relative inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface ${
									warm ? "text-warm-ink" : "text-violet"
								}`}
							>
								<step.icon className="h-6 w-6" />
								<span
									className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-canvas text-[0.62rem] font-semibold"
									style={{ color: warm ? "var(--warm-ink)" : "var(--violet-ink)" }}
								>
									{step.n}
								</span>
							</div>
							<h3 className="mt-5 font-heading text-xl font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{step.desc}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
