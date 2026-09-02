import { createFileRoute, Link } from "@tanstack/react-router";

import { legal, mationMeta, pricing } from "../content/site";

export const Route = createFileRoute("/terms")({
	component: TermsPage,
	head: () => ({
		meta: [
			{ title: "Website terms — Mation" },
			{
				name: "description",
				content:
					"Terms for using mation.nz. Services are governed by a separate written client agreement; prices on the site are in NZD and exclude GST.",
			},
			{ property: "og:title", content: "Website terms — Mation" },
			{
				property: "og:description",
				content:
					"Terms for using this website. Services are governed by a separate client agreement.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

function TermsPage() {
	return (
		<section className="site-shell section pt-8 sm:pt-14">
			<h1 className="display max-w-3xl">Website terms.</h1>
			<p className="mt-4 font-mono text-sm text-mute">
				Last updated {legal.termsUpdated}
			</p>

			<div className="prose mt-10 text-ink-soft">
				<p>
					These terms cover your use of the website at {mationMeta.url}. They do
					not cover any software or service Mation provides to a client. That is
					governed by a separate, written client agreement, which you will see
					before any money changes hands.
				</p>

				<h2>What this site is</h2>
				<p>
					General information about Mation, the platform we run, what a client
					owns, and what our Managed tier costs. It is not advice, and it is not
					an offer that becomes a contract by you reading it. Any engagement
					begins only when a written agreement is signed by both sides.
				</p>

				<h2>Prices</h2>
				<p>
					{pricing.gstNote} A price on this site is the price we will put in a
					written proposal for the Managed tier as described here. Where the
					site says something is scoped rather than priced, it means exactly
					that: there is no price until we have scoped it with you in writing.
				</p>

				<h2>Accuracy</h2>
				<p>
					We take care that every statement on this site is one we can
					demonstrate. If you find one we can’t, tell us at{" "}
					<a href={`mailto:${mationMeta.email}`}>{mationMeta.email}</a> and we
					will correct it. We may change the site at any time; the date on this
					page and on the <Link to="/privacy">privacy statement</Link> records
					the last review.
				</p>

				<h2>Your information</h2>
				<p>
					How we handle anything you send us through this site is set out in the{" "}
					<Link to="/privacy">privacy statement</Link>.
				</p>

				<h2>Content and marks</h2>
				<p>
					The text, design and marks on this site belong to Mation. You may
					quote from it with attribution. You may not present it as your own or
					use the Mation name or mark to suggest an association that doesn’t
					exist.
				</p>

				<h2>Links</h2>
				<p>
					Where we link to another site, we are pointing, not endorsing. That
					site’s terms and privacy practices are its own.
				</p>

				<h2>Liability</h2>
				<p>
					This site is provided as is. To the extent New Zealand law allows, we
					are not liable for loss arising from reliance on the site itself. This
					clause is about the website; it does not limit anything in a client
					agreement, and it does not exclude any right you have under New
					Zealand law that cannot be excluded.
				</p>

				<h2>Law</h2>
				<p>
					These terms are governed by New Zealand law, and the New Zealand
					courts have jurisdiction over any dispute about them.
				</p>
			</div>
		</section>
	);
}
