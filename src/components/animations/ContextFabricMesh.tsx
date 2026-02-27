"use client";

import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

export default function ContextFabricMesh() {
	const gridGradId = useId();
	const glowId = useId();
	const meshGradId = useId();
	const [cycle, setCycle] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCycle((prev) => prev + 1);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	// Isometric projection helpers
	const isoX = (x: number, y: number) => x - y;
	const isoY = (x: number, y: number, z: number = 0) => (x + y) / 2 - z;

	// Pillars (Siloed Data)
	const pillars = [
		{ x: 100, y: 50, color: "#475569" }, // ERP
		{ x: 200, y: 50, color: "#475569" }, // CRM
		{ x: 100, y: 150, color: "#475569" }, // HRIS
		{ x: 200, y: 150, color: "#475569" }, // Support
	];

	// Mesh Grid nodes (Top layer)
	const gridSize = 4;
	const cellSize = 60;
	const meshNodes = [];
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			meshNodes.push({ x: i * cellSize, y: j * cellSize });
		}
	}

	return (
		<div className="relative mx-auto h-72 w-full max-w-md rounded-[2rem] border border-white/5 bg-[radial-gradient(ellipse_at_center,rgba(24,33,78,0.6),rgba(8,11,28,0.9))] shadow-[inset_0_0_80px_rgba(34,211,238,0.05)] overflow-hidden flex items-center justify-center">
			<svg
				viewBox="-150 -50 500 400"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 h-full w-full"
			>
				<defs>
					<filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="4" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
					<linearGradient id={gridGradId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="rgba(34, 211, 238, 0.2)" />
						<stop offset="100%" stopColor="rgba(129, 140, 248, 0.2)" />
					</linearGradient>
					<linearGradient id={meshGradId} x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#22d3ee" />
						<stop offset="50%" stopColor="#818cf8" />
						<stop offset="100%" stopColor="#c084fc" />
					</linearGradient>
				</defs>

				{/* Group to center everything */}
				<g transform="translate(100, 80)">
					{/* Bottom Layer: Rigid Pillars */}
					{pillars.map((pillar, i) => {
						const px = isoX(pillar.x, pillar.y);
						const py = isoY(pillar.x, pillar.y, -80); // Base level
						const topY = isoY(pillar.x, pillar.y, 0); // Top level

						return (
							<g key={`pillar-${i}`}>
								{/* Pillar Body */}
								<path
									d={`M ${px} ${topY} L ${px - 15} ${topY + 7.5} L ${px - 15} ${py + 7.5} L ${px} ${py} L ${px + 15} ${py - 7.5} L ${px + 15} ${topY - 7.5} Z`}
									fill="rgba(255,255,255,0.03)"
									stroke="rgba(255,255,255,0.1)"
									strokeWidth="1"
								/>
								{/* Pillar Top */}
								<path
									d={`M ${px} ${topY} L ${px - 15} ${topY + 7.5} L ${px} ${topY + 15} L ${px + 15} ${topY + 7.5} Z`}
									fill="rgba(255,255,255,0.05)"
									stroke="rgba(255,255,255,0.2)"
									strokeWidth="1"
								/>

								{/* Data shooting up */}
								<motion.circle
									key={`shoot-${cycle}-${i}`}
									cx={px}
									cy={0}
									r="3"
									fill="#22d3ee"
									filter={`url(#${glowId})`}
									initial={{ cy: py + 15, opacity: 0 }}
									animate={{ cy: topY + 15, opacity: [0, 1, 0] }}
									transition={{ duration: 1, delay: i * 0.2, ease: "easeIn" }}
								/>
							</g>
						);
					})}

					{/* Top Layer: The Context Fabric (Mesh) */}
					<g>
						{/* Base Mesh Lines */}
						{meshNodes.map((node, i) => {
							// Connect to right and bottom neighbors to form grid
							const right = meshNodes.find(
								(n) => n.x === node.x + cellSize && n.y === node.y,
							);
							const bottom = meshNodes.find(
								(n) => n.x === node.x && n.y === node.y + cellSize,
							);

							const px = isoX(node.x, node.y);
							const py = isoY(node.x, node.y, 40); // Lifted mesh

							return (
								<g key={`mesh-base-${i}`}>
									{right && (
										<line
											x1={px}
											y1={py}
											x2={isoX(right.x, right.y)}
											y2={isoY(right.x, right.y, 40)}
											stroke={`url(#${gridGradId})`}
											strokeWidth="1"
										/>
									)}
									{bottom && (
										<line
											x1={px}
											y1={py}
											x2={isoX(bottom.x, bottom.y)}
											y2={isoY(bottom.x, bottom.y, 40)}
											stroke={`url(#${gridGradId})`}
											strokeWidth="1"
										/>
									)}
								</g>
							);
						})}

						{/* Ripple / Active Mesh Lines */}
						{meshNodes.map((node, i) => {
							const right = meshNodes.find(
								(n) => n.x === node.x + cellSize && n.y === node.y,
							);
							const bottom = meshNodes.find(
								(n) => n.x === node.x && n.y === node.y + cellSize,
							);

							const px = isoX(node.x, node.y);
							const py = isoY(node.x, node.y, 40);

							// Distance from center (100, 100) for ripple delay
							const dist = Math.sqrt(
								Math.pow(node.x - 100, 2) + Math.pow(node.y - 100, 2),
							);
							const delay = 1.5 + dist / 200;

							return (
								<g key={`mesh-active-${cycle}-${i}`}>
									{right && (
										<motion.line
											x1={px}
											y1={py}
											x2={isoX(right.x, right.y)}
											y2={isoY(right.x, right.y, 40)}
											stroke={`url(#${meshGradId})`}
											strokeWidth="2"
											filter={`url(#${glowId})`}
											initial={{ opacity: 0 }}
											animate={{ opacity: [0, 0.8, 0] }}
											transition={{
												duration: 2,
												delay: delay,
												ease: "easeInOut",
											}}
										/>
									)}
									{bottom && (
										<motion.line
											x1={px}
											y1={py}
											x2={isoX(bottom.x, bottom.y)}
											y2={isoY(bottom.x, bottom.y, 40)}
											stroke={`url(#${meshGradId})`}
											strokeWidth="2"
											filter={`url(#${glowId})`}
											initial={{ opacity: 0 }}
											animate={{ opacity: [0, 0.8, 0] }}
											transition={{
												duration: 2,
												delay: delay,
												ease: "easeInOut",
											}}
										/>
									)}

									{/* Node points lighting up */}
									<motion.circle
										cx={px}
										cy={py}
										r="3"
										fill="#ffffff"
										filter={`url(#${glowId})`}
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
										transition={{
											duration: 1.5,
											delay: delay,
											ease: "easeInOut",
										}}
									/>
								</g>
							);
						})}

						{/* Fast Horizontal Data Packets across the Mesh */}
						{[
							{ start: { x: 0, y: 60 }, end: { x: 180, y: 180 }, delay: 2.5 },
							{ start: { x: 180, y: 0 }, end: { x: 60, y: 180 }, delay: 3.0 },
							{ start: { x: 60, y: 180 }, end: { x: 180, y: 60 }, delay: 3.5 },
						].map((packet, i) => (
							<motion.circle
								key={`packet-${cycle}-${i}`}
								r="4"
								fill="#c084fc"
								filter={`url(#${glowId})`}
								initial={{
									cx: isoX(packet.start.x, packet.start.y),
									cy: isoY(packet.start.x, packet.start.y, 40),
									opacity: 0,
								}}
								animate={{
									cx: isoX(packet.end.x, packet.end.y),
									cy: isoY(packet.end.x, packet.end.y, 40),
									opacity: [0, 1, 0],
								}}
								transition={{
									duration: 0.8,
									delay: packet.delay,
									ease: "easeInOut",
								}}
							/>
						))}
					</g>
				</g>
			</svg>
		</div>
	);
}
