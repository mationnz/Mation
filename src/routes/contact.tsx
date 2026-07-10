import { createFileRoute } from "@tanstack/react-router";
import {
	CalendarClock,
	CheckCircle2,
	Compass,
	LineChart,
	Lock,
	Mail,
	Map as MapIcon,
	MapPin,
	Phone,
	Search,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import MagneticLink from "../components/MagneticLink";
import { mationMeta, offer } from "../content/site";
import { sendContact } from "../server/sendContact";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Book a free exploration meeting — Mation" },
			{
				name: "description",
				content:
					"Start a build with Mation. Tell us how your business runs today and we'll map the bespoke system it should run on, with clear scope and a value case.",
			},
			{
				property: "og:title",
				content: "Book a free exploration meeting — Mation",
			},
			{
				property: "og:description",
				content:
					"Start with a conversation. We learn how you operate and show you what one unified system, engineered around you, could change.",
			},
		],
	}),
});

const inputClass =
	"mt-2 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-3 text-ink outline-none transition placeholder:text-faint focus:border-violet focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0";
const labelClass = "block text-sm font-medium text-ink-soft";

const meetingSteps = [
	{
		title: "Walk your systems",
		desc: "We sit with your team — in person or via Teams — and map how the business runs today.",
		icon: Compass,
	},
	{
		title: "Identify opportunities",
		desc: "We pinpoint where bespoke software removes friction, cost, and manual work.",
		icon: Search,
	},
	{
		title: "Capture the value",
		desc: "We quantify the upside, so the business case is clear before anyone commits.",
		icon: LineChart,
	},
	{
		title: "Propose a path",
		desc: "You leave with a clear, no-obligation plan for what to build first.",
		icon: MapIcon,
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
					role: String(fd.get("role") ?? ""),
					industry: String(fd.get("industry") ?? ""),
					timeline: String(fd.get("timeline") ?? ""),
					systems: String(fd.get("systems") ?? ""),
					message: String(fd.get("message") ?? ""),
				},
			});
			setStatus(result.ok ? "sent" : "error");
		} catch {
			setStatus("error");
		}
	};

	return (
		<>
			{/* ---------- Hero + form ---------- */}
			<section className="relative overflow-hidden">
				<div className="aurora" aria-hidden />
				<div className="site-wide relative section-shell">
					<div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
						{/* Left — intro + direct contact */}
						<div>
							<p className="kicker reveal-up">Get in touch</p>
							<h1 className="reveal-up delay-1 mt-5 display text-[2.5rem] leading-[1.05] text-ink sm:text-6xl lg:text-[3.6rem]">
								Let’s map the system{" "}
								<span className="gradient-ink">your business runs on.</span>
							</h1>
							<p className="reveal-up delay-2 mt-6 max-w-xl text-lg leading-relaxed text-mute">
								Start with a free, no-obligation call — in person or via Teams.
								We’ll learn how you operate and show you what one unified system
								could change.
							</p>

							<div className="reveal-up delay-3 mt-9 grid gap-3">
								<a
									href={`mailto:${mationMeta.email}`}
									className="panel panel-hover flex items-center gap-3 p-4"
								>
									<Mail className="h-4 w-4 shrink-0 text-violet" />
									<span className="text-sm text-ink-soft">
										{mationMeta.email}
									</span>
								</a>
								<a
									href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
									className="panel panel-hover flex items-center gap-3 p-4"
								>
									<Phone className="h-4 w-4 shrink-0 text-violet" />
									<span className="text-sm text-ink-soft">
										{mationMeta.phone}
									</span>
								</a>
								<div className="panel flex items-center gap-3 p-4">
									<MapPin className="h-4 w-4 shrink-0 text-violet" />
									<span className="text-sm text-ink-soft">
										{mationMeta.location}
									</span>
								</div>
							</div>

							<ul className="reveal-up delay-4 mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-violet" /> No obligations
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-violet" /> Reply within
									one business day
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-violet" />{" "}
									{offer.guaranteeShort}
								</li>
							</ul>
						</div>

						{/* Right — the form */}
						<div className="reveal-up delay-2">
							<div className="panel ticked rounded-[var(--radius-lg)] p-7 sm:p-8">
								{status === "sent" ? (
									<div
										aria-atomic="true"
										aria-live="polite"
										className="panel-line rounded-[var(--radius)] p-6 sm:p-7"
									>
										<p className="kicker">Request received</p>
										<h2
											ref={successRef}
											tabIndex={-1}
											className="mt-4 font-heading text-2xl font-semibold text-ink outline-none sm:text-3xl"
										>
											Thanks — we’ll be in touch within one business day.
										</h2>
										<p className="mt-4 text-pretty leading-relaxed text-mute">
											We’ll review how you operate today and come back to set up
											your free call — in person or via Teams, with no
											obligations.
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
									<form className="space-y-5" onSubmit={handleSubmit}>
										<div className="flex flex-wrap items-center justify-between gap-2">
											<p className="kicker">Tell us about you</p>
											<span className="inline-flex items-center gap-1.5 text-xs text-mute">
												<Lock className="h-3.5 w-3.5 text-violet" />
												Private — straight to our team
											</span>
										</div>

										<div className="grid gap-5 sm:grid-cols-2">
											<div>
												<label
													htmlFor={`${fieldId}-name`}
													className={labelClass}
												>
													Name *
												</label>
												<input
													required
													id={`${fieldId}-name`}
													type="text"
													name="name"
													autoComplete="name"
													className={inputClass}
													placeholder="Alex Carter"
												/>
											</div>
											<div>
												<label
													htmlFor={`${fieldId}-email`}
													className={labelClass}
												>
													Work email *
												</label>
												<input
													required
													id={`${fieldId}-email`}
													type="email"
													name="email"
													autoComplete="email"
													className={inputClass}
													placeholder="alex@company.com"
												/>
											</div>
										</div>

										<div className="grid gap-5 sm:grid-cols-2">
											<div>
												<label
													htmlFor={`${fieldId}-company`}
													className={labelClass}
												>
													Company *
												</label>
												<input
													required
													id={`${fieldId}-company`}
													type="text"
													name="company"
													autoComplete="organization"
													className={inputClass}
													placeholder="Company name"
												/>
											</div>
											<div>
												<label
													htmlFor={`${fieldId}-role`}
													className={labelClass}
												>
													Role *
												</label>
												<input
													required
													id={`${fieldId}-role`}
													type="text"
													name="role"
													autoComplete="organization-title"
													className={inputClass}
													placeholder="e.g. Head of Operations"
												/>
											</div>
										</div>

										<div className="grid gap-5 sm:grid-cols-2">
											<div>
												<label
													htmlFor={`${fieldId}-industry`}
													className={labelClass}
												>
													Industry
												</label>
												<select
													id={`${fieldId}-industry`}
													name="industry"
													className={`${inputClass} appearance-none`}
												>
													<option value="">Select industry</option>
													<option value="manufacturing">Manufacturing</option>
													<option value="finance">Finance & insurance</option>
													<option value="healthcare">Healthcare</option>
													<option value="technology">Technology</option>
													<option value="logistics">
														Logistics & field services
													</option>
													<option value="other">Other</option>
												</select>
											</div>
											<div>
												<label
													htmlFor={`${fieldId}-timeline`}
													className={labelClass}
												>
													Timeline
												</label>
												<select
													id={`${fieldId}-timeline`}
													name="timeline"
													className={`${inputClass} appearance-none`}
												>
													<option value="">Select timeline</option>
													<option value="0-30">0–30 days</option>
													<option value="30-90">30–90 days</option>
													<option value="90+">90+ days</option>
												</select>
											</div>
										</div>

										<div>
											<label
												htmlFor={`${fieldId}-systems`}
												className={labelClass}
											>
												Systems in use *
											</label>
											<input
												required
												id={`${fieldId}-systems`}
												type="text"
												name="systems"
												className={inputClass}
												placeholder="e.g. Salesforce, Xero, Jira, Slack"
											/>
										</div>

										<div>
											<label
												htmlFor={`${fieldId}-message`}
												className={labelClass}
											>
												What do you want to automate or improve? *
											</label>
											<textarea
												required
												id={`${fieldId}-message`}
												name="message"
												rows={3}
												className={inputClass}
												placeholder="Tell us where the work gets stuck today."
											/>
										</div>

										{status === "error" ? (
											<p
												aria-live="polite"
												className="rounded-[var(--radius-sm)] border border-[var(--color-danger)] bg-surface-warm px-4 py-3 text-sm text-ink-soft"
											>
												Sorry — that didn’t send. Please email{" "}
												<a
													href={`mailto:${mationMeta.email}`}
													className="font-medium text-violet-ink underline-offset-4 hover:underline"
												>
													{mationMeta.email}
												</a>{" "}
												directly and we’ll come straight back to you.
											</p>
										) : null}
										<button
											type="submit"
											disabled={status === "sending"}
											className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
										>
											<CalendarClock className="h-4 w-4" />
											{status === "sending"
												? "Sending…"
												: "Book a free call"}
										</button>
										<p className="mt-3 text-center text-xs text-mute sm:text-left">
											We’ll set up your free call — in person or via Teams, with
											no obligations.
										</p>
									</form>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ---------- What happens in the meeting ---------- */}
			<section className="site-wide section-shell pt-0">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="kicker reveal-scroll justify-center">
						What happens on the call
					</p>
					<h2 className="reveal-scroll mt-5 font-heading text-4xl font-semibold text-ink sm:text-5xl">
						A focused walk through your business.
					</h2>
				</div>
				<div className="reveal-stagger grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{meetingSteps.map((step) => (
						<div key={step.title}>
							<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-violet text-violet">
								<step.icon className="h-5 w-5" />
							</div>
							<h3 className="mt-5 font-heading text-lg font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mute">
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
