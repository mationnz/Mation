import {
	Activity,
	AlertTriangle,
	ArrowRight,
	BarChart3,
	Bell,
	Bot,
	CheckCircle2,
	ChevronRight,
	CircleDot,
	Clock,
	Cloud,
	Database,
	Layers,
	LayoutDashboard,
	Lock,
	MessageSquare,
	RefreshCw,
	ShieldCheck,
	Sparkles,
	Star,
	TrendingDown,
	TrendingUp,
	Workflow,
	X,
	Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
export type TabId = "overview" | "grid" | "ai";
export type ApprovalState = "pending" | "approved" | "rejected";
export interface ChatMsg { role: "user" | "ai"; text: string }
export interface DemoRow { id: string; source: string; owner: string; status: string; priority: string; updated: string; value: string }

// ── Data ───────────────────────────────────────────────────────────────────────
export const CONNECTORS = [
	{ id: "postgres", name: "PostgreSQL", label: "Data Warehouse", icon: Database, ping: 12, desc: "Connect to structured operational data and run governed queries.", color: "cyan" },
	{ id: "salesforce", name: "Salesforce", label: "CRM Platform", icon: Activity, ping: 4, desc: "Pull live pipeline, contacts, and deal data into your workspace.", color: "blue" },
	{ id: "jira", name: "Jira", label: "Issue Tracking", icon: Layers, ping: 28, desc: "Surface sprint progress, blockers, and ticket queues in real time.", color: "indigo" },
	{ id: "slack", name: "Slack", label: "Communications", icon: MessageSquare, ping: 0, desc: "Receive alerts, post summaries, and trigger actions via chat.", color: "violet" },
	{ id: "cloud", name: "Cloud Storage", label: "S3 / GCS / Azure", icon: Cloud, ping: 7, desc: "Read reports, documents, and artifacts from any cloud bucket.", color: "sky" },
	{ id: "api", name: "REST / GraphQL", label: "Custom API", icon: CircleDot, ping: 0, desc: "Connect any internal API with OAuth2, bearer tokens or API keys.", color: "emerald" },
];
export const FEATURES = [
	{ id: "reporting", name: "Real-time Reporting", icon: BarChart3, desc: "Auto-generated summaries and charts that refresh as data changes." },
	{ id: "alerts", name: "Smart Alerts", icon: Zap, desc: "Threshold-based and AI-triggered notifications across any channel." },
	{ id: "approvals", name: "Approval Workflows", icon: ShieldCheck, desc: "Multi-step sign-off flows with role-based routing and audit trails." },
	{ id: "actions", name: "Two-way Sync", icon: RefreshCw, desc: "Write back to source systems after human or automated approval." },
	{ id: "ai", name: "Agent Orchestration", icon: Bot, desc: "Specialized AI agents run behind the scenes, routing work at scale." },
	{ id: "audit", name: "Full Audit Trail", icon: Lock, desc: "Every action is logged, timestamped, and tied to a user identity." },
];
export const COMPONENTS = [
	{ id: "datagrid", name: "Data Grid", icon: LayoutDashboard, desc: "Sortable, filterable table with row drilldowns." },
	{ id: "charts", name: "Metric Charts", icon: BarChart3, desc: "Bar & line charts with hover tooltips." },
	{ id: "kpi", name: "KPI Cards", icon: TrendingUp, desc: "Live metric cards with sparklines." },
	{ id: "timeline", name: "Activity Feed", icon: Activity, desc: "Real-time audit & event timeline." },
	{ id: "approvals_ui", name: "Approval Panel", icon: ShieldCheck, desc: "Action cards with one-click approve / reject." },
	{ id: "chat", name: "AI Chat", icon: MessageSquare, desc: "In-context AI assistant embedded in the dashboard." },
];
export const LOADING_STEPS = [
	"Authenticating connectors & validating schemas…",
	"Synthesising real-time data pipelines…",
	"Applying RBAC & approval governance layers…",
	"Composing component registry & UI specification…",
	"Rendering your generative interface…",
];
export const MOCK_ROWS: DemoRow[] = [
	{ id: "EVT-4829", source: "Salesforce", owner: "Alice C.", status: "Synced", priority: "High", updated: "2 min ago", value: "$48,200" },
	{ id: "JIR-1102", source: "Jira", owner: "Bob K.", status: "Pending", priority: "Medium", updated: "14 min ago", value: "—" },
	{ id: "PG-0943", source: "PostgreSQL", owner: "System", status: "Failed", priority: "Critical", updated: "1 hr ago", value: "—" },
	{ id: "SLK-7841", source: "Slack", owner: "Carol T.", status: "Synced", priority: "Low", updated: "3 hrs ago", value: "$12,500" },
	{ id: "EVT-5103", source: "Salesforce", owner: "David M.", status: "Synced", priority: "High", updated: "5 hrs ago", value: "$94,100" },
];
export const CHART_DATA = [32, 58, 44, 81, 62, 75, 49, 93, 70, 88, 55, 100];
export const CHART_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export const AI_REPLIES: Record<string, string> = {
	sync: "Running a forced sync across all active connectors now. ETA ~12 seconds.",
	alert: "I've set a threshold alert: if pending events exceed 50, you'll be notified via Slack.",
	report: "Generating a PDF summary of today's operations. I'll attach it when ready.",
	fail: "PG-0943 failed due to a timeout at 01:14 AM. Retry was queued but blocked — want me to escalate?",
	escalat: "Escalating PG-0943 to Tier-2. I've also raised a Jira ticket (JIR-1107) for tracking.",
	deploy: "Production deployment is gated behind your approval policy. 2 approvals required — 0 received.",
	default: "I can surface insights, run queries, or trigger governed actions. What would you like to do?",
};

// ── SVG Sparkline ──────────────────────────────────────────────────────────────
export function Sparkline({ data, color = "#22d3ee" }: { data: number[]; color?: string }) {
	const max = Math.max(...data);
	const w = 80, h = 28;
	const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
	return (
		<svg width={w} height={h} className="overflow-visible">
			<polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
			<circle cx={(data.length - 1) / (data.length - 1) * w} cy={h - (data[data.length - 1] / max) * h} r="2.5" fill={color} />
		</svg>
	);
}

// ── Animated Counter ───────────────────────────────────────────────────────────
export function Counter({ target, prefix = "", suffix = "", decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
	const [val, setVal] = useState(0);
	useEffect(() => {
		const start = Date.now();
		const dur = 1200;
		const raf = () => {
			const p = Math.min((Date.now() - start) / dur, 1);
			const ease = 1 - (1 - p) ** 3;
			setVal(target * ease);
			if (p < 1) requestAnimationFrame(raf);
		};
		requestAnimationFrame(raf);
	}, [target]);
	const fmt = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
	return <span>{prefix}{fmt}{suffix}</span>;
}

// ── Live Ticker (subtle random drift) ─────────────────────────────────────────
export function useLiveTicker(base: number, variance = 0.02, intervalMs = 2500) {
	const [val, setVal] = useState(base);
	useEffect(() => {
		const t = setInterval(() => setVal(v => v + (Math.random() - 0.5) * variance * base), intervalMs);
		return () => clearInterval(t);
	}, [base, variance, intervalMs]);
	return val;
}

// ── Toast ──────────────────────────────────────────────────────────────────────
export function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
	useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
	return (
		<div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0f1736] border border-cyan-500/40 text-white text-sm px-4 py-3 rounded-2xl shadow-2xl shadow-cyan-500/10 animate-in slide-in-from-bottom-4 duration-300">
			<CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
			<span>{msg}</span>
			<button onClick={onClose} className="ml-2 text-indigo-100/40 hover:text-white transition"><X className="h-3.5 w-3.5" /></button>
		</div>
	);
}

// ── Row Modal ──────────────────────────────────────────────────────────────────
export function RowModal({ row, onClose, toast }: { row: DemoRow; onClose: () => void; toast: (m: string) => void }) {
	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
			<div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
			<div className="relative bg-[#0b0e24] border border-white/15 rounded-3xl p-8 w-full max-w-lg shadow-2xl shadow-indigo-500/10 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
				<button onClick={onClose} className="absolute top-5 right-5 text-indigo-100/30 hover:text-white transition"><X className="h-5 w-5" /></button>
				<div className="flex items-center gap-3 mb-6">
					<div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
						<Database className="h-5 w-5 text-cyan-400" />
					</div>
					<div>
						<h3 className="font-heading text-lg font-semibold text-white">{row.id}</h3>
						<p className="text-xs text-indigo-100/50">Record from {row.source} · {row.updated}</p>
					</div>
					<span className={`ml-auto px-2.5 py-1 rounded-full text-[11px] font-medium ${row.status === "Synced" ? "bg-emerald-500/15 text-emerald-400" : row.status === "Pending" ? "bg-yellow-500/15 text-yellow-400" : "bg-red-500/15 text-red-400"}`}>{row.status}</span>
				</div>
				<div className="grid grid-cols-2 gap-3 mb-6">
					{[["Owner", row.owner], ["Priority", row.priority], ["Value", row.value], ["Source", row.source]].map(([l, v]) => (
						<div key={l} className="bg-white/4 rounded-xl p-3 border border-white/5">
							<p className="text-[10px] uppercase tracking-widest text-indigo-100/35 mb-1">{l}</p>
							<p className="text-sm font-medium text-white">{v}</p>
						</div>
					))}
				</div>
				{row.status === "Failed" && (
					<div className="bg-red-500/8 border border-red-500/20 rounded-xl p-3 mb-4 text-xs text-red-300 font-mono">
						ERR: connection timeout after 30s · retry #3 queued
					</div>
				)}
				<div className="flex gap-3">
					<button onClick={onClose} className="flex-1 bg-white/4 hover:bg-white/8 border border-white/10 rounded-xl py-2.5 text-sm text-white transition">Dismiss</button>
					<button onClick={() => { toast(`Opening ${row.id} in ${row.source}…`); onClose(); }} className="flex-1 bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 hover:from-cyan-500/40 hover:to-indigo-500/40 border border-cyan-500/40 rounded-xl py-2.5 text-sm text-cyan-100 font-medium transition">
						Open in {row.source} ↗
					</button>
				</div>
			</div>
		</div>
	);
}

// ── Animated bar chart bar ─────────────────────────────────────────────────────
export function AnimatedBar({ h, label, i, active }: { h: number; label: string; i: number; active: boolean }) {
	const [hov, setHov] = useState(false);
	const [ready, setReady] = useState(false);
	useEffect(() => { const t = setTimeout(() => setReady(true), i * 60 + 100); return () => clearTimeout(t); }, [i]);
	return (
		<div className="flex-1 flex flex-col items-center gap-1 relative group" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
			{hov && (
				<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0b0e24] border border-white/15 text-[11px] text-white px-2 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg">
					{h}k events
				</div>
			)}
			<div className="w-full flex items-end" style={{ height: 140 }}>
				<div
					className={`w-full rounded-t-sm transition-all duration-700 ${active ? "bg-gradient-to-t from-cyan-600 to-cyan-300/90" : "bg-gradient-to-t from-indigo-700/70 to-indigo-500/50"} ${hov ? "brightness-125" : ""}`}
					style={{ height: ready ? `${h}%` : "0%", transitionDelay: `${i * 60}ms` }}
				/>
			</div>
			<span className="text-[8px] text-indigo-100/25">{label}</span>
		</div>
	);
}

// ── Typewriter hook ─────────────────────────────────────────────────────────────
export function useTypewriter(text: string, speed = 22) {
	const [displayed, setDisplayed] = useState("");
	useEffect(() => {
		setDisplayed("");
		let i = 0;
		const t = setInterval(() => {
			i++;
			setDisplayed(text.slice(0, i));
			if (i >= text.length) clearInterval(t);
		}, speed);
		return () => clearInterval(t);
	}, [text, speed]);
	return displayed;
}

// ── SVG Node Graph (animated connector visualization) ─────────────────────────
const NODES = [
	{ x: 50, y: 50, label: "Mation" },
	{ x: 20, y: 30, label: "SQL" },
	{ x: 78, y: 22, label: "CRM" },
	{ x: 85, y: 65, label: "Jira" },
	{ x: 55, y: 80, label: "Slack" },
	{ x: 15, y: 70, label: "S3" },
];
const EDGES = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,5],[2,3]];

export function NodeGraph() {
	const [tick, setTick] = useState(0);
	useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 1800); return () => clearInterval(t); }, []);
	return (
		<svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
			<defs>
				<radialGradient id="ng">
					<stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
				</radialGradient>
			</defs>
			{EDGES.map(([a, b], i) => {
				const na = NODES[a]; const nb = NODES[b];
				const prog = ((tick + i) % 8) / 8;
				const px = na.x + (nb.x - na.x) * prog;
				const py = na.y + (nb.y - na.y) * prog;
				return (
					<g key={i}>
						<line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#6366f1" strokeWidth="0.3" opacity="0.4" />
						<circle cx={px} cy={py} r="0.8" fill="#22d3ee" opacity="0.8" />
					</g>
				);
			})}
			{NODES.map((n, i) => (
				<g key={i}>
					<circle cx={n.x} cy={n.y} r={i === 0 ? 5 : 3} fill={i === 0 ? "url(#ng)" : "#1e2044"} stroke={i === 0 ? "#22d3ee" : "#6366f1"} strokeWidth="0.5" />
					<text x={n.x} y={n.y + (i === 0 ? 9 : 6.5)} textAnchor="middle" fill="#a5b4fc" fontSize="3.5" opacity="0.7">{n.label}</text>
				</g>
			))}
		</svg>
	);
}

// ── Notification bell dropdown ─────────────────────────────────────────────────
export function NotifBell({ toast }: { toast: (m: string) => void }) {
	const [open, setOpen] = useState(false);
	const NOTIFS = [
		{ title: "JIR-1102 requires approval", t: "Just now", lvl: "warn" },
		{ title: "PG-0943 sync failed", t: "1 hr ago", lvl: "error" },
		{ title: "Monthly report ready", t: "3 hrs ago", lvl: "info" },
	];
	return (
		<div className="relative">
			<button onClick={() => setOpen(v => !v)} className="relative p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-indigo-100/50 hover:text-white transition">
				<Bell className="h-4 w-4" />
				<span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
			</button>
			{open && (
				<div className="absolute right-0 top-full mt-2 w-72 bg-[#0b0e24] border border-white/10 rounded-2xl shadow-2xl shadow-indigo-500/10 p-4 z-50 animate-in slide-in-from-top-2 duration-150">
					<p className="text-xs font-semibold text-white mb-3">Notifications</p>
					{NOTIFS.map((n, i) => (
						<button key={i} onClick={() => { toast(n.title); setOpen(false); }} className="w-full text-left flex gap-3 p-2.5 rounded-xl hover:bg-white/5 transition mb-1">
							<div className={`w-1.5 self-stretch rounded-full shrink-0 ${n.lvl === "error" ? "bg-red-400" : n.lvl === "warn" ? "bg-yellow-400" : "bg-cyan-400"}`} />
							<div>
								<p className="text-xs font-medium text-white">{n.title}</p>
								<p className="text-[10px] text-indigo-100/40">{n.t}</p>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}

// ── Activity feed item ─────────────────────────────────────────────────────────
export const FEED_ITEMS = [
	{ text: "Policy PROD-001 updated", user: "Admin", t: "10:42", icon: ShieldCheck, col: "text-violet-400", bg: "bg-violet-500/10" },
	{ text: "JIR-1102 approval requested", user: "Bob K.", t: "10:31", icon: AlertTriangle, col: "text-orange-400", bg: "bg-orange-500/10" },
	{ text: "PG-0943 sync failed ×3", user: "System", t: "09:15", icon: X, col: "text-red-400", bg: "bg-red-500/10" },
	{ text: "Salesforce pipeline refreshed", user: "System", t: "09:00", icon: RefreshCw, col: "text-cyan-400", bg: "bg-cyan-500/10" },
	{ text: "Monthly audit report generated", user: "Alice C.", t: "08:30", icon: Star, col: "text-emerald-400", bg: "bg-emerald-500/10" },
];

// ── KPI data with sparklines ───────────────────────────────────────────────────
export const KPI_ITEMS = [
	{ label: "Events Processed", base: 24592, prefix: "", suffix: "", decimals: 0, trend: "+12%", up: true, icon: Activity, spark: [60,72,65,80,74,82,78,88,84,93,89,100] },
	{ label: "Avg Resolution", base: 1.8, prefix: "", suffix: " hrs", decimals: 1, trend: "−30%", up: false, icon: Clock, spark: [100,90,85,80,78,72,68,65,60,58,55,50] },
	{ label: "Pending Actions", base: 14, prefix: "", suffix: "", decimals: 0, trend: "+3", up: true, icon: Workflow, spark: [5,8,6,10,9,12,11,14,13,15,14,17] },
	{ label: "Audit Score", base: 98.4, prefix: "", suffix: "%", decimals: 1, trend: "+0.2%", up: true, icon: ShieldCheck, spark: [92,93,94,95,95,96,96,97,97,98,98,100] },
];
