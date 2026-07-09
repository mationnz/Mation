import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Activity,
	ArrowRight,
	ArrowUpRight,
	Bot,
	CircleGauge,
	Cpu,
	Database,
	GitBranch,
	LockKeyhole,
	Network,
	ShieldCheck,
	Sparkles,
	Workflow,
} from "lucide-react";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{
				title: "Mation - AI operating systems for adaptive businesses",
			},
			{
				name: "description",
				content:
					"Mation designs autonomous workflows, agentic systems, and decision intelligence that help ambitious teams scale without operational drag.",
			},
			{
				property: "og:title",
				content: "Mation - Build the operating system your future business runs on",
			},
			{
				property: "og:description",
				content:
					"AI-native operating models, governed agent workflows, and enterprise automation built around how your organisation really works.",
			},
			{
				property: "og:type",
				content: "website",
			},
		],
	}),
});

const metrics = [
	{ label: "Transformation programs launched", value: "120+" },
	{ label: "Average automation coverage uplift", value: "67%" },
	{ label: "Data sources unified per deployment", value: "18" },
	{ label: "Median payback period", value: "6.4 months" },
];

const capabilities = [
	{
		icon: Workflow,
		title: "Workflow Orchestration",
		desc: "Cross-tool automations that connect CRM, ERP, support, finance, and field systems into a single adaptive control layer.",
	},
	{
		icon: Cpu,
		title: "Decision Intelligence",
		desc: "AI reasoning pipelines that evaluate context, confidence, and policy before taking action.",
	},
	{
		icon: Bot,
		title: "Autonomous Agent Teams",
		desc: "Role-specific agents that collaborate across execution, QA, reporting, and escalation in real time.",
	},
	{
		icon: Database,
		title: "Data Context Fabric",
		desc: "A structured semantic layer that gives every model and automation dependable business context.",
	},
];

const process = [
	{
		n: "01",
		title: "Discover",
		desc: "Map process friction, data maturity, and high-leverage automation opportunities across teams.",
	},
	{
		n: "02",
		title: "Architect",
		desc: "Design your AI operating blueprint with trust controls, governance, and measurable milestones.",
	},
	{
		n: "03",
		title: "Activate",
		desc: "Launch production agents and workflows with parallel change enablement for your frontline teams.",
	},
	{
		n: "04",
		title: "Compound",
		desc: "Continuously optimise from live telemetry to compound productivity, quality, and speed.",
	},
];

const modelBenefits = [
	"Reduce repetitive execution load by up to 42%",
	"Lift team throughput without adding headcount",
	"Create consistent customer and internal response quality",
];

const trustControls = [
	"Model and prompt version controls",
	"Policy-aware action restrictions",
	"Human approval gates for sensitive operations",
	"Comprehensive execution and reasoning logs",
];

function HomePage() {
	return (
		<>
			<section className="relative overflow-hidden border-b border-border/70">
				<div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(62,27,147,0.42),rgba(16,36,56,0.78)_52%,rgba(6,10,25,0.94))]" />
				<div className="absolute inset-0 bg-[linear-gradient(rgba(145,197,240,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(145,197,240,0.045)_1px,transparent_1px)] bg-[size:84px_84px]" />

				<div className="site-wide relative grid min-h-[720px] items-center gap-12 pb-20 pt-24 lg:grid-cols-[1fr_0.82fr] lg:pt-20">
					<div className="max-w-3xl">
						<p className="kicker reveal-up">Business AI transformation + automation</p>
						<h1 className="reveal-up delay-1 mt-5 max-w-4xl font-heading text-5xl font-semibold leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
							Build the operating{" "}
							<span className="gradient-ink">system</span> your future business
							runs on.
						</h1>
						<p className="reveal-up delay-2 mt-7 max-w-2xl text-base leading-8 text-mute sm:text-lg">
							Mation transforms fragmented businesses into adaptive AI
							enterprises. We design autonomous workflows, agentic systems, and
							decision intelligence that accelerate growth without increasing
							operational drag.
						</p>

						<div className="reveal-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
							<Link to="/contact" className="button-primary">
								Book a strategy sprint
								<ArrowRight className="h-4 w-4" />
							</Link>
							<Link to="/what-we-build" className="button-secondary">
								Explore outcomes
							</Link>
						</div>

						<div className="reveal-up delay-4 mt-6 flex flex-wrap gap-2">
							{["AI strategy", "Agentic workflows", "Enterprise automation"].map(
								(item) => (
									<span key={item} className="tag">
										{item}
									</span>
								),
							)}
						</div>
					</div>

					<HeroTelemetry />
				</div>
			</section>

			<section className="site-wide section-tight">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{metrics.map((metric) => (
						<article key={metric.label} className="panel px-5 py-6">
							<p className="max-w-40 text-[0.72rem] font-semibold uppercase leading-4 text-faint">
								{metric.label}
							</p>
							<p className="mt-4 font-heading text-3xl font-semibold text-ink">
								{metric.value}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="site-wide section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
				<div>
					<p className="kicker">Transformation modes</p>
					<h2 className="mt-4 max-w-2xl font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
						Pick the operating model your growth stage needs now.
					</h2>
					<p className="mt-5 max-w-xl text-base leading-7 text-mute">
						Most companies need a phased pathway, not a single implementation.
						Mation structures AI transformation as modular operating modes that
						stack into a long-term enterprise advantage.
					</p>
				</div>

				<article className="panel p-6 sm:p-7">
					<div className="flex flex-wrap gap-2">
						<span className="tag !border-violet/70 !bg-violet-tint !text-ink">
							Copilot transformation
						</span>
						<span className="tag">Autopilot operations</span>
						<span className="tag">Agentic enterprise layer</span>
					</div>
					<h3 className="mt-8 font-heading text-2xl font-semibold text-ink">
						Copilot Transformation
					</h3>
					<p className="mt-3 max-w-2xl text-sm leading-7 text-mute">
						Augment every team with contextual AI assistants that handle routine
						execution and surface strategic recommendations.
					</p>
					<ul className="mt-6 space-y-3">
						{modelBenefits.map((benefit) => (
							<li
								key={benefit}
								className="flex items-start gap-3 text-sm leading-6 text-ink-soft"
							>
								<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
								<span>{benefit}</span>
							</li>
						))}
					</ul>
					<div className="mt-7 rounded-lg border border-border bg-surface-2 px-4 py-3 text-[0.72rem] font-semibold uppercase text-faint">
						Typical delivery cadence: 12-week enablement
					</div>
				</article>
			</section>

			<section className="site-wide section-shell pt-8">
				<div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="kicker">Core capabilities</p>
						<h2 className="mt-4 font-heading text-4xl font-semibold text-ink sm:text-5xl">
							Designed for enterprise complexity.
						</h2>
					</div>
					<Link to="/what-we-build" className="button-ghost">
						See every solution
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					{capabilities.map((capability) => (
						<article key={capability.title} className="panel panel-hover p-6">
							<div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-2 text-info">
								<capability.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-2xl font-semibold text-ink">
								{capability.title}
							</h3>
							<p className="mt-3 text-sm leading-7 text-mute">
								{capability.desc}
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="site-wide section-shell pt-8">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{process.map((step) => (
						<article key={step.title} className="panel p-6">
							<span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-xs font-semibold text-faint">
								{step.n}
							</span>
							<h3 className="mt-7 font-heading text-xl font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-3 text-sm leading-7 text-mute">{step.desc}</p>
						</article>
					))}
				</div>
			</section>

			<section className="site-wide section-shell pt-8">
				<div className="panel grid gap-8 overflow-hidden p-7 sm:p-9 lg:grid-cols-[0.86fr_1.14fr] lg:p-12">
					<div>
						<p className="kicker">Deployment confidence</p>
						<h2 className="mt-4 max-w-xl font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
							Built for enterprise trust from day zero.
						</h2>
						<p className="mt-5 max-w-xl text-base leading-7 text-mute">
							Mation platform deployments include model governance, role-aware
							controls, and traceable decision pathways so your teams can scale
							AI without compromising security or compliance.
						</p>
					</div>
					<div className="grid content-center gap-3">
						{trustControls.map((control) => (
							<div
								key={control}
								className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm text-ink-soft"
							>
								<ShieldCheck className="h-4 w-4 text-info" />
								<span>{control}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="site-wide section-shell pt-8">
				<div className="relative overflow-hidden rounded-[16px] border border-border bg-[linear-gradient(130deg,var(--surface),rgba(20,39,64,0.92))] p-7 shadow-[var(--shadow-lg)] sm:p-10 lg:p-12">
					<div className="absolute right-8 top-8 hidden h-28 w-28 rounded-full border border-info/20 lg:block" />
					<p className="kicker">Next move</p>
					<h2 className="mt-4 max-w-2xl font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
						Build your AI-native operating model with confidence.
					</h2>
					<p className="mt-5 max-w-2xl text-base leading-7 text-mute">
						Engage Mation to design and deploy an automation architecture that
						compounds operational edge every quarter.
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link to="/contact" className="button-primary">
							Book a transformation sprint
							<ArrowUpRight className="h-4 w-4" />
						</Link>
						<Link to="/approach" className="button-secondary">
							See platform capabilities
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}

function HeroTelemetry() {
	return (
		<article className="panel relative mx-auto w-full max-w-[430px] overflow-hidden p-5 shadow-[var(--shadow-lg)]">
			<div className="flex items-center justify-between rounded-lg border border-border bg-canvas-2/80 px-4 py-3 text-sm text-ink-soft">
				<span className="flex items-center gap-2">
					<span className="live-dot" />
					Live transformation telemetry
				</span>
				<CircleGauge className="h-4 w-4 text-info" />
			</div>

			<div className="relative mx-auto grid h-64 w-64 place-items-center">
				<div className="absolute h-56 w-56 rounded-full border border-violet/20" />
				<div className="absolute h-44 w-44 rounded-full border border-violet/25" />
				<div className="absolute h-32 w-32 rounded-full border border-info/20" />
				<div className="absolute h-20 w-20 rounded-full bg-canvas shadow-[0_0_60px_rgba(97,66,205,0.38)]" />
				<Sparkles className="relative h-9 w-9 text-info" />
				<span className="absolute left-12 top-12 h-3 w-3 rounded-full bg-[#8db8ff] shadow-[0_0_18px_rgba(141,184,255,0.95)]" />
				<span className="absolute bottom-16 right-10 h-3 w-3 rounded-full bg-info shadow-[0_0_18px_rgba(87,223,244,0.95)]" />
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				<div className="rounded-lg border border-border bg-surface-2 p-4">
					<p className="text-[0.72rem] font-semibold uppercase text-faint">
						Process velocity
					</p>
					<p className="mt-3 font-heading text-3xl font-semibold text-ink">
						3.6x
					</p>
					<p className="mt-1 text-xs text-mute">Faster execution cycle</p>
				</div>
				<div className="rounded-lg border border-border bg-surface-2 p-4">
					<p className="text-[0.72rem] font-semibold uppercase text-faint">
						Margin impact
					</p>
					<p className="mt-3 font-heading text-3xl font-semibold text-ink">
						+18%
					</p>
					<p className="mt-1 text-xs text-mute">Average within first year</p>
				</div>
			</div>

			<div className="mt-5 grid grid-cols-4 gap-2">
				{[Network, GitBranch, LockKeyhole, Activity].map((Icon, index) => (
					<div
						key={String(index)}
						className="grid aspect-square place-items-center rounded-lg border border-border bg-surface-2 text-info/80"
					>
						<Icon className="h-4 w-4" />
					</div>
				))}
			</div>
		</article>
	);
}
