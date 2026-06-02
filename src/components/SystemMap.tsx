/**
 * SystemMap — the signature Mation visual.
 * A warm, hand-drawn "constellation": scattered tool chips drift along organic
 * Bézier connectors toward one central core, so many tools visibly resolve into
 * one system. About a third of the nodes/links read coral, the rest violet, and
 * everything is tokenised so it sits on warm paper or warm charcoal alike.
 *
 * Pure SVG + CSS. Nodes breathe via a slow CSS scale (transform-box: fill-box),
 * the SMIL core pulse is gated on prefers-reduced-motion (CSS can't stop SMIL),
 * and the dash-drift CSS animation is covered by the global reduced-motion rule
 * in styles.css — so the figure renders fully settled when motion is reduced.
 */

import { useEffect, useId, useState } from "react";

type Tone = "violet" | "warm";

type Source = {
	label: string;
	/** chip anchor — left edge x, vertical centre y */
	x: number;
	y: number;
	tone: Tone;
	/** start delay so the breathing/drift feels hand-scattered, not in lockstep */
	delay: number;
};

// Scattered tool chips — deliberately uneven x/y so the field feels drifted,
// not stacked. Roughly a third read coral (warm); the rest violet.
const SOURCES: Source[] = [
	{ label: "CRM", x: 18, y: 60, tone: "violet", delay: 0 },
	{ label: "Email & calendar", x: 40, y: 152, tone: "warm", delay: 0.9 },
	{ label: "Spreadsheets", x: 22, y: 244, tone: "violet", delay: 0.4 },
	{ label: "ERP / finance", x: 56, y: 330, tone: "warm", delay: 1.3 },
	{ label: "Support desk", x: 30, y: 400, tone: "violet", delay: 0.7 },
];

// Tiny satellite dots — loose specks that also drift in, adding to the scatter.
const SATELLITES: Array<{ x: number; y: number; tone: Tone; delay: number }> = [
	{ x: 150, y: 110, tone: "violet", delay: 0.5 },
	{ x: 196, y: 290, tone: "warm", delay: 1.1 },
	{ x: 168, y: 372, tone: "violet", delay: 0.2 },
];

const CHIP_H = 40;
const CORE_CX = 524;
const CORE_CY = 224;

export default function SystemMap() {
	const uid = useId().replace(/:/g, "");
	const coreId = `sysmap-core-${uid}`;
	const haloId = `sysmap-halo-${uid}`;

	const [animate, setAnimate] = useState(true);
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setAnimate(!mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	// The parent (index.tsx) frames this in a `.figure-plate` with the sentence-
	// case caption "From scattered tools to one system.", so the component renders
	// only the constellation itself to avoid a doubled plate / duplicate caption.
	return (
		<>
			{/* Local breathing keyframe — a subtle scale each element runs around
			    its own centre. Reduced-motion is honoured twice: we skip applying
			    the animation in JS, and the global rule in styles.css zeroes any
			    animation duration. */}
			<style>
				{
					"@keyframes sysmap-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}"
				}
			</style>
			<svg
				viewBox="0 0 620 460"
				className="block w-full"
				role="img"
				aria-label="Scattered tools — CRM, email and calendar, spreadsheets, ERP and finance, and a support desk — drifting along curved threads into one warm central system, built around your business"
				style={{ fontFamily: "var(--font-sans)" }}
			>
				<defs>
					{/* Warm core glow — violet bleeding toward coral so the two inks
					    meet at the centre. */}
					<radialGradient id={coreId} cx="0.42" cy="0.4" r="0.75">
						<stop offset="0" stopColor="var(--violet)" stopOpacity="0.32" />
						<stop offset="0.7" stopColor="var(--warm)" stopOpacity="0.14" />
						<stop offset="1" stopColor="var(--warm)" stopOpacity="0" />
					</radialGradient>
					<radialGradient id={haloId} cx="0.5" cy="0.5" r="0.5">
						<stop offset="0" stopColor="var(--violet)" stopOpacity="0.18" />
						<stop offset="1" stopColor="var(--violet)" stopOpacity="0" />
					</radialGradient>
				</defs>

				{/* Soft halo behind the whole field, drawing the eye to the core. */}
				<circle cx={CORE_CX} cy={CORE_CY} r="150" fill={`url(#${haloId})`} />

				{/* Hand-routed connectors: each chip → the core on an organic curve
				    with rounded caps and a slow dash drift. Colour follows the chip
				    so coral threads and violet threads braid into one core. */}
				{SOURCES.map((s, i) => {
					const x1 = s.x + chipWidth(s.label);
					const y1 = s.y;
					// Two control points wandering toward the core for a loose,
					// hand-drawn arc rather than a clean elbow.
					const c1x = x1 + 70;
					const c1y = y1 + (CORE_CY - y1) * 0.1;
					const c2x = CORE_CX - 150;
					const c2y = CORE_CY + (y1 - CORE_CY) * 0.28;
					const d = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${CORE_CX} ${CORE_CY}`;
					const stroke = s.tone === "warm" ? "var(--warm)" : "var(--violet)";
					return (
						<g key={`link-${s.label}`}>
							{/* faint resting thread */}
							<path
								d={d}
								fill="none"
								stroke={stroke}
								strokeWidth="1.25"
								strokeLinecap="round"
								opacity="0.22"
							/>
							{/* drifting dashes flowing toward the core */}
							<path
								d={d}
								fill="none"
								stroke={stroke}
								strokeWidth="1.75"
								strokeLinecap="round"
								strokeDasharray="2 13"
								opacity="0.85"
								style={{
									animation: `dash-flow ${2.4 + i * 0.35}s linear infinite`,
								}}
							/>
						</g>
					);
				})}

				{/* Satellite specks also drift in along short curves. */}
				{SATELLITES.map((p, i) => {
					const d = `M ${p.x} ${p.y} C ${p.x + 80} ${p.y}, ${CORE_CX - 130} ${CORE_CY + (p.y - CORE_CY) * 0.3}, ${CORE_CX} ${CORE_CY}`;
					const stroke = p.tone === "warm" ? "var(--warm)" : "var(--violet)";
					return (
						<g key={`sat-${p.x}-${p.y}`}>
							<path
								d={d}
								fill="none"
								stroke={stroke}
								strokeWidth="1"
								strokeLinecap="round"
								strokeDasharray="1.5 12"
								opacity="0.55"
								style={{
									animation: `dash-flow ${3 + i * 0.4}s linear infinite`,
								}}
							/>
							<circle
								cx={p.x}
								cy={p.y}
								r="4.5"
								fill="var(--surface)"
								stroke={stroke}
								strokeWidth="1.25"
								style={breathe(animate, 5 + i * 0.6, p.delay)}
							/>
						</g>
					);
				})}

				{/* Tool chips — warm paper cards with a small two-ink node dot. */}
				{SOURCES.map((s) => {
					const w = chipWidth(s.label);
					const stroke = s.tone === "warm" ? "var(--warm)" : "var(--violet)";
					return (
						<g key={`chip-${s.label}`} style={breathe(animate, 5.4, s.delay)}>
							<rect
								x={s.x}
								y={s.y - CHIP_H / 2}
								width={w}
								height={CHIP_H}
								rx="12"
								fill="var(--surface)"
								stroke="var(--border-strong)"
								strokeWidth="1"
							/>
							<circle cx={s.x + 16} cy={s.y} r="3.5" fill={stroke} />
							<text
								x={s.x + 30}
								y={s.y + 4}
								fill="var(--ink-soft)"
								fontSize="13.5"
								fontWeight="500"
							>
								{s.label}
							</text>
						</g>
					);
				})}

				{/* The core — one warm system everything settles into. */}
				<g style={breathe(animate, 6, 0)}>
					<circle cx={CORE_CX} cy={CORE_CY} r="104" fill={`url(#${coreId})`}>
						{animate ? (
							<>
								<animate
									attributeName="r"
									values="92;108;92"
									dur="5s"
									repeatCount="indefinite"
								/>
								<animate
									attributeName="opacity"
									values="0.7;1;0.7"
									dur="5s"
									repeatCount="indefinite"
								/>
							</>
						) : null}
					</circle>
					<circle
						cx={CORE_CX}
						cy={CORE_CY}
						r="62"
						fill="var(--surface)"
						stroke="var(--violet)"
						strokeWidth="1.5"
					/>
					{/* a single coral tick on the core ring — the two inks, met */}
					<circle
						cx={CORE_CX + 44}
						cy={CORE_CY - 44}
						r="4"
						fill="var(--warm)"
					/>
					<text
						x={CORE_CX}
						y={CORE_CY - 4}
						textAnchor="middle"
						fill="var(--ink)"
						fontSize="17"
						fontWeight="600"
					>
						One system,
					</text>
					<text
						x={CORE_CX}
						y={CORE_CY + 18}
						textAnchor="middle"
						fill="var(--mute)"
						fontSize="13.5"
					>
						built around you
					</text>
				</g>
			</svg>
		</>
	);
}

/** Rough chip width from label length — keeps the field looking hand-set. */
function chipWidth(label: string): number {
	return Math.round(54 + label.length * 7.4);
}

/** Slow "breathing" scale around each element's own centre. Settled when
 *  motion is reduced (no animation applied at all). */
function breathe(
	animate: boolean,
	dur: number,
	delay: number,
): React.CSSProperties {
	if (!animate) {
		return {};
	}
	return {
		transformBox: "fill-box",
		transformOrigin: "center",
		animation: `sysmap-breathe ${dur}s ease-in-out ${delay}s infinite`,
	};
}
