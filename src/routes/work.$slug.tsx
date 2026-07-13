import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Quote } from "lucide-react";

import CTASection from "../components/CTASection";
import { getCaseBySlug, getRelatedCases } from "../data/work";

export const Route = createFileRoute("/work/$slug")({
	component: CaseStudyPage,
	head: ({ params }) => {
		const study = getCaseBySlug(params.slug);
		if (!study) {
			return { meta: [{ title: "Case study not found — Mation" }] };
		}
		return {
			meta: [
				{ title: `${study.industry} — Work | Mation` },
				{ name: "description", content: study.summary },
				{ property: "og:title", content: `${study.industry} — Work | Mation` },
				{ property: "og:description", content: study.summary },
				{ property: "og:type", content: "article" },
			],
		};
	},
});

function CaseStudyPage() {
	const { slug } = Route.useParams();
	const study = getCaseBySlug(slug);

	if (!study) {
		return (
			<>
				<section className="section-shell">
					<div className="site-shell max-w-2xl space-y-6 text-center">
						<p className="kicker justify-center">Not found</p>
						<h1 className="display text-4xl text-ink sm:text-5xl">
							We couldn’t find that case study.
						</h1>
						<Link to="/work" className="button-secondary mx-auto w-fit">
							<ArrowLeft className="h-4 w-4" />
							Back to all work
						</Link>
					</div>
				</section>
				<CTASection
					title="Could your business run on one system like these?"
					description="Start with a conversation."
				/>
			</>
		);
	}

	const related = getRelatedCases(slug, 2);

	return (
		<>
			{/* ============ HERO — outcome-led ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 py-20 sm:py-28">
					<nav
						aria-label="Breadcrumb"
						className="reveal-up flex items-center gap-2 text-sm text-mute"
					>
						<Link to="/work" className="link-underline">
							Work
						</Link>
						<ChevronRight className="h-3.5 w-3.5" />
						<span className="text-ink-soft">{study.industry}</span>
					</nav>

					<div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
						<div>
							<div className="reveal-up flex flex-wrap items-center gap-2">
								<span className="tag">{study.industry}</span>
								<span className="tag">{study.year}</span>
								{study.isPlaceholder ? (
									<span className="tag !text-violet">Sample case</span>
								) : null}
							</div>
							<h1 className="reveal-up delay-1 mt-6 display text-[2.3rem] leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
								{study.summary}
							</h1>
							<p className="reveal-up delay-2 mt-5 text-sm font-medium text-mute">
								{study.client}
							</p>
						</div>

						{/* Headline outcome */}
						<div className="reveal-up delay-2">
							<div className="font-heading text-[clamp(3rem,8vw,5rem)] font-semibold leading-none">
								<span className="gradient-warm">{study.results[0]?.metric}</span>
							</div>
							<p className="mt-3 text-sm leading-snug text-mute">
								{study.results[0]?.label}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ============ RESULTS ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-3">
					{study.results.map((r) => (
						<div key={r.label} className="bg-surface p-8">
							<div className="font-heading text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-none">
								<span className="gradient-warm">{r.metric}</span>
							</div>
							<p className="mt-3 text-sm leading-snug text-mute">{r.label}</p>
						</div>
					))}
				</div>
			</section>

			{/* ============ WHAT WE BUILT ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
					<div>
						<p className="kicker reveal-scroll lg:sticky lg:top-28">
							What we built
						</p>
					</div>
					<ul className="reveal-stagger grid gap-4 sm:grid-cols-2">
						{study.whatWeBuilt.map((item) => (
							<li
								key={item}
								className="flex items-start gap-3 rounded-[14px] border border-border bg-surface p-5"
							>
								<Check className="mt-0.5 h-5 w-5 shrink-0 text-violet" />
								<span className="text-[0.95rem] leading-relaxed text-ink-soft">
									{item}
								</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* ============ QUOTE ============ */}
			{study.quote ? (
				<section className="site-wide section-shell pt-0">
					<figure className="mx-auto max-w-3xl text-center">
						<Quote className="mx-auto h-8 w-8 text-sun-ink" />
						<blockquote className="reveal-scroll mt-6 text-pretty font-serif text-2xl italic leading-snug text-ink-soft sm:text-3xl">
							“{study.quote.text}”
						</blockquote>
						<figcaption className="mt-6 text-sm text-mute">
							{study.quote.name} · {study.quote.role}
						</figcaption>
					</figure>
				</section>
			) : null}

			{/* ============ RELATED ============ */}
			{related.length > 0 ? (
				<section className="site-wide section-shell pt-0">
					<div className="mb-8 flex items-center justify-between">
						<p className="kicker">More work</p>
						<Link to="/work" className="button-ghost">
							All work <ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="reveal-stagger grid gap-5 md:grid-cols-2">
						{related.map((other) => (
							<Link
								key={other.slug}
								to="/work/$slug"
								params={{ slug: other.slug }}
								data-spotlight
								className="panel panel-hover group flex flex-col p-7"
							>
								<span className="tag w-fit">{other.industry}</span>
								<h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-ink">
									{other.summary}
								</h3>
								<div className="mt-6 font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-none">
									<span className="gradient-warm">
										{other.results[0]?.metric}
									</span>
								</div>
								<span className="button-ghost mt-5 w-fit !px-0 text-violet-ink">
									Read case
									<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
								</span>
							</Link>
						))}
					</div>
				</section>
			) : null}

			<CTASection
				title="Could your business run on one system like this?"
				description="Start with a conversation. We’ll show you what one unified system could change."
				primaryLabel="Book a free call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
