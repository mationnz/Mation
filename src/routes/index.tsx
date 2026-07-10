import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Blocks,
	Sparkles,
	Workflow,
} from "lucide-react";

import MagneticLink from "../components/MagneticLink";
import ToolsMarquee from "../components/ToolsMarquee";
import VennDiagram from "../components/VennDiagram";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		meta: [
			{
				title: "Mation — A digital home for your business operations",
			},
			{
				name: "description",
				content:
					"One size fits you. Mation builds a digital home for your business operations — bespoke software, automation, and AI that unify people, process, and technology into one system.",
			},
			{
				property: "og:title",
				content: "Mation — A digital home for your business operations",
			},
			{
				property: "og:description",
				content:
					"One size fits you. Bespoke software, automation, and AI, built around how your business really works.",
			},
			{ property: "og:type", content: "website" },
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

const clients = [
	{ sector: "Logistics & freight", note: "Dispatch, tracking & billing, unified" },
	{ sector: "Professional services", note: "One delivery & margin hub" },
	{ sector: "Field & manufacturing", note: "Quote-to-invoice job system" },
];

const team = [
	{
		name: "Cameron Russell",
		role: "Chief Executive Officer",
		initials: "CR",
		bio: "Sets the vision and works alongside clients to turn operational complexity into systems that scale.",
	},
	{
		name: "Ben Humphries",
		role: "Business Relations",
		initials: "BH",
		bio: "Leads how Mation partners with the organisations it serves — close, transparent, outcome-focused.",
	},
];

function HomePage() {
	return (
		<>
			{/* ---------- Splash / title page ---------- */}
			<section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
				<div className="aurora" aria-hidden />
				<div className="site-wide relative flex flex-col items-center text-center">
					<img
						src="/benji-mation-logo.png"
						alt="Mation"
						width={420}
						height={420}
						className="reveal-up w-[min(78vw,26rem)] drop-shadow-[0_20px_60px_rgba(109,92,255,0.35)]"
					/>
					<div className="reveal-up delay-2 mt-8 inline-flex flex-col items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-5 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md sm:px-10">
						<p className="font-heading text-2xl font-semibold text-white sm:text-[1.8rem]">
							One size fits you.
						</p>
						<p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
							A digital home for your business operations
						</p>
					</div>
				</div>

				{/* Scroll cue */}
				<div className="reveal-up delay-4 absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
					<span className="scroll-cue" aria-hidden />
					<span className="text-xs uppercase tracking-[0.18em] text-faint">
						Scroll
					</span>
				</div>
			</section>

			{/* ---------- Mission + interactive Venn ---------- */}
			<section className="site-wide section-shell">
				<div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
					<div>
						<p className="kicker reveal-scroll">Our mission</p>
						<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
							A digital home where{" "}
							<span className="gradient-ink">modern work happens.</span>
						</h2>
						<div className="reveal-scroll mt-6 space-y-4 text-base leading-relaxed text-mute">
							<p>
								Technology should adapt to the way people work — not the other
								way around. We partner with ambitious teams to design intelligent
								ecosystems that bring people, process, data, and technology
								together into one connected environment.
							</p>
							<p>
								By combining AI, custom software, and intelligent automation, we
								eliminate complexity and create the capacity to innovate, grow,
								and scale with confidence.
							</p>
						</div>
						<div className="reveal-scroll mt-8">
							<MagneticLink to="/about" className="button-secondary !px-6 !py-3">
								Read our story
								<ArrowRight className="h-4 w-4" />
							</MagneticLink>
						</div>
					</div>

					<div className="reveal-scroll">
						<VennDiagram />
					</div>
				</div>
			</section>

			{/* ---------- What we do ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">What we do</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						One partner for the whole system.
					</h2>
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

			{/* ---------- Clients ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">Who we work with</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						Businesses that run on Mation.
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-xl text-base leading-relaxed text-mute">
						From logistics to professional services to the field — teams across
						sectors now run on one system built around them.
					</p>
				</div>

				<div className="reveal-stagger grid gap-5 md:grid-cols-3">
					{clients.map((client) => (
						<article
							key={client.sector}
							data-spotlight
							className="panel panel-hover p-7 text-center"
						>
							<h3 className="font-heading text-lg font-semibold text-ink">
								{client.sector}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{client.note}
							</p>
						</article>
					))}
				</div>

				<div className="mt-12">
					<p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-faint">
						Unifying the tools your teams already use
					</p>
					<ToolsMarquee />
				</div>
			</section>

			{/* ---------- Meet the team ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">Meet the team</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						Small, senior, and close to the work.
					</h2>
				</div>
				<div className="reveal-stagger mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
					{team.map((person) => (
						<article
							key={person.name}
							data-spotlight
							className="panel panel-hover overflow-hidden p-5"
						>
							<div className="relative aspect-[4/5] overflow-hidden rounded-[12px] border border-border bg-[linear-gradient(150deg,var(--surface-violet),var(--surface-2)_70%)]">
								<div className="grid h-full w-full place-items-center">
									<span className="font-heading text-6xl font-semibold text-violet/60">
										{person.initials}
									</span>
									<span className="absolute bottom-3 left-3 rounded-full border border-border bg-canvas/70 px-2.5 py-1 text-[0.68rem] font-medium text-faint">
										Photo coming soon
									</span>
								</div>
							</div>
							<div className="px-1.5 pb-1.5 pt-5">
								<p className="text-xs font-semibold uppercase tracking-wide text-violet">
									{person.role}
								</p>
								<h3 className="mt-1.5 font-heading text-2xl font-semibold text-ink">
									{person.name}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-mute">
									{person.bio}
								</p>
							</div>
						</article>
					))}
				</div>
				<div className="mt-10 text-center">
					<MagneticLink to="/about" className="button-ghost">
						More about us
						<ArrowRight className="h-4 w-4" />
					</MagneticLink>
				</div>
			</section>

			{/* ---------- Contact CTA ---------- */}
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
