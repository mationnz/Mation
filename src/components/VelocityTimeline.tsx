import type { LucideIcon } from "lucide-react";
import { Coins, LineChart, Rocket, Zap } from "lucide-react";
import { offer } from "../content/site";

const ICONS: LucideIcon[] = [Zap, Rocket, LineChart, Coins];

/** Prototype in days -> Launch in weeks -> Results in months -> Profit for years. */
export default function VelocityTimeline() {
	return (
		<div className="relative">
			<div className="flow-line absolute left-[11%] right-[11%] top-7 hidden md:block" />
			<div className="grid gap-8 md:grid-cols-4 md:gap-5">
				{offer.cadence.map((c, i) => {
					const Icon = ICONS[i];
					// the payoff at the end of the arc resolves in coral
					const warm = i === offer.cadence.length - 1;
					return (
						<div key={c.phase} className="relative">
							<div
								className={`relative inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface ${
									warm ? "text-warm-ink" : "text-violet"
								}`}
							>
								<Icon className="h-6 w-6" />
								<span
									className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-canvas text-[0.62rem] font-semibold"
									style={{ color: warm ? "var(--warm-ink)" : "var(--violet-ink)" }}
								>
									{i + 1}
								</span>
							</div>
							<p className="kicker mt-5">{c.phase}</p>
							<p className="mt-1.5 font-heading text-2xl font-semibold leading-none text-ink sm:text-[1.8rem]">
								<span
									className="bg-[length:100%_2px] bg-bottom bg-no-repeat pb-1"
									style={{
										backgroundImage: `linear-gradient(to right, ${
											warm ? "var(--warm)" : "var(--violet)"
										}, transparent)`,
									}}
								>
									{c.time}
								</span>
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
