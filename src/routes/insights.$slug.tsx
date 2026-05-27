import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowUpRight,
	Calendar,
	ChevronRight,
	Clock,
	User,
} from "lucide-react";

import CTASection from "@/components/CTASection";
import InteractiveAura from "@/components/InteractiveAura";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";

export const Route = createFileRoute("/insights/$slug")({
	component: ArticlePage,
	head: ({ params }) => {
		const article = getArticleBySlug(params.slug);
		if (!article)
			return {
				meta: [{ title: "Article not found — Mation" }],
			};

		return {
			meta: [
				{ title: `${article.title} — Mation` },
				{ name: "description", content: article.metaDescription },
				{ property: "og:title", content: article.title },
				{ property: "og:description", content: article.metaDescription },
				{ property: "og:type", content: "article" },
				{ property: "article:published_time", content: article.publishDate },
				{ property: "article:author", content: article.author },
			],
		};
	},
});

function ArticlePage() {
	const { slug } = Route.useParams();
	const article = getArticleBySlug(slug);

	if (!article) {
		return (
			<>
				<InteractiveAura />
				<section className="section-shell">
					<div className="site-shell mx-auto max-w-3xl space-y-6 text-center">
						<h1 className="font-heading text-4xl font-semibold text-ink">
							Article not found
						</h1>
						<p className="text-lg text-mute">
							The article you’re looking for doesn’t exist.
						</p>
						<Link
							to="/insights"
							className="button-secondary inline-flex items-center gap-2"
						>
							<ArrowLeft className="h-4 w-4" /> Back to Insights
						</Link>
					</div>
				</section>
			</>
		);
	}

	const related = getRelatedArticles(slug, 3);
	const publishDate = new Date(article.publishDate).toLocaleDateString(
		"en-NZ",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	);

	const lines = article.content
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
							url: "https://mation.nz",
						},
						publisher: {
							"@type": "Organization",
							name: "Mation",
							url: "https://mation.nz",
						},
						mainEntityOfPage: {
							"@type": "WebPage",
							"@id": `https://mation.nz/insights/${article.slug}`,
						},
					}),
				}}
			/>

			{/* Breadcrumb */}
			<section className="site-shell pt-28">
				<nav className="flex items-center gap-2 text-sm text-mute">
					<Link to="/insights" className="link-underline">
						Insights
					</Link>
					<ChevronRight className="h-3 w-3" />
					<span className="max-w-xs truncate text-ink/85">{article.title}</span>
				</nav>
			</section>

			{/* Article hero */}
			<section className="section-tight">
				<div className="site-shell mx-auto max-w-3xl space-y-6">
					<div className="reveal-up flex items-center justify-between gap-3">
						<span className="tag">{article.category}</span>
						<span className="bp-coord">DOC · {article.readTime}</span>
					</div>

					<h1 className="reveal-up font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
						{article.title}
					</h1>

					<p className="reveal-up delay-1 border-l-2 border-[var(--color-violet)] pl-5 text-xl leading-relaxed text-ink/85">
						{article.excerpt}
					</p>

					<div className="reveal-up delay-2 flex flex-wrap items-center gap-6 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.1em] text-mute">
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

			{/* Article body */}
			<section className="section-shell pt-0">
				<article className="site-shell mx-auto max-w-3xl">
					{renderArticle(lines)}
				</article>
			</section>

			{/* Related articles */}
			{related.length > 0 && (
				<section className="site-wide section-shell pt-0">
					<div className="site-shell mx-auto mb-12 max-w-3xl">
						<div className="dimline">End of article · keep reading</div>
					</div>
					<p className="section-index reveal-scroll mb-6">
						<b>{String(related.length).padStart(2, "0")}</b> &nbsp;/&nbsp;
						Related reading
					</p>
					<div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{related.map((rel) => (
							<Link
								key={rel.slug}
								to="/insights/$slug"
								params={{ slug: rel.slug }}
								className="panel panel-hover group flex flex-col p-6"
							>
								<div className="mb-4 flex items-center justify-between gap-3">
									<span className="tag">{rel.category}</span>
									<ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-bright" />
								</div>
								<h3 className="font-heading text-base font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-violet-bright">
									{rel.title}
								</h3>
								<span className="mt-auto pt-4 font-mono text-xs uppercase tracking-[0.12em] text-violet-bright">
									{rel.readTime}
								</span>
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Back to Insights */}
			<section className="site-shell pb-4">
				<Link
					to="/insights"
					className="button-secondary inline-flex items-center gap-2 text-sm"
				>
					<ArrowLeft className="h-4 w-4" /> Back to all insights
				</Link>
			</section>

			<CTASection
				title="Want to see this in your business?"
				description="Start with a conversation. We’ll learn how you work today and show you what one unified system could change."
				primaryLabel="Book a discovery call"
				secondaryLabel="See our approach"
			/>
		</>
	);
}

/** Lightweight markdown pass: groups tables and lists, formats inline marks. */
function renderArticle(lines: string[]) {
	const blocks: React.ReactNode[] = [];
	let i = 0;

	while (i < lines.length) {
		const start = i;
		const line = lines[i];

		if (!line) {
			i++;
			continue;
		}

		// Table — consecutive lines starting with "|"
		if (line.startsWith("|")) {
			const rows: string[] = [];
			while (i < lines.length && lines[i].startsWith("|")) {
				rows.push(lines[i]);
				i++;
			}
			blocks.push(<TableBlock key={start} rows={rows} />);
			continue;
		}

		// Bullet list — consecutive lines starting with "- "
		if (line.startsWith("- ")) {
			const items: string[] = [];
			while (i < lines.length && lines[i].startsWith("- ")) {
				items.push(lines[i].slice(2));
				i++;
			}
			blocks.push(
				<ul
					key={start}
					className="my-5 ml-5 list-disc space-y-2 marker:text-violet-bright"
				>
					{items.map((item) => (
						<li
							key={item}
							className="text-base leading-relaxed text-ink/85 sm:text-lg"
							// biome-ignore lint: rendered article content
							dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }}
						/>
					))}
				</ul>,
			);
			continue;
		}

		blocks.push(<Block key={start} line={line} />);
		i++;
	}

	return blocks;
}

function Block({ line }: { line: string }) {
	if (line.startsWith("## ")) {
		return (
			<h2 className="mb-5 mt-12 font-heading text-2xl font-semibold text-ink sm:text-3xl">
				{line.slice(3)}
			</h2>
		);
	}

	if (line.startsWith("### ")) {
		return (
			<h3 className="mb-4 mt-10 font-heading text-xl font-semibold text-ink sm:text-2xl">
				{line.slice(4)}
			</h3>
		);
	}

	if (line.startsWith('"')) {
		return (
			<blockquote
				className="my-5 border-l-2 border-[var(--color-violet)] pl-5 text-base italic leading-relaxed text-mute sm:text-lg"
				// biome-ignore lint: rendered article content
				dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
			/>
		);
	}

	// Standalone emphasis line (single asterisks only — not **bold**)
	if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
		return (
			<p className="my-4 border-l-2 border-line pl-5 text-base italic leading-relaxed text-mute sm:text-lg">
				{line.replace(/^\*+|\*+$/g, "")}
			</p>
		);
	}

	return (
		<p
			className="mb-5 text-base leading-relaxed text-ink/85 sm:text-lg"
			// biome-ignore lint: rendered article content
			dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
		/>
	);
}

function TableBlock({ rows }: { rows: string[] }) {
	const isSeparator = (row: string) =>
		/^[|\s:-]+$/.test(row) && row.includes("-");
	const toCells = (row: string) =>
		row
			.replace(/^\||\|$/g, "")
			.split("|")
			.map((cell) => cell.trim());

	const data = rows.filter((row) => !isSeparator(row)).map(toCells);
	if (data.length === 0) {
		return null;
	}

	const [header, ...body] = data;

	return (
		<div className="my-6 overflow-x-auto">
			<table className="w-full border-collapse text-left text-sm">
				<thead>
					<tr>
						{header.map((cell) => (
							<th
								key={cell}
								className="border-b border-line px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] text-violet-bright"
							>
								{cell}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{body.map((row) => (
						<tr key={row.join("|")}>
							{row.map((cell, ci) => (
								<td
									key={`${row[0]}-${ci}`}
									className="border-b border-line px-3 py-2 align-top text-ink/85"
									// biome-ignore lint: rendered article content
									dangerouslySetInnerHTML={{
										__html: formatInlineMarkdown(cell),
									}}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function formatInlineMarkdown(text: string): string {
	return text
		.replace(
			/\*\*(.+?)\*\*/g,
			'<strong class="font-semibold text-ink">$1</strong>',
		)
		.replace(/\*(.+?)\*/g, "<em>$1</em>")
		.replace(
			/`(.+?)`/g,
			'<code class="rounded bg-white/[0.04] border border-line px-1.5 py-0.5 font-mono text-sm text-violet-bright">$1</code>',
		);
}
