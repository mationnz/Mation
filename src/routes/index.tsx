import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Blocks,
	Boxes,
	Sparkles,
	Workflow,
} from "lucide-react";

import CountUp from "../components/CountUp";
import MagneticLink from "../components/MagneticLink";
import ToolsMarquee from "../components/ToolsMarquee";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{
				title: "Mation — The operating system your business runs on",
			},
			{
				name: "description",
				content:
					"Mation designs and builds the bespoke software, automation, and AI that unify how your organisation works — so you can scale without the drag.",
			},
			{
				property: "og:title",
				content: "Mation — The operating system your business runs on",
			},
			{
				property: "og:description",
				content:
					"Bespoke software, intelligent automation, and decision intelligence, built around how your business really works.",
			},
			{
				property: "og:type",
				content: "website",
			},
		],
	}),
});

const pillars = [
	{
		icon: Blocks,
		title: "Custom software",
		desc: "Bespoke platforms built around how you actually operate — never an off-the-shelf compromise.",
	},
	{
		icon: Workflow,
		title: "Intelligent automation",
		desc: "Workflows and agents that quietly remove repetitive execution across every tool you run.",
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
		title: "Discover",
		desc: "We learn how your business really works, and where the highest-leverage change lives.",
	},
	{
		n: "02",
		title: "Build",
		desc: "We design and ship your system in transparent increments — you see it working as it grows.",
	},
	{
		n: "03",
		title: "Scale",
		desc: "We tune from live signal so the system compounds value quarter after quarter.",
	},
];

const proof = [
	{ value: "120+", label: "Transformation programs launched" },
	{ value: "67%", label: "Average automation coverage uplift" },
	{ value: "6.4 months", label: "Median payback period" },
];

function HomePage() {
	return (
		<>
			{/* ---------- Hero — type-forward, centered, lots of air ---------- */}
			<section className="relative overflow-hidden">
				<div className="aurora" aria-hidden />
				<div className="site-wide relative flex min-h-[86vh] flex-col items-center justify-center py-24 text-center">
					<span className="pill reveal-up">
						<span className="live-dot" />
						AI-native software studio · Auckland, NZ
					</span>

					<h1 className="reveal-up delay-1 display mt-8 max-w-[16ch] text-[2.9rem] leading-[1.02] text-ink sm:text-7xl lg:text-[5.4rem]">
						The <span className="gradient-ink">operating system</span> your
						business runs on.
					</h1>

					<p className="reveal-up delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
						We design and build the bespoke software, automation, and AI that
						unify how your organisation works — so you can scale without the
						drag.
					</p>

					<div className="reveal-up delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Book a free call
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink
							to="/what-we-build"
							className="button-secondary !px-6 !py-3"
						>
							See what we build
						</MagneticLink>
					</div>
				</div>

				{/* Tool logos — quiet social proof, not a section of its own */}
				<div className="site-wide relative pb-16">
					<p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-faint">
						Unifying the tools your teams already use
					</p>
					<ToolsMarquee />
				</div>
			</section>

			{/* ---------- What we do — three clear pillars ---------- */}
			<section className="site-wide section-shell">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">What we do</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						One partner for the whole system.
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute">
						Most teams stitch together tools, contractors, and workarounds. We
						build the single, coherent system underneath it all.
					</p>
				</div>

				<div className="reveal-stagger grid gap-5 md:grid-cols-3">
					{pillars.map((pillar) => (
						<article
							key={pillar.title}
							data-spotlight
							className="panel panel-hover p-8"
						>
							<div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
								<pillar.icon className="h-5 w-5" />
							</div>
							<h3 className="font-heading text-xl font-semibold text-ink">
								{pillar.title}
							</h3>
							<p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
								{pillar.desc}
							</p>
						</article>
					))}
				</div>
			</section>

			{/* ---------- How we help — three steps ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">How we help</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						A calm, transparent path to live.
					</h2>
				</div>

				<div className="reveal-stagger grid gap-10 md:grid-cols-3">
					{steps.map((step) => (
						<div key={step.title} className="relative">
							<span className="font-heading text-5xl font-semibold text-violet/25">
								{step.n}
							</span>
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

			{/* ---------- Proof — one quiet strip of numbers ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="grid gap-8 rounded-[20px] border border-border bg-surface-2/50 p-10 text-center sm:grid-cols-3 sm:p-14">
					{proof.map((item) => (
						<div key={item.label}>
							<CountUp
								value={item.value}
								className="block font-heading text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none text-ink"
							/>
							<p className="mx-auto mt-4 max-w-[16rem] text-sm leading-snug text-mute">
								{item.label}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* ---------- Contact — the single, unmissable CTA ---------- */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked overflow-hidden rounded-[24px] p-10 text-center sm:p-16"
				>
					<p className="kicker reveal-scroll justify-center">Get in touch</p>
					<h2 className="reveal-scroll mx-auto mt-5 max-w-2xl font-heading text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
						Let’s build the system your business runs on.
					</h2>
					<p className="reveal-scroll mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
						Start with a free, no-obligation call. We’ll learn how you work today
						and show you what one unified system could change.
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
			</section>
		</>
	);
}
