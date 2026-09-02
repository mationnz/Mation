import { createFileRoute, Link } from "@tanstack/react-router";

import CTASection from "@/components/CTASection";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/insights/")({
	component: InsightsPage,
	head: () => ({
		meta: [
			{ title: "Insights — Mation" },
			{
				name: "description",
				content:
					"Practical pieces on building operational systems, automation, integration, governance and measuring AI honestly — written from the work, not the marketing deck.",
			},
			{ property: "og:title", content: "Insights — Mation" },
			{
				property: "og:description",
				content:
					"Practical pieces on building operational systems, automation, integration, governance and measuring AI honestly.",
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
			<section className="site-wide section pt-8 sm:pt-14">
				<h1 className="display reveal-up max-w-4xl">Written from the work.</h1>
				<p className="lede reveal-up delay-1 mt-7">
					Practical pieces on building operational systems, automation,
					integration, governance, and measuring AI without lying to yourself.
					No client outcomes are cited here, because none have been measured
					yet.
				</p>
			</section>

			<section className="site-wide grid gap-10 border-t border-border py-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
				<aside className="lg:sticky lg:top-28 lg:self-start">
					<p className="label">Topics</p>
					<ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0 lg:flex-col lg:gap-2">
						{categories.map((cat) => (
							<li key={cat}>
								<span className="tag">{cat}</span>
							</li>
						))}
					</ul>
				</aside>

				<ul className="m-0 list-none divide-y divide-border border-y border-border-strong p-0">
					{articles.map((article) => (
						<li key={article.slug}>
							<Link
								to="/insights/$slug"
								params={{ slug: article.slug }}
								className="group grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_9rem] sm:items-baseline"
							>
								<span>
									<span className="tag">{article.category}</span>
									<span className="h3 mt-3 block transition-colors group-hover:text-violet-ink">
										{article.title}
									</span>
									<span className="mt-2 block max-w-[62ch] text-[0.95rem] leading-relaxed text-mute">
										{article.excerpt}
									</span>
								</span>
								<span className="font-mono text-sm text-mute sm:text-right">
									{article.readTime}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<CTASection
				title="Want to talk any of this through for your business?"
				description="Tell us how you run today. We’ll tell you what a system on our platform would change, what it would cost, and what you’d own."
				secondary={{ label: "What you own", to: "/what-you-own" }}
			/>
		</>
	);
}
