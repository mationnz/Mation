import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import CTASection from "@/components/CTASection";
import InteractiveAura from "@/components/InteractiveAura";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/insights/")({
	component: InsightsPage,
	head: () => ({
		meta: [
			{ title: "Insights — How Mation thinks about building systems" },
			{
				name: "description",
				content:
					"Practical pieces on building bespoke systems, automation, integration, and governance — how we think about the software your business runs on.",
			},
			{
				property: "og:title",
				content: "Insights — How Mation thinks about building systems",
			},
			{
				property: "og:description",
				content:
					"Practical pieces on building bespoke systems, automation, integration, and governance — how we think about the software your business runs on.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

// Categories kept in sync with article.category values, in first-seen order.
const categories = [...new Set(articles.map((a) => a.category))];

function InsightsPage() {
	return (
		<>
			<InteractiveAura />

			{/* Hero */}
			<section className="section-shell">
				<div className="site-wide max-w-3xl space-y-7">
					<span className="pill reveal-up">
						<span className="live-dot" /> Insights
					</span>
					<h1 className="reveal-up delay-1 display text-[2.7rem] text-ink sm:text-6xl lg:text-[4rem]">
						How we think about{" "}
						<span className="gradient-ink">building systems</span>.
					</h1>
					<p className="reveal-up delay-2 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
						Practical pieces on building bespoke systems, automation,
						integration, and governance — written from the work, not the
						marketing deck.
					</p>
				</div>
			</section>

			{/* Categories + articles */}
			<section className="site-wide section-shell grid gap-12 pt-0 lg:grid-cols-[0.28fr_0.72fr]">
				{/* Topics */}
				<aside className="lg:sticky lg:top-28 lg:self-start">
					<p className="section-index mb-5">
						<b>{String(categories.length).padStart(2, "0")}</b> &nbsp;/&nbsp;
						Topics
					</p>
					<ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-2.5">
						{categories.map((cat) => (
							<li key={cat}>
								<span className="tag">{cat}</span>
							</li>
						))}
					</ul>
				</aside>

				{/* Article grid */}
				<div>
					<p className="section-index mb-6">
						<b>{String(articles.length).padStart(2, "0")}</b> &nbsp;/&nbsp;
						Latest writing
					</p>
					<div className="grid gap-5 sm:grid-cols-2">
						{articles.map((article) => (
							<Link
								key={article.slug}
								to="/insights/$slug"
								params={{ slug: article.slug }}
								className="panel panel-hover group flex flex-col p-6"
							>
								<div className="mb-4 flex items-center justify-between gap-3">
									<span className="tag">{article.category}</span>
									<ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-bright" />
								</div>
								<h2 className="font-heading text-xl font-semibold leading-snug text-ink">
									{article.title}
								</h2>
								<p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-mute">
									{article.excerpt}
								</p>
								<span className="mt-auto pt-5 font-mono text-xs uppercase tracking-[0.12em] text-violet-bright">
									{article.readTime}
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Bridge back to the work */}
			<section className="site-wide section-shell pt-0">
				<Link
					to="/work"
					className="panel panel-hover group flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between"
				>
					<div>
						<h3 className="font-heading text-lg font-semibold text-ink">
							These ideas, put to work.
						</h3>
						<p className="mt-1 max-w-xl text-sm leading-relaxed text-mute">
							See how the thinking here shows up in the systems we build for
							real businesses.
						</p>
					</div>
					<span className="button-ghost shrink-0">
						View our work
						<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
					</span>
				</Link>
			</section>

			<CTASection
				title="Want to talk through any of this for your business?"
				description="Start with a conversation. We’ll learn how you work today and show you what one unified system could change."
				primaryLabel="Book a discovery call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
