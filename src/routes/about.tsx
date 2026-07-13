import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import MagneticLink from "../components/MagneticLink";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{
				title: "About — The next generation of business starts here | Mation",
			},
			{
				name: "description",
				content:
					"At Mation, we're building the operating system for modern organisations — bringing people, processes, data, and technology into one connected environment, powered by AI.",
			},
			{
				property: "og:title",
				content: "About Mation — The operating system for modern organisations",
			},
			{
				property: "og:description",
				content:
					"We believe technology should adapt to how people work. We build the digital home where modern work happens — purpose-built around your organisation.",
			},
		],
	}),
});

const team = [
	{
		name: "Cameron Russell",
		role: "Chief Executive Officer",
		initials: "CR",
		bio: "Cameron founded Mation on a simple conviction: ambitious organisations deserve technology built around them, not the other way around. He sets the vision and works alongside clients to turn operational complexity into systems that scale.",
	},
	{
		name: "Ben Humphries",
		role: "Business Relations",
		initials: "BH",
		bio: "Ben leads how Mation partners with the organisations it serves — from the first conversation through to a long-term relationship. He keeps every engagement close, transparent, and focused on outcomes that move the business.",
	},
];

function AboutPage() {
	return (
		<>
			{/* ============ HERO ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
					<p className="kicker reveal-up justify-center">Who we are</p>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[18ch] text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.2rem]">
						The next generation of business{" "}
						<span className="gradient-warm serif-em">starts here.</span>
					</h1>
					<p className="reveal-up delay-2 mt-7 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
						At Mation, we’re building the operating system for modern
						organisations.
					</p>
					<div className="reveal-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Start a conversation
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink to="/work" className="button-secondary !px-6 !py-3">
							See our work
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* ============ BELIEF ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
					<p className="kicker reveal-scroll lg:sticky lg:top-28">
						What we believe
					</p>
					<div className="max-w-2xl">
						<p className="reveal-scroll display text-3xl leading-[1.14] text-ink sm:text-[2.6rem]">
							Technology should adapt to the way people work —{" "}
							<span className="serif-em">not the other way around.</span>
						</p>
						<div className="reveal-scroll mt-8 space-y-6 text-lg leading-relaxed text-mute">
							<p>
								That’s why we partner with ambitious teams to design intelligent
								ecosystems that bring people, processes, data, and technology
								together into one connected environment.
							</p>
							<p>
								By combining AI, custom software, and intelligent automation, we
								eliminate complexity, streamline operations, and create the
								capacity for organisations to innovate, grow, and scale with
								confidence.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ============ MISSION ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked relative overflow-hidden rounded-[24px] p-10 text-center sm:p-16"
				>
					<div className="aura-warm opacity-50" aria-hidden />
					<div className="relative z-10 mx-auto max-w-3xl">
						<p className="kicker reveal-scroll justify-center">Our mission</p>
						<p className="reveal-scroll mt-6 font-serif text-2xl italic leading-snug text-ink-soft sm:text-[1.95rem]">
							To create the{" "}
							<span className="gradient-warm not-italic">digital home</span>{" "}
							where modern work happens — a place where every workflow, every
							project, every customer, and every decision is seamlessly connected
							through systems designed around the way your organisation operates.
						</p>
					</div>
				</div>
			</section>

			{/* ============ PURPOSE-BUILT ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto max-w-3xl text-center">
					<p className="kicker reveal-scroll justify-center">
						Purpose-built, always
					</p>
					<p className="reveal-scroll mt-6 text-lg leading-relaxed text-mute">
						We don’t believe in one-size-fits-all solutions. We believe every
						organisation deserves technology that is purpose-built to unlock its
						full potential.
					</p>
					<h2 className="reveal-scroll mt-10 display text-4xl leading-[1.08] text-ink sm:text-[3.2rem]">
						We don’t just improve the way organisations work. We{" "}
						<span className="serif-em">transform</span> the way they operate. We{" "}
						<span className="gradient-warm serif-em">redefine what’s possible.</span>
					</h2>
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
			</section>

			{/* ============ WELCOME / CTA ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked relative overflow-hidden rounded-[24px] p-10 text-center sm:p-16"
				>
					<div className="aura-warm opacity-60" aria-hidden />
					<div className="relative z-10 mx-auto max-w-2xl">
						<h2 className="reveal-scroll display text-4xl leading-[1.06] text-ink sm:text-6xl">
							Welcome to the future of work.{" "}
							<span className="gradient-warm serif-em">Welcome to Mation.</span>
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
				</div>
			</section>
		</>
	);
}
