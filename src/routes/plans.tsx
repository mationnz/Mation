import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Check,
	Cloud,
	FlaskConical,
	KeyRound,
	Layers,
	type LucideIcon,
	Repeat,
	Rocket,
	ShieldCheck,
} from "lucide-react";

import MagneticLink from "../components/MagneticLink";
import { mationMeta, offer } from "../content/site";

export const Route = createFileRoute("/plans")({
	component: PlansPage,
	head: () => ({
		meta: [
			{ title: "Plans — Flexible, pilotable software from $1,000 | Mation" },
			{
				name: "description",
				content:
					"Start small, get results, and scale across your business. Custom, pilotable software from $1,000 to $100,000+ — SaaS, rent-to-buy, or purchase, backed by a 60-day double-value guarantee.",
			},
			{
				property: "og:title",
				content: "Plans — Flexible, pilotable software from $1,000",
			},
			{
				property: "og:description",
				content:
					"Start small, get results, scale. SaaS, rent-to-buy, or own it outright — with a 60-day double-value guarantee.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

type Tier = {
	icon: LucideIcon;
	name: string;
	price: string;
	tagline: string;
	featured: boolean;
	points: string[];
};

const tiers: Tier[] = [
	{
		icon: FlaskConical,
		name: "Pilot",
		price: "From $1,000",
		tagline: "Prove it on one workflow",
		featured: true,
		points: [
			"One high-friction workflow",
			"Live in days to weeks",
			"Real results before you commit",
		],
	},
	{
		icon: Layers,
		name: "Build",
		price: "$10k – $50k",
		tagline: "A system for a core of the business",
		featured: false,
		points: [
			"A bespoke app your team runs daily",
			"Integrated with your existing tools",
			"Shipped in increments you see working",
		],
	},
	{
		icon: Rocket,
		name: "Operating system",
		price: "$100k+",
		tagline: "Unify the whole business",
		featured: false,
		points: [
			"One system across operations & data",
			"Built and evolved as you grow",
			"One source of truth for everyone",
		],
	},
];

const modelIcons = [Cloud, Repeat, KeyRound];

function PlansPage() {
	return (
		<>
			{/* ============ HERO ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
					<p className="kicker reveal-up justify-center">Plans</p>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[15ch] text-[2.7rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.4rem]">
						Flexible plans to fit{" "}
						<span className="gradient-warm serif-em">your needs.</span>
					</h1>
					<p className="reveal-up delay-2 mt-7 max-w-xl text-lg leading-relaxed text-mute">
						Start small, prove it, then scale — with custom software engineered
						around how you operate.
					</p>
					<div className="reveal-up delay-3 mt-9">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Book a free call
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* ============ TIERS ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">Where to start</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						Start small. Scale as it{" "}
						<span className="serif-em">proves out.</span>
					</h2>
				</div>
				<div className="reveal-stagger grid gap-5 lg:grid-cols-3">
					{tiers.map((tier) => (
						<article
							key={tier.name}
							data-spotlight
							className={`panel panel-hover relative flex flex-col p-8 ${
								tier.featured ? "ticked bg-surface-violet" : ""
							}`}
						>
							{tier.featured ? (
								<span className="tag absolute right-6 top-6 !text-violet">
									Start here
								</span>
							) : null}
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-violet">
								<tier.icon className="h-5 w-5" />
							</div>
							<h3 className="mt-6 font-heading text-xl font-semibold text-ink">
								{tier.name}
							</h3>
							<div className="mt-3 font-heading text-[2rem] font-semibold leading-none">
								<span className="gradient-warm">{tier.price}</span>
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

			{/* ============ OWN IT YOUR WAY ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">Own it your way</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						Pay the way that{" "}
						<span className="serif-em">suits you.</span>
					</h2>
				</div>
				<div className="reveal-stagger grid gap-5 md:grid-cols-3">
					{offer.models.map((model, i) => {
						const Icon = modelIcons[i];
						return (
							<article
								key={model.name}
								data-spotlight
								className="panel panel-hover p-7"
							>
								<div className="flex items-center justify-between">
									<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-violet">
										<Icon className="h-5 w-5" />
									</div>
									<span className="tag">{model.tag}</span>
								</div>
								<h3 className="mt-5 font-heading text-lg font-semibold text-ink">
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

			{/* ============ GUARANTEE ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked relative overflow-hidden rounded-[24px] p-10 text-center sm:p-14"
				>
					<div className="aura-warm opacity-50" aria-hidden />
					<div className="relative z-10 mx-auto max-w-2xl">
						<div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
							<ShieldCheck className="h-5 w-5" />
						</div>
						<h2 className="reveal-scroll display text-3xl leading-[1.1] text-ink sm:text-[2.4rem]">
							{offer.guaranteeShort}
						</h2>
						<p className="reveal-scroll mx-auto mt-5 max-w-lg text-base leading-relaxed text-mute">
							{offer.guarantee}
						</p>
					</div>
				</div>
			</section>

			{/* ============ CTA ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="reveal-scroll display text-4xl leading-[1.06] text-ink sm:text-6xl">
						Find where software{" "}
						<span className="gradient-warm serif-em">pays for itself.</span>
					</h2>
					<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Book a free call
							<ArrowUpRight className="h-4 w-4" />
						</MagneticLink>
						<a
							href={`mailto:${mationMeta.email}`}
							className="button-secondary !px-6 !py-3"
						>
							{mationMeta.email}
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
