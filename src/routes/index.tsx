import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import MagneticLink from "../components/MagneticLink";
import TrustedBy from "../components/TrustedBy";
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
					"Mation is an AI transformation partner. We work alongside businesses to build the intelligent systems they run on — bespoke software, automation, and AI.",
			},
			{
				property: "og:title",
				content: "Mation — Your AI transformation partner",
			},
			{
				property: "og:description",
				content:
					"We work alongside ambitious businesses to build the intelligent systems they run on.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const team = [
	{
		name: "Cameron Russell",
		role: "Chief Executive Officer",
		initials: "CR",
	},
	{
		name: "Ben Humphries",
		role: "Business Relations",
		initials: "BH",
	},
];

function HomePage() {
	const featured = caseStudies.slice(0, 3);

	return (
		<>
			{/* ============ TITLE — logo, one line, contact ============ */}
			<section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-20 text-center">
					<div className="reveal-up">
						<img
							src="/benji-mation-logo.png"
							alt="Mation"
							width={620}
							height={590}
							className="float-slow w-[min(86vw,31rem)] drop-shadow-[0_30px_100px_rgba(109,92,255,0.5)]"
						/>
					</div>

					<div className="reveal-up delay-1 mt-5 flex items-center gap-3.5">
						<span className="h-px w-8 bg-sun-ink/40" aria-hidden />
						<span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-sun-ink">
							AI transformation partner
						</span>
						<span className="h-px w-8 bg-sun-ink/40" aria-hidden />
					</div>

					<h1 className="reveal-up delay-2 display mt-7 max-w-[16ch] text-[2.2rem] leading-[1.08] text-ink sm:text-4xl lg:text-5xl">
						Your entire business,{" "}
						<span className="gradient-warm serif-em">one intelligent system.</span>
					</h1>
				</div>

				<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
					<span className="scroll-cue" aria-hidden />
				</div>
			</section>

			{/* ============ WHAT WE DO ============ */}
			<section className="site-wide section-shell">
				<div className="mx-auto max-w-3xl text-center">
					<p className="kicker reveal-scroll justify-center">What we do</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-[3.3rem]">
						The next generation of business{" "}
						<span className="gradient-warm serif-em">starts here.</span>
					</h2>
					<p className="reveal-scroll mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
						At Mation, we’re building the operating system for modern
						organisations.
					</p>
				</div>

				<div className="reveal-scroll mx-auto mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-mute">
					<p>
						We believe technology should adapt to the way people work — not the
						other way around. That’s why we partner with ambitious teams to
						design intelligent ecosystems that bring people, processes, data, and
						technology together into one connected environment.
					</p>
					<p>
						By combining AI, custom software, and intelligent automation, we
						eliminate complexity, streamline operations, and create the capacity
						for organisations to innovate, grow, and scale with confidence.
					</p>
					<p className="text-ink-soft">
						Our mission is to create the{" "}
						<span className="text-ink">digital home where modern work happens</span>{" "}
						— a place where every workflow, every project, every customer, and
						every decision is seamlessly connected through systems designed
						around the way your organisation operates.
					</p>
					<p>
						We don’t believe in one-size-fits-all solutions. We believe every
						organisation deserves technology that is purpose-built to unlock its
						full potential.
					</p>
				</div>

				<p className="reveal-scroll mx-auto mt-14 max-w-3xl text-center display text-3xl leading-[1.12] text-ink sm:text-[2.6rem]">
					We don’t just improve the way organisations work. We{" "}
					<span className="serif-em">transform</span> the way they operate. We{" "}
					<span className="gradient-warm serif-em">redefine what’s possible.</span>
				</p>
				<p className="reveal-scroll mx-auto mt-7 text-center font-serif text-xl italic text-ink-soft sm:text-2xl">
					Welcome to the future of work.{" "}
					<span className="gradient-warm not-italic">Welcome to Mation.</span>
				</p>
			</section>

			{/* ============ PROJECTS ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mb-12 flex flex-wrap items-end justify-between gap-6">
					<div className="max-w-xl">
						<p className="kicker reveal-scroll">Our work</p>
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

				<div className="mt-14">
					<p className="reveal-scroll mb-6 text-center text-xs font-medium uppercase tracking-[0.16em] text-faint">
						Partnering with ambitious businesses
					</p>
					<TrustedBy />
				</div>
			</section>

			{/* ============ MEET THE TEAM ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">Meet the team</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						The people building{" "}
						<span className="serif-em">alongside you.</span>
					</h2>
				</div>
				<div className="reveal-stagger mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
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
							</div>
						</article>
					))}
				</div>
			</section>

			{/* ============ GET IN CONTACT ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked relative overflow-hidden rounded-[24px] p-10 text-center sm:p-16"
				>
					<div className="aura-warm opacity-60" aria-hidden />
					<div className="relative z-10">
						<p className="kicker reveal-scroll justify-center">Get in touch</p>
						<h2 className="reveal-scroll mx-auto mt-5 max-w-2xl display text-4xl leading-[1.05] text-ink sm:text-6xl">
							Let’s transform how your business{" "}
							<span className="gradient-warm serif-em">works.</span>
						</h2>
						<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<MagneticLink to="/contact" className="button-primary !px-7 !py-3.5">
								Book a free call
								<ArrowUpRight className="h-4 w-4" />
							</MagneticLink>
							<a
								href={`mailto:${mationMeta.email}`}
								className="button-secondary !px-7 !py-3.5"
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
