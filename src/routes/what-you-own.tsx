import { createFileRoute } from "@tanstack/react-router";

import Boundary from "../components/Boundary";
import CTASection from "../components/CTASection";
import OwnershipLedger from "../components/OwnershipLedger";
import Section from "../components/Section";
import { continuity, ownershipProse } from "../content/site";

export const Route = createFileRoute("/what-you-own")({
	component: WhatYouOwnPage,
	head: () => ({
		meta: [
			{ title: "What you own — Mation" },
			{
				name: "description",
				content:
					"The actual split. Your data, your solution pack, your domain code and your app surfaces are yours. The Mation platform underneath is ours, licensed to you. Here is what that means, and what happens if we’re not here.",
			},
			{
				property: "og:title",
				content: "What you own, and what you don’t — Mation",
			},
			{
				name: "og:description",
				content:
					"Your data, your configuration and your domain code are yours. The platform is ours. Escrow, a named successor, and unconditional data egress cover the rest.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const answers = [
	{
		q: "What happens if we stop paying?",
		a: "Access to the platform is suspended in full until the subscription is current. Your data stays exportable throughout — that obligation does not depend on any invoice, including one we’re disputing.",
	},
	{
		q: "Can we take our solution pack somewhere else?",
		a: "Yes. It is a documented manifest under a perpetual, royalty-free licence. Whether another provider can run it is their question to answer; nothing in our agreement stops you asking.",
	},
	{
		q: "Can we have the platform’s source?",
		a: "No. The platform is our product and stays ours. What is licensed to you is your solution pack and any domain module we write specifically for your business.",
	},
	{
		q: "Is this in the contract?",
		a: "You will see the client agreement before any money changes hands, and every sentence on this page is written so that it can be a clause in it. If the agreement and this page ever disagree, tell us — that is a bug we fix, not a negotiation.",
	},
];

function WhatYouOwnPage() {
	return (
		<>
			<section className="site-wide section pt-8 sm:pt-14">
				<h1 className="display reveal-up max-w-4xl">{ownershipProse.title}</h1>
				<p className="lede reveal-up delay-1 mt-7">{ownershipProse.intro}</p>
			</section>

			<section className="site-wide pb-6 reveal-up delay-2">
				<OwnershipLedger />
			</section>

			<Section label="In plain words">
				<ul className="m-0 list-none divide-y divide-border p-0">
					{ownershipProse.points.map((point) => (
						<li key={point.lead} className="py-7 first:pt-0">
							<h2 className="h3">{point.lead}</h2>
							<p className="prose mt-3 text-ink-soft">{point.body}</p>
						</li>
					))}
				</ul>
			</Section>

			<Section label="The limit">
				<h2 className="h2 max-w-3xl">
					A domain module cannot run without the platform.
				</h2>
				<p className="prose mt-6 text-ink-soft">
					Handing over the source is real and worth something. It is not the
					same as handing over something that runs on its own next Tuesday. So
					we don’t make the usual claim about “the code”. We say: you own your
					domain module’s source under a perpetual licence, and it runs on the
					Mation platform. That sentence is true, and it is the one we are
					prepared to put in a contract.
				</p>
			</Section>

			<Section label="Continuity">
				<h2 className="h2 max-w-3xl">{continuity.title}</h2>
				<p className="prose mt-6 text-ink-soft">{continuity.intro}</p>
				<ul className="m-0 mt-8 list-none divide-y divide-border border-y border-border-strong p-0">
					{continuity.body.map((item) => (
						<li key={item.lead} className="py-5 text-[1.05rem] leading-relaxed">
							<span className="font-semibold text-ink">{item.lead}</span>{" "}
							<span className="text-ink-soft">{item.body}</span>
						</li>
					))}
				</ul>
				<p className="mt-8 font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-tight text-ink max-w-2xl">
					{continuity.close}
				</p>
			</Section>

			<Section label="Straight answers">
				<dl className="m-0 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2">
					{answers.map((item) => (
						<div key={item.q} className="bg-surface p-6">
							<dt className="h3 !text-[1.15rem]">{item.q}</dt>
							<dd className="m-0 mt-3 text-[0.95rem] leading-relaxed text-mute text-pretty">
								{item.a}
							</dd>
						</div>
					))}
				</dl>
			</Section>

			<Boundary />

			<CTASection
				title="Ask us the question your lawyer would ask."
				description="Tell us how your business runs and what your procurement or regulator needs. We’ll answer in writing, and you’ll see the agreement before any money changes hands."
				secondary={{ label: "See pricing", to: "/pricing" }}
			/>
		</>
	);
}
