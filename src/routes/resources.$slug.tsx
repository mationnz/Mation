import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	ChevronRight,
	Clock,
	FileText,
	User,
} from "lucide-react";

import CTASection from "@/components/CTASection";
import InteractiveAura from "@/components/InteractiveAura";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";

export const Route = createFileRoute("/resources/$slug")({
	component: ArticlePage,
	head: ({ params }) => {
		const article = getArticleBySlug(params.slug);
		if (!article)
			return {
				meta: [{ title: "Article not found — Mation" }],
			}

		return {
			meta: [
				{ title: `${article.title} — Mation` },
				{ name: "description", content: article.metaDescription },
				{ property: "og:title", content: article.title },
				{
					property: "og:description",
					content: article.metaDescription,
				},
				{ property: "og:type", content: "article" },
				{
					property: "article:published_time",
					content: article.publishDate,
				},
				{ property: "article:author", content: article.author },
			],
		}
	},
});

function ArticlePage() {
	const { slug } = Route.useParams();
	const article = getArticleBySlug(slug);

	if (!article) {
		return (
			<>
				<InteractiveAura />
				<section className="section-shell pt-32 pb-16">
					<div className="site-shell max-w-3xl mx-auto text-center space-y-6">
						<h1 className="font-heading text-4xl font-semibold text-white">
							Article not found
						</h1>
						<p className="text-lg text-indigo-100/70">
							The article you're looking for doesn't exist.
						</p>
						<Link
							to="/resources"
							className="button-secondary inline-flex items-center gap-2"
						>
							<ArrowLeft className="h-4 w-4" /> Back to Resources
						</Link>
					</div>
				</section>
			</>
		)
	}

	const related = getRelatedArticles(slug, 3);
	const publishDate = new Date(article.publishDate).toLocaleDateString(
		"en-NZ",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	)

	// Split content into paragraphs and render
	const contentSections = article.content
		.trim()
		.split("\n")
		.map((line) => line.trim());

	return (
        <>
            <InteractiveAura />
            {/* JSON-LD Structured Data */}
            <script
				type="application/ld+json"
				// biome-ignore lint: needed for structured data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Article",
						headline: article.title,
						description: article.metaDescription,
						datePublished: article.publishDate,
						author: {
							"@type": "Organization",
							name: "Mation",
							url: "https://mation.ai",
						},
						publisher: {
							"@type": "Organization",
							name: "Mation",
							url: "https://mation.ai",
						},
						mainEntityOfPage: {
							"@type": "WebPage",
							"@id": `https://mation.ai/resources/${article.slug}`,
						},
					}),
				}}
			/>
            {/* Breadcrumb */}
            <section className="site-shell pt-28 pb-0">
				<nav className="flex items-center gap-2 text-sm text-indigo-100/50">
					<Link
						to="/resources"
						className="hover:text-white transition-colors"
					>
						Resources
					</Link>
					<ChevronRight className="h-3 w-3" />
					<span className="text-indigo-100/70 truncate max-w-xs">
						{article.title}
					</span>
				</nav>
			</section>
            {/* Article Hero */}
            <section className="section-shell pt-8 pb-8">
				<div className="site-shell max-w-3xl mx-auto space-y-6">
					<div className="flex flex-wrap items-center gap-4 text-sm">
						<span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-cyan-200 font-tech tracking-wider uppercase text-xs">
							<BookOpen className="h-3 w-3" />
							{article.category.split("(")[0].trim()}
						</span>
					</div>

					<h1 className="reveal-up font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
						{article.title}
					</h1>

					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80 italic border-l-2 border-cyan-500/30 pl-5">
						{article.excerpt}
					</p>

					<div className="reveal-up delay-2 flex flex-wrap items-center gap-6 text-sm text-indigo-100/50 pt-2 border-t border-white/5">
						<span className="inline-flex items-center gap-1.5">
							<User className="h-3.5 w-3.5" />
							{article.author}
						</span>
						<span className="inline-flex items-center gap-1.5">
							<Calendar className="h-3.5 w-3.5" />
							{publishDate}
						</span>
						<span className="inline-flex items-center gap-1.5">
							<Clock className="h-3.5 w-3.5" />
							{article.readTime}
						</span>
					</div>
				</div>
			</section>
            {/* Article Body */}
            <section className="section-shell pt-0 pb-16">
				<article className="site-shell max-w-3xl mx-auto article-body">
					{contentSections.map((line, i) => {
						if (!line) return null;

						if (line.startsWith("## ")) {
							return (
								<h2
									key={i}
									className="font-heading text-2xl sm:text-3xl font-semibold text-white mt-12 mb-5"
								>
									{line.replace("## ", "")}
								</h2>
							)
						}

						if (line.startsWith("### ")) {
							return (
								<h3
									key={i}
									className="font-heading text-xl sm:text-2xl font-semibold text-white mt-10 mb-4"
								>
									{line.replace("### ", "")}
								</h3>
							)
						}

						if (line.startsWith("- ")) {
							return (
								<li
									key={i}
									className="text-base sm:text-lg leading-relaxed text-indigo-100/78 ml-5 mb-2 list-disc"
								>
									<span
										// biome-ignore lint: content rendering
										dangerouslySetInnerHTML={{
											__html: formatInlineMarkdown(
												line.replace("- ", ""),
											),
										}}
									/>
								</li>
							)
						}

						if (line.startsWith("| ")) {
							// Handle table rows
							return (
								<div
									key={i}
									className="overflow-x-auto text-sm text-indigo-100/70 font-mono"
								>
									<pre className="whitespace-pre-wrap">
										{line}
									</pre>
								</div>
							)
						}

						if (line.startsWith("*") && line.endsWith("*")) {
							return (
                                <p
									key={i}
									className="text-base sm:text-lg leading-relaxed text-indigo-100/60 italic my-4 border-l-2 border-white/10 pl-5"
								>
                                    {line.replace(/^\*+|\*+$/g, "")}
                                </p>
                            )
						}

						if (
							line.startsWith('"') ||
							line.startsWith('"')
						) {
							return (
								<blockquote
									key={i}
									className="text-base sm:text-lg leading-relaxed text-indigo-100/60 italic my-4 border-l-2 border-cyan-500/30 pl-5"
								>
									{line}
								</blockquote>
							)
						}

						return (
							<p
								key={i}
								className="text-base sm:text-lg leading-relaxed text-indigo-100/78 mb-5"
							>
								<span
									// biome-ignore lint: content rendering
									dangerouslySetInnerHTML={{
										__html: formatInlineMarkdown(line),
									}}
								/>
							</p>
						)
					})}
				</article>
			</section>
            {/* Related Articles */}
            {related.length > 0 && (
				<section className="site-shell section-shell pt-0">
					<h3 className="font-heading text-2xl font-semibold text-white mb-8">
						Related reading
					</h3>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{related.map((rel) => (
							<Link
								key={rel.slug}
								to="/resources/$slug"
								params={{ slug: rel.slug }}
								className="panel-glass rounded-2xl p-6 group cursor-pointer hover:border-cyan-500/40 transition-colors"
							>
								<div className="flex gap-3 items-start">
									<div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
										<FileText className="h-4 w-4 text-indigo-100/60 group-hover:text-cyan-300 transition-colors" />
									</div>
									<div>
										<h4 className="font-heading text-base font-semibold text-indigo-100/90 group-hover:text-white transition-colors leading-snug">
											{rel.title}
										</h4>
										<p className="text-xs tracking-widest uppercase text-indigo-100/50 mt-2 font-tech">
											{rel.readTime}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}
            {/* Back to Resources */}
            <section className="site-shell pb-8">
				<Link
					to="/resources"
					className="button-secondary inline-flex items-center gap-2 text-sm"
				>
					<ArrowLeft className="h-4 w-4" /> Back to all articles
				</Link>
			</section>
            <CTASection
				title="Ready to see this in action?"
				description="Talk to our team about building governed AI systems that actually ship."
				primaryLabel="Book a demo"
				secondaryLabel="Talk to an architect"
			/>
        </>
    )
}

function formatInlineMarkdown(text: string): string {
	return text
		.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
		.replace(/\*(.+?)\*/g, "<em>$1</em>")
		.replace(/`(.+?)`/g, '<code class="bg-white/5 px-1.5 py-0.5 rounded text-cyan-200 text-sm font-mono">$1</code>');
}
