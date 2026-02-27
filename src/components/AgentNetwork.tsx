import { type CSSProperties } from "react";
import DepthCard from "./DepthCard";

type Node = {
	id: string;
	label: string;
	role: string;
	x: number;
	y: number;
	status: "active" | "observing" | "escalated";
};

const nodes: Node[] = [
	{
		id: "control",
		label: "Control",
		role: "Orchestrator",
		x: 50,
		y: 14,
		status: "active",
	},
	{
		id: "sales",
		label: "Sales",
		role: "Pipeline Agent",
		x: 17,
		y: 36,
		status: "active",
	},
	{
		id: "finance",
		label: "Finance",
		role: "Close Agent",
		x: 83,
		y: 34,
		status: "observing",
	},
	{
		id: "ops",
		label: "Ops",
		role: "SLA Agent",
		x: 20,
		y: 73,
		status: "active",
	},
	{
		id: "support",
		label: "Support",
		role: "CX Agent",
		x: 78,
		y: 76,
		status: "active",
	},
	{
		id: "risk",
		label: "Risk",
		role: "Policy Agent",
		x: 50,
		y: 52,
		status: "escalated",
	},
];

const links: Array<[string, string]> = [
	["control", "sales"],
	["control", "finance"],
	["control", "ops"],
	["control", "support"],
	["risk", "sales"],
	["risk", "finance"],
	["risk", "ops"],
	["risk", "support"],
	["sales", "ops"],
	["finance", "support"],
];

export default function AgentNetwork() {
	return (
		<DepthCard className="panel-glass rounded-3xl p-6 sm:p-7">
			<p className="kicker">Agent Graph</p>
			<h3 className="mt-4 font-heading text-3xl font-semibold text-white">
				Multi-agent collaboration network
			</h3>

			<div className="agent-network-canvas mt-5">
				<svg
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					className="agent-network-lines"
					aria-hidden
				>
					{links.map(([sourceId, targetId]) => {
						const sourceNode = nodes.find((node) => node.id === sourceId);
						const targetNode = nodes.find((node) => node.id === targetId);

						if (!sourceNode || !targetNode) {
							return null;
						}

						return (
							<line
								key={`${sourceId}-${targetId}`}
								x1={sourceNode.x}
								y1={sourceNode.y}
								x2={targetNode.x}
								y2={targetNode.y}
							/>
						);
					})}
				</svg>

				{nodes.map((node) => (
					<div
						key={node.id}
						className={`agent-node agent-node--${node.status}`}
						style={
							{
								left: `${node.x}%`,
								top: `${node.y}%`,
							} as CSSProperties
						}
					>
						<span className="agent-node__pulse" aria-hidden />
						<p className="agent-node__label">{node.label}</p>
						<p className="agent-node__role">{node.role}</p>
					</div>
				))}
			</div>

			<div className="mt-5 grid gap-3 sm:grid-cols-3">
				<div className="data-card">
					<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/60">
						Live handoffs
					</p>
					<p className="mt-2 font-heading text-3xl font-semibold text-white">
						438
					</p>
				</div>
				<div className="data-card">
					<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/60">
						Autonomous decisions
					</p>
					<p className="mt-2 font-heading text-3xl font-semibold text-white">
						87.4%
					</p>
				</div>
				<div className="data-card">
					<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/60">
						Escalation confidence
					</p>
					<p className="mt-2 font-heading text-3xl font-semibold text-cyan-100">
						99.1%
					</p>
				</div>
			</div>
		</DepthCard>
	);
}
