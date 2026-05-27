import type { LucideIcon } from "lucide-react";
import { Coins, LineChart, Rocket, Zap } from "lucide-react";
import { offer } from "../content/site";

const ICONS: LucideIcon[] = [Zap, Rocket, LineChart, Coins];

/** Prototype in days → Launch in weeks → Results in months → Profit for years. */
export default function VelocityTimeline() {
	return (
		<div className="relative">
			<div className="flow-line absolute left-[11%] right-[11%] top-7 hidden md:block" />
			<div className="grid gap-8 md:grid-cols-4 md:gap-5">
				{offer.cadence.map((c, i) => {
					const Icon = ICONS[i];
					return (
						<div key={c.phase} className="relative">
							<div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-panel text-violet-bright">
								<Icon className="h-6 w-6" />
								<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(166,146,255,0.5)] bg-canvas font-mono text-[0.6rem] text-violet-bright">
									{i + 1}
								</span>
							</div>
							<p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-mute">
								{c.phase}
							</p>
							<p className="mt-1 font-heading text-2xl font-semibold leading-none tracking-[-0.02em] sm:text-[1.8rem]">
								<span className="gradient-ink">{c.time}</span>
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
