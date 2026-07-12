import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Blocks,
	Compass,
	Database,
	EyeOff,
	Hammer,
	Quote,
	Sparkles,
	TrendingUp,
	Unplug,
	Workflow,
} from "lucide-react";

import CountUp from "../components/CountUp";
import MagneticLink from "../components/MagneticLink";
import ToolsMarquee from "../components/ToolsMarquee";
import TrustedBy from "../components/TrustedBy";
import VennDiagram from "../components/VennDiagram";
import { mationMeta } from "../content/site";
import { caseStudies } from "../data/work";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{
				title: "Mation — Your AI transformation partner",
			},
			{
				name: "description",
				content:
					"Mation is an AI transformation partner. We work alongside businesses to understand how they operate, remove the busywork, and build intelligent systems that automate work and unlock growth.",
			},
			{
				property: "og:title",
				content: "Mation — Your AI transformation partner",
			},
			{
				property: "og:description",
				content:
					"We work alongside ambitious businesses to build the intelligent systems they run on — bespoke software, automation, and AI.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const problems = [
	{
		icon: Unplug,
		title: "Disconnected tools",
		desc: "A dozen apps that don’t talk to each other, so nothing joins up.",
	},
	{
		icon: Database,
		title: "Data in silos",
		desc: "The same customer, job, or invoice defined five different ways.",
	},
	{
		icon: EyeOff,
		title: "No single view",
		desc: "Decisions made on numbers that are days old and scattered.",
	},
	{
		icon: Workflow,
		title: "Manual busywork",
		desc: "Your team re-keying data and chasing updates by hand, all week.",
	},
];

const pillars = [
	{
		icon: Blocks,
		title: "Custom software",
		desc: "Bespoke platforms built around how you actually operate — never a template you bend to fit.",
	},
	{
		icon: Workflow,
		title: "Intelligent automation",
		desc: "Workflows and AI agents that quietly remove repetitive execution across every tool you run.",
	},
	{
		icon: Sparkles,
		title: "Decision intelligence",
		desc: "AI that turns your data into context-aware decisions your team can actually trust.",
	},
];

const steps = [
	{
		n: "01",
		icon: Compass,
		title: "Discover",
		desc: "We sit with your team and learn how the business really runs — and where the highest-leverage change lives.",
	},
	{
		n: "02",
		icon: Hammer,
		title: "Build",
		desc: "We design and ship your system in transparent increments. You see it working as it grows, not at the very end.",
	},
	{
		n: "03",
		icon: TrendingUp,
		title: "Scale",
		desc: "We tune from live signal and expand it, so the system compounds value quarter after quarter.",
	},
];

const testimonials = [
	{
		quote:
			"They took the time to understand exactly how we work before writing a line of code. The system feels like it was built by people who actually run our business.",
		name: "Operations Director",
		org: "Construction sector",
	},
	{
		quote:
			"What used to take a full day of admin now happens on its own. Our team finally spends time on the work that matters.",
		name: "General Manager",
		org: "Field services",
	},
];

function HomePage() {
	const featured = caseStudies.slice(0, 3);

	return (
		<>
			{/* ============ 1 · HERO ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-24 text-center sm:py-28">
					<div className="reveal-up">
						<img
							src="/benji-mation-logo.png"
							alt="Mation"
							width={460}
							height={440}
							className="float-slow w-[min(78vw,23rem)] drop-shadow-[0_28px_90px_rgba(109,92,255,0.45)]"
						/>
					</div>

					<div className="reveal-up delay-1 mt-6 flex items-center gap-3.5">
						<span className="h-px w-8 bg-sun-ink/40" aria-hidden />
						<span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-sun-ink">
							AI transformation partner
						</span>
						<span className="h-px w-8 bg-sun-ink/40" aria-hidden />
					</div>

					<h1 className="reveal-up delay-2 display mt-6 max-w-[15ch] text-[2.6rem] leading-[1.05] text-ink sm:text-5xl lg:text-[3.7rem]">
						The intelligent systems your business{" "}
						<span className="gradient-warm serif-em">runs on.</span>
					</h1>

					<p className="reveal-up delay-3 mt-6 max-w-xl text-lg leading-relaxed text-mute">
						We work alongside you to build intelligent software that removes the
						busywork and unlocks growth.
					</p>

					<div className="reveal-up delay-4 mt-10 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Book a free call
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink to="/work" className="button-secondary !px-6 !py-3">
							See our work
						</MagneticLink>
					</div>

					<p className="reveal-up delay-4 mt-10 font-serif text-base italic text-faint">
						One size fits you — a digital home for your business operations.
					</p>
				</div>

				<div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
					<span className="scroll-cue" aria-hidden />
				</div>
			</section>

			{/* ============ 2 · TRUSTED BY ============ */}
			<section className="site-wide section-shell">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">Partnering with</p>
					<h2 className="reveal-scroll mt-5 font-heading text-3xl font-semibold text-ink sm:text-4xl">
						Ambitious businesses already building with us.
					</h2>
				</div>
				<TrustedBy />
			</section>

			{/* ============ 3 · THE PROBLEM ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<div>
						<p className="kicker reveal-scroll">The problem</p>
						<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
							Growth shouldn’t feel this{" "}
							<span className="serif-em">heavy.</span>
						</h2>
						<p className="reveal-scroll mt-6 max-w-md text-lg leading-relaxed text-mute">
							Most businesses grow by bolting on another tool, another
							spreadsheet, another workaround. Before long, the systems meant to
							help are the very thing slowing you down.
						</p>
					</div>

					<div className="reveal-stagger grid gap-4 sm:grid-cols-2">
						{problems.map((p) => (
							<article
								key={p.title}
								className="panel lift rounded-[16px] border border-border p-6"
							>
								<div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-sun-tint text-sun-ink">
									<p.icon className="h-5 w-5" />
								</div>
								<h3 className="font-heading text-lg font-semibold text-ink">
									{p.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-mute">
									{p.desc}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* ============ 4 · THE SOLUTION ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-16 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">How Mation helps</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						One intelligent system, built around{" "}
						<span className="serif-em">you.</span>
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute">
						We bring people, process, and technology together — then use AI,
						custom software, and automation to make the whole thing run as one.
					</p>
				</div>

				<div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
					<div className="reveal-scroll order-2 lg:order-1">
						<VennDiagram />
					</div>
					<div className="reveal-stagger order-1 grid gap-4 lg:order-2">
						{pillars.map((pillar) => (
							<article
								key={pillar.title}
								data-spotlight
								className="panel panel-hover flex gap-5 p-6"
							>
								<div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
									<pillar.icon className="h-5 w-5" />
								</div>
								<div>
									<h3 className="font-heading text-lg font-semibold text-ink">
										{pillar.title}
									</h3>
									<p className="mt-2 text-[0.95rem] leading-relaxed text-mute">
										{pillar.desc}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* ============ 5 · FEATURED WORK ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mb-12 flex flex-wrap items-end justify-between gap-6">
					<div className="max-w-xl">
						<p className="kicker reveal-scroll">Featured work</p>
						<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
							Real systems, real{" "}
							<span className="serif-em">outcomes.</span>
						</h2>
					</div>
					<MagneticLink to="/work" className="button-ghost reveal-scroll">
						All case studies
						<ArrowRight className="h-4 w-4" />
					</MagneticLink>
				</div>

				<div className="reveal-stagger grid gap-5 md:grid-cols-3">
					{featured.map((study) => (
						<Link
							key={study.slug}
							to="/work/$slug"
							params={{ slug: study.slug }}
							data-spotlight
							className="panel panel-hover group flex flex-col p-7"
						>
							<span className="tag w-fit">{study.industry}</span>
							<h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-ink">
								{study.client}
							</h3>
							<p className="mt-2 flex-1 text-sm leading-relaxed text-mute">
								{study.summary}
							</p>
							<div className="mt-6 border-t border-border pt-5">
								<div className="font-heading text-[clamp(1.9rem,3vw,2.4rem)] font-semibold leading-none">
									<span className="gradient-warm">
										{study.results[0]?.metric}
									</span>
								</div>
								<p className="mt-2 text-xs leading-snug text-mute">
									{study.results[0]?.label}
								</p>
							</div>
							<span className="button-ghost mt-6 w-fit !px-0 text-violet-ink">
								Read case
								<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
							</span>
						</Link>
					))}
				</div>
			</section>

			{/* ============ 6 · PROCESS ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-16 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">How we work</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						A partnership, not a{" "}
						<span className="serif-em">hand-off.</span>
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute">
						The people who learn how you operate are the same people who build
						your system — embedded with your team, every step of the way.
					</p>
				</div>

				<div className="reveal-stagger grid gap-8 md:grid-cols-3">
					{steps.map((step) => (
						<div key={step.n} className="relative">
							<div className="flex items-center gap-4">
								<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
									<step.icon className="h-5 w-5" />
								</div>
								<span className="font-serif text-4xl italic text-violet/30">
									{step.n}
								</span>
							</div>
							<h3 className="mt-5 font-heading text-2xl font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* ============ 7 · RESULTS + TESTIMONIALS ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked overflow-hidden rounded-[24px] p-8 sm:p-14"
				>
					<div className="grid gap-3 border-b border-border pb-12 text-center sm:grid-cols-3">
						{[
							{ value: "120+", label: "Transformation programs launched" },
							{ value: "67%", label: "Average automation coverage uplift" },
							{ value: "6.4 months", label: "Median payback period" },
						].map((stat, i) => (
							<div key={stat.label}>
								<CountUp
									value={stat.value}
									className={`block font-heading text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none ${
										i === 1 ? "text-sun-ink" : "text-ink"
									}`}
								/>
								<p className="mx-auto mt-3 max-w-[15rem] text-sm leading-snug text-mute">
									{stat.label}
								</p>
							</div>
						))}
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-2">
						{testimonials.map((t) => (
							<figure
								key={t.name}
								className="flex flex-col rounded-[16px] border border-border bg-surface-2/50 p-7"
							>
								<Quote className="h-7 w-7 text-sun-ink" />
								<blockquote className="mt-5 flex-1 text-pretty font-serif text-xl italic leading-snug text-ink-soft">
									“{t.quote}”
								</blockquote>
								<figcaption className="mt-6 text-sm">
									<span className="font-semibold text-ink">{t.name}</span>
									<span className="text-mute"> · {t.org}</span>
								</figcaption>
							</figure>
						))}
					</div>
				</div>

				<div className="marquee-mask mt-12">
					<p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-faint">
						Unifying the tools your teams already use
					</p>
					<ToolsMarquee />
				</div>
			</section>

			{/* ============ 8 · CTA ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked relative overflow-hidden rounded-[24px] p-10 text-center sm:p-16"
				>
					<div className="aura-warm opacity-60" aria-hidden />
					<div className="relative z-10">
						<p className="kicker reveal-scroll justify-center">Let’s talk</p>
						<h2 className="reveal-scroll mx-auto mt-5 max-w-2xl display text-4xl leading-[1.05] text-ink sm:text-6xl">
							Let’s transform how your business{" "}
							<span className="gradient-warm serif-em">works.</span>
						</h2>
						<p className="reveal-scroll mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
							Start with a free, no-obligation call. We’ll learn how you work
							today and show you what one intelligent system could change.
						</p>
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
				</div>
			</section>
		</>
	);
}
