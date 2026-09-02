import { createFileRoute, Link } from "@tanstack/react-router";
import { EyeOff, GitPullRequestArrow, Radar, Users } from "lucide-react";

import CTASection from "../components/CTASection";
import ProcessFlow, { type Step } from "../components/ProcessFlow";
import Section from "../components/Section";
import TrustControlPanel from "../components/TrustControlPanel";

export const Route = createFileRoute("/security")({
	component: SecurityPage,
	head: () => ({
		meta: [
			{ title: "Security and governance — Mation" },
			{
				name: "description",
				content:
					"Every Mation tenant runs with least-privilege access by role, approval gates on sensitive actions, a full audit trail, and tenant isolation enforced in the database. Built to ISO 27001-aligned practices; not certified, no third-party audit performed.",
			},
			{ property: "og:title", content: "Security and governance — Mation" },
			{
				property: "og:description",
				content:
					"Least-privilege access, approval gates, full audit trails and database-enforced tenant isolation — and a plain statement of what has and hasn’t been audited.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const pillars = [
	{
		title: "Least-privilege access",
		desc: "Every person and process gets the minimum access the job needs — scoped by role, never more.",
	},
	{
		title: "Your data is yours",
		desc: "Every row exportable in full, in open formats, at any time. Isolation between tenants is enforced by row-level security in the database.",
	},
	{
		title: "Complete audit trails",
		desc: "Every action is recorded against the user or process that took it — evidence ready whenever you need it.",
	},
	{
		title: "Scoped integrations",
		desc: "Connections to your other tools reach only the systems you approve, with credentials held by the platform, not in the code.",
	},
	{
		title: "Approval gates",
		desc: "Sensitive actions wait for a person to say yes, so nothing irreversible happens without a human decision.",
	},
	{
		title: "A governed AI gate",
		desc: "Every AI call goes through one gate that applies your policy and records the call, so AI assistance is as accountable as any other action.",
	},
];

const rollout: Step[] = [
	{
		n: "01",
		title: "Read-only first",
		desc: "We start by reading from your systems — no writes, no changes. You see value before anything moves.",
		icon: EyeOff,
	},
	{
		n: "02",
		title: "Approval gates",
		desc: "When the system starts taking action, sensitive steps pause for a person to approve.",
		icon: GitPullRequestArrow,
	},
	{
		n: "03",
		title: "Observability",
		desc: "We confirm logging and audit coverage, so every action is visible and accountable.",
		icon: Radar,
	},
	{
		n: "04",
		title: "Wider access",
		desc: "Once it’s proven and trusted, we widen access to more workflows and more of your team.",
		icon: Users,
	},
];

const answers = [
	{ q: "Can we run read-only first?", a: "Yes." },
	{ q: "Can actions require approval?", a: "Yes." },
	{ q: "Can we restrict which systems are reachable?", a: "Yes." },
	{ q: "Do we own our data?", a: "Yes, unconditionally." },
	{
		q: "Are you ISO 27001 certified?",
		a: "No. We build to ISO 27001-aligned practices. No third-party audit has been performed.",
	},
	{
		q: "Who owns the code?",
		a: "Your solution pack and any domain module are yours under a perpetual licence. The platform is ours.",
	},
];

function SecurityPage() {
	return (
		<>
			<section className="site-wide section pt-8 sm:pt-14">
				<div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
					<div>
						<h1 className="display reveal-up">
							Security is part of the platform, not a bolt-on.
						</h1>
						<p className="lede reveal-up delay-1 mt-7">
							Every tenant runs with the same controls: least-privilege access,
							approval gates on sensitive actions, a full audit trail, and
							tenant isolation enforced in the database. Here is what that
							means, and what it doesn’t.
						</p>
					</div>

					<figure className="reveal-up delay-2 m-0 panel p-6 sm:p-7">
						<p className="label">Built to recognised standards</p>
						<p className="mt-3 text-[1.05rem] leading-relaxed text-ink">
							We build to ISO 27001-aligned practices.{" "}
							<span className="text-warm-ink">
								Not certified. No third-party audit has been performed.
							</span>
						</p>
						<p className="mt-4 border-t border-border pt-4 text-[0.95rem] leading-relaxed text-mute">
							If your auditors require a specific control, tell us and we’ll
							tell you honestly whether we meet it today.
						</p>
					</figure>
				</div>
			</section>

			<Section label="What’s built in">
				<h2 className="h2 max-w-3xl">Six controls every tenant runs with.</h2>
				<dl className="m-0 mt-10 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{pillars.map((pillar) => (
						<div key={pillar.title} className="bg-surface p-6">
							<dt className="h3 !text-[1.15rem]">{pillar.title}</dt>
							<dd className="m-0 mt-3 text-[0.95rem] leading-relaxed text-mute text-pretty">
								{pillar.desc}
							</dd>
						</div>
					))}
				</dl>
			</Section>

			<Section label="Safety at every step">
				<h2 className="h2 max-w-3xl">
					You decide what the system can do, and the audit trail shows it did
					only that.
				</h2>
				<p className="prose mt-6 text-ink-soft">
					Turn a safeguard off to see what it was protecting. There is no score
					here, because no honest one exists — the point is what each control
					closes off.
				</p>
				<div className="mt-10">
					<TrustControlPanel />
				</div>
			</Section>

			<Section label="How we roll out" index="Sequence">
				<h2 className="h2 max-w-3xl">We earn trust before we widen access.</h2>
				<div className="mt-10">
					<ProcessFlow steps={rollout} />
				</div>
			</Section>

			<Section label="Straight answers">
				<dl className="m-0 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{answers.map((item) => (
						<div key={item.q} className="bg-surface p-6">
							<dt className="text-[1rem] font-medium text-ink">{item.q}</dt>
							<dd className="m-0 mt-3 text-[0.95rem] leading-relaxed text-violet-ink">
								{item.a}
							</dd>
						</div>
					))}
				</dl>
				<p className="mt-6 text-[0.95rem] text-mute">
					The full ownership split, including what happens if we’re not here, is
					on{" "}
					<Link to="/what-you-own" className="link-underline">
						what you own
					</Link>
					.
				</p>
			</Section>

			<CTASection
				title="Have a control your auditors require?"
				description="Tell us what it is. We’ll say whether we meet it today, and if we don’t, what it would take."
				secondary={{ label: "What you own", to: "/what-you-own" }}
			/>
		</>
	);
}
