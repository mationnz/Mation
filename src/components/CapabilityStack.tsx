import type { LucideIcon } from "lucide-react";

type Layer = {
	tag: string;
	label: string;
	icon: LucideIcon;
};

/**
 * CapabilityStack — a "system, layer by layer" figure plate for the
 * What we build hero. Five capabilities settling into one system,
 * rendered as a captioned plate. Pure markup + CSS; no JS, no SMIL.
 * Stacks naturally on small screens.
 */
export default function CapabilityStack({ layers }: { layers: Layer[] }) {
	return (
		<figure className="figure-plate m-0">
			<div className="flex items-center justify-between">
				<p className="kicker">Five layers, one system</p>
				<span className="font-mono text-xs text-mute">5 → 1</span>
			</div>
			<ol className="mt-5 space-y-px">
				{layers.map((layer, i) => {
					const isWarm = i % 3 === 1;
					return (
						<li key={layer.tag}>
							<div className="flex items-center gap-4 rounded-[12px] border border-border bg-surface px-4 py-3.5">
								<span
									className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 ${
										isWarm ? "text-warm-ink" : "text-violet"
									}`}
								>
									<layer.icon className="h-4 w-4" />
								</span>
								<div className="min-w-0">
									<p
										className={`text-[0.82rem] font-semibold ${
											isWarm ? "text-warm-ink" : "text-violet-ink"
										}`}
										style={{ fontVariantCaps: "all-small-caps" }}
									>
										{layer.tag}
									</p>
									<p className="mt-0.5 truncate text-sm text-ink">
										{layer.label}
									</p>
								</div>
								<span className="ml-auto font-mono text-xs text-mute">
									{`0${i + 1}`}
								</span>
							</div>
							{i < layers.length - 1 && (
								<div
									aria-hidden
									className="mx-auto h-2.5 w-px"
									style={{
										background:
											"linear-gradient(to bottom, var(--violet), transparent)",
									}}
								/>
							)}
						</li>
					);
				})}
			</ol>
			<div className="mt-5 flex items-center gap-2.5 border-t border-border pt-4 text-sm text-mute">
				<span className="live-dot" />
				Unified into one system you own
			</div>
			<figcaption className="plate-caption text-left">
				From five moving parts to one system you own.
			</figcaption>
		</figure>
	);
}
