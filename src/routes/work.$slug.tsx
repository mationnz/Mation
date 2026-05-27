import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronRight,
	FlaskConical,
	Quote,
} from "lucide-react";

import CaseTransformDiagram from "../components/CaseTransformDiagram";
import CTASection from "../components/CTASection";
import InteractiveAura from "../components/InteractiveAura";
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
				{
					property: "og:title",
					content: `${study.industry} — Work | Mation`,
				},
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
				<InteractiveAura />
				<section className="section-shell">
					<div className="site-shell max-w-2xl space-y-6">
						<p className="section-index">
							<b>404</b> &nbsp;/&nbsp; Case study
						</p>
						<h1 className="font-heading text-4xl font-semibold text-ink sm:text-5xl">
							We couldn't find that case study.
						</h1>
						<p className="text-lg leading-relaxed text-mute">
							The link may be out of date, or the case hasn't been published
							yet. Browse the work we've selected so far.
						</p>
						<Link to="/work" className="button-secondary w-fit">
							<ArrowLeft className="h-4 w-4" />
							Back to all work
						</Link>
					</div>
				</section>
				<CTASection
					title="Let's map the operating system your business should run on."
					description="Start with a conversation. We'll learn how you work today and show you what one unified system could change."
				/>
			</>
		);
	}

	const related = getRelatedCases(slug, 2);

	return (
		<>
			<InteractiveAura />

			{/* Breadcrumb + header */}
			<section className="glow section-shell">
				<div className="site-wide">
					<div className="grid items-end gap-12 lg:grid-cols-[1.08fr_0.92fr]">
						<div className="max-w-3xl space-y-7">
							<nav
								aria-label="Breadcrumb"
								className="reveal-up flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-mute"
							>
								<Link to="/work" className="link-underline">
									Work
								</Link>
								<ChevronRight className="h-3.5 w-3.5" />
								<span className="text-ink/70">{study.industry}</span>
							</nav>

							<div className="reveal-up flex flex-wrap items-center gap-2">
								<span className="tag">{study.industry}</span>
								<span className="tag">{study.year}</span>
								{study.isPlaceholder ? (
									<span className="tag !text-violet-bright">Sample case</span>
								) : null}
							</div>

							<h1 className="reveal-up delay-1 display text-[2.4rem] text-ink sm:text-5xl lg:text-[3.4rem]">
								{study.summary}
							</h1>
							<p className="reveal-up delay-2 font-mono text-xs uppercase tracking-[0.12em] text-mute">
								{study.client}
							</p>
						</div>

						{/* Headline result, oversized — the case in one number */}
						<div className="reveal-up delay-2">
							<div className="bracket">
								<div className="panel ticked relative overflow-hidden rounded-[22px] p-7 sm:p-8">
									<span
										aria-hidden
										className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[radial-gradient(circle,var(--color-violet),transparent_70%)] opacity-25 blur-2xl"
									/>
									<p className="bp-coord relative">FIG.01 · Headline result</p>
									<div className="relative mt-4 font-heading text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
										<span className="gradient-ink">
											{study.results[0]?.metric}
										</span>
									</div>
									<p className="relative mt-3 text-sm leading-snug text-mute">
										{study.results[0]?.label}
									</p>
								</div>
							</div>
							<p className="bp-coord mt-3 text-center">
								FIG.01 · OUTCOME — MEASURED, NOT CLAIMED
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Placeholder banner */}
			{study.isPlaceholder ? (
				<section className="site-wide section-shell pt-0">
					<div className="panel-line flex items-start gap-4 p-5">
						<div className="inline-flex rounded-xl border border-line bg-white/[0.03] p-2.5 text-violet-bright">
							<FlaskConical className="h-4 w-4" />
						</div>
						<p className="text-sm leading-relaxed text-mute">
							<span className="font-medium text-ink">
								Sample case — pending client publication.
							</span>{" "}
							This is a representative example of the kind of system we build
							for a {study.industry.toLowerCase()} business. Figures and details
							are illustrative until the named client case study is published.
						</p>
					</div>
				</section>
			) : null}

			{/* The business & its problem + before→after diagram */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-10 max-w-2xl">
					<p className="section-index mb-4">
						<b>01</b> &nbsp;/&nbsp; The problem
					</p>
					<h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
						The business & where it was stuck
					</h2>
				</div>
				<div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
					<p className="text-lg leading-relaxed text-ink/85">{study.problem}</p>
					<div className="reveal-scroll">
						<CaseTransformDiagram
							figure="FIG.02 — BEFORE → AFTER"
							before={study.capabilities}
							after="One system, built around how they operate"
							outcome="Unified into one system they own"
						/>
					</div>
				</div>
			</section>

			{/* What we built */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-8 max-w-2xl">
					<p className="section-index mb-4">
						<b>02</b> &nbsp;/&nbsp; What we built
					</p>
					<h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
						One system, engineered around how they operate.
					</h2>
				</div>
				<div className="reveal-stagger grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
					{study.whatWeBuilt.map((item, i) => (
						<div key={item} className="relative bg-panel p-6">
							<span className="bp-coord absolute right-4 top-4">
								{`0${i + 1}`}
							</span>
							<Check className="h-5 w-5 shrink-0 text-violet-bright" />
							<p className="mt-3 text-[0.95rem] leading-relaxed text-ink/85">
								{item}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Before / after results — oversized numbers */}
			<section className="glow site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<div className="mb-10 flex flex-wrap items-end justify-between gap-4">
						<p className="section-index">
							<b>03</b> &nbsp;/&nbsp; The results
						</p>
						<span className="bp-coord">
							{`${study.results.length} metrics · before → after`}
						</span>
					</div>
					<div className="reveal-stagger grid gap-10 sm:grid-cols-3">
						{study.results.map((result) => (
							<div key={result.label}>
								<div className="font-heading text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
									<span className="gradient-ink">{result.metric}</span>
								</div>
								<p className="mt-3 max-w-[16rem] text-sm leading-snug text-mute">
									{result.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Quote */}
			{study.quote ? (
				<section className="site-wide section-shell pt-0">
					<figure className="reveal-scroll panel-line p-8 sm:p-12">
						<Quote className="h-7 w-7 text-violet-bright" />
						<blockquote className="mt-5 max-w-3xl text-pretty font-heading text-2xl font-semibold leading-snug text-ink sm:text-[1.9rem]">
							“{study.quote.text}”
						</blockquote>
						<figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-mute">
							{study.quote.name} · {study.quote.role}
						</figcaption>
					</figure>
				</section>
			) : null}

			{/* Capabilities / approach */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll">
					<p className="section-index mb-4">
						<b>04</b> &nbsp;/&nbsp; Capabilities
					</p>
					<h2 className="mb-6 max-w-2xl font-heading text-2xl font-semibold text-ink sm:text-3xl">
						What this build drew on.
					</h2>
				</div>
				<div className="reveal-stagger flex flex-wrap gap-2">
					{study.capabilities.map((capability) => (
						<span key={capability} className="pill">
							{capability}
						</span>
					))}
				</div>
			</section>

			{/* Related cases */}
			{related.length > 0 ? (
				<section className="site-wide section-shell pt-0">
					<div className="reveal-scroll mb-8 flex flex-wrap items-end justify-between gap-4">
						<p className="section-index">
							<b>05</b> &nbsp;/&nbsp; More work
						</p>
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
								className="panel panel-hover group relative flex flex-col p-6 sm:p-7"
							>
								<div className="flex items-center justify-between gap-3">
									<span className="tag">{other.industry}</span>
									{other.isPlaceholder ? (
										<span className="tag !text-violet-bright">Sample</span>
									) : null}
								</div>
								<h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-ink">
									{other.summary}
								</h3>

								{/* Oversized result echoes the index tiles */}
								<div className="mt-5 font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.04em]">
									<span className="gradient-ink">
										{other.results[0]?.metric}
									</span>
								</div>
								<p className="mt-2 text-xs leading-snug text-mute">
									{other.results[0]?.label}
								</p>

								<span className="button-ghost mt-5">
									Read case
									<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
								</span>
							</Link>
						))}
					</div>
				</section>
			) : null}

			{/* Back to all work */}
			<section className="site-wide section-shell pt-0">
				<Link to="/work" className="button-secondary w-fit">
					<ArrowLeft className="h-4 w-4" />
					Back to all work
				</Link>
			</section>

			<CTASection
				title="Could your business run on one system like this?"
				description="Start with a conversation. We'll learn how you work today and show you what one unified system could change."
				primaryLabel="Book a free exploration meeting"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
