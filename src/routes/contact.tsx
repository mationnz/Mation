import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";

import Section from "../components/Section";
import { cta, mationMeta } from "../content/site";
import { sendContact } from "../server/sendContact";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Talk to us — Mation" },
			{
				name: "description",
				content:
					"Tell us how your business runs. We’ll tell you what a system on the Mation platform would cost, what you’d own, and how long it would take. We reply within one business day.",
			},
			{ property: "og:title", content: "Talk to us — Mation" },
			{
				property: "og:description",
				content:
					"Four fields, one business day. We’ll tell you what a system on our platform would cost and what you’d own — or that we’re the wrong fit.",
			},
			{ property: "og:type", content: "website" },
		],
	}),
});

const next = [
	{
		title: "We reply within one business day",
		body: "A person reads it. If we’re clearly the wrong fit, we’ll say so in that reply and tell you who to call.",
	},
	{
		title: "A short call",
		body: "We ask how the work moves today, what you keep, and what your procurement or regulator needs.",
	},
	{
		title: "A written answer",
		body: "A scope, a fixed price, and what you’d own — in writing — or an honest no.",
	},
];

function ContactPage() {
	const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
		"idle",
	);
	const fieldId = useId();
	const successRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (status === "sent") {
			successRef.current?.focus();
		}
	}, [status]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const fd = new FormData(event.currentTarget);
		setStatus("sending");
		try {
			const result = await sendContact({
				data: {
					name: String(fd.get("name") ?? ""),
					email: String(fd.get("email") ?? ""),
					company: String(fd.get("company") ?? ""),
					message: String(fd.get("message") ?? ""),
					website: String(fd.get("website") ?? ""),
				},
			});
			setStatus(result.ok ? "sent" : "error");
		} catch {
			setStatus("error");
		}
	};

	return (
		<>
			<section className="site-wide section pt-8 sm:pt-14">
				<div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
					<div>
						<h1 className="display reveal-up">
							Tell us how your business runs.
						</h1>
						<p className="lede reveal-up delay-1 mt-7">
							We’ll tell you what a system on our platform would cost, what
							you’d own, and how long it would take. If we’re the wrong fit,
							we’ll say so.
						</p>
						<address className="reveal-up delay-2 mt-8 not-italic text-[1.02rem] leading-relaxed text-ink-soft">
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
							<br />
							<span className="text-mute">{mationMeta.location}</span>
						</address>
						<p className="reveal-up delay-3 mt-6 text-[0.95rem] text-mute">
							{cta.replyPromise}
						</p>
					</div>

					<div className="reveal-up delay-2 panel p-6 sm:p-8">
						{status === "sent" ? (
							<div aria-live="polite" aria-atomic="true">
								<h2 ref={successRef} tabIndex={-1} className="h2 outline-none">
									Thanks. We’ll reply within one business day.
								</h2>
								<p className="mt-4 leading-relaxed text-mute">
									Your message is with us. If it’s urgent, call{" "}
									<a
										href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
										className="link-underline"
									>
										{mationMeta.phone}
									</a>
									.
								</p>
								<button
									type="button"
									onClick={() => setStatus("idle")}
									className="button-secondary mt-6"
								>
									Send another message
								</button>
							</div>
						) : (
							<form className="space-y-5" onSubmit={handleSubmit} noValidate>
								<div className="grid gap-5 sm:grid-cols-2">
									<div>
										<label htmlFor={`${fieldId}-name`} className="field-label">
											Your name
										</label>
										<input
											required
											id={`${fieldId}-name`}
											type="text"
											name="name"
											autoComplete="name"
											className="field"
											maxLength={200}
										/>
									</div>
									<div>
										<label htmlFor={`${fieldId}-email`} className="field-label">
											Work email
										</label>
										<input
											required
											id={`${fieldId}-email`}
											type="email"
											name="email"
											autoComplete="email"
											className="field"
											maxLength={200}
										/>
									</div>
								</div>

								<div>
									<label htmlFor={`${fieldId}-company`} className="field-label">
										Company
									</label>
									<input
										required
										id={`${fieldId}-company`}
										type="text"
										name="company"
										autoComplete="organization"
										className="field"
										maxLength={200}
									/>
								</div>

								<div>
									<label htmlFor={`${fieldId}-message`} className="field-label">
										What does your business run on today, and what isn’t
										working?
									</label>
									<textarea
										required
										id={`${fieldId}-message`}
										name="message"
										rows={5}
										className="field"
										maxLength={5000}
									/>
								</div>

								{/* Honeypot: hidden from people, filled by bots. */}
								<div className="hidden" aria-hidden="true">
									<label htmlFor={`${fieldId}-website`}>Website</label>
									<input
										id={`${fieldId}-website`}
										type="text"
										name="website"
										tabIndex={-1}
										autoComplete="off"
									/>
								</div>

								{status === "error" ? (
									<p
										aria-live="polite"
										className="rounded-[var(--radius-sm)] border border-danger bg-surface-warm px-4 py-3 text-sm text-ink-soft"
									>
										That didn’t send. Email{" "}
										<a
											href={`mailto:${mationMeta.email}`}
											className="link-underline"
										>
											{mationMeta.email}
										</a>{" "}
										directly and we’ll come straight back to you.
									</p>
								) : null}

								<button
									type="submit"
									disabled={status === "sending"}
									className="button-primary w-full sm:w-auto"
								>
									{status === "sending" ? "Sending…" : "Send"}
								</button>
								<p className="text-sm leading-relaxed text-mute">
									We use what you send us only to reply and to scope work with
									you. It is stored by us and emailed to our inbox. Details are
									in the{" "}
									<Link to="/privacy" className="link-underline">
										privacy statement
									</Link>
									.
								</p>
							</form>
						)}
					</div>
				</div>
			</section>

			<Section label="What happens next" index="Sequence">
				<ol className="m-0 grid list-none gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border p-0 md:grid-cols-3">
					{next.map((step, i) => (
						<li key={step.title} className="bg-surface p-6">
							<span className="font-mono text-sm text-mute">0{i + 1}</span>
							<h2 className="h3 mt-3 !text-[1.2rem]">{step.title}</h2>
							<p className="mt-2 text-[0.95rem] leading-relaxed text-mute">
								{step.body}
							</p>
						</li>
					))}
				</ol>
				<p className="mt-6 text-[0.95rem] text-mute">
					The prices are already on{" "}
					<Link to="/pricing" className="link-underline">
						pricing
					</Link>
					, and the ownership split is on{" "}
					<Link to="/what-you-own" className="link-underline">
						what you own
					</Link>
					. Nothing on the call will contradict either.
				</p>
			</Section>
		</>
	);
}
