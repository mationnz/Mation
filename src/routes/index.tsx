import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Bot,
	CheckCircle2,
	Database,
	FileText,
	Layout,
	Lock,
	Network,
	ShieldCheck,
	Sparkles,
	Workflow,
	Zap,
} from "lucide-react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import PromptStudio from "../components/PromptStudio";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{ title: "Mation — From chat to action across your business" },
			{
				name: "description",
				content:
					"Mation is a generative AI operating system that connects tools, data, and workflows into one governed interface. Chat becomes dashboards, artifacts, and actions.",
			},
		],
	}),
});

const mationModelCards = [
	{
		title: "Agent Harness",
		description: "Orchestrates retrieval, workflows, and memory at scale.",
		icon: Bot,
	},
	{
		title: "User Harness",
		description: "Chat + canvas UI that renders trusted components.",
		icon: Layout,
	},
	{
		title: "Governed Outcomes",
		description: "Permissions, approvals, audit trails, observability.",
		icon: ShieldCheck,
	},
];

const howItWorksSteps = [
	{
		title: "Connect",
		description: "Connect your systems (internal + external).",
		icon: Network,
	},
	{
		title: "Orchestrate",
		description: "Orchestrate multi-step work with specialized agents.",
		icon: Workflow,
	},
	{
		title: "Generate",
		description: "Generate the right interface and outputs (then act safely).",
		icon: Sparkles,
	},
];

const outputsGrid = [
	"Clear summaries supported by facts",
	"Ready-to-go compliance packs",
	"Risk lists and action items",
	"Meeting minutes and custom reports",
	"Easy field reporting (diaries, incidents)",
	"Data charts that update as you work",
];

const solutionsTiles = [
	"Compliance & quality oversight",
	"Field and workforce documentation",
	"Project & operations visibility",
	"Executive oversight",
	"IT & security governance",
];

const securityBullets = [
	"Role-based access control (least privilege)",
	"Approval gates for sensitive actions",
	"Tool gateway for enforcement + logging",
	"Evidence trails on outputs",
	"Observability across cost, latency, reliability",
];

function HomePage() {
	return (
		<>
			<InteractiveAura />

			{/* 1) Hero */}
			<section className="section-shell">
				<div className="site-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<div className="space-y-7">
						<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
							Turn conversations into measurable outcomes.
						</h1>
						<p className="reveal-up delay-1 max-w-2xl text-lg leading-relaxed text-indigo-100/78 sm:text-xl">
							Mation eliminates manual admin and disconnected tools. Work faster, reduce errors, and scale your operations without scaling your headcount.
						</p>
						<div className="reveal-up delay-2 flex flex-col gap-4 sm:flex-row">
							<MagneticLink to="/contact" className="button-primary">
								Book a demo
							</MagneticLink>
							<MagneticLink to="/demo" className="button-secondary">
								See the interface
							</MagneticLink>
						</div>
						<div className="flex flex-wrap items-center gap-3 text-sm text-indigo-100/82">
							<span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-200" /> No prompt engineering.</span>
							<span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-200" /> No app sprawl.</span>
							<span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-200" /> Audit trails included.</span>
						</div>
					</div>

					<div className="reveal-up delay-1" id="interface">
						<PromptStudio />
						<p className="mt-4 text-center text-sm text-indigo-100/60 font-medium">
							<Lock className="inline-block h-4 w-4 mr-1 text-cyan-200/70" /> Built for enterprise deployment: permissions, approvals, audit trails.
						</p>
					</div>
				</div>
			</section>

			{/* 2) Problem section */}
			<section className="site-shell section-shell pt-0">
				<div className="panel-glass rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
					<h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
						Your team is drowning in admin. Work is stalling.
					</h2>
					<p className="mt-4 text-lg text-indigo-100/78 max-w-2xl mx-auto">
						You have tools for everything, yet your team spends hours manually compiling reports, chasing updates, and searching for data. The result? Slower decisions and lost revenue.
					</p>
					<div className="mt-8 grid gap-4 sm:grid-cols-2 text-left">
						{[
							"Insights trapped across tools",
							"Repetitive documentation and reporting",
							"Handoffs cause delays + mistakes",
							"AI pilots don’t stick because they don’t integrate into workflows"
						].map((bullet, i) => (
							<div key={i} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/10">
								<Zap className="h-5 w-5 text-warning shrink-0 mt-0.5" />
								<span className="text-indigo-100/90 text-sm sm:text-base">{bullet}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 3) The Mation model */}
			<section className="section-shell pt-0">
				<div className="site-shell">
					<div className="mb-10 text-center space-y-4 max-w-3xl mx-auto">
						<p className="kicker">The Mation Model</p>
						<h2 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
							Automate the heavy lifting. Focus on the work that matters.
						</h2>
						<p className="text-lg text-indigo-100/78">
							Mation handles the repetitive tasks behind the scenes—gathering data, generating reports, and triggering actions—so your team can focus on high-value work.
						</p>
					</div>
					<div className="grid gap-6 md:grid-cols-3">
						{mationModelCards.map((card, i) => (
							<article key={i} className="panel-glass rounded-2xl p-7 text-center">
								<div className="mx-auto mb-5 inline-flex rounded-2xl border border-cyan-200/28 bg-cyan-200/10 p-4 text-cyan-100">
									<card.icon className="h-7 w-7" />
								</div>
								<h3 className="font-heading text-2xl font-semibold text-white">{card.title}</h3>
								<p className="mt-3 text-indigo-100/76">{card.description}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* 4) How it works */}
			<section className="section-shell pt-0">
				<div className="site-shell">
					<div className="mb-10 text-center">
						<h2 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
							Connect Your Systems → Automate the Process → Accelerate Results
						</h2>
					</div>
					<div className="grid gap-6 md:grid-cols-3 relative">
						<div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -translate-y-1/2 z-0 hidden md:block" />
						{howItWorksSteps.map((step, i) => (
							<article key={i} className="bg-[#0b0e24] border border-white/10 rounded-2xl p-6 relative z-10 text-center">
								<div className="mx-auto w-12 h-12 rounded-full border border-cyan-400/30 bg-[#161c44] flex items-center justify-center mb-4 text-cyan-200 relative">
									<step.icon className="h-5 w-5" />
									<div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-[0.65rem] font-bold text-cyan-100 border border-cyan-500/50">{i + 1}</div>
								</div>
								<h3 className="font-heading text-xl font-semibold text-white">{step.title}</h3>
								<p className="mt-2 text-sm text-indigo-100/76">{step.description}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* 5) What it produces */}
			<section className="section-shell pt-0">
				<div className="site-shell grid lg:grid-cols-[0.4fr_0.6fr] gap-12 items-center">
					<div>
						<p className="kicker">Tangible Outputs</p>
						<h2 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">
							Not just answers. Real work outputs.
						</h2>
						<p className="mt-5 text-lg text-indigo-100/78">
							If it’s repeatable, it should be clickable. If it’s high-stakes, it should be auditable.
						</p>
					</div>
					<div className="grid sm:grid-cols-2 gap-4">
						{outputsGrid.map((output, i) => (
							<div key={i} className="panel-glass rounded-xl p-5 border border-white/5 flex items-start gap-3">
								<FileText className="h-5 w-5 text-cyan-200 shrink-0" />
								<span className="text-sm font-medium text-indigo-100/90 leading-tight">{output}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 6) Solutions & 7) Security Preview grid */}
			<section className="section-shell pt-0">
				<div className="site-shell grid md:grid-cols-2 gap-8">
					<article className="panel-glass rounded-3xl p-8 flex flex-col items-start">
						<h3 className="font-heading text-3xl font-semibold text-white">Built for operational complexity</h3>
						<div className="mt-6 w-full space-y-3 flex-1 mb-8">
							{solutionsTiles.map((tile, i) => (
								<div key={i} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-indigo-100/90 flex items-center gap-3">
									<Database className="h-4 w-4 text-cyan-200 shrink-0" /> {tile}
								</div>
							))}
						</div>
						<Link to="/solutions" className="button-secondary">
							Explore solutions <ArrowRight className="h-4 w-4 ml-2" />
						</Link>
					</article>

					<article className="panel-glass rounded-3xl p-8 flex flex-col items-start bg-[radial-gradient(circle_at_top_right,rgba(97,66,205,0.15),transparent_60%)]">
						<h3 className="font-heading text-3xl font-semibold text-white">Enterprise-grade control, not AI roulette.</h3>
						<ul className="mt-6 flex-1 mb-8 space-y-4 text-indigo-100/80">
							{securityBullets.map((bullet, i) => (
								<li key={i} className="flex gap-3">
									<ShieldCheck className="h-5 w-5 text-cyan-200 shrink-0" />
									<span>{bullet}</span>
								</li>
							))}
						</ul>
						<Link to="/security" className="button-secondary">
							View security <ArrowRight className="h-4 w-4 ml-2" />
						</Link>
					</article>
				</div>
			</section>

			{/* 8) Closing CTA */}
			<CTASection
				title="Ready to make AI operational?"
				description="Stop adding tools and hoping people stitch them together. Mation gives your organization one interface for truth and action."
				primaryLabel="Book a demo"
				secondaryLabel="Talk to an architect"
			/>
		</>
	);
}
