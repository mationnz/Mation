"use client";

import { motion } from "framer-motion";
import { useId, useEffect, useState } from "react";

export default function SprawlToSingularity() {
	const lineGradId = useId();
	const glowId = useId();
	const blurId = useId();
	const [phase, setPhase] = useState<
		"sprawl" | "transformation" | "singularity"
	>("sprawl");

	useEffect(() => {
		const timers = [
			setTimeout(() => setPhase("transformation"), 4000), // Sprawl for 4s
			setTimeout(() => setPhase("singularity"), 5500), // Transform for 1.5s
		];
		return () => timers.forEach(clearTimeout);
	}, []);

	// Define 12 nodes.
	// Sprawl positions (chaotic)
	const sprawlPositions = [
		{ x: 50, y: 60 },
		{ x: 350, y: 80 },
		{ x: 90, y: 220 },
		{ x: 310, y: 250 },
		{ x: 150, y: 40 },
		{ x: 280, y: 50 },
		{ x: 60, y: 150 },
		{ x: 340, y: 160 },
		{ x: 140, y: 260 },
		{ x: 260, y: 270 },
		{ x: 200, y: 90 },
		{ x: 200, y: 210 },
	];

	// Singularity positions (orbital)
	const radiusX = 120;
	const radiusY = 80;
	const singularityPositions = sprawlPositions.map((_, i) => {
		const angle = (i / 12) * Math.PI * 2;
		return {
			x: 200 + Math.cos(angle) * radiusX,
			y: 150 + Math.sin(angle) * radiusY,
		};
	});

	// Data packet timings
	const packetDelays = [0, 0.5, 1, 1.5, 0.2, 0.7, 1.2, 1.7, 0.4, 0.9, 1.4, 1.9];

	return (
		<div className="relative mx-auto h-72 w-full max-w-md rounded-[2rem] border border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(24,33,78,0.6),rgba(8,11,28,0.9))] shadow-[inset_0_0_80px_rgba(34,211,238,0.05)] overflow-hidden flex items-center justify-center">
			{/* Ambient background glows */}
			<motion.div
				className="absolute h-48 w-48 rounded-full bg-cyan-500/20 blur-[50px] mix-blend-screen"
				animate={{
					scale: phase === "singularity" ? [1, 1.2, 1] : 1,
					opacity: phase === "singularity" ? [0.5, 0.8, 0.5] : 0.2,
				}}
				transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				className="absolute h-48 w-48 rounded-full bg-indigo-500/20 blur-[50px] mix-blend-screen"
				animate={{
					scale: phase === "singularity" ? [1.2, 1, 1.2] : 1,
					opacity: phase === "singularity" ? [0.4, 0.7, 0.4] : 0.2,
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 2,
				}}
			/>

			{/* Center pulse during transformation */}
			{phase !== "sprawl" && (
				<motion.div
					className="absolute h-10 w-10 rounded-full bg-cyan-400 mix-blend-screen"
					initial={{ scale: 0, opacity: 1, filter: "blur(0px)" }}
					animate={{
						scale: phase === "transformation" ? 20 : 0,
						opacity: phase === "transformation" ? 0 : 0,
						filter: "blur(20px)",
					}}
					transition={{ duration: 1.5, ease: "easeOut" }}
				/>
			)}

			<svg
				viewBox="0 0 400 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 h-full w-full opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
			>
				<defs>
					<linearGradient id={lineGradId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
						<stop offset="50%" stopColor="rgba(129, 140, 248, 0.8)" />
						<stop offset="100%" stopColor="rgba(34, 211, 238, 0.8)" />
					</linearGradient>

					<filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="4" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>

					<filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="8" />
					</filter>
				</defs>

				{/* Chaos Lines (Sprawl Phase) */}
				{phase === "sprawl" &&
					sprawlPositions.map((pos, i) => {
						const nextPos = sprawlPositions[(i + 1) % sprawlPositions.length];
						return (
							<motion.line
								key={`chaos-line-${i}`}
								x1={pos.x}
								y1={pos.y}
								x2={nextPos.x}
								y2={nextPos.y}
								stroke="rgba(255, 255, 255, 0.2)"
								strokeWidth="1.5"
								filter={`url(#${blurId})`}
								initial={{ opacity: 0 }}
								animate={{ opacity: [0, 0.8, 0] }}
								transition={{
									duration: 0.5 + Math.random(),
									repeat: Infinity,
									repeatType: "reverse",
									delay: Math.random(),
								}}
							/>
						);
					})}

				{/* Order Lines (Singularity Phase) */}
				{phase === "singularity" &&
					singularityPositions.map((pos, i) => (
						<motion.path
							key={`order-line-${i}`}
							d={`M200 150 Q ${150 + (pos.x - 200) / 2} ${150 + (pos.y - 150) / 2}, ${pos.x} ${pos.y}`}
							stroke="rgba(34, 211, 238, 0.15)"
							strokeWidth="2"
							fill="none"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={{ pathLength: 1, opacity: 1 }}
							transition={{ duration: 1, ease: "easeOut" }}
						/>
					))}

				{/* Nodes */}
				{sprawlPositions.map((startPos, i) => {
					const targetPos = singularityPositions[i];
					const isSingularity = phase === "singularity";

					return (
						<motion.g
							key={`node-${i}`}
							initial={false}
							animate={{
								x: phase === "sprawl" ? startPos.x : targetPos.x,
								y: phase === "sprawl" ? startPos.y : targetPos.y,
							}}
							transition={{
								duration: phase === "transformation" ? 1.5 : 0,
								ease: "backInOut",
							}}
						>
							<motion.circle
								cx={0}
								cy={0}
								r={isSingularity ? 5 : 3}
								fill={
									isSingularity
										? "rgba(34, 211, 238, 0.2)"
										: "rgba(255,255,255,0.1)"
								}
								filter={isSingularity ? `url(#${glowId})` : ""}
								animate={isSingularity ? { scale: [1, 1.3, 1] } : {}}
								transition={{
									duration: 2,
									repeat: Infinity,
									delay: Math.random() * 2,
								}}
							/>
							<circle
								cx={0}
								cy={0}
								r={isSingularity ? 2.5 : 1.5}
								fill={isSingularity ? "#22d3ee" : "rgba(255,255,255,0.3)"}
							/>
						</motion.g>
					);
				})}

				{/* Data Packets (Singularity Phase) */}
				{phase === "singularity" &&
					singularityPositions.map((pos, i) => (
						<motion.circle
							key={`packet-${i}`}
							r="3"
							fill="#818cf8"
							filter={`url(#${glowId})`}
							initial={{ opacity: 0 }}
							animate={{
								cx: [200, pos.x, 200],
								cy: [150, pos.y, 150],
								opacity: [0, 1, 0],
							}}
							transition={{
								duration: 2,
								ease: "easeInOut",
								repeat: Infinity,
								delay: packetDelays[i],
							}}
						/>
					))}

				{/* Central Core (Mation Cockpit) */}
				<motion.g
					initial={{ scale: 0, opacity: 0 }}
					animate={{
						scale: phase === "singularity" ? 1 : 0,
						opacity: phase === "singularity" ? 1 : 0,
					}}
					transition={{
						duration: 1,
						ease: "easeOut",
						delay: phase === "singularity" ? 0 : 0,
					}}
				>
					<motion.circle
						cx="200"
						cy="150"
						r="32"
						fill="rgba(34, 211, 238, 0.05)"
						stroke={`url(#${lineGradId})`}
						strokeWidth="1.5"
						strokeDasharray="6 6"
						animate={{ rotate: 360 }}
						transition={{ duration: 20, ease: "linear", repeat: Infinity }}
						style={{ originX: "200px", originY: "150px" }}
					/>
					<motion.circle
						cx="200"
						cy="150"
						r="22"
						fill="rgba(129, 140, 248, 0.15)"
						filter={`url(#${glowId})`}
						animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
						transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
					/>
					<circle
						cx="200"
						cy="150"
						r="12"
						fill="#22d3ee"
						filter={`url(#${glowId})`}
					/>
					<circle cx="200" cy="150" r="6" fill="#ffffff" />
				</motion.g>
			</svg>
		</div>
	);
}
