import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Eye,
	GitBranch,
	Lock,
	type LucideIcon,
	ScrollText,
	Unlock,
	Users,
} from "lucide-react";

import MagneticLink from "../components/MagneticLink";
import ScrollyTransformation from "../components/ScrollyTransformation";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/approach")({
	component: ApproachPage,
	head: () => ({
		meta: [
			{ title: "Platform — How we work | Mation" },
			{
				name: "description",
				content:
					"We learn how you run, then build the system that runs it. Senior, embedded engineers — you own everything we ship. No lock-in.",
			},
			{
				property: "og:title",
				content: "Platform — How we work | Mation",
			},
			{
				property: "og:description",
				content:
					"A senior partnership from discovery to a system you own. Transparent, secure, and entirely yours.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

type Value = { icon: LucideIcon; label: string; note: string };

const values: Value[] = [
	{ icon: Users, label: "Senior & embedded", note: "The builders are the ones you talk to." },
	{ icon: Eye, label: "Transparent", note: "You see it working as it grows." },
	{ icon: GitBranch, label: "You own the code", note: "Every line ships to you." },
	{ icon: Unlock, label: "No lock-in", note: "Open foundations, take it anywhere." },
	{ icon: Lock, label: "Secure by design", note: "Least-privilege, encrypted, governed." },
	{ icon: ScrollText, label: "Fully auditable", note: "Every action logged and traceable." },
];

function ApproachPage() {
	return (
		<>
			{/* ============ HERO ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
					<p className="kicker reveal-up justify-center">How we work</p>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[16ch] text-[2.7rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.4rem]">
						We learn how you run, then{" "}
						<span className="gradient-warm serif-em">build it.</span>
					</h1>
					<div className="reveal-up delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
						<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
							Start with a Blueprint
							<ArrowRight className="h-4 w-4" />
						</MagneticLink>
						<MagneticLink
							to="/what-we-build"
							className="button-secondary !px-6 !py-3"
						>
							What we build
						</MagneticLink>
					</div>
				</div>
			</section>

			{/* ============ PROCESS (interactive) ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">The process</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						Four stages. One{" "}
						<span className="serif-em">partnership.</span>
					</h2>
				</div>
				<ScrollyTransformation />
			</section>

			{/* ============ WHAT YOU CAN COUNT ON ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						What you can count on
					</p>
					<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-5xl">
						Built to last.{" "}
						<span className="serif-em">Built to be yours.</span>
					</h2>
				</div>
				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{values.map((v) => (
						<div
							key={v.label}
							data-spotlight
							className="group bg-surface p-8 transition-colors duration-200 hover:bg-surface-2/60"
						>
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet transition-transform duration-300 group-hover:-translate-y-0.5">
								<v.icon className="h-5 w-5" />
							</div>
							<h3 className="mt-6 font-heading text-lg font-semibold text-ink">
								{v.label}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">{v.note}</p>
						</div>
					))}
				</div>

				<div className="reveal-scroll mt-6 flex flex-col items-center gap-6 rounded-[20px] border border-border bg-surface-2/50 px-8 py-10 text-center sm:flex-row sm:text-left">
					<div className="font-heading text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-none text-violet-ink">
						100%
					</div>
					<p className="max-w-md text-pretty text-lg text-ink-soft">
						Yours — the code, the data, and the system. It runs on your terms,
						long after we ship.
					</p>
				</div>
			</section>

			{/* ============ BLUEPRINT ============ */}
			<section className="site-wide section-shell pt-0">
				<div
					data-spotlight
					className="panel ticked relative overflow-hidden rounded-[24px] p-10 text-center sm:p-16"
				>
					<div className="aura-warm opacity-50" aria-hidden />
					<div className="relative z-10 mx-auto max-w-2xl">
						<p className="kicker reveal-scroll justify-center">
							A low-risk way to start
						</p>
						<h2 className="reveal-scroll mt-5 display text-4xl leading-[1.08] text-ink sm:text-[3rem]">
							Start with an{" "}
							<span className="gradient-warm serif-em">
								Operations Blueprint.
							</span>
						</h2>
						<p className="reveal-scroll mx-auto mt-6 max-w-lg text-base leading-relaxed text-mute">
							A fixed-scope discovery. We map how you run, build the value case,
							and hand you a roadmap — yours to keep, whether or not we build it.
						</p>
						<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
							<MagneticLink to="/contact" className="button-primary !px-6 !py-3">
								Scope a Blueprint
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
