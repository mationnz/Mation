import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BarChart3,
	Bot,
	CheckCircle2,
	ChevronDown,
	ChevronRight,
	Database,
	Filter,
	LayoutDashboard,
	Loader2,
	Play,
	Plus,
	RefreshCw,
	Rocket,
	Search,
	Settings2,
	ShieldCheck,
	Sparkles,
	TrendingDown,
	TrendingUp,
	X,
	Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
	AI_REPLIES,
	AnimatedBar,
	CHART_DATA,
	CHART_LABELS,
	COMPONENTS,
	CONNECTORS,
	Counter,
	FEATURES,
	FEED_ITEMS,
	KPI_ITEMS,
	LOADING_STEPS,
	MOCK_ROWS,
	NodeGraph,
	NotifBell,
	RowModal,
	Sparkline,
	Toast,
	useTypewriter,
	type ApprovalState,
	type ChatMsg,
	type TabId,
} from "../components/DemoShared";

export const Route = createFileRoute("/demo")({
	component: DemoPage,
	head: () => ({
		meta: [
			{ title: "Generative Dashboard Builder — Mation" },
			{ name: "description", content: "Build your AI-powered operations dashboard interactively." },
		],
	}),
});

// ── Chat message with typewriter for AI ───────────────────────────────────────
function AiMsg({ text }: { text: string }) {
	const displayed = useTypewriter(text, 18);
	return (
		<div className="flex gap-2">
			<div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
				<Sparkles className="h-3 w-3 text-cyan-400" />
			</div>
			<div className="max-w-[82%] rounded-2xl px-4 py-2.5 text-sm bg-[#0d1028] border border-white/8 text-indigo-100/80">
				{displayed}<span className="animate-pulse">▋</span>
			</div>
		</div>
	);
}

// ── Deploy success overlay ────────────────────────────────────────────────────
function DeploySuccess({ onReset }: { onReset: () => void }) {
	const [show, setShow] = useState(false);
	useEffect(() => { const t = setTimeout(() => setShow(true), 50); return () => clearTimeout(t); }, []);
	return (
		<div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 bg-[#060712]/95 backdrop-blur-sm transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}>
			<div className="relative mb-6">
				{/* Concentric ring pulses */}
				{[0,1,2].map(i => (
					<div key={i} className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping" style={{ animationDelay: `${i * 300}ms`, animationDuration: "2s" }} />
				))}
				<div className="relative w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center">
					<Rocket className="h-9 w-9 text-emerald-400" />
				</div>
			</div>
			<h2 className="font-heading text-3xl font-semibold text-white mb-2">Deployment Queued</h2>
			<p className="text-indigo-100/60 max-w-sm mb-2">Your architecture has been sent for review. 2 approvals required before production rollout.</p>
			<div className="font-mono text-xs text-emerald-400/70 mb-8 bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-4 py-2">
				BUILD ID: MTN-{Math.floor(Math.random() * 90000 + 10000)} · STATUS: AWAITING_APPROVAL
			</div>
			<div className="flex gap-3">
				<Link to="/contact" className="button-primary flex items-center gap-2 text-sm px-5 py-3">
					<Sparkles className="h-4 w-4" /> Book a Real Demo
				</Link>
				<button onClick={onReset} className="bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl px-5 py-3 text-sm text-white transition">Start Over</button>
			</div>
		</div>
	);
}

// ── Main page ─────────────────────────────────────────────────────────────────
function DemoPage() {
	const [selConn, setSelConn] = useState<string[]>([]);
	const [selFeat, setSelFeat] = useState<string[]>([]);
	const [selComp, setSelComp] = useState<string[]>([]);
	const [hovConn, setHovConn] = useState<string | null>(null);
	const [hovFeat, setHovFeat] = useState<string | null>(null);

	const [isGen, setIsGen] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [isDeployed, setIsDeployed] = useState(false);
	const [step, setStep] = useState(-1);
	const [progress, setProgress] = useState(0);

	const [toast, setToast] = useState<string | null>(null);
	const [activeRow, setActiveRow] = useState<typeof MOCK_ROWS[0] | null>(null);
	const [approval, setApproval] = useState<ApprovalState>("pending");
	const [tab, setTab] = useState<TabId>("overview");
	const [search, setSearch] = useState("");
	const [sortCol, setSortCol] = useState("id");
	const [sortAsc, setSortAsc] = useState(true);
	const [chatInput, setChatInput] = useState("");
	const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([
		{ role: "ai", text: "Hi! I'm your Mation assistant. Ask me to sync, alert, report, or explain anything." },
	]);
	const [aiTyping, setAiTyping] = useState(false);
	const chatEndRef = useRef<HTMLDivElement>(null);
	const showToast = (m: string) => setToast(m);

	const toggle = (id: string, arr: string[], set: (v: string[]) => void) =>
		set(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);

	const handleGenerate = () => {
		if (selConn.length + selFeat.length + selComp.length === 0) { showToast("Select at least one option first."); return; }
		setIsGen(true); setIsDone(false); setStep(0); setProgress(0);
		LOADING_STEPS.forEach((_, i) => setTimeout(() => { setStep(i); setProgress(Math.round(((i + 1) / LOADING_STEPS.length) * 100)); }, i * 900));
		setTimeout(() => { setIsGen(false); setIsDone(true); }, LOADING_STEPS.length * 900 + 300);
	};

	const handleReset = () => {
		setIsGen(false); setIsDone(false); setIsDeployed(false);
		setSelConn([]); setSelFeat([]); setSelComp([]);
		setStep(-1); setProgress(0); setApproval("pending"); setTab("overview");
	};

	const sendChat = () => {
		const q = chatInput.trim(); if (!q) return;
		setChatInput(""); setChatMsgs(m => [...m, { role: "user", text: q }]);
		setAiTyping(true);
		setTimeout(() => {
			const lower = q.toLowerCase();
			const key = (Object.keys(AI_REPLIES) as (keyof typeof AI_REPLIES)[]).find(k => k !== "default" && lower.includes(k));
			const reply = key ? AI_REPLIES[key] : AI_REPLIES.default;
			setChatMsgs(m => [...m, { role: "ai", text: reply }]);
			setAiTyping(false);
		}, 700);
	};
	useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs]);

	const filteredRows = MOCK_ROWS
		.filter(r => !search || Object.values(r).some(v => v.toLowerCase().includes(search.toLowerCase())))
		.sort((a, b) => {
			const av = (a as Record<string, string>)[sortCol] ?? "";
			const bv = (b as Record<string, string>)[sortCol] ?? "";
			return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
		});
	const sort = (col: string) => { if (sortCol === col) setSortAsc(v => !v); else { setSortCol(col); setSortAsc(true); } };

	const locked = isGen || isDone;

	return (
		<div className="min-h-screen bg-[#060712] pt-20 flex flex-col relative overflow-hidden">
			{/* Ambient glows */}
			<div className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

			{/* Top bar */}
			<div className="sticky top-20 z-30 bg-[rgba(6,7,18,0.88)] backdrop-blur-xl border-b border-white/8">
				<div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Sparkles className="h-4 w-4 text-cyan-400" />
						<span className="font-heading text-sm font-semibold text-white">Generative Architecture Builder</span>
						<span className="hidden sm:inline text-xs bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded-full">Interactive Demo</span>
					</div>
					<div className="flex items-center gap-3">
						{isDone && (
							<div className="hidden sm:flex items-center gap-1.5 text-[11px]">
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
								<span className="text-emerald-400">Live · {selConn.length} connector{selConn.length !== 1 ? "s" : ""}</span>
							</div>
						)}
						<NotifBell toast={showToast} />
						<Link to="/contact" className="hidden sm:inline-flex button-primary text-xs py-1.5 px-4">
							Book a Real Demo
						</Link>
					</div>
				</div>
			</div>

			<div className="max-w-[1600px] mx-auto w-full px-6 py-6 flex-1 grid lg:grid-cols-[360px_1fr] gap-6 items-start">

				{/* ── SIDEBAR ── */}
				<aside className={`flex flex-col gap-4 lg:sticky lg:top-36 transition-all duration-700 ${locked ? "opacity-35 pointer-events-none scale-[0.99]" : ""}`}>

					{/* Connectors */}
					<div className="bg-[#0b0e22] border border-white/8 rounded-2xl p-5">
						<div className="flex items-center gap-2 mb-4">
							<Database className="h-4 w-4 text-cyan-300" />
							<span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100/45">Step 1 · Connectors</span>
							{selConn.length > 0 && <span className="ml-auto text-[10px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 px-1.5 py-0.5 rounded-full">{selConn.length} active</span>}
						</div>
						<div className="space-y-1.5">
							{CONNECTORS.map(c => {
								const sel = selConn.includes(c.id);
								const hov = hovConn === c.id;
								return (
									<button key={c.id} onClick={() => { toggle(c.id, selConn, setSelConn); if (!sel) showToast(`${c.name} connector added.`); }} onMouseEnter={() => setHovConn(c.id)} onMouseLeave={() => setHovConn(null)}
										className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${sel ? "border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.06)]" : "border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4"}`}>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2.5">
												<div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${sel ? "bg-cyan-500/20 border border-cyan-400/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]" : "bg-white/4 border border-white/8"}`}>
													<c.icon className={`h-4 w-4 ${sel ? "text-cyan-300" : "text-indigo-100/35"}`} />
												</div>
												<div className="min-w-0">
													<p className={`text-sm font-medium ${sel ? "text-white" : "text-indigo-100/65"}`}>{c.name}</p>
													<p className="text-[10px] text-indigo-100/30">{c.label}</p>
												</div>
											</div>
											<div className="flex items-center gap-2 shrink-0 ml-2">
												{c.ping > 0 && <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${c.ping < 10 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : c.ping < 20 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>{c.ping}ms</span>}
												{sel ? <CheckCircle2 className="h-4 w-4 text-cyan-400" /> : <Plus className={`h-3.5 w-3.5 transition ${hov ? "text-indigo-100/60" : "text-indigo-100/15"}`} />}
											</div>
										</div>
										{(hov || sel) && <p className="text-[11px] text-indigo-100/45 mt-2 leading-relaxed">{c.desc}</p>}
									</button>
								);
							})}
						</div>
					</div>

					{/* Features */}
					<div className="bg-[#0b0e22] border border-white/8 rounded-2xl p-5">
						<div className="flex items-center gap-2 mb-4">
							<Zap className="h-4 w-4 text-violet-300" />
							<span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100/45">Step 2 · Features</span>
						</div>
						<div className="grid grid-cols-2 gap-1.5">
							{FEATURES.map(f => {
								const sel = selFeat.includes(f.id);
								const hov = hovFeat === f.id;
								return (
									<button key={f.id} onClick={() => { toggle(f.id, selFeat, setSelFeat); if (!sel) showToast(`${f.name} enabled.`); }} onMouseEnter={() => setHovFeat(f.id)} onMouseLeave={() => setHovFeat(null)}
										title={f.desc} className={`relative text-left p-3 rounded-xl border transition-all duration-200 ${sel ? "border-violet-400/50 bg-violet-500/10 shadow-[0_0_12px_rgba(139,92,246,0.06)]" : "border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4"}`}>
										<f.icon className={`h-4 w-4 mb-1.5 ${sel ? "text-violet-300" : "text-indigo-100/30"}`} />
										<p className={`text-xs font-medium leading-snug ${sel ? "text-white" : "text-indigo-100/55"}`}>{f.name}</p>
										{(hov || sel) && <p className="text-[10px] text-indigo-100/40 mt-1 leading-relaxed">{f.desc}</p>}
										{sel && <CheckCircle2 className="absolute top-2 right-2 h-3 w-3 text-violet-400" />}
									</button>
								);
							})}
						</div>
					</div>

					{/* Components */}
					<div className="bg-[#0b0e22] border border-white/8 rounded-2xl p-5">
						<div className="flex items-center gap-2 mb-4">
							<LayoutDashboard className="h-4 w-4 text-indigo-300" />
							<span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100/45">Step 3 · UI Components</span>
						</div>
						<div className="grid grid-cols-2 gap-1.5">
							{COMPONENTS.map(c => {
								const sel = selComp.includes(c.id);
								return (
									<button key={c.id} onClick={() => { toggle(c.id, selComp, setSelComp); if (!sel) showToast(`${c.name} added.`); }} title={c.desc}
										className={`text-left p-3 rounded-xl border transition-all duration-200 ${sel ? "border-indigo-400/50 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.06)]" : "border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4"}`}>
										<c.icon className={`h-4 w-4 mb-1.5 ${sel ? "text-indigo-300" : "text-indigo-100/30"}`} />
										<p className={`text-xs font-medium ${sel ? "text-white" : "text-indigo-100/55"}`}>{c.name}</p>
									</button>
								);
							})}
						</div>
					</div>

					{/* Generate */}
					<button onClick={handleGenerate}
						className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-semibold rounded-2xl py-4 text-sm shadow-xl shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-cyan-500/40">
						<Play className="h-4 w-4" />
						Generate Architecture
					</button>
				</aside>

				{/* ── PREVIEW PANEL ── */}
				<main className="bg-[#0b0e22] border border-white/8 rounded-3xl overflow-hidden min-h-[680px] flex flex-col relative">

					{/* Empty state */}
					{!isGen && !isDone && (
						<div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-6 relative overflow-hidden">
							<div className="absolute inset-0 opacity-100 pointer-events-none">
								<NodeGraph />
							</div>
							<div className="relative z-10 flex flex-col items-center gap-4">
								<div className="relative">
									<div className="w-20 h-20 rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm flex items-center justify-center shadow-lg">
										<LayoutDashboard className="h-9 w-9 text-indigo-100/25" />
									</div>
									<div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/20">
										<Sparkles className="h-4 w-4 text-cyan-400" />
									</div>
								</div>
								<div>
									<h2 className="font-heading text-2xl font-semibold text-white mb-2">Live Preview Sandbox</h2>
									<p className="text-indigo-100/50 max-w-sm text-sm">Configure connectors, features, and UI components — click Generate to watch your architecture come to life.</p>
								</div>
								<div className="flex flex-wrap gap-2 justify-center mt-2">
									{["6 Connectors", "6 Features", "6 Components", "AI Chat", "Approval Flows"].map(tag => (
										<span key={tag} className="text-[10px] bg-white/4 border border-white/8 text-indigo-100/40 px-2.5 py-1 rounded-full">{tag}</span>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Loading state */}
					{isGen && (
						<div className="flex-1 flex flex-col items-center justify-center p-12 gap-8 relative overflow-hidden">
							{/* Matrix rain */}
							<div className="absolute inset-0 opacity-5 font-mono text-[9px] text-cyan-400 leading-5 overflow-hidden pointer-events-none select-none p-6">
								{Array.from({ length: 50 }).map((_, i) => <div key={i}>{`agent_${i.toString().padStart(2,"0")} → SPAWN(node=${Math.floor(Math.random()*9000)}) → RESOLVE(latency=${Math.floor(Math.random()*80)}ms)`}</div>)}
							</div>
							<div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
								<Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
								{/* Progress bar */}
								<div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
									<div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ width: `${progress}%` }} />
								</div>
								<div className="space-y-3 w-full">
									{LOADING_STEPS.map((s, i) => (
										<div key={i} className="flex items-center gap-3">
											<div className="w-6 h-6 shrink-0 flex items-center justify-center">
												{step > i ? <CheckCircle2 className="h-5 w-5 text-cyan-400" />
													: step === i ? <Loader2 className="h-4 w-4 text-cyan-300 animate-spin" />
													: <div className="w-2 h-2 rounded-full bg-white/10" />}
											</div>
											<span className={`text-sm transition-colors ${step > i ? "text-white" : step === i ? "text-cyan-300" : "text-indigo-100/25"}`}>{s}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Generated dashboard */}
					{isDone && (
						<div className="flex-1 flex flex-col relative">
							{isDeployed && <DeploySuccess onReset={handleReset} />}

							{/* Dashboard top bar */}
							<div className="flex items-center justify-between px-6 py-3 border-b border-white/8 bg-[#080b1f]/60 gap-3">
								<div className="flex items-center gap-2.5 min-w-0">
									<div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
										<LayoutDashboard className="h-3.5 w-3.5 text-indigo-300" />
									</div>
									<span className="font-heading text-sm font-semibold text-white truncate">Operations Command Center</span>
									<div className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-400 shrink-0">
										<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
										Live
									</div>
								</div>
								<div className="flex items-center gap-2 shrink-0">
									<button onClick={() => showToast("Refreshing data sources…")} className="p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-indigo-100/35 hover:text-white transition" title="Refresh"><RefreshCw className="h-3.5 w-3.5" /></button>
									<button onClick={() => showToast("Settings — available in production.")} className="p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-indigo-100/35 hover:text-white transition" title="Settings"><Settings2 className="h-3.5 w-3.5" /></button>
									<button onClick={() => { setIsDeployed(true); showToast("Deployment queued — awaiting 2 approvals."); }}
										className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/30 rounded-xl px-3 py-1.5 text-[11px] font-semibold text-emerald-300 transition">
										<Zap className="h-3 w-3" />Deploy
									</button>
									<button onClick={handleReset} className="text-[11px] bg-white/4 hover:bg-white/8 border border-white/8 rounded-xl px-3 py-1.5 text-indigo-100/50 hover:text-white transition">
										Reconfigure
									</button>
								</div>
							</div>

							{/* Tab bar */}
							<div className="flex gap-0.5 px-6 pt-3 border-b border-white/5">
								{([["overview","Overview",LayoutDashboard],["grid","Data Grid",Database],["ai","AI Assistant",Bot]] as [TabId, string, typeof LayoutDashboard][]).map(([id, label, Icon]) => (
									<button key={id} onClick={() => setTab(id)}
										className={`flex items-center gap-1.5 px-4 pb-3 text-xs font-medium border-b-2 transition-all ${tab === id ? "border-cyan-400 text-cyan-300" : "border-transparent text-indigo-100/35 hover:text-indigo-100/65"}`}>
										<Icon className="h-3 w-3" />{label}
									</button>
								))}
							</div>

							<div className="flex-1 overflow-y-auto p-5 space-y-4">

								{/* OVERVIEW */}
								{tab === "overview" && (
									<>
										{/* KPI cards with sparklines */}
										{(selComp.includes("kpi") || selFeat.includes("reporting")) && (
											<div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
												{KPI_ITEMS.map((kpi, i) => (
													<button key={i} onClick={() => showToast(`Drilling into ${kpi.label}…`)}
														className="text-left bg-[#0d1028] border border-white/5 rounded-2xl p-4 hover:border-cyan-500/20 hover:bg-[#0f1232] transition-all group relative overflow-hidden">
														<div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition">
															<Sparkline data={kpi.spark} color={kpi.up ? "#22d3ee" : "#f472b6"} />
														</div>
														<div className="flex items-center gap-1.5 mb-2">
															<kpi.icon className="h-3 w-3 text-indigo-100/25 group-hover:text-cyan-400 transition" />
															<p className="text-[10px] uppercase tracking-wider text-indigo-100/40">{kpi.label}</p>
														</div>
														<p className="text-2xl font-semibold text-white">
															<Counter target={kpi.base} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.decimals} />
														</p>
														<p className={`text-xs mt-1.5 flex items-center gap-1 ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
															{kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
															{kpi.trend} vs last week
														</p>
													</button>
												))}
											</div>
										)}

										{/* Bar chart */}
										{selComp.includes("charts") && (
											<div className="bg-[#0d1028] border border-white/5 rounded-2xl p-5">
												<div className="flex items-center justify-between mb-4">
													<h4 className="text-sm font-semibold text-white flex items-center gap-2">
														<BarChart3 className="h-4 w-4 text-cyan-400" />Pipeline Throughput (12mo)
													</h4>
													<div className="flex gap-1">
														{["1W","1M","3M","12M"].map(p => <button key={p} onClick={() => showToast(`Timeframe: ${p}`)} className="text-[10px] px-2 py-1 rounded-lg bg-white/4 hover:bg-white/8 text-indigo-100/45 hover:text-white transition">{p}</button>)}
													</div>
												</div>
												<div className="flex items-end gap-1 px-1 border-l border-b border-white/8">
													{CHART_DATA.map((h, i) => <AnimatedBar key={i} h={h} label={CHART_LABELS[i]} i={i} active={i >= 9} />)}
												</div>
											</div>
										)}

										{/* Second row */}
										<div className={`grid gap-4 ${selComp.includes("timeline") || selFeat.includes("approvals") ? "xl:grid-cols-2" : ""}`}>
											{/* Mini grid */}
											{selComp.includes("datagrid") && (
												<div className="bg-[#0d1028] border border-white/5 rounded-2xl overflow-hidden">
													<div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
														<span className="text-xs font-semibold text-white flex items-center gap-2"><Database className="h-3.5 w-3.5 text-cyan-400" />Recent Records</span>
														<button onClick={() => setTab("grid")} className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition">View all <ChevronRight className="h-3 w-3" /></button>
													</div>
													<table className="w-full text-xs">
														<tbody className="divide-y divide-white/4">
															{MOCK_ROWS.slice(0, 4).map(row => (
																<tr key={row.id} onClick={() => setActiveRow(row)} className="hover:bg-white/3 cursor-pointer transition group">
																	<td className="px-4 py-2.5 font-mono text-cyan-300 group-hover:text-cyan-200">{row.id}</td>
																	<td className="px-4 py-2.5 text-indigo-100/55">{row.source}</td>
																	<td className="px-4 py-2.5">
																		<span className={`px-1.5 py-0.5 rounded text-[10px] ${row.status === "Synced" ? "bg-emerald-500/10 text-emerald-400" : row.status === "Pending" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>{row.status}</span>
																	</td>
																	<td className="px-4 py-2.5 text-right"><ChevronRight className="h-3.5 w-3.5 text-indigo-100/10 group-hover:text-cyan-400 ml-auto transition" /></td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											)}

											{/* Right column */}
											<div className="space-y-4 flex flex-col">
												{/* Approval */}
												{selFeat.includes("approvals") && (
													<div className={`bg-[#0d1028] border rounded-2xl p-5 ${approval === "pending" ? "border-orange-500/20" : approval === "approved" ? "border-emerald-500/25" : "border-red-500/20"}`}>
														{approval === "pending" ? (
															<>
																<div className="flex items-center gap-2 mb-3">
																	<div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
																	<span className="text-xs font-semibold text-white">Pending Approval · 1 of 3</span>
																</div>
																<div className="font-mono text-xs bg-white/3 border border-white/5 rounded-xl p-3 mb-4">
																	<p className="text-indigo-100/40 mb-1">Production Sync Request</p>
																	<p className="text-cyan-300">MERGE JIR-1102 → PG-0943</p>
																	<p className="text-indigo-100/25 mt-1">Risk: Medium · Requester: Bob K.</p>
																</div>
																<div className="flex gap-2">
																	<button onClick={() => { setApproval("rejected"); showToast("Rejected & logged to audit trail."); }} className="flex-1 bg-red-500/8 hover:bg-red-500/15 border border-red-500/20 rounded-xl py-2 text-xs text-red-300 font-medium transition">Reject</button>
																	<button onClick={() => { setApproval("approved"); showToast("Approved — syncing to production."); }} className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/18 border border-emerald-500/25 rounded-xl py-2 text-xs text-emerald-300 font-medium transition">Approve</button>
																</div>
															</>
														) : (
															<div className="flex flex-col items-center py-4 gap-3">
																{approval === "approved" ? <CheckCircle2 className="h-9 w-9 text-emerald-400" /> : <X className="h-9 w-9 text-red-400 bg-red-500/10 rounded-full p-2" />}
																<p className="text-sm font-medium text-white">{approval === "approved" ? "Approved & synced to production" : "Request rejected"}</p>
																<button onClick={() => setApproval("pending")} className="text-[11px] text-indigo-100/35 hover:text-white transition underline underline-offset-2">Reset for demo</button>
															</div>
														)}
													</div>
												)}

												{/* Activity feed */}
												{selComp.includes("timeline") && (
													<div className="bg-[#0d1028] border border-white/5 rounded-2xl p-5 flex-1">
														<div className="flex items-center justify-between mb-4">
															<span className="text-xs font-semibold text-white">Activity Feed</span>
															<button onClick={() => showToast("Streaming live events…")} className="text-[10px] text-indigo-100/35 hover:text-cyan-400 transition flex items-center gap-1"><RefreshCw className="h-3 w-3" />Live</button>
														</div>
														<div className="space-y-2.5 relative before:absolute before:left-[11px] before:inset-y-0 before:w-px before:bg-white/6">
															{FEED_ITEMS.map((ev, i) => (
																<button key={i} onClick={() => showToast(ev.text)} className="flex gap-3 relative z-10 group w-full text-left hover:bg-white/3 rounded-xl px-2 py-1.5 -mx-2 transition-all">
																	<div className={`w-6 h-6 rounded-full ${ev.bg} border border-white/10 flex items-center justify-center shrink-0 ${ev.col} group-hover:scale-110 transition-transform`}>
																		<ev.icon className="h-3 w-3" />
																	</div>
																	<div className="min-w-0 flex-1">
																		<p className="text-xs text-indigo-100/75 truncate">{ev.text}</p>
																		<p className="text-[10px] text-indigo-100/30">{ev.user} · {ev.t} AM</p>
																	</div>
																	<ChevronRight className="h-3.5 w-3.5 text-indigo-100/8 group-hover:text-cyan-400 shrink-0 mt-0.5 transition" />
																</button>
															))}
														</div>
													</div>
												)}
											</div>
										</div>
									</>
								)}

								{/* GRID TAB */}
								{tab === "grid" && (
									<div className="space-y-3">
										<div className="flex flex-col sm:flex-row gap-2">
											<div className="flex-1 flex items-center gap-2 bg-[#0d1028] border border-white/8 rounded-xl px-3 py-2.5">
												<Search className="h-4 w-4 text-indigo-100/25 shrink-0" />
												<input type="text" placeholder="Search records…" value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-indigo-100/25 outline-none flex-1" />
												{search && <button onClick={() => setSearch("")}><X className="h-3.5 w-3.5 text-indigo-100/35 hover:text-white transition" /></button>}
											</div>
											<button onClick={() => showToast("Filters — available in production.")} className="flex items-center gap-1.5 bg-[#0d1028] border border-white/8 rounded-xl px-3 py-2 text-xs text-indigo-100/45 hover:text-white hover:border-white/15 transition"><Filter className="h-3.5 w-3.5" />Filters</button>
											<button onClick={() => showToast("Exporting CSV…")} className="flex items-center gap-1.5 bg-[#0d1028] border border-white/8 rounded-xl px-3 py-2 text-xs text-indigo-100/45 hover:text-white hover:border-white/15 transition"><ChevronDown className="h-3.5 w-3.5" />Export</button>
										</div>
										<div className="bg-[#0d1028] border border-white/5 rounded-2xl overflow-hidden">
											<table className="w-full text-xs">
												<thead>
													<tr className="border-b border-white/5 bg-white/2">
														{["id","source","owner","status","priority","value","updated"].map(col => (
															<th key={col} className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-indigo-100/35 font-semibold cursor-pointer hover:text-white transition select-none" onClick={() => sort(col)}>
																{col} {sortCol === col ? (sortAsc ? "↑" : "↓") : ""}
															</th>
														))}
													</tr>
												</thead>
												<tbody className="divide-y divide-white/4">
													{filteredRows.map(row => (
														<tr key={row.id} onClick={() => setActiveRow(row)} className="hover:bg-white/3 cursor-pointer transition group">
															<td className="px-4 py-3 font-mono text-cyan-300 group-hover:text-cyan-200">{row.id}</td>
															<td className="px-4 py-3 text-indigo-100/60">{row.source}</td>
															<td className="px-4 py-3 text-indigo-100/60">{row.owner}</td>
															<td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${row.status === "Synced" ? "bg-emerald-500/10 text-emerald-400" : row.status === "Pending" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>{row.status}</span></td>
															<td className="px-4 py-3"><span className={`text-[10px] font-semibold ${row.priority === "Critical" ? "text-red-400" : row.priority === "High" ? "text-orange-400" : row.priority === "Medium" ? "text-yellow-400" : "text-indigo-100/35"}`}>{row.priority}</span></td>
															<td className="px-4 py-3 text-indigo-100/55">{row.value}</td>
															<td className="px-4 py-3 text-indigo-100/30">{row.updated}</td>
														</tr>
													))}
													{filteredRows.length === 0 && <tr><td colSpan={7} className="text-center py-10 text-indigo-100/25 text-xs">No records match your search.</td></tr>}
												</tbody>
											</table>
											<div className="border-t border-white/5 px-4 py-2.5 flex items-center justify-between">
												<span className="text-[10px] text-indigo-100/25">{filteredRows.length} records</span>
												<button onClick={() => showToast("Pagination in production.")} className="text-[10px] text-indigo-100/25 hover:text-white flex items-center gap-1 transition">Next <ChevronRight className="h-3 w-3" /></button>
											</div>
										</div>
									</div>
								)}

								{/* AI CHAT TAB */}
								{tab === "ai" && (
									<div className="flex flex-col" style={{ height: 480 }}>
										<div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
											{chatMsgs.map((m, i) => (
												<div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
													{m.role === "ai"
														? <AiMsg text={m.text} />
														: <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm bg-indigo-500/15 border border-indigo-500/25 text-white">{m.text}</div>}
												</div>
											))}
											{aiTyping && (
												<div className="flex gap-2">
													<div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
														<Sparkles className="h-3 w-3 text-cyan-400" />
													</div>
													<div className="bg-[#0d1028] border border-white/8 rounded-2xl px-4 py-3">
														<div className="flex gap-1 items-center h-4">
															{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
														</div>
													</div>
												</div>
											)}
											<div ref={chatEndRef} />
										</div>
										<div className="flex gap-2">
											<input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Ask me to sync, alert, report, or explain…" className="flex-1 bg-[#0d1028] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-indigo-100/25 outline-none focus:border-cyan-500/50 transition" />
											<button onClick={sendChat} className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white px-4 rounded-2xl transition flex items-center gap-1.5">
												<ArrowRight className="h-4 w-4" />
											</button>
										</div>
										<p className="text-[10px] text-indigo-100/20 mt-2 text-center">Try: "explain the failure" · "sync all" · "deploy to staging" · "create an alert"</p>
									</div>
								)}
							</div>
						</div>
					)}
				</main>
			</div>

			{activeRow && <RowModal row={activeRow} onClose={() => setActiveRow(null)} toast={showToast} />}
			{toast && <Toast msg={toast} onClose={() => setToast(null)} />}
		</div>
	);
}
