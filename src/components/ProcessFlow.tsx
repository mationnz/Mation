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
			{/* animated connector wire behind the nodes (desktop) */}
			<div className="flow-line absolute left-[11%] right-[11%] top-7 hidden md:block" />
			<div className="grid gap-8 md:grid-cols-4 md:gap-5">
				{steps.map((step) => (
					<div key={step.n} className="relative">
						<div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-panel text-violet-bright">
							<step.icon className="h-6 w-6" />
							<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(166,146,255,0.5)] bg-canvas font-mono text-[0.6rem] text-violet-bright">
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
				))}
			</div>
		</div>
	);
}
