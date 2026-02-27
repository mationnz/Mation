"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

export default function ContinuousOptimizationLoop() {
	const glowId = useId();
	const blurId = useId();
	const [cycle, setCycle] = useState(0);

	useEffect(() => {
		// Total duration of one loop evolution is about 9s
		const interval = setInterval(() => {
			setCycle((prev) => prev + 1);
		}, 9000);
		return () => clearInterval(interval);
	}, []);

	// Infinity symbol path generator
	// Centered at 200, 150 with a width of 300 and height of 120
	const infinityPath = `
		M 200 150 
		C 250 50, 350 50, 350 150 
		C 350 250, 250 250, 200 150 
		C 150 50, 50 50, 50 150 
		C 50 250, 150 250, 200 150 
		Z
	`;

	// Key points on the path for animations
	const telemetryPoint = { x: 300, y: 150 }; // Right loop outer edge
	const centerCore = { x: 200, y: 150 };

	// Define phase states based on cycle time (0-3s: Cycle 1, 3-6s: Cycle 2, 6-9s: Cycle 3)
	// We'll manage this via framer-motion keyframes

	return (
		<div className="relative mx-auto h-72 w-full max-w-md rounded-[2rem] border border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(24,33,78,0.6),rgba(8,11,28,0.9))] shadow-[inset_0_0_80px_rgba(34,211,238,0.05)] overflow-hidden flex items-center justify-center">
			{/* Ambient background glows */}
			<motion.div
				className="absolute h-32 w-32 rounded-full bg-cyan-500/20 blur-[40px] mix-blend-screen"
				animate={{
					scale: [1, 1.2, 1.5],
					opacity: [0.3, 0.5, 0.8],
				}}
				transition={{
					duration: 9,
					times: [0, 0.33, 0.66],
					ease: "easeInOut",
					repeat: Infinity,
				}}
			/>

			<svg
				viewBox="0 0 400 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 h-full w-full"
			>
				<defs>
					<filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
					<filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="6" />
					</filter>
					<linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#22d3ee" />
						<stop offset="50%" stopColor="#818cf8" />
						<stop offset="100%" stopColor="#c084fc" />
					</linearGradient>
				</defs>

				{/* The Infinity Track */}
				<g key={`track-${cycle}`}>
					{/* Thick blurry glow stroke */}
					<motion.path
						d={infinityPath}
						stroke="url(#trackGrad)"
						fill="none"
						filter={`url(#${blurId})`}
						initial={{ strokeWidth: 4, opacity: 0.3 }}
						animate={{ strokeWidth: [4, 8, 12], opacity: [0.3, 0.6, 0.9] }}
						transition={{
							duration: 9,
							times: [0, 0.33, 0.66],
							ease: "easeInOut",
						}}
					/>
					{/* Thin solid white core stroke */}
					<motion.path
						d={infinityPath}
						stroke="#ffffff"
						fill="none"
						initial={{ strokeWidth: 1, opacity: 0.5 }}
						animate={{ strokeWidth: [1, 2, 3], opacity: [0.5, 0.8, 1] }}
						transition={{
							duration: 9,
							times: [0, 0.33, 0.66],
							ease: "easeInOut",
						}}
					/>

					{/* Center Optimization Core */}
					<motion.circle
						cx={centerCore.x}
						cy={centerCore.y}
						r="12"
						fill="rgba(34, 211, 238, 0.1)"
						stroke="#22d3ee"
						strokeWidth="2"
						filter={`url(#${glowId})`}
						initial={{ scale: 1, opacity: 0.5 }}
						animate={{ scale: [1, 1.2, 1.5], opacity: [0.5, 0.8, 1] }}
						transition={{
							duration: 9,
							times: [0, 0.33, 0.66],
							ease: "easeInOut",
						}}
					/>
					<motion.circle
						cx={centerCore.x}
						cy={centerCore.y}
						r="4"
						fill="#ffffff"
						initial={{ scale: 1 }}
						animate={{ scale: [1, 1.5, 2] }}
						transition={{
							duration: 9,
							times: [0, 0.33, 0.66],
							ease: "easeInOut",
						}}
					/>

					{/* Cycle 1 Particle (0-3s) */}
					<motion.circle
						r="4"
						fill="#22d3ee"
						filter={`url(#${glowId})`}
						initial={{ offsetDistance: "0%", opacity: 1 }}
						animate={{ offsetDistance: ["0%", "100%"], opacity: [1, 1, 0] }}
						transition={{ duration: 3, ease: "linear", times: [0, 0.9, 1] }}
						style={{ offsetPath: `path("${infinityPath}")` }}
					/>

					{/* Cycle 1 Spark (Telemetry to Center at ~1.5s) */}
					<motion.circle
						r="3"
						fill="#facc15"
						filter={`url(#${glowId})`}
						initial={{ cx: telemetryPoint.x, cy: telemetryPoint.y, opacity: 0 }}
						animate={{
							cx: [telemetryPoint.x, centerCore.x],
							cy: [telemetryPoint.y, centerCore.y],
							opacity: [0, 1, 0],
						}}
						transition={{ duration: 0.5, delay: 1.5, ease: "easeIn" }}
					/>

					{/* Cycle 2 Particle (Faster, 3-5.5s) */}
					<motion.circle
						r="5"
						fill="#818cf8"
						filter={`url(#${glowId})`}
						initial={{ offsetDistance: "0%", opacity: 0 }}
						animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
						transition={{
							duration: 2.5,
							delay: 3,
							ease: "linear",
							times: [0, 0.1, 0.9, 1],
						}}
						style={{ offsetPath: `path("${infinityPath}")` }}
					/>

					{/* Cycle 2 Spark */}
					<motion.circle
						r="4"
						fill="#facc15"
						filter={`url(#${glowId})`}
						initial={{ cx: telemetryPoint.x, cy: telemetryPoint.y, opacity: 0 }}
						animate={{
							cx: [telemetryPoint.x, centerCore.x],
							cy: [telemetryPoint.y, centerCore.y],
							opacity: [0, 1, 0],
						}}
						transition={{ duration: 0.4, delay: 4.25, ease: "easeIn" }}
					/>

					{/* Cycle 3 Particles (Multiple, Very Fast, 6-9s) */}
					{[0, 0.2, 0.4, 0.6, 0.8].map((delayOffset, i) => (
						<motion.circle
							key={`c3-${i}`}
							r="6"
							fill="#c084fc"
							filter={`url(#${glowId})`}
							initial={{ offsetDistance: "0%", opacity: 0 }}
							animate={{
								offsetDistance: ["0%", "100%"],
								opacity: [0, 1, 1, 0],
							}}
							transition={{
								duration: 1.5,
								delay: 6 + delayOffset,
								ease: "linear",
								times: [0, 0.1, 0.9, 1],
								repeat: 1,
							}}
							style={{ offsetPath: `path("${infinityPath}")` }}
						/>
					))}

					{/* Cycle 3 Sparks (Continuous) */}
					{[0, 0.4, 0.8].map((delayOffset, i) => (
						<motion.circle
							key={`c3-spark-${i}`}
							r="4"
							fill="#facc15"
							filter={`url(#${glowId})`}
							initial={{
								cx: telemetryPoint.x,
								cy: telemetryPoint.y,
								opacity: 0,
							}}
							animate={{
								cx: [telemetryPoint.x, centerCore.x],
								cy: [telemetryPoint.y, centerCore.y],
								opacity: [0, 1, 0],
							}}
							transition={{
								duration: 0.3,
								delay: 6.75 + delayOffset,
								ease: "easeIn",
								repeat: 1,
							}}
						/>
					))}
				</g>
			</svg>
		</div>
	);
}
