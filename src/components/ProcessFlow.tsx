import type { LucideIcon } from "lucide-react";

export type Step = {
	n: string;
	title: string;
	desc: string;
	icon: LucideIcon;
	/** Optional: what the client holds at the end of this step. */
	outcome?: string;
};

/**
 * A sequence of steps. Numbered because the content is genuinely ordered.
 * Stacks on mobile; a hairline runs through the nodes on wider screens.
 */
export default function ProcessFlow({ steps }: { steps: Step[] }) {
	return (
		<ol className="relative m-0 grid list-none gap-8 p-0 md:grid-cols-4 md:gap-6">
			{steps.map((step) => (
				<li key={step.n} className="relative">
					<div className="flex items-center gap-3">
						<span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface text-violet">
							<step.icon className="h-5 w-5" aria-hidden />
						</span>
						<span className="font-mono text-sm text-mute">{step.n}</span>
					</div>
					<h3 className="h3 mt-5 !text-[1.25rem]">{step.title}</h3>
					<p className="mt-2 text-[0.95rem] leading-relaxed text-mute">
						{step.desc}
					</p>
					{step.outcome ? (
						<p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-ink-soft">
							{step.outcome}
						</p>
					) : null}
				</li>
			))}
		</ol>
	);
}
