import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	Cloud,
	Compass,
	FlaskConical,
	KeyRound,
	Layers,
	LineChart,
	Map as MapIcon,
	Repeat,
	Rocket,
	Search,
} from "lucide-react";

import CTASection from "../components/CTASection";
import GuaranteeBand from "../components/GuaranteeBand";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import ProcessFlow from "../components/ProcessFlow";
import VelocityTimeline from "../components/VelocityTimeline";
import { offer } from "../content/site";

export const Route = createFileRoute("/plans")({
	component: PlansPage,
	head: () => ({
		meta: [
			{ title: "Plans — Flexible, pilotable software from $1,000 | Mation" },
			{
				name: "description",
				content:
					"Start small, get results, and scale across your business. Custom, pilotable software from $1,000 to $100,000+ — on a SaaS, rent-to-buy, or purchase model, backed by a 60-day double-value guarantee.",
			},
			{
				property: "og:title",
				content: "Plans — Flexible, pilotable software from $1,000",
			},
			{
				property: "og:description",
				content:
					"Start small, get results, scale across your business. SaaS, rent-to-buy, or own it outright — with a 60-day double-value guarantee.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const tiers = [
	{
		icon: FlaskConical,
		name: "Pilot",
		price: "From $1,000",
		tagline: "Prove it on one workflow",
		featured: true,
		points: [
			"A focused, pilotable build on a single high-friction workflow",
			"Live in days to weeks — not months",
			"Real, measurable results before you commit further",
		],
	},
	{
		icon: Layers,
		name: "Build",
		price: "$10k – $50k",
		tagline: "A production system for a core of the business",
		featured: false,
		points: [
			"A bespoke application or automation your team runs daily",
			"Integrated with the tools you already use",
			"Shipped in increments you can see working early",
		],
	},
	{
		icon: Rocket,
		name: "Operating system",
		price: "$100,000+",
		tagline: "Unify the whole business",
		featured: false,
		points: [
			"The unified system across operations, data, and workflows",
			"Built and evolved over time as you grow",
			"One source of truth the whole company runs on",
		],
	},
];

const modelIcons = [Cloud, Repeat, KeyRound];

const meetingSteps = [
	{
		n: "01",
		title: "Walk your systems",
		desc: "We sit with your team — in person or via Teams — and map how the business runs today.",
		icon: Compass,
	},
	{
		n: "02",
		title: "Identify opportunities",
		desc: "We pinpoint where bespoke software removes friction, cost, and manual work.",
		icon: Search,
	},
	{
		n: "03",
		title: "Capture the value",
		desc: "We quantify the upside, so the business case is clear before anyone commits.",
		icon: LineChart,
	},
	{
		n: "04",
		title: "Propose a path",
		desc: "You leave with a clear, no-obligation plan for what to build first.",
		icon: MapIcon,
	},
];

function PlansPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="glow section-shell pt-10 sm:pt-14">
				<div className="site-wide">
					<p className="kicker reveal-up mb-10">
						Plans — start small, scale as it proves out
					</p>
					<div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
						<div className="max-w-2xl space-y-7">
							<span className="pill reveal-up">Flexible plans</span>
							<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4rem]">
								Flexible plans to fit{" "}
								<span className="text-violet-ink">your needs.</span>
							</h1>
							<p className="reveal-up delay-2 text-lg leading-relaxed text-mute sm:text-xl">
								Start small, get results, then scale it across your business —
								with custom, pilotable software engineered around how you
								operate.
							</p>
							<div className="reveal-up delay-3 flex flex-col gap-3 sm:flex-row">
								<MagneticLink to="/contact" className="button-primary">
									Book a free exploration meeting
									<ArrowRight className="h-4 w-4" />
								</MagneticLink>
								<MagneticLink to="/approach" className="button-secondary">
									See how we work
								</MagneticLink>
							</div>
						</div>
						<div className="reveal-up delay-2">
							<div className="panel panel-hover ticked relative overflow-hidden rounded-[22px] p-8">
								<span className="card-node is-warm" aria-hidden="true" />
								<p className="kicker">The range of engagements</p>
								<div className="mt-4 font-heading text-[clamp(2.6rem,7vw,4.5rem)] font-semibold leading-none tracking-[-0.03em] text-violet-ink">
									{offer.priceLow}
								</div>
								<p className="mt-2 text-sm text-mute">
									up to {offer.priceHigh}
								</p>
								<hr className="hairline my-6" />
								<p className="text-sm leading-relaxed text-ink-soft">
									Pilotable and scoped to you. Begin with a small, high-value
									pilot — then scale only once it’s proven its worth.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Velocity */}
			<section className="site-wide section-shell pt-4">
				<div className="reveal-scroll mb-12">
					<p className="section-index mb-4">
						<b>01</b> &nbsp;/&nbsp; Velocity
					</p>
					<h2 className="max-w-3xl font-heading text-3xl font-semibold text-ink sm:text-[2.5rem] sm:leading-[1.08]">
						Prototype in days. Launch in weeks. Results in months.{" "}
						<span className="text-violet-ink">Profit for years.</span>
					</h2>
				</div>
				<div className="reveal-scroll">
					<VelocityTimeline />
				</div>
			</section>

			{/* Tiers */}
			<section className="site-wide section-shell pt-4">
				<div className="reveal-scroll mb-10 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>02</b> &nbsp;/&nbsp; Where to start
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							Start small. Scale as it proves out.
						</h2>
					</div>
					<p className="kicker hidden max-w-xs md:flex">
						Every engagement scoped to you
					</p>
				</div>
				<div className="reveal-stagger grid gap-5 lg:grid-cols-3">
					{tiers.map((tier) => (
						<article
							key={tier.name}
							className={`panel panel-hover relative flex flex-col p-7 ${
								tier.featured ? "ticked bg-surface-violet" : ""
							}`}
						>
							{tier.featured ? (
								<p className="kicker absolute right-6 top-6">Start here</p>
							) : (
								<span className="card-node" aria-hidden="true" />
							)}
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-violet">
								<tier.icon className="h-5 w-5" />
							</div>
							<h3 className="mt-5 font-heading text-xl font-semibold text-ink">
								{tier.name}
							</h3>
							<div className="mt-3 font-heading text-[2rem] font-semibold leading-none tracking-[-0.03em] text-violet-ink">
								{tier.price}
							</div>
							<p className="mt-2 text-sm text-mute">{tier.tagline}</p>
							<ul className="mt-6 space-y-3 border-t border-border pt-6">
								{tier.points.map((point) => (
									<li
										key={point}
										className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"
									>
										<Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
										<span>{point}</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			{/* Commercial models */}
			<section className="site-wide section-shell pt-4">
				<div className="reveal-scroll mb-10">
					<p className="section-index mb-4">
						<b>03</b> &nbsp;/&nbsp; Own it your way
					</p>
					<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
						De-risk the journey. Pay the way that suits you.
					</h2>
				</div>
				<div className="reveal-stagger grid gap-5 md:grid-cols-3">
					{offer.models.map((model, i) => {
						const Icon = modelIcons[i];
						return (
							<article
								key={model.name}
								className="panel panel-hover relative p-7"
							>
								<span className="card-node" aria-hidden="true" />
								<div className="flex items-center justify-between">
									<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-violet">
										<Icon className="h-5 w-5" />
									</div>
									<span className="tag">{model.tag}</span>
								</div>
								<h3 className="mt-5 font-heading text-xl font-semibold text-ink">
									{model.name}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-mute">
									{model.desc}
								</p>
							</article>
						);
					})}
				</div>
			</section>

			{/* Guarantee */}
			<section className="site-wide section-shell pt-4">
				<p className="section-index reveal-scroll mb-6">
					<b>04</b> &nbsp;/&nbsp; The guarantee
				</p>
				<div className="reveal-scroll">
					<GuaranteeBand />
				</div>
			</section>

			{/* Free exploration meeting */}
			<section className="site-wide section-shell pt-4">
				<div className="reveal-scroll mb-12 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>05</b> &nbsp;/&nbsp; Start here
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							It begins with a free exploration meeting.
						</h2>
						<p className="mt-4 max-w-2xl text-mute">{offer.meeting}</p>
					</div>
					<p className="kicker hidden max-w-xs md:flex">
						In-person or Teams · no obligation
					</p>
				</div>
				<div className="reveal-scroll">
					<ProcessFlow steps={meetingSteps} />
				</div>
			</section>

			<CTASection
				title="Let’s find where bespoke software pays for itself."
				description="Book a free exploration meeting. We’ll walk your systems, capture the value, and propose a clear path forward — with no obligation."
			/>
		</>
	);
}
