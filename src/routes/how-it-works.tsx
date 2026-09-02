import { createFileRoute, Link } from "@tanstack/react-router";
import { Blocks, PenTool, Rocket, Search } from "lucide-react";

import CTASection from "../components/CTASection";
import PlatformFacts from "../components/PlatformFacts";
import ProcessFlow, { type Step } from "../components/ProcessFlow";
import Section from "../components/Section";
import Tiers from "../components/Tiers";

export const Route = createFileRoute("/how-it-works")({
	component: HowItWorksPage,
	head: () => ({
		meta: [
			{ title: "How it works — Mation" },
			{
				name: "description",
				content:
					"Mation runs a multi-tenant platform. Your business becomes a tenant on it: your own data, your own configuration, your own domain code where you need it — on a spine we maintain for every client at once.",
			},
			{ property: "og:title", content: "How it works — Mation" },
			{
				property: "og:description",
				content:
					"One platform, one tested spine, your system on it. What a tenant is, what sits underneath, and how your system is built.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const layers = [
	{
		owner: "you" as const,
		name: "App surfaces",
		desc: "The applications your team works in, in your brand.",
	},
	{
		owner: "you" as const,
		name: "Domain module",
		desc: "Only if you need capability the platform lacks. Source licensed to you.",
	},
	{
		owner: "you" as const,
		name: "Solution pack",
		desc: "Workflows, forms, rules, reports, roles, brand, vocabulary.",
	},
	{
		owner: "you" as const,
		name: "Your data",
		desc: "Every row. Isolated from every other tenant in the database.",
	},
	{
		owner: "mation" as const,
		name: "The Mation platform",
		desc: "Tenancy, identity, permissions, audit, events, entitlements, AI gate; shared engines, packages, adapters and schema.",
	},
];

const sequence: Step[] = [
	{
		n: "01",
		title: "Discovery",
		desc: "We map how your business runs: the processes, the hand-offs, the records that matter, and the systems you keep.",
		icon: Search,
		outcome: "A written scope and a fixed price.",
	},
	{
		n: "02",
		title: "Configuration",
		desc: "We write your solution pack on the platform. This is most of the work for most businesses.",
		icon: PenTool,
		outcome: "Your solution pack, yours under a perpetual licence.",
	},
	{
		n: "03",
		title: "Domain module",
		desc: "Only if the platform lacks a capability you genuinely need. Quoted separately, built as a module.",
		icon: Blocks,
		outcome: "The module’s source, licensed to you. It runs on the platform.",
	},
	{
		n: "04",
		title: "Go-live and run",
		desc: "Your team on the system. We host, monitor, support and update it, and every fix we ship reaches you.",
		icon: Rocket,
		outcome: "Fixed monthly, 24-month term.",
	},
];

function HowItWorksPage() {
	return (
		<>
			<section className="site-wide section pt-8 sm:pt-14">
				<div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
					<div>
						<h1 className="display reveal-up">
							One platform. Your system on it.
						</h1>
						<p className="lede reveal-up delay-1 mt-7">
							Mation runs a multi-tenant platform. Your business becomes a
							tenant on it: your own data, your own configuration, your own
							domain code where you need it — on a spine we maintain for every
							client at once.
						</p>
					</div>

					<figure className="reveal-up delay-2 m-0">
						<ol className="m-0 list-none p-0">
							{layers.map((layer, i) => (
								<li
									key={layer.name}
									className={`grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 border border-border px-5 py-4 ${
										i === 0 ? "rounded-t-[var(--radius)]" : "-mt-px"
									} ${
										i === layers.length - 1
											? "rounded-b-[var(--radius)] bg-surface-2"
											: "bg-surface"
									}`}
								>
									<span
										className={`swatch ${layer.owner === "you" ? "is-you" : "is-us"}`}
										aria-hidden
									/>
									<span>
										<span className="font-display text-[1.1rem] text-ink">
											{layer.name}
										</span>
										<span className="mt-0.5 block text-sm leading-snug text-mute">
											{layer.desc}
										</span>
									</span>
								</li>
							))}
						</ol>
						<figcaption className="mt-3 text-sm text-mute">
							<span className="swatch is-you" aria-hidden />
							Yours
							<span className="ml-5 swatch is-us" aria-hidden />
							Ours. The layers above cannot run without the one below.
						</figcaption>
					</figure>
				</div>
			</section>

			<Section label="What a tenant is">
				<h2 className="h2 max-w-3xl">
					Your own space on the platform, isolated in the database.
				</h2>
				<div className="prose mt-6 text-ink-soft">
					<p>
						A tenant is your business’s own isolated space on the platform: your
						users, your data, your configuration. Isolation is enforced with
						row-level security in the database, not just in application code, so
						one tenant cannot read another’s rows even if the application asked
						it to.
					</p>
					<p>
						Every tenant runs the same platform version. That is deliberate. A
						fix for one client is a fix for all of them, and a new client is
						configuration on a tested spine rather than a fresh codebase with
						fresh bugs.
					</p>
				</div>
			</Section>

			<Section label="What’s underneath">
				<h2 className="h2 max-w-3xl">The spine, in facts you can check.</h2>
				<p className="prose mt-6 text-ink-soft">
					The kernel handles tenancy, identity, permissions, audit, events,
					entitlements and the AI gate. Shared engines and packages sit on it.
					Your solution pack and any domain module sit on those. These are the
					numbers we can demonstrate; we publish no others.
				</p>
				<div className="mt-10">
					<PlatformFacts />
				</div>
			</Section>

			<Section label="How your system is built" index="Sequence">
				<h2 className="h2 max-w-3xl">
					Four steps. Each one ends with something you hold.
				</h2>
				<div className="mt-10">
					<ProcessFlow steps={sequence} />
				</div>
				<p className="mt-8 text-[0.95rem] text-mute">
					Read-only first, then approval gates, then wider access. How we roll
					out safely is on{" "}
					<Link to="/security" className="link-underline">
						security
					</Link>
					.
				</p>
			</Section>

			<Section label="Two tiers">
				<h2 className="h2 max-w-3xl">
					One tier is priced. The other is a conversation.
				</h2>
				<div className="mt-10">
					<Tiers />
				</div>
			</Section>

			<CTASection
				title="Tell us how your business runs."
				description="We’ll tell you whether it’s configuration or a module, what it would cost, and what you’d own."
				secondary={{ label: "See pricing", to: "/pricing" }}
			/>
		</>
	);
}
