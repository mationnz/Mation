import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import MagneticLink from "../components/MagneticLink";
import SolutionExplorer from "../components/SolutionExplorer";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/what-we-build")({
	component: SolutionsPage,
	head: () => ({
		meta: [
			{ title: "Solutions — Work should work for you | Mation" },
			{
				name: "description",
				content:
					"Technology should remove complexity, not create it. Mation designs custom AI systems and software that streamline operations, eliminate repetitive tasks, and give your team time back.",
			},
			{
				property: "og:title",
				content: "Solutions — Work should work for you | Mation",
			},
			{
				property: "og:description",
				content:
					"Tell us the problem. We'll engineer the solution — custom AI systems and software built around how your business really works.",
			},
		],
	}),
});

const results = [
	"Faster workflows",
	"Better decisions",
	"Greater accuracy",
	"Less manual work",
	"More capacity to grow",
];

function SolutionsPage() {
	return (
		<>
			{/* ============ HERO ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
					<p className="kicker reveal-up justify-center">Solutions</p>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[15ch] text-[2.7rem] leading-[1.04] text-ink sm:text-6xl lg:text-[4.4rem]">
						Work should{" "}
						<span className="gradient-warm serif-em">work for you.</span>
					</h1>
					<p className="reveal-up delay-2 mt-7 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
						Technology should remove complexity, not create it. If something is
						slowing you down, it’s a problem worth solving.
					</p>
					<div className="reveal-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Tell us the problem
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink to="/work" className="button-secondary !px-6 !py-3">
							See our work
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* ============ INTERACTIVE EXPLORER ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						Where’s the friction?
					</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						Every business has{" "}
						<span className="serif-em">bottlenecks.</span>
					</h2>
					<p className="reveal-scroll mx-auto mt-5 max-w-lg text-base leading-relaxed text-mute">
						Pick the one that sounds like yours — and see what we’d build.
					</p>
				</div>
				<div className="reveal-scroll">
					<SolutionExplorer />
				</div>
			</section>

			{/* ============ RESULTS ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto max-w-3xl text-center">
					<p className="kicker reveal-scroll justify-center">The result</p>
					<div className="reveal-stagger mt-8 flex flex-wrap justify-center gap-3">
						{results.map((r) => (
							<span
								key={r}
								className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-5 py-2.5 text-[0.95rem] font-medium text-ink-soft"
							>
								<Check className="h-4 w-4 text-violet" />
								{r}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ============ ONE GOAL ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked relative overflow-hidden rounded-[24px] p-10 text-center sm:p-16"
				>
					<div className="aura-warm opacity-50" aria-hidden />
					<div className="relative z-10 mx-auto max-w-3xl">
						<p className="reveal-scroll text-base leading-relaxed text-mute">
							From automation and AI to complete business platforms, every
							solution is built around one goal.
						</p>
						<p className="reveal-scroll mt-6 font-serif text-2xl italic leading-snug text-ink-soft sm:text-[2rem]">
							Making your business{" "}
							<span className="gradient-warm not-italic">work better</span> — for
							the people who run it.
						</p>
					</div>
				</div>
			</section>

			{/* ============ CTA ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="reveal-scroll display text-4xl leading-[1.06] text-ink sm:text-6xl">
						Tell us the problem.{" "}
						<span className="gradient-warm serif-em">
							We’ll engineer the solution.
						</span>
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
