import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FlaskConical, Minus } from "lucide-react";
import { useMemo, useState } from "react";

import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
import { caseStudies } from "../data/work";

export const Route = createFileRoute("/work/")({
	component: WorkIndexPage,
	head: () => ({
		meta: [
			{ title: "Work — Systems we've built | Mation" },
			{
				name: "description",
				content:
					"Selected work from Mation — bespoke systems that unify a business's tools, data, and workflows into one operating system, engineered around how they run.",
			},
			{ property: "og:title", content: "Work — Systems we've built | Mation" },
			{
				property: "og:description",
				content:
					"Bespoke systems that unify a business's tools, data, and workflows into one operating system, engineered around how they run.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const ALL = "All work";

function WorkIndexPage() {
	const industries = useMemo(() => {
		const unique = Array.from(new Set(caseStudies.map((c) => c.industry)));
		return [ALL, ...unique];
	}, []);

	const [filter, setFilter] = useState<string>(ALL);

	const visible = useMemo(
		() =>
			filter === ALL
				? caseStudies
				: caseStudies.filter((c) => c.industry === filter),
		[filter],
	);

	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="glow section-shell">
				<div className="site-wide">
					<div className="dimline reveal-up mb-10">
						Mation — selected work · sample cases by sector
					</div>
					<div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
						<div className="max-w-3xl space-y-7">
							<span className="pill reveal-up">
								<FlaskConical className="h-3.5 w-3.5 text-violet-bright" />
								Selected work
							</span>
							<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4rem]">
								Systems we've <span className="gradient-ink">built</span>.
							</h1>
							<p className="reveal-up delay-2 text-lg leading-relaxed text-mute sm:text-xl">
								How we've unified businesses into a single system — from the
								first map of how they run to a system the whole team works on
								every day.
							</p>
						</div>

						{/* At-a-glance proof — oversized, sourced from the cases shown */}
						<dl className="reveal-up delay-3 grid grid-cols-3 gap-4 sm:gap-6">
							<div>
								<dt className="bp-coord">Cases</dt>
								<dd className="mt-1 font-heading text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
									<span className="gradient-ink">{caseStudies.length}</span>
								</dd>
							</div>
							<div>
								<dt className="bp-coord">Sectors</dt>
								<dd className="mt-1 font-heading text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
									<span className="gradient-ink">{industries.length - 1}</span>
								</dd>
							</div>
							<div>
								<dt className="bp-coord">Systems</dt>
								<dd className="mt-1 font-heading text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
									<span className="gradient-ink">1</span>
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</section>

			{/* Sample-cases notice */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-up panel-line flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-start gap-4">
						<div className="inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-violet-bright">
							<FlaskConical className="h-5 w-5" />
						</div>
						<div>
							<h2 className="font-heading text-lg font-semibold text-ink">
								Sample cases, pending client publication
							</h2>
							<p className="mt-1 max-w-2xl text-sm leading-relaxed text-mute">
								These are representative examples of the systems we build, by
								sector. Named client case studies — with their permission and
								real figures — are on the way.
							</p>
						</div>
					</div>
					<span className="tag shrink-0 self-start sm:self-center">
						Sample · not yet published
					</span>
				</div>
			</section>

			{/* Filter + grid */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-8 flex flex-wrap items-end justify-between gap-4">
					<p className="section-index">
						<b>01</b> &nbsp;/&nbsp; Case studies
					</p>
					<div className="flex flex-wrap gap-2">
						{industries.map((industry) => {
							const active = industry === filter;
							return (
								<button
									key={industry}
									type="button"
									onClick={() => setFilter(industry)}
									className={`tag transition-colors duration-200 ${
										active
											? "border-[rgba(166,146,255,0.55)] text-ink"
											: "hover:border-[var(--line-strong)] hover:text-ink"
									}`}
									aria-pressed={active}
								>
									{industry}
								</button>
							);
						})}
					</div>
				</div>

				<div className="reveal-stagger grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
					{visible.map((study, i) => {
						// The first card reads as a feature tile (wider, bracketed).
						const featured = i === 0;
						return (
							<Link
								key={study.slug}
								to="/work/$slug"
								params={{ slug: study.slug }}
								className={`panel panel-hover group relative flex flex-col p-6 sm:p-7 ${
									featured ? "md:col-span-2 lg:col-span-2" : ""
								}`}
							>
								{/* figure / sector coordinate badge */}
								<span className="bp-coord absolute right-5 top-5">
									{`CASE.${String(i + 1).padStart(2, "0")}`}
								</span>

								<div className="flex flex-wrap items-center gap-2 pr-16">
									<span className="tag">{study.industry}</span>
									<span className="font-mono text-xs text-mute">
										{study.year}
									</span>
									{study.isPlaceholder ? (
										<span className="tag !text-violet-bright">Sample case</span>
									) : null}
								</div>

								<p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-mute">
									{study.client}
								</p>
								<h3
									className={`mt-2 font-heading font-semibold leading-snug text-ink ${
										featured ? "text-2xl sm:text-[1.7rem]" : "text-xl"
									}`}
								>
									{study.summary}
								</h3>

								{/* Oversized headline result — the big visual win */}
								<div className="mt-6 flex flex-1 items-end justify-between gap-5">
									<div>
										<div className="font-heading text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
											<span className="gradient-ink">
												{study.results[0]?.metric}
											</span>
										</div>
										<p className="mt-2 max-w-[15rem] text-xs leading-snug text-mute">
											{study.results[0]?.label}
										</p>
									</div>

									{/* Feature tiles surface a second proof point */}
									{featured && study.results[1] ? (
										<div className="hidden border-l border-line pl-5 sm:block">
											<div className="font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.03em] text-ink/90">
												{study.results[1].metric}
											</div>
											<p className="mt-2 max-w-[12rem] text-xs leading-snug text-mute">
												{study.results[1].label}
											</p>
										</div>
									) : null}
								</div>

								<hr className="hairline my-5" />

								<div className="flex items-center justify-between gap-4">
									<span className="bp-coord">
										{`${study.results.length} results · measured`}
									</span>
									<span className="button-ghost shrink-0">
										Read case
										<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
									</span>
								</div>

								{/* Blueprint bracket marks on the feature tile */}
								{featured ? (
									<>
										<span
											aria-hidden
											className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-[rgba(166,146,255,0.4)]"
										/>
										<span
											aria-hidden
											className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[rgba(166,146,255,0.4)]"
										/>
									</>
								) : null}
							</Link>
						);
					})}

					{visible.length === 0 ? (
						<div className="panel-line flex items-center gap-3 p-6 text-mute md:col-span-2 lg:col-span-3">
							<Minus className="h-4 w-4 text-violet-bright" />
							<p className="text-sm">No cases in this sector yet.</p>
						</div>
					) : null}
				</div>
			</section>

			<CTASection
				title="Could your business run on one system like these?"
				description="Start with a conversation. We'll learn how you work today and show you what one unified system could change."
				primaryLabel="Book a free exploration meeting"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
