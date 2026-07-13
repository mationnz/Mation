import {
	ClipboardList,
	Gauge,
	type LucideIcon,
	Network,
	ShieldCheck,
	Sparkles,
	TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Item = {
	friction: string;
	icon: LucideIcon;
	solution: string;
	detail: string;
	outcome: string;
};

const items: Item[] = [
	{
		friction: "Too much manual admin",
		icon: ClipboardList,
		solution: "We automate the busywork",
		detail:
			"Re-keying, copying between apps, chasing updates — gone. The repetitive work runs itself.",
		outcome: "Hours back every week",
	},
	{
		friction: "Slow, clunky workflows",
		icon: Gauge,
		solution: "We streamline the whole flow",
		detail:
			"Every step connected end to end, so work moves forward without waiting on the last one.",
		outcome: "Faster turnaround",
	},
	{
		friction: "Mistakes that shouldn’t happen",
		icon: ShieldCheck,
		solution: "We build accuracy in",
		detail:
			"Validation and automation catch errors before they cost you — not after.",
		outcome: "Fewer costly errors",
	},
	{
		friction: "Systems that don’t talk",
		icon: Network,
		solution: "We connect everything",
		detail:
			"Your tools share one source of truth, so everyone works from the same numbers.",
		outcome: "Everything in sync",
	},
	{
		friction: "No time for real work",
		icon: Sparkles,
		solution: "We free your team",
		detail:
			"Remove the low-value work so your people focus on what actually moves the business.",
		outcome: "More capacity to grow",
	},
	{
		friction: "Scaling adds overhead",
		icon: TrendingUp,
		solution: "We build to scale",
		detail:
			"Systems that grow with you — handling more volume without piling on headcount.",
		outcome: "Scale with confidence",
	},
];

/**
 * SolutionExplorer — an interactive "friction → fix" panel. Auto-cycles through
 * common bottlenecks and shows the solution; pauses on hover/focus and lets the
 * visitor pick any friction. Keyboard accessible, reduced-motion friendly.
 */
export default function SolutionExplorer() {
	const [active, setActive] = useState(0);
	const paused = useRef(false);

	useEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduce) {
			return;
		}
		const id = setInterval(() => {
			if (!paused.current) {
				setActive((a) => (a + 1) % items.length);
			}
		}, 4200);
		return () => clearInterval(id);
	}, []);

	const cur = items[active];

	return (
		<div
			className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]"
			onMouseEnter={() => {
				paused.current = true;
			}}
			onMouseLeave={() => {
				paused.current = false;
			}}
		>
			{/* Friction selector */}
			<div className="flex flex-col gap-2">
				{items.map((it, i) => {
					const on = i === active;
					return (
						<button
							key={it.friction}
							type="button"
							aria-pressed={on}
							onClick={() => {
								paused.current = true;
								setActive(i);
							}}
							onFocus={() => {
								paused.current = true;
								setActive(i);
							}}
							onBlur={() => {
								paused.current = false;
							}}
							className={`group flex items-center gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-all duration-200 ${
								on
									? "border-violet bg-surface-violet text-ink"
									: "border-border text-mute hover:border-border-strong hover:text-ink"
							}`}
						>
							<it.icon
								className={`h-5 w-5 shrink-0 transition-colors ${
									on ? "text-violet" : "text-faint group-hover:text-mute"
								}`}
							/>
							<span className="text-[0.95rem] font-medium">{it.friction}</span>
						</button>
					);
				})}
			</div>

			{/* Solution panel */}
			<div
				data-spotlight
				className="panel ticked relative flex min-h-[20rem] flex-col justify-center overflow-hidden rounded-[20px] p-8 sm:p-12"
			>
				<div key={active} className="reveal-up">
					<span className="tag w-fit">The fix</span>
					<h3 className="mt-5 display text-3xl leading-[1.06] text-ink sm:text-[2.5rem]">
						{cur.solution}
						<span className="serif-em">.</span>
					</h3>
					<p className="mt-5 max-w-md text-lg leading-relaxed text-mute">
						{cur.detail}
					</p>
					<div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-2 px-5 py-2.5">
						<span className="live-dot" aria-hidden />
						<span className="font-mono text-xs uppercase tracking-[0.14em] text-sun-ink">
							{cur.outcome}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
