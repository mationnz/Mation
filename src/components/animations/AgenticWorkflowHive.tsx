"use client";

import { motion } from "framer-motion";
import { useId, useEffect, useState } from "react";

export default function AgenticWorkflowHive() {
	const glowId = useId();
	const defGlowId = useId();
	const [cycle, setCycle] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCycle((prev) => prev + 1);
		}, 6000); // Complete animation cycle every 6s
		return () => clearInterval(interval);
	}, []);

	// Hexagon path generator
	const getHexagonPath = (cx: number, cy: number, r: number) => {
		let path = "";
		for (let i = 0; i < 6; i++) {
			const angle = (i * 60 - 30) * (Math.PI / 180);
			const x = cx + r * Math.cos(angle);
			const y = cy + r * Math.sin(angle);
			path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
		}
		return path + " Z";
	};

	// Node positions
	const triagePos = { x: 120, y: 150 };
	const reasoningPos = { x: 200, y: 90 };
	const executionPos = { x: 280, y: 150 };

	const agents = [
		{ label: "Triage", pos: triagePos, color: "#22d3ee", baseDelay: 1 },
		{ label: "Reasoning", pos: reasoningPos, color: "#c084fc", baseDelay: 2.5 },
		{ label: "Execution", pos: executionPos, color: "#818cf8", baseDelay: 4 },
	];

	return (
		<div className="relative mx-auto h-72 w-full max-w-md rounded-[2rem] border border-white/5 bg-[radial-gradient(ellipse_at_top,rgba(24,33,78,0.6),rgba(8,11,28,0.9))] shadow-[inset_0_0_80px_rgba(34,211,238,0.05)] overflow-hidden flex items-center justify-center">
			<svg
				viewBox="0 0 400 300"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute inset-0 h-full w-full"
			>
				<defs>
					<filter id={defGlowId} x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
					<filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="8" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
					<linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="transparent" />
						<stop offset="50%" stopColor="#818cf8" />
						<stop offset="100%" stopColor="transparent" />
					</linearGradient>
				</defs>

				{/* Data Flow Lines */}
				{/* Incoming to Triage */}
				<motion.path
					d={`M -20 ${triagePos.y} L ${triagePos.x - 30} ${triagePos.y}`}
					stroke="rgba(255,255,255,0.1)"
					strokeWidth="2"
				/>
				{/* Triage to Reasoning */}
				<motion.path
					d={`M ${triagePos.x + 15} ${triagePos.y - 25} L ${reasoningPos.x - 20} ${reasoningPos.y + 15}`}
					stroke="rgba(255,255,255,0.1)"
					strokeWidth="2"
				/>
				{/* Reasoning to Execution */}
				<motion.path
					d={`M ${reasoningPos.x + 20} ${reasoningPos.y + 15} L ${executionPos.x - 15} ${executionPos.y - 25}`}
					stroke="rgba(255,255,255,0.1)"
					strokeWidth="2"
				/>

				{/* Data Payloads Animation */}
				<motion.g key={cycle}>
					{/* Raw Data Payload entering */}
					<motion.rect
						x="-20"
						y={triagePos.y - 8}
						width="30"
						height="16"
						rx="4"
						fill="rgba(255,255,255,0.8)"
						filter={`url(#${defGlowId})`}
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: triagePos.x - 40, opacity: [0, 1, 0] }}
						transition={{ duration: 1, ease: "easeIn" }}
					/>

					{/* 3 Split Payloads (Triage -> Reasoning/Execution) */}
					{/* Path 1: Triage -> Reasoning */}
					<motion.circle
						cx="0"
						cy="0"
						r="4"
						fill="#22d3ee"
						filter={`url(#${defGlowId})`}
						initial={{ x: triagePos.x + 15, y: triagePos.y - 25, opacity: 0 }}
						animate={{
							x: reasoningPos.x - 20,
							y: reasoningPos.y + 15,
							opacity: [0, 1, 0],
						}}
						transition={{ duration: 0.8, delay: 1.2, ease: "linear" }}
					/>
					{/* Path 2: Triage -> Reasoning (Secondary) */}
					<motion.circle
						cx="0"
						cy="0"
						r="4"
						fill="#c084fc"
						filter={`url(#${defGlowId})`}
						initial={{ x: triagePos.x + 15, y: triagePos.y - 25, opacity: 0 }}
						animate={{
							x: reasoningPos.x - 20,
							y: reasoningPos.y + 15,
							opacity: [0, 1, 0],
						}}
						transition={{ duration: 0.8, delay: 1.4, ease: "linear" }}
					/>
					{/* Path 3: Triage -> Execution (Direct) */}
					<motion.circle
						cx="0"
						cy="0"
						r="4"
						fill="#818cf8"
						filter={`url(#${defGlowId})`}
						initial={{ x: triagePos.x + 30, y: triagePos.y, opacity: 0 }}
						animate={{
							x: executionPos.x - 30,
							y: executionPos.y,
							opacity: [0, 1, 0],
						}}
						transition={{ duration: 1.2, delay: 1.2, ease: "linear" }}
					/>

					{/* Reasoning Approved Signal */}
					<motion.circle
						cx="0"
						cy="0"
						r="5"
						fill="#34d399"
						filter={`url(#${defGlowId})`}
						initial={{
							x: reasoningPos.x + 20,
							y: reasoningPos.y + 15,
							opacity: 0,
						}}
						animate={{
							x: executionPos.x - 15,
							y: executionPos.y - 25,
							opacity: [0, 1, 0],
						}}
						transition={{ duration: 0.8, delay: 3.5, ease: "linear" }}
					/>

					{/* Execution Beam */}
					<motion.rect
						x={executionPos.x + 30}
						y={executionPos.y - 4}
						width="80"
						height="8"
						rx="4"
						fill="url(#beamGrad)"
						initial={{ x: executionPos.x + 30, opacity: 0, scaleX: 0 }}
						animate={{ x: 420, opacity: [0, 1, 0], scaleX: [0, 2, 0] }}
						transition={{ duration: 0.6, delay: 4.5, ease: "easeOut" }}
						style={{ originX: 0 }}
					/>
				</motion.g>

				{/* Agents */}
				{agents.map((agent, i) => (
					<g key={`agent-${i}`}>
						{/* Agent Heartbeat Glow (Thinking state) */}
						<motion.circle
							cx={agent.pos.x}
							cy={agent.pos.y}
							r="35"
							fill={agent.color}
							filter={`url(#${glowId})`}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: [0, 0.25, 0], scale: [0.8, 1.2, 0.8] }}
							transition={{
								duration: 1.5,
								delay: agent.baseDelay,
								repeat: Infinity,
								repeatDelay: 4.5,
							}}
						/>

						{/* Agent Hexagon Base */}
						<motion.path
							d={getHexagonPath(agent.pos.x, agent.pos.y, 30)}
							fill="rgba(15, 23, 42, 0.8)"
							stroke={agent.color}
							strokeWidth="1.5"
							initial={{ rotate: 0 }}
							animate={{ rotate: i === 0 ? [0, 60, 60] : 0 }}
							transition={{
								duration: 1,
								delay: 1,
								repeat: Infinity,
								repeatDelay: 5,
							}}
							style={{
								originX: `${agent.pos.x}px`,
								originY: `${agent.pos.y}px`,
							}}
						/>

						{/* Inner Computing Ring (Reasoning Agent) */}
						{i === 1 && (
							<motion.circle
								cx={agent.pos.x}
								cy={agent.pos.y}
								r="18"
								fill="none"
								stroke={agent.color}
								strokeWidth="1.5"
								strokeDasharray="4 4"
								initial={{ rotate: 0 }}
								animate={{ rotate: 360 }}
								transition={{ duration: 2, ease: "linear", repeat: Infinity }}
								style={{
									originX: `${agent.pos.x}px`,
									originY: `${agent.pos.y}px`,
								}}
							/>
						)}

						{/* Core Dot */}
						<circle
							cx={agent.pos.x}
							cy={agent.pos.y}
							r="6"
							fill={agent.color}
							filter={`url(#${defGlowId})`}
						/>
						<circle cx={agent.pos.x} cy={agent.pos.y} r="3" fill="#ffffff" />

						<text
							x={agent.pos.x}
							y={agent.pos.y + 50}
							textAnchor="middle"
							fill="rgba(255,255,255,0.7)"
							fontSize="10"
							className="font-tech uppercase tracking-widest"
						>
							{agent.label}
						</text>
					</g>
				))}
			</svg>
		</div>
	);
}
