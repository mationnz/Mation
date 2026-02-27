"use client";

import { motion } from "framer-motion";
import { useId } from "react";

export default function NetworkAnimation() {
	const lineGradId = useId();
	const glowId = useId();
	return (
		<div className="relative mx-auto h-72 w-full max-w-md rounded-[2rem] border border-white/5 bg-[radial-gradient(ellipse_at_top,rgba(24,33,78,0.6),rgba(8,11,28,0.9))] shadow-[inset_0_0_80px_rgba(34,211,238,0.05)] overflow-hidden flex items-center justify-center">
			{/* Ambient background glows */}
			<div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl mix-blend-screen" />
			<div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl mix-blend-screen" />

			<svg
				viewBox="0 0 400 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 h-full w-full opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
			>
				<title>Network Animation</title>
				<defs>
					<linearGradient id={lineGradId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(34, 211, 238, 0.1)" />
						<stop offset="50%" stopColor="rgba(99, 102, 241, 0.8)" />
						<stop offset="100%" stopColor="rgba(34, 211, 238, 0.1)" />
					</linearGradient>

					<filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
				</defs>

				{/* Connecting lines */}
				<motion.path
					d="M100 150 C150 100, 250 100, 300 150"
					stroke={`url(#${lineGradId})`}
					strokeWidth="1.5"
					strokeDasharray="4 4"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 0.6 }}
					transition={{
						duration: 2,
						ease: "easeInOut",
						repeat: Infinity,
						repeatType: "reverse",
					}}
				/>
				<motion.path
					d="M100 150 C150 200, 250 200, 300 150"
					stroke={`url(#${lineGradId})`}
					strokeWidth="1.5"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 0.4 }}
					transition={{
						duration: 2.5,
						ease: "easeInOut",
						delay: 0.5,
						repeat: Infinity,
						repeatType: "reverse",
					}}
				/>
				<motion.path
					d="M200 80 L200 220"
					stroke={`url(#${lineGradId})`}
					strokeWidth="1"
					initial={{ opacity: 0 }}
					animate={{ opacity: [0.1, 0.8, 0.1] }}
					transition={{ duration: 3, ease: "linear", repeat: Infinity }}
				/>
				<motion.path
					d="M80 100 L320 200"
					stroke={`url(#${lineGradId})`}
					strokeWidth="1"
					initial={{ opacity: 0 }}
					animate={{ opacity: [0.1, 0.6, 0.1] }}
					transition={{
						duration: 4,
						ease: "linear",
						delay: 1,
						repeat: Infinity,
					}}
				/>
				<motion.path
					d="M80 200 L320 100"
					stroke={`url(#${lineGradId})`}
					strokeWidth="1"
					initial={{ opacity: 0 }}
					animate={{ opacity: [0.1, 0.6, 0.1] }}
					transition={{
						duration: 4,
						ease: "linear",
						delay: 2,
						repeat: Infinity,
					}}
				/>

				{/* Data pulses flowing along paths */}
				<motion.circle
					r="3"
					fill="#22d3ee"
					filter={`url(#${glowId})`}
					initial={{ cx: 100, cy: 150, opacity: 0 }}
					animate={{
						cx: [100, 200, 300],
						cy: [150, 115, 150],
						opacity: [0, 1, 0],
					}}
					transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
				/>
				<motion.circle
					r="2"
					fill="#818cf8"
					filter={`url(#${glowId})`}
					initial={{ cx: 300, cy: 150, opacity: 0 }}
					animate={{
						cx: [300, 200, 100],
						cy: [150, 185, 150],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 3.5,
						ease: "easeInOut",
						delay: 1.5,
						repeat: Infinity,
					}}
				/>

				{/* Nodes */}
				{[
					{ cx: 100, cy: 150, r: 8, delay: 0 },
					{ cx: 300, cy: 150, r: 8, delay: 0.2 },
					{ cx: 200, cy: 80, r: 6, delay: 0.4 },
					{ cx: 200, cy: 220, r: 6, delay: 0.6 },
					{ cx: 80, cy: 100, r: 4, delay: 0.8 },
					{ cx: 320, cy: 200, r: 4, delay: 1.0 },
					{ cx: 80, cy: 200, r: 4, delay: 1.2 },
					{ cx: 320, cy: 100, r: 4, delay: 1.4 },
				].map((node) => (
					<g key={`${node.cx}-${node.cy}`}>
						<motion.circle
							cx={node.cx}
							cy={node.cy}
							r={node.r * 2.5}
							fill="rgba(34, 211, 238, 0.15)"
							filter={`url(#${glowId})`}
							animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
							transition={{ duration: 2, delay: node.delay, repeat: Infinity }}
						/>
						<motion.circle
							cx={node.cx}
							cy={node.cy}
							r={node.r}
							fill="#22d3ee"
							stroke="#818cf8"
							strokeWidth="1.5"
							animate={{ scale: [1, 1.1, 1] }}
							transition={{ duration: 2, delay: node.delay, repeat: Infinity }}
						/>
					</g>
				))}

				{/* Center core */}
				<g>
					<motion.circle
						cx="200"
						cy="150"
						r="24"
						fill="rgba(99, 102, 241, 0.1)"
						stroke="rgba(34, 211, 238, 0.3)"
						strokeWidth="1"
						strokeDasharray="4 4"
						animate={{ rotate: 360 }}
						transition={{ duration: 15, ease: "linear", repeat: Infinity }}
						style={{ originX: "200px", originY: "150px" }}
					/>
					<motion.circle
						cx="200"
						cy="150"
						r="18"
						fill="rgba(34, 211, 238, 0.2)"
						filter="url(#glow)"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
					/>
					<circle
						cx="200"
						cy="150"
						r="8"
						fill="#e0e7ff"
						filter={`url(#${glowId})`}
					/>
					<motion.circle
						cx="200"
						cy="150"
						r="4"
						fill="#fff"
						animate={{ opacity: [1, 0.5, 1] }}
						transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
					/>
				</g>
			</svg>
		</div>
	);
}
