import type { LucideIcon } from "lucide-react";

type Layer = {
	tag: string;
	label: string;
	icon: LucideIcon;
};

/**
 * CapabilityStack — a bespoke "system, layered" figure for the
 * What we build hero. Five capabilities resolving into one system,
 * rendered as a blueprint-annotated stack. Pure markup + CSS; no JS,
 * no SMIL. Stacks naturally on small screens.
 */
export default function CapabilityStack({ layers }: { layers: Layer[] }) {
	return (
		<div className="panel ticked relative overflow-hidden rounded-[22px] p-6 sm:p-7">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-60"
				style={{
					backgroundImage:
						"linear-gradient(rgba(123,97,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.06) 1px, transparent 1px)",
					backgroundSize: "32px 32px",
					maskImage:
						"radial-gradient(circle at 50% 42%, #000 28%, transparent 92%)",
				}}
			/>
			<div className="relative flex items-center justify-between">
				<p className="bp-coord">FIG.01 — Five layers, one system</p>
				<span className="bp-coord">5 → 1</span>
			</div>
			<ol className="relative mt-5 space-y-px">
				{layers.map((layer, i) => (
					<li key={layer.tag}>
						<div className="flex items-center gap-4 rounded-[12px] border border-line bg-panel-2/60 px-4 py-3.5">
							<span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-white/[0.03] text-violet-bright">
								<span
									aria-hidden
									className="pointer-events-none absolute inset-0 opacity-40"
									style={{
										backgroundImage:
											"linear-gradient(rgba(123,97,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.18) 1px, transparent 1px)",
										backgroundSize: "8px 8px",
									}}
								/>
								<layer.icon className="relative h-4 w-4" />
							</span>
							<div className="min-w-0">
								<p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-violet-bright">
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
								className="mx-auto h-2.5 w-px bg-gradient-to-b from-violet/50 to-violet/10"
							/>
						)}
					</li>
				))}
			</ol>
			<div className="relative mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute">
				<span className="live-dot" />
				Unified into one system you own
			</div>
		</div>
	);
}
