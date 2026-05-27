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
			<section className="section-shell">
				<div className="site-wide max-w-3xl space-y-7">
					<span className="pill reveal-up">
						<FlaskConical className="h-3.5 w-3.5 text-violet-bright" />
						Selected work
					</span>
					<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4rem]">
						Systems we've <span className="gradient-ink">built</span>.
					</h1>
					<p className="reveal-up delay-2 text-lg leading-relaxed text-mute sm:text-xl">
						How we've unified businesses into a single system — from the first
						map of how they run to a system the whole team works on every day.
					</p>
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
				<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
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

				<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{visible.map((study) => (
						<Link
							key={study.slug}
							to="/work/$slug"
							params={{ slug: study.slug }}
							className="panel panel-hover group flex flex-col p-6"
						>
							<div className="flex items-center justify-between gap-3">
								<span className="tag">{study.industry}</span>
								<span className="font-mono text-xs text-mute">
									{study.year}
								</span>
							</div>

							{study.isPlaceholder ? (
								<span className="tag mt-3 w-fit !text-violet-bright">
									Sample case
								</span>
							) : null}

							<p className="mt-4 text-sm leading-relaxed text-mute">
								{study.client}
							</p>
							<h3 className="mt-2 font-heading text-xl font-semibold leading-snug text-ink">
								{study.summary}
							</h3>

							<hr className="hairline my-5" />

							<div className="mt-auto flex items-end justify-between gap-4">
								<div>
									<div className="metric-value !text-[1.7rem]">
										{study.results[0]?.metric}
									</div>
									<p className="mt-1 text-xs leading-snug text-mute">
										{study.results[0]?.label}
									</p>
								</div>
								<span className="button-ghost shrink-0">
									Read case
									<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
								</span>
							</div>
						</Link>
					))}

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
				primaryLabel="Book a discovery call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
