"use client";

import { motion } from "framer-motion";
import { useId } from "react";

export default function PlatformArchitectureMap() {
	const arcGradId = useId();
	const arcGlowId = useId();
	return (
		<div className="relative mx-auto w-full max-w-lg rounded-[2.5rem] border border-white/5 bg-[radial-gradient(ellipse_at_bottom,rgba(24,33,78,0.7),rgba(8,11,28,0.95))] p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
			<svg
				viewBox="0 0 400 400"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="w-full h-auto drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]"
			>
				<title>Platform Architecture</title>
				<defs>
					<linearGradient id={arcGradId} x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
						<stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
					</linearGradient>
					<filter id={arcGlowId}>
						<feGaussianBlur stdDeviation="5" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
				</defs>

				{/* Hexagon Base grid */}
				<motion.g
					animate={{ rotate: 360 }}
					transition={{ duration: 60, ease: "linear", repeat: Infinity }}
					style={{ originX: "200px", originY: "200px" }}
				>
					<path
						d="M200 50 L330 125 L330 275 L200 350 L70 275 L70 125 Z"
						stroke="rgba(255,255,255,0.05)"
						strokeWidth="1"
						fill="none"
					/>
					<path
						d="M200 100 L286 150 L286 250 L200 300 L114 250 L114 150 Z"
						stroke="rgba(255,255,255,0.1)"
						strokeWidth="1.5"
						fill="rgba(255,255,255,0.02)"
					/>
				</motion.g>

				{/* Radiating Pulses */}
				<motion.circle
					cx="200"
					cy="200"
					r="60"
					fill="none"
					stroke="#22d3ee"
					strokeWidth="1"
					initial={{ opacity: 0.8, scale: 0.5 }}
					animate={{ opacity: 0, scale: 2.5 }}
					transition={{ duration: 3, ease: "easeOut", repeat: Infinity }}
				/>
				<motion.circle
					cx="200"
					cy="200"
					r="60"
					fill="none"
					stroke="#818cf8"
					strokeWidth="1"
					initial={{ opacity: 0.8, scale: 0.5 }}
					animate={{ opacity: 0, scale: 2.5 }}
					transition={{
						duration: 3,
						ease: "easeOut",
						delay: 1.5,
						repeat: Infinity,
					}}
				/>

				{/* Data Lines pointing to center */}
				{[
					{ x1: 200, y1: 50, x2: 200, y2: 140 },
					{ x1: 330, y1: 125, x2: 250, y2: 170 },
					{ x1: 330, y1: 275, x2: 250, y2: 230 },
					{ x1: 200, y1: 350, x2: 200, y2: 260 },
					{ x1: 70, y1: 275, x2: 150, y2: 230 },
					{ x1: 70, y1: 125, x2: 150, y2: 170 },
				].map((line) => (
					<motion.line
						key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
						x1={line.x1}
						y1={line.y1}
						x2={line.x2}
						y2={line.y2}
						stroke={`url(#${arcGradId})`}
						strokeWidth="2"
						strokeDasharray="4 4"
						initial={{ strokeDashoffset: 0 }}
						animate={{ strokeDashoffset: -20 }}
						transition={{ duration: 1, ease: "linear", repeat: Infinity }}
					/>
				))}

				{/* Outer Satellites */}
				{[
					{ cx: 200, cy: 50, delay: 0 },
					{ cx: 330, cy: 125, delay: 0.5 },
					{ cx: 330, cy: 275, delay: 1.0 },
					{ cx: 200, cy: 350, delay: 1.5 },
					{ cx: 70, cy: 275, delay: 2.0 },
					{ cx: 70, cy: 125, delay: 2.5 },
				].map((sat) => (
					<g key={`${sat.cx}-${sat.cy}`}>
						<motion.circle
							cx={sat.cx}
							cy={sat.cy}
							r="14"
							fill="rgba(8,11,28,0.9)"
							stroke="rgba(99,102,241,0.5)"
							strokeWidth="1.5"
						/>
						<motion.circle
							cx={sat.cx}
							cy={sat.cy}
							r="6"
							fill="#22d3ee"
							filter={`url(#${arcGlowId})`}
							animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
							transition={{ duration: 2, delay: sat.delay, repeat: Infinity }}
						/>
					</g>
				))}

				{/* Core Brain */}
				<motion.circle
					cx="200"
					cy="200"
					r="45"
					fill="rgba(15, 23, 42, 0.9)"
					stroke="rgba(34, 211, 238, 0.4)"
					strokeWidth="2"
					filter={`url(#${arcGlowId})`}
				/>
				<motion.circle
					cx="200"
					cy="200"
					r="35"
					fill="none"
					stroke="rgba(99, 102, 241, 0.6)"
					strokeWidth="2"
					strokeDasharray="10 10"
					animate={{ rotate: -360 }}
					transition={{ duration: 12, ease: "linear", repeat: Infinity }}
					style={{ originX: "200px", originY: "200px" }}
				/>
				<motion.circle
					cx="200"
					cy="200"
					r="15"
					fill="#22d3ee"
					filter={`url(#${arcGlowId})`}
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
				/>
				<circle cx="200" cy="200" r="8" fill="#fff" />
			</svg>
		</div>
	);
}
