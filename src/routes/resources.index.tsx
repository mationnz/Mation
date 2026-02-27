import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FileText, ChevronRight } from "lucide-react";

import CTASection from "@/components/CTASection";
import InteractiveAura from "@/components/InteractiveAura";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/resources/")({
	component: ResourcesPage,
	head: () => ({
		meta: [
			{ title: "Resources — Mation guides and articles" },
			{
				name: "description",
				content:
					"Read practical guides on deployable AI systems, generative interfaces, multi-agent orchestration, and governance.",
			},
			{
				property: "og:title",
				content: "Resources — Mation guides and articles",
			},
			{
				property: "og:description",
				content:
					"Read practical guides on deployable AI systems, generative interfaces, multi-agent orchestration, and governance.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const categories = [
	"Generative interfaces (chat-first, not chat-only)",
	"Multi-agent orchestration at scale",
	"Security, governance, audit trails",
	"Adoption design (UX patterns that stick)",
	"Operating system thinking (build vs buy, modularity)",
];

function ResourcesPage() {
	return (
		<>
			<InteractiveAura />

			<section className="section-shell pt-32 pb-16">
				<div className="site-shell max-w-4xl mx-auto text-center space-y-7">
					<div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(91,199,255,0.15)]">
						<BookOpen className="h-7 w-7 text-cyan-300" />
					</div>
					<h1 className="reveal-up font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
						Resources
					</h1>
					<p className="reveal-up delay-1 text-xl leading-relaxed text-indigo-100/80 max-w-2xl mx-auto">
						Practical guidance on building deployable AI systems, generative interfaces, and governed automation.
					</p>
				</div>
			</section>

			<section className="site-shell section-shell pt-0 grid lg:grid-cols-[0.3fr_0.7fr] gap-12">
				{/* Categories Sidebar */}
				<aside className="space-y-6">
					<h3 className="font-heading text-2xl font-semibold text-white mb-4">Categories</h3>
					<ul className="space-y-3">
						{categories.map((cat, i) => (
							<li key={i}>
								<button className="text-left py-2 px-4 rounded-lg w-full text-indigo-100/70 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 text-sm">
									{cat}
								</button>
							</li>
						))}
					</ul>
				</aside>

				{/* Article list */}
				<div className="space-y-6">
					<h3 className="font-heading text-2xl font-semibold text-white mb-6">Latest Articles</h3>
					<div className="grid gap-4">
						{articles.map((article) => (
							<Link
								key={article.slug}
								to="/resources/$slug"
								params={{ slug: article.slug }}
								className="panel-glass rounded-2xl p-6 sm:p-8 flex items-center justify-between group cursor-pointer hover:border-cyan-500/40 transition-colors"
							>
								<div className="flex gap-4 items-start">
									<div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 mt-1 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
										<FileText className="h-5 w-5 text-indigo-100/60 group-hover:text-cyan-300 transition-colors" />
									</div>
									<div>
										<h4 className="font-heading text-xl font-semibold text-indigo-100/90 group-hover:text-white transition-colors">{article.title}</h4>
										<p className="text-sm text-indigo-100/50 mt-1.5 leading-relaxed max-w-xl line-clamp-2">{article.excerpt}</p>
										<p className="text-sm tracking-widest uppercase text-indigo-100/40 mt-2.5 font-tech">{article.readTime}</p>
									</div>
								</div>
								<div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all ml-4">
									<ChevronRight className="h-4 w-4 text-white" />
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<CTASection
				title="Want a pilot plan?"
				description="Talk to our team about putting these patterns into practice."
				primaryLabel="Book a demo"
				secondaryLabel="Talk to an architect"
			/>
		</>
	)
}

