"use client";

import { motion } from "framer-motion";
import { useId } from "react";

export default function OrchestrationFlow() {
	const flowGradId = useId();
	const flowGlowId = useId();
	return (
		<div className="relative mx-auto w-full max-w-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 overflow-hidden">
			<svg
				viewBox="0 0 800 200"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-full h-auto drop-shadow-[0_0_12px_rgba(99,102,241,0.2)]"
			>
				<title>Orchestration Flow</title>
				<defs>
					<linearGradient id={flowGradId} x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
						<stop offset="20%" stopColor="rgba(34, 211, 238, 0.8)" />
						<stop offset="80%" stopColor="rgba(99, 102, 241, 0.8)" />
						<stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
					</linearGradient>
					<filter id={flowGlowId}>
						<feGaussianBlur stdDeviation="4" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
				</defs>

				{/* Background track lines */}
				<path
					d="M 50 100 L 250 100 C 280 100, 300 60, 330 60 L 470 60 C 500 60, 520 100, 550 100 L 750 100"
					stroke="rgba(255,255,255,0.05)"
					strokeWidth="4"
					strokeLinecap="round"
				/>
				<path
					d="M 50 100 L 250 100 C 280 100, 300 140, 330 140 L 470 140 C 500 140, 520 100, 550 100 L 750 100"
					stroke="rgba(255,255,255,0.05)"
					strokeWidth="4"
					strokeLinecap="round"
				/>

				{/* Highlight tracks */}
				<motion.path
					d="M 50 100 L 250 100 C 280 100, 300 60, 330 60 L 470 60 C 500 60, 520 100, 550 100 L 750 100"
					stroke={`url(#${flowGradId})`}
					strokeWidth="2"
					strokeLinecap="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 1 }}
					transition={{
						duration: 3,
						ease: "easeInOut",
						repeat: Infinity,
						repeatDelay: 1,
					}}
				/>
				<motion.path
					d="M 50 100 L 250 100 C 280 100, 300 140, 330 140 L 470 140 C 500 140, 520 100, 550 100 L 750 100"
					stroke={`url(#${flowGradId})`}
					strokeWidth="2"
					strokeLinecap="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 1 }}
					transition={{
						duration: 3.5,
						ease: "easeInOut",
						delay: 0.5,
						repeat: Infinity,
						repeatDelay: 0.5,
					}}
				/>

				{/* Flow payload particles */}
				<motion.circle
					r="5"
					fill="#22d3ee"
					filter={`url(#${flowGlowId})`}
					initial={{ cx: 50, cy: 100, opacity: 0 }}
					animate={{
						cx: [50, 250, 300, 330, 470, 500, 520, 550, 750],
						cy: [100, 100, 60, 60, 60, 60, 100, 100, 100],
						opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
					}}
					transition={{ duration: 4, ease: "linear", repeat: Infinity }}
				/>

				<motion.circle
					r="5"
					fill="#818cf8"
					filter={`url(#${flowGlowId})`}
					initial={{ cx: 50, cy: 100, opacity: 0 }}
					animate={{
						cx: [50, 250, 300, 330, 470, 500, 520, 550, 750],
						cy: [100, 100, 140, 140, 140, 140, 100, 100, 100],
						opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
					}}
					transition={{
						duration: 4.5,
						ease: "linear",
						delay: 1.5,
						repeat: Infinity,
					}}
				/>

				{/* Processing Nodes */}
				{[
					{ x: 150, y: 100, delay: 0, label: "INGEST" },
					{ x: 400, y: 60, delay: 0.5, label: "AI REASON" },
					{ x: 400, y: 140, delay: 1, label: "COMPUTE" },
					{ x: 650, y: 100, delay: 1.5, label: "EXECUTE" },
				].map((node) => (
					<g key={node.label}>
						<motion.rect
							x={node.x - 40}
							y={node.y - 20}
							width="80"
							height="40"
							rx="8"
							fill="rgba(8, 11, 28, 0.9)"
							stroke="rgba(255,255,255,0.15)"
							strokeWidth="1"
							animate={{
								boxShadow: [
									"0 0 0px rgba(34,211,238,0)",
									"0 0 15px rgba(34,211,238,0.3)",
									"0 0 0px rgba(34,211,238,0)",
								],
							}}
							transition={{ duration: 2, delay: node.delay, repeat: Infinity }}
						/>
						<text
							x={node.x}
							y={node.y + 4}
							fill="#e2e8f0"
							fontSize="10"
							fontWeight="600"
							fontFamily="monospace"
							letterSpacing="1"
							textAnchor="middle"
						>
							{node.label}
						</text>

						{/* Spinning gear/pulse on top right */}
						<motion.circle
							cx={node.x + 30}
							cy={node.y - 10}
							r="3"
							fill="#22d3ee"
							filter={`url(#${flowGlowId})`}
							animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
							transition={{
								duration: 1.5,
								delay: node.delay,
								repeat: Infinity,
							}}
						/>
					</g>
				))}

				{/* Splitter & Merger Junctions */}
				<motion.circle
					cx="275"
					cy="100"
					r="10"
					fill="rgba(99,102,241,0.2)"
					stroke="#818cf8"
					strokeWidth="2"
					animate={{ rotate: 180 }}
					transition={{ duration: 4, ease: "linear", repeat: Infinity }}
					style={{ originX: "275px", originY: "100px" }}
				/>
				<motion.circle
					cx="525"
					cy="100"
					r="10"
					fill="rgba(99,102,241,0.2)"
					stroke="#818cf8"
					strokeWidth="2"
					animate={{ rotate: -180 }}
					transition={{ duration: 4, ease: "linear", repeat: Infinity }}
					style={{ originX: "525px", originY: "100px" }}
				/>
			</svg>
		</div>
	);
}
