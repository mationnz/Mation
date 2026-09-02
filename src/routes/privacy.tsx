import { createFileRoute, Link } from "@tanstack/react-router";

import { legal, mationMeta } from "../content/site";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
	head: () => ({
		meta: [
			{ title: "Privacy statement — Mation" },
			{
				name: "description",
				content:
					"What Mation collects through mation.nz, why, where it goes, how long it is kept, and how to ask for access, correction or deletion under the Privacy Act 2020.",
			},
			{ property: "og:title", content: "Privacy statement — Mation" },
			{
				property: "og:description",
				content:
					"What we collect on this website, why, and how to reach us about it.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

function PrivacyPage() {
	return (
		<section className="site-shell section pt-8 sm:pt-14">
			<h1 className="display max-w-3xl">Privacy statement.</h1>
			<p className="mt-4 font-mono text-sm text-mute">
				Last updated {legal.privacyUpdated}
			</p>

			<div className="prose mt-10 text-ink-soft">
				<p>
					This statement covers the website at {mationMeta.url}. It says what we
					collect here, why, where it goes, and how to ask us about it. It is
					written to meet the Privacy Act 2020, in particular the requirement to
					tell you these things at the point we collect your information.
				</p>

				<h2>Who we are</h2>
				<p>
					Mation, {mationMeta.location}. You can reach us at{" "}
					<a href={`mailto:${mationMeta.email}`}>{mationMeta.email}</a> or{" "}
					<a href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}>
						{mationMeta.phone}
					</a>
					.
				</p>

				<h2>What we collect on this website</h2>
				<p>
					Only what you type into the <Link to="/contact">contact form</Link>:
					your name, your work email address, your company, and your message,
					together with the time you sent it. Nothing on this site is collected
					without you deliberately sending it.
				</p>
				<p>
					We do not run analytics, advertising pixels or tracking scripts. The
					only thing this site stores in your browser is your light-or-dark
					theme preference, which stays on your device and is never sent to us.
				</p>

				<h2>Why we collect it</h2>
				<p>
					To reply to your enquiry, and to scope and quote work with you if you
					want us to. We do not use it for anything else, and we do not add you
					to a mailing list.
				</p>

				<h2>Where it goes</h2>
				<ul>
					<li>
						It is stored by us, on the server that runs this website, so that an
						enquiry is never lost.
					</li>
					<li>
						It is emailed to our inbox through our transactional email provider,
						Resend, so that a person sees it promptly.
					</li>
				</ul>
				<p>
					We do not sell it, share it with anyone else, or use it to train
					anything.
				</p>

				<h2>How long we keep it</h2>
				<p>
					For as long as we need it to respond to you and to keep a record of
					what we discussed. You can ask us to delete your enquiry at any time,
					and we will.
				</p>

				<h2>Your rights</h2>
				<p>
					Under the Privacy Act 2020 you can ask to see the personal information
					we hold about you and ask us to correct it. Email{" "}
					<a href={`mailto:${mationMeta.email}`}>{mationMeta.email}</a>. If you
					are not satisfied with how we handle your request, you can complain to
					the{" "}
					<a
						href={legal.privacyCommissionerUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Office of the Privacy Commissioner
					</a>
					.
				</p>

				<h2>Client systems are different</h2>
				<p>
					If your business becomes a client, the information held in your system
					on the Mation platform is governed by the client agreement, not by
					this statement. In that arrangement your data is yours, and we hold it
					on your behalf under the terms of that agreement. See{" "}
					<Link to="/what-you-own">what you own</Link>.
				</p>

				<h2>Changes</h2>
				<p>
					If this statement changes, the date at the top changes with it. We
					will not apply a change retrospectively to information you have
					already given us without telling you.
				</p>
			</div>
		</section>
	);
}
