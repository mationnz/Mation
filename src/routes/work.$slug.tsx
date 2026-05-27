import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronRight,
	FlaskConical,
	Quote,
} from "lucide-react";

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
			<section className="section-shell">
				<div className="site-wide max-w-3xl space-y-7">
					<nav
						aria-label="Breadcrumb"
						className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-mute"
					>
						<Link to="/work" className="link-underline">
							Work
						</Link>
						<ChevronRight className="h-3.5 w-3.5" />
						<span className="text-ink/70">{study.industry}</span>
					</nav>

					<div className="flex flex-wrap items-center gap-2">
						<span className="tag">{study.industry}</span>
						<span className="tag">{study.year}</span>
						{study.isPlaceholder ? (
							<span className="tag !text-violet-bright">Sample case</span>
						) : null}
					</div>

					<h1 className="reveal-up display text-[2.4rem] text-ink sm:text-5xl lg:text-[3.4rem]">
						{study.summary}
					</h1>
					<p className="reveal-up delay-1 text-lg leading-relaxed text-mute">
						{study.client}
					</p>
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

			{/* The business & its problem */}
			<section className="site-wide section-shell pt-0">
				<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
					<div>
						<p className="section-index mb-4">
							<b>01</b> &nbsp;/&nbsp; The problem
						</p>
						<h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
							The business & where it was stuck
						</h2>
					</div>
					<p className="text-lg leading-relaxed text-ink/85">{study.problem}</p>
				</div>
			</section>

			{/* What we built */}
			<section className="site-wide section-shell pt-0">
				<p className="section-index mb-4">
					<b>02</b> &nbsp;/&nbsp; What we built
				</p>
				<h2 className="mb-8 max-w-2xl font-heading text-2xl font-semibold text-ink sm:text-3xl">
					One system, engineered around how they operate.
				</h2>
				<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)] sm:grid-cols-2">
					{study.whatWeBuilt.map((item) => (
						<div key={item} className="flex gap-3 bg-panel p-6">
							<Check className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" />
							<p className="text-[0.95rem] leading-relaxed text-ink/85">
								{item}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Before / after results */}
			<section className="site-wide section-shell pt-0">
				<div className="panel ticked overflow-hidden rounded-[22px] p-8 sm:p-12">
					<p className="section-index mb-8">
						<b>03</b> &nbsp;/&nbsp; The results
					</p>
					<div className="grid gap-8 sm:grid-cols-3">
						{study.results.map((result) => (
							<div key={result.label}>
								<div className="metric-value">{result.metric}</div>
								<p className="mt-2 text-sm leading-snug text-mute">
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
					<figure className="panel-line p-8 sm:p-12">
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
				<p className="section-index mb-4">
					<b>04</b> &nbsp;/&nbsp; Capabilities
				</p>
				<h2 className="mb-6 max-w-2xl font-heading text-2xl font-semibold text-ink sm:text-3xl">
					What this build drew on.
				</h2>
				<div className="flex flex-wrap gap-2">
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
					<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
						<p className="section-index">
							<b>05</b> &nbsp;/&nbsp; More work
						</p>
						<Link to="/work" className="button-ghost">
							All work <ArrowRight className="h-4 w-4" />
						</Link>
					</div>
					<div className="grid gap-5 md:grid-cols-2">
						{related.map((other) => (
							<Link
								key={other.slug}
								to="/work/$slug"
								params={{ slug: other.slug }}
								className="panel panel-hover group flex flex-col p-6"
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
				primaryLabel="Book a discovery call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
