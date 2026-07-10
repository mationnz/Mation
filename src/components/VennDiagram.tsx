import { useState } from "react";

type Facet = {
	id: "people" | "process" | "technology";
	label: string;
	blurb: string;
	color: string;
	cx: number;
	cy: number;
};

const facets: Facet[] = [
	{
		id: "people",
		label: "People",
		blurb: "Your team, working in one place — no tab-hopping, no lost context.",
		color: "var(--violet)",
		cx: 200,
		cy: 148,
	},
	{
		id: "process",
		label: "Process",
		blurb: "The way you actually operate, modelled and automated end to end.",
		color: "var(--info)",
		cx: 148,
		cy: 238,
	},
	{
		id: "technology",
		label: "Technology",
		blurb: "Your tools and data, connected into one intelligent, AI-native system.",
		color: "var(--warm)",
		cx: 252,
		cy: 238,
	},
];

const R = 98;

/**
 * Interactive Venn — three overlapping fields (People · Process · Technology)
 * that converge on one connected system. Hover or focus a circle to highlight
 * it and update the caption. Keyboard accessible and reduced-motion friendly.
 */
export default function VennDiagram() {
	const [active, setActive] = useState<Facet["id"] | null>(null);
	const current = facets.find((f) => f.id === active);

	return (
		<div className="mx-auto flex max-w-md flex-col items-center">
			<svg
				viewBox="0 0 400 400"
				className="w-full max-w-[26rem]"
				role="img"
				aria-label="People, process, and technology converging into one connected system"
			>
				<title>People · Process · Technology → one connected system</title>

				{facets.map((f) => {
					const isActive = active === f.id;
					const dim = active !== null && !isActive;
					return (
						<g
							key={f.id}
							tabIndex={0}
							role="button"
							aria-label={`${f.label}: ${f.blurb}`}
							className="venn-circle"
							onMouseEnter={() => setActive(f.id)}
							onMouseLeave={() => setActive(null)}
							onFocus={() => setActive(f.id)}
							onBlur={() => setActive(null)}
						>
							<circle
								cx={f.cx}
								cy={f.cy}
								r={R}
								fill={f.color}
								stroke={f.color}
								strokeWidth={isActive ? 2.5 : 1.5}
								style={{
									fillOpacity: isActive ? 0.34 : dim ? 0.1 : 0.2,
									transition: "fill-opacity 240ms ease, stroke-width 240ms ease",
									mixBlendMode: "screen",
								}}
							/>
						</g>
					);
				})}

				{/* Circle labels */}
				<text
					x="200"
					y="112"
					textAnchor="middle"
					className="venn-label"
					fill="var(--ink)"
				>
					People
				</text>
				<text
					x="118"
					y="300"
					textAnchor="middle"
					className="venn-label"
					fill="var(--ink)"
				>
					Process
				</text>
				<text
					x="282"
					y="300"
					textAnchor="middle"
					className="venn-label"
					fill="var(--ink)"
				>
					Technology
				</text>

				{/* Center — the unified system */}
				<text
					x="200"
					y="205"
					textAnchor="middle"
					className="venn-center"
					fill="var(--ink)"
				>
					One
				</text>
				<text
					x="200"
					y="226"
					textAnchor="middle"
					className="venn-center"
					fill="var(--ink)"
				>
					system
				</text>
			</svg>

			<p className="mt-6 min-h-[3.5rem] max-w-sm text-center text-[0.95rem] leading-relaxed text-mute">
				{current
					? current.blurb
					: "Where people, process, and technology meet — Mation builds the one connected system underneath it all."}
			</p>
		</div>
	);
}
