import { Blocks, Layers3, Shuffle } from "lucide-react";
import { useState } from "react";

const legacyStack = [
	"CRM and outreach app",
	"Separate quoting tool",
	"Standalone support software",
	"Spreadsheet-based reporting",
	"Disconnected finance portal",
	"Manual handoff chat channels",
];

const cockpitStack = [
	"Unified AI cockpit interface",
	"Shared workflow orchestration",
	"Cross-domain data context",
	"Real-time executive telemetry",
	"Policy-aware AI execution",
	"Automated branded deliverables",
];

export default function SprawlComparison() {
	const [split, setSplit] = useState(52);

	return (
		<div className="panel-glass rounded-3xl p-6 sm:p-7">
			<div className="mb-5 flex flex-wrap items-center justify-between gap-3">
				<p className="kicker">Before / After</p>
				<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-indigo-100/78">
					<Shuffle className="h-3.5 w-3.5 text-cyan-200" />
					Drag the divider
				</div>
			</div>

			<div className="comparison-frame">
				<div className="comparison-surface comparison-surface--future">
					<div className="comparison-headline">
						<Layers3 className="h-4 w-4 text-cyan-200" />
						<span>One AI cockpit</span>
					</div>
					<ul className="comparison-list">
						{cockpitStack.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>

				<div
					className="comparison-surface comparison-surface--legacy"
					style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
				>
					<div className="comparison-headline">
						<Blocks className="h-4 w-4 text-indigo-200" />
						<span>Software sprawl</span>
					</div>
					<ul className="comparison-list">
						{legacyStack.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>

				<div className="comparison-divider" style={{ left: `${split}%` }}>
					<span>{split}%</span>
				</div>
			</div>

			<label className="mt-5 block">
				<span className="mb-2 block font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/60">
					Transformation progress
				</span>
				<input
					type="range"
					min={10}
					max={90}
					value={split}
					onChange={(event) => setSplit(Number(event.target.value))}
					className="comparison-slider"
					aria-label="Compare software sprawl with one AI cockpit"
				/>
			</label>
		</div>
	);
}
