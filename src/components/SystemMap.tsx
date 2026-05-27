/**
 * SystemMap — the signature Mation visual.
 * A tangle of disconnected tools resolving into one unified system.
 * Pure SVG + CSS; the SMIL pulse is gated on prefers-reduced-motion
 * (CSS can't stop SMIL), and the dash-flow CSS animation is covered by
 * the global reduced-motion rule in styles.css.
 */

import { useEffect, useId, useState } from "react";

const SOURCES = [
	{ label: "CRM", y: 56 },
	{ label: "Email & calendar", y: 134 },
	{ label: "Spreadsheets", y: 212 },
	{ label: "ERP / finance", y: 290 },
	{ label: "Support desk", y: 368 },
];

const SRC_X = 24;
const SRC_W = 168;
const SRC_H = 42;
const CORE_X = 432;
const CORE_Y = 168;
const CORE_W = 184;
const CORE_H = 116;

const coreLeft = CORE_X;
const coreMidY = CORE_Y + CORE_H / 2;

export default function SystemMap() {
	const uid = useId().replace(/:/g, "");
	const lineId = `sysmap-line-${uid}`;
	const coreId = `sysmap-core-${uid}`;

	const [animate, setAnimate] = useState(true);
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setAnimate(!mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);

	return (
		<div className="panel ticked relative overflow-hidden rounded-[22px] p-3">
			{/* local blueprint grid */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-60"
				style={{
					backgroundImage:
						"linear-gradient(rgba(123,97,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.06) 1px, transparent 1px)",
					backgroundSize: "32px 32px",
					maskImage:
						"radial-gradient(circle at 60% 50%, #000 30%, transparent 90%)",
				}}
			/>

			<svg
				viewBox="0 0 640 440"
				className="relative w-full"
				role="img"
				aria-label="Disconnected tools — CRM, email, spreadsheets, ERP, and a support desk — converging into one unified system, built around your business"
				style={{ fontFamily: "var(--font-mono)" }}
			>
				<defs>
					<linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
						<stop offset="0" stopColor="#7b61ff" stopOpacity="0.15" />
						<stop offset="1" stopColor="#7b61ff" stopOpacity="0.7" />
					</linearGradient>
					<radialGradient id={coreId} cx="0.5" cy="0.4" r="0.8">
						<stop offset="0" stopColor="#7b61ff" stopOpacity="0.45" />
						<stop offset="1" stopColor="#7b61ff" stopOpacity="0.08" />
					</radialGradient>
				</defs>

				{/* connecting lines: each tool → the core */}
				{SOURCES.map((s, i) => {
					const x1 = SRC_X + SRC_W;
					const y1 = s.y + SRC_H / 2;
					const cx = (x1 + coreLeft) / 2 + 18;
					const d = `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${coreMidY}, ${coreLeft} ${coreMidY}`;
					return (
						<g key={s.label}>
							<path
								d={d}
								fill="none"
								stroke="var(--color-line)"
								strokeWidth="1"
							/>
							<path
								d={d}
								fill="none"
								stroke={`url(#${lineId})`}
								strokeWidth="1.5"
								strokeDasharray="3 11"
								style={{
									animation: `dash-flow ${2 + i * 0.25}s linear infinite`,
								}}
							/>
						</g>
					);
				})}

				{/* source nodes */}
				{SOURCES.map((s) => (
					<g key={`node-${s.label}`}>
						<rect
							x={SRC_X}
							y={s.y}
							width={SRC_W}
							height={SRC_H}
							rx="8"
							fill="#141327"
							stroke="var(--color-line)"
							strokeWidth="1"
						/>
						<circle cx={SRC_X + 16} cy={s.y + SRC_H / 2} r="3" fill="#9b99ba" />
						<text
							x={SRC_X + 30}
							y={s.y + SRC_H / 2 + 4}
							fill="#c9c7e0"
							fontSize="13"
							letterSpacing="0.02em"
						>
							{s.label}
						</text>
					</g>
				))}

				{/* core node — the unified system */}
				<circle
					cx={CORE_X + CORE_W / 2}
					cy={coreMidY}
					r="96"
					fill={`url(#${coreId})`}
				>
					{animate ? (
						<>
							<animate
								attributeName="r"
								values="80;100;80"
								dur="4.5s"
								repeatCount="indefinite"
							/>
							<animate
								attributeName="opacity"
								values="0.6;1;0.6"
								dur="4.5s"
								repeatCount="indefinite"
							/>
						</>
					) : null}
				</circle>
				<rect
					x={CORE_X}
					y={CORE_Y}
					width={CORE_W}
					height={CORE_H}
					rx="14"
					fill="#15122e"
					stroke="rgba(166,146,255,0.55)"
					strokeWidth="1.5"
				/>
				<text
					x={CORE_X + 20}
					y={CORE_Y + 38}
					fill="#a692ff"
					fontSize="11"
					letterSpacing="0.18em"
				>
					UNIFIED
				</text>
				<text
					x={CORE_X + 20}
					y={CORE_Y + 68}
					fill="#eceaf6"
					fontSize="20"
					letterSpacing="-0.02em"
					style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
				>
					One system
				</text>
				<text x={CORE_X + 20} y={CORE_Y + 92} fill="#9b99ba" fontSize="12">
					built around you
				</text>

				{/* output tick → unified business */}
				<line
					x1={CORE_X + CORE_W}
					y1={coreMidY}
					x2={612}
					y2={coreMidY}
					stroke="rgba(166,146,255,0.5)"
					strokeWidth="1.5"
				/>
				<circle cx={612} cy={coreMidY} r="4" fill="#5cc6f5" />

				{/* caption */}
				<text
					x={SRC_X}
					y={428}
					fill="#9b99ba"
					fontSize="11"
					letterSpacing="0.14em"
				>
					FIG.01 — MANY TOOLS → ONE SYSTEM
				</text>
			</svg>
		</div>
	);
}
