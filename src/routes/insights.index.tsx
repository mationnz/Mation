import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import CTASection from "@/components/CTASection";
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
					"Practical pieces on building bespoke systems, automation, integration, and governance.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const categories = [...new Set(articles.map((a) => a.category))];

function InsightsPage() {
	return (
		<>
			{/* ============ HERO ============ */}
			<section className="relative overflow-hidden">
				<div className="aura-warm" aria-hidden />
				<div className="site-wide relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
					<p className="kicker reveal-up justify-center">Insights</p>
					<h1 className="reveal-up delay-1 display mt-6 max-w-[16ch] text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.2rem]">
						How we think about{" "}
						<span className="gradient-warm serif-em">building systems.</span>
					</h1>
					<p className="reveal-up delay-2 mt-7 max-w-xl text-lg leading-relaxed text-mute">
						Written from the work, not the marketing deck.
					</p>
					<div className="reveal-up delay-3 mt-8 flex flex-wrap justify-center gap-2">
						{categories.map((cat) => (
							<span key={cat} className="tag">
								{cat}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* ============ ARTICLES ============ */}
			<section className="site-wide section-shell pt-0">
				<div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{articles.map((article) => (
						<Link
							key={article.slug}
							to="/insights/$slug"
							params={{ slug: article.slug }}
							data-spotlight
							className="panel panel-hover group flex flex-col p-7"
						>
							<span className="tag w-fit">{article.category}</span>
							<h2 className="mt-4 font-heading text-xl font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-violet">
								{article.title}
							</h2>
							<p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-mute">
								{article.excerpt}
							</p>
							<div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
								<span className="text-sm text-mute">{article.readTime}</span>
								<span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors duration-200 group-hover:text-violet">
									Read
									<ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
								</span>
							</div>
						</Link>
					))}
				</div>
			</section>

			<CTASection
				title="Want to talk through any of this for your business?"
				description="Start with a conversation. We’ll show you what one unified system could change."
				primaryLabel="Book a free call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}
