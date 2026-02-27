import {
	Activity,
	Bot,
	CircleDollarSign,
	Clock3,
	type LucideIcon,
	TrendingUp,
	Workflow,
} from "lucide-react";

type Metric = {
	label: string;
	value: string;
	delta: string;
	icon: LucideIcon;
};

const metrics: Metric[] = [
	{
		label: "Workflow completion",
		value: "94.2%",
		delta: "+11.4%",
		icon: Workflow,
	},
	{
		label: "Agent autonomy rate",
		value: "81.7%",
		delta: "+9.2%",
		icon: Bot,
	},
	{
		label: "Time to decision",
		value: "2m 14s",
		delta: "-38%",
		icon: Clock3,
	},
	{
		label: "Quarterly margin impact",
		value: "+18.3%",
		delta: "+4.8 pts",
		icon: CircleDollarSign,
	},
	{
		label: "Cross-domain insight signals",
		value: "1,284",
		delta: "+26%",
		icon: TrendingUp,
	},
	{
		label: "Critical flow health",
		value: "99.96%",
		delta: "stable",
		icon: Activity,
	},
];

const repeated = [...metrics, ...metrics];

export default function TelemetryTicker() {
	return (
		<div className="site-shell pb-6 pt-1">
			<div className="panel-glass telemetry-ticker-shell overflow-hidden rounded-2xl px-2 py-2">
				<div className="telemetry-track" aria-label="Live telemetry metrics">
					{repeated.map((metric, index) => (
						<article
							key={`${metric.label}-${index}`}
							className="telemetry-pill"
						>
							<div className="telemetry-icon">
								<metric.icon className="h-4 w-4" />
							</div>
							<div>
								<p className="font-tech text-[0.64rem] uppercase tracking-[0.2em] text-indigo-100/60">
									{metric.label}
								</p>
								<div className="mt-1 flex items-center gap-3">
									<p className="text-sm font-semibold text-white">
										{metric.value}
									</p>
									<p className="text-xs font-semibold text-cyan-100">
										{metric.delta}
									</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
