import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";

import CTASection from "../components/CTASection";
import Section from "../components/Section";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{ title: "About — Mation" },
			{
				name: "description",
				content:
					"Mation is a product company in Auckland, New Zealand. We run a platform; clients get a system on it and own their data, their configuration and their domain code. Services are how we bring a business onto the platform, not what we sell.",
			},
			{ property: "og:title", content: "About Mation" },
			{
				property: "og:description",
				content:
					"A product company in Auckland building the operational software New Zealand businesses run on.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const weAre = [
	"A product company with one platform, run for every client at once",
	"Engineers who configure and extend that platform for each business",
	"Accountable for running your system, not for billing hours",
	"Based in Auckland, working with New Zealand businesses",
	"Specific about what you own and what we own",
];

const weArent = [
	"A contract development shop — if that’s what you need, we’ll say so",
	"A per-user tool you bend your process around",
	"An “AI services” vendor selling chatbots",
	"A team that hands over a repository and leaves",
	"Vague about ownership, price, or what has been audited",
];

const principles = [
	{
		title: "Configuration, not a new codebase.",
		body: "A new client is a solution pack on a tested spine. That is why a system arrives in weeks, and why we refuse work that would mean forking the platform.",
	},
	{
		title: "Every fix, for every client.",
		body: "One platform version for everyone. A problem found by one tenant is fixed for all of them, and nobody is left on a stale branch.",
	},
	{
		title: "Read-only first.",
		body: "We start by reading from your systems before anything writes, then widen access one deliberate step at a time.",
	},
	{
		title: "Honest boundaries.",
		body: "We tell you what you own, what we own, what we’ve audited and what we haven’t — and when a contract development shop is the right call instead of us.",
	},
	{
		title: "Measure before claiming.",
		body: "We publish no client outcomes because we haven’t measured any yet. When we have, they’ll be here with the method, or they won’t be here at all.",
	},
];

function AboutPage() {
	return (
		<>
			<section className="site-wide section pt-8 sm:pt-14">
				<h1 className="display reveal-up max-w-4xl">
					A product company in Auckland, building the operational software New
					Zealand businesses run on.
				</h1>
				<p className="lede reveal-up delay-1 mt-7">
					Mation runs a platform. Clients get a system on it, and own their
					data, their configuration and their domain code. Services are how we
					bring a business onto the platform, not what we sell.
				</p>
			</section>

			<Section label="What we are">
				<div className="grid gap-5 md:grid-cols-2">
					<div className="panel p-7">
						<p className="label">We are</p>
						<ul className="m-0 mt-5 list-none space-y-3.5 p-0">
							{weAre.map((item) => (
								<li key={item} className="flex items-start gap-3 text-ink">
									<Check
										className="mt-1 h-4 w-4 shrink-0 text-violet"
										aria-hidden
									/>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="panel-line p-7">
						<p className="label">We are not</p>
						<ul className="m-0 mt-5 list-none space-y-3.5 p-0">
							{weArent.map((item) => (
								<li key={item} className="flex items-start gap-3 text-mute">
									<Minus
										className="mt-1 h-4 w-4 shrink-0 text-faint"
										aria-hidden
									/>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Section>

			<Section label="How we think">
				<ul className="m-0 list-none divide-y divide-border p-0">
					{principles.map((item) => (
						<li key={item.title} className="py-6 first:pt-0">
							<h2 className="h3">{item.title}</h2>
							<p className="prose mt-2 text-ink-soft">{item.body}</p>
						</li>
					))}
				</ul>
			</Section>

			<Section label="Where we are">
				<h2 className="h2 max-w-3xl">{mationMeta.location}.</h2>
				<address className="mt-6 not-italic text-[1.05rem] leading-relaxed text-ink-soft">
					<a href={`mailto:${mationMeta.email}`} className="link-underline">
						{mationMeta.email}
					</a>
					<br />
					<a
						href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
						className="link-underline"
					>
						{mationMeta.phone}
					</a>
				</address>
				<p className="mt-6 text-[0.95rem] text-mute">
					How we handle what you send us is on the{" "}
					<Link to="/privacy" className="link-underline">
						privacy statement
					</Link>
					.
				</p>
			</Section>

			<CTASection
				title="Tell us how your business runs."
				description="We’ll tell you what a system on our platform would cost, what you’d own, and how long it would take — or that we’re the wrong fit."
				secondary={{ label: "How it works", to: "/how-it-works" }}
			/>
		</>
	);
}
