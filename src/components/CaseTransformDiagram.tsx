import { ArrowRight } from "lucide-react";

/**
 * CaseTransformDiagram — a bespoke "before → after" figure for a case study.
 *
 * Renders the scattered tools/processes a business started with resolving into
 * one unified system, framed as a captioned figure plate. Driven entirely by
 * props derived from existing case data (no invented facts). Pure markup + CSS —
 * no SMIL, no JS, no timers — so it is reduced-motion-safe by construction.
 * Stacks vertically on small screens.
 */
export default function CaseTransformDiagram({
	figure,
	before,
	after,
	outcome,
}: {
	/** Sentence-case figure label, e.g. "Before, after". */
	figure: string;
	/** The scattered, disconnected starting points (sector-generic). */
	before: string[];
	/** The single label for the unified system. */
	after: string;
	/** One short outcome line for the footer. */
	outcome: string;
}) {
	return (
		<figure className="figure-plate relative m-0">
			<span aria-hidden className="card-node" />

			<div className="flex items-center justify-between gap-3">
				<p className="kicker">{figure}</p>
				<span className="text-sm text-mute">{before.length} → 1</span>
			</div>

			<div className="mt-5 grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
				{/* BEFORE — scattered, disconnected */}
				<div>
					<p className="text-sm font-semibold text-mute">Before — scattered</p>
					<ul className="mt-3 space-y-2">
						{before.map((item, i) => (
							<li
								key={item}
								className="flex items-center gap-2.5 rounded-[10px] border border-border bg-canvas-2 px-3 py-2"
							>
								<span
									aria-hidden
									className="h-1.5 w-1.5 shrink-0 rounded-full"
									style={{
										// every third dot resolves toward coral — the two
										// systems visibly converging into one
										background:
											i % 3 === 2 ? "var(--warm)" : "var(--faint)",
									}}
								/>
								<span className="truncate text-sm text-ink-soft">{item}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Connector — hand-routed hairline arc on desktop, divider on mobile */}
				<div className="flex items-center justify-center" aria-hidden>
					<span className="relative hidden h-12 w-16 items-center justify-center sm:inline-flex">
						<svg
							viewBox="0 0 64 48"
							fill="none"
							className="absolute inset-0 h-full w-full"
							aria-hidden
						>
							<title>Scattered work routing into one system</title>
							{/* organic curves drawing the scattered inputs into one line */}
							<path
								d="M2 12 C 26 12, 30 24, 50 24"
								stroke="var(--border-strong)"
								strokeWidth="1.5"
								strokeLinecap="round"
								fill="none"
							/>
							<path
								d="M2 24 C 24 24, 30 24, 50 24"
								stroke="var(--warm)"
								strokeWidth="1.5"
								strokeLinecap="round"
								fill="none"
							/>
							<path
								d="M2 36 C 26 36, 30 24, 50 24"
								stroke="var(--border-strong)"
								strokeWidth="1.5"
								strokeLinecap="round"
								fill="none"
							/>
						</svg>
						<span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-violet/40 bg-surface text-violet">
							<ArrowRight className="h-4 w-4" />
						</span>
					</span>
					<span className="my-1 h-6 w-px bg-border-strong sm:hidden" />
				</div>

				{/* AFTER — one unified system */}
				<div className="relative overflow-hidden rounded-[14px] border border-violet/35 bg-surface-violet p-5">
					<span
						aria-hidden
						className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-40 blur-2xl"
						style={{
							background:
								"radial-gradient(circle, var(--warm-tint), transparent 70%)",
						}}
					/>
					<p className="relative text-sm font-semibold text-warm-ink">
						After — unified
					</p>
					<p className="relative mt-2 font-heading text-lg font-semibold leading-snug text-ink">
						{after}
					</p>
					<p className="relative mt-2 text-sm text-mute">
						One record, one source of truth.
					</p>
				</div>
			</div>

			<figcaption className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-mute">
				<span className="live-dot" />
				{outcome}
			</figcaption>
		</figure>
	);
}
