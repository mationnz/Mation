import { ArrowRight } from "lucide-react";

/**
 * CaseTransformDiagram — a bespoke "before → after" figure for a case study.
 *
 * Renders the scattered tools/processes a business started with resolving into
 * one unified system. Driven entirely by props derived from existing case data
 * (no invented facts). Pure markup + CSS — no SMIL, no JS, no timers — so it is
 * reduced-motion-safe by construction. Stacks vertically on small screens.
 */
export default function CaseTransformDiagram({
	figure,
	before,
	after,
	outcome,
}: {
	/** Mono figure tag, e.g. "FIG.02 — BEFORE → AFTER". */
	figure: string;
	/** The scattered, disconnected starting points (sector-generic). */
	before: string[];
	/** The single label for the unified system. */
	after: string;
	/** One short outcome line for the footer. */
	outcome: string;
}) {
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
						"radial-gradient(circle at 50% 46%, #000 28%, transparent 92%)",
				}}
			/>

			<div className="relative flex items-center justify-between">
				<p className="bp-coord">{figure}</p>
				<span className="bp-coord">{before.length} → 1</span>
			</div>

			<div className="relative mt-5 grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
				{/* BEFORE — scattered, disconnected */}
				<div>
					<p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
						Before · scattered
					</p>
					<ul className="mt-3 space-y-2">
						{before.map((item) => (
							<li
								key={item}
								className="flex items-center gap-2.5 rounded-[10px] border border-line bg-panel-2/50 px-3 py-2"
							>
								<span
									aria-hidden
									className="h-1.5 w-1.5 shrink-0 rounded-full bg-mute/60"
								/>
								<span className="truncate text-xs text-mute">{item}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Connector — arrow on desktop, divider on mobile */}
				<div className="flex items-center justify-center" aria-hidden>
					<span className="hidden h-9 w-9 items-center justify-center rounded-full border border-[rgba(166,146,255,0.5)] bg-canvas text-violet-bright sm:inline-flex">
						<ArrowRight className="h-4 w-4" />
					</span>
					<span className="my-1 h-6 w-px bg-gradient-to-b from-violet/50 to-violet/10 sm:hidden" />
				</div>

				{/* AFTER — one unified system */}
				<div className="relative overflow-hidden rounded-[14px] border border-[rgba(166,146,255,0.45)] bg-panel-2 p-5">
					<span
						aria-hidden
						className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,var(--color-violet),transparent_70%)] opacity-25 blur-2xl"
					/>
					<p className="relative font-mono text-[0.62rem] uppercase tracking-[0.2em] text-violet-bright">
						After · unified
					</p>
					<p className="relative mt-2 font-heading text-lg font-semibold leading-snug text-ink">
						{after}
					</p>
					<p className="relative mt-2 text-xs text-mute">
						One record, one source of truth.
					</p>
				</div>
			</div>

			<div className="relative mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute">
				<span className="live-dot" />
				{outcome}
			</div>
		</div>
	);
}
