import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	CalendarClock,
	CalendarDays,
	CheckCircle2,
	Compass,
	LineChart,
	Lock,
	Mail,
	Map as MapIcon,
	MapPin,
	MessageSquareText,
	Phone,
	Search,
	Workflow,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import GuaranteeBand from "../components/GuaranteeBand";
import InteractiveAura from "../components/InteractiveAura";
import MagneticLink from "../components/MagneticLink";
import ProcessFlow from "../components/ProcessFlow";
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

const engagements = [
	{
		icon: CalendarDays,
		title: "Discovery Sprint",
		detail:
			"A focused engagement to map how your business runs and design the system — you leave with a blueprint and a value case.",
	},
	{
		icon: MessageSquareText,
		title: "Executive briefing",
		detail:
			"A working session with your leadership on where a bespoke system pays off, what to build first, and how it's governed.",
	},
	{
		icon: Workflow,
		title: "Technical deep-dive",
		detail:
			"A hands-on review of your systems, data, and workflows with our engineers to pressure-test the build before it starts.",
	},
];

const meetingSteps = [
	{
		n: "01",
		title: "Walk your systems",
		desc: "We sit with your team — in person or via Teams — and map how the business runs today.",
		icon: Compass,
	},
	{
		n: "02",
		title: "Identify opportunities",
		desc: "We pinpoint where bespoke software removes friction, cost, and manual work.",
		icon: Search,
	},
	{
		n: "03",
		title: "Capture the value",
		desc: "We quantify the upside, so the business case is clear before anyone commits.",
		icon: LineChart,
	},
	{
		n: "04",
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
			<InteractiveAura />

			<section className="glow section-shell">
				<div className="site-wide">
					<div className="dimline reveal-up mb-10">
						Mation — {offer.meetingShort} · Auckland NZ
					</div>
					<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
						<div>
							<p className="kicker reveal-up">Start here</p>
							<h1 className="reveal-up delay-1 mt-5 display text-[2.5rem] text-ink sm:text-6xl lg:text-[3.6rem]">
								Book a free exploration meeting.{" "}
								<span className="gradient-ink">We'll map the system.</span>
							</h1>
							<p className="reveal-up delay-2 mt-6 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
								{offer.meeting}
							</p>

							<div className="reveal-up delay-3 mt-8">
								<p className="kicker mb-3">Reach us directly</p>
								<div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border">
									<a
										href={`mailto:${mationMeta.email}`}
										className="panel-hover flex items-center gap-3 bg-surface p-5"
									>
										<Mail className="h-4 w-4 shrink-0 text-violet" />
										<span className="text-sm text-ink-soft">
											{mationMeta.email}
										</span>
									</a>
									<a
										href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
										className="panel-hover flex items-center gap-3 bg-surface p-5"
									>
										<Phone className="h-4 w-4 shrink-0 text-violet" />
										<span className="text-sm text-ink-soft">
											{mationMeta.phone}
										</span>
									</a>
									<div className="flex items-center gap-3 bg-surface p-5">
										<MapPin className="h-4 w-4 shrink-0 text-violet" />
										<span className="text-sm text-ink-soft">
											{mationMeta.location}
										</span>
									</div>
								</div>
							</div>

							<ul className="reveal-up delay-4 mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-violet" /> In person or
									via Teams
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-violet" /> No
									obligations
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-violet" /> Reply within
									one business day
								</li>
							</ul>

							<p className="reveal-up delay-4 mt-6 max-w-xl text-sm leading-relaxed text-mute">
								Engagements run from{" "}
								<span className="font-medium text-ink-soft">
									{offer.priceLow}
								</span>{" "}
								to{" "}
								<span className="font-medium text-ink-soft">
									{offer.priceHigh}
								</span>
								, on a plan that suits you —{" "}
								<MagneticLink
									to="/plans"
									className="font-medium text-violet-ink underline-offset-4 hover:underline"
								>
									see the flexible plans
								</MagneticLink>
								. Every build is backed by our {offer.guaranteeShort}.
							</p>
						</div>

						<div className="reveal-up delay-2 relative">
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
											Thanks — we'll be in touch within one business day.
										</h2>
										<p className="mt-4 text-pretty leading-relaxed text-mute">
											We'll review how you operate today and come back to set up
											your free exploration meeting — in person or via Teams,
											with no obligations.
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
											<p className="section-index">
												<b>01</b> &nbsp;/&nbsp; About you
											</p>
											<span className="inline-flex items-center gap-1.5 text-xs text-mute">
												<Lock className="h-3.5 w-3.5 text-violet" />
												Private — goes straight to our team
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

										<p className="dimline py-1">02 · About the work</p>

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
												: "Book a free exploration meeting"}
										</button>
										<p className="mt-3 text-center text-xs text-mute sm:text-left">
											We’ll set up your free exploration meeting — in person or
											via Teams, with no obligations.
										</p>
									</form>
								)}
							</div>
							<div className="absolute -right-3 -top-3 hidden rounded-[var(--radius-sm)] border border-border bg-surface px-3 py-2 shadow-[var(--shadow-sm)] sm:block">
								<span className="inline-flex items-center gap-1.5 text-xs font-medium text-mute">
									<span className="live-dot" aria-hidden="true" />1 business day
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-12 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>03</b> &nbsp;/&nbsp; What happens in the meeting
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							A focused walk through your business.
						</h2>
						<p className="mt-4 max-w-2xl text-mute">{offer.meeting}</p>
					</div>
					<p className="dimline hidden max-w-xs md:flex">
						In-person or Teams · no obligation
					</p>
				</div>
				<div className="reveal-scroll">
					<ProcessFlow steps={meetingSteps} />
				</div>
			</section>

			<section className="site-wide section-shell pt-0">
				<p className="section-index reveal-scroll mb-6">
					<b>04</b> &nbsp;/&nbsp; The guarantee
				</p>
				<div className="reveal-scroll">
					<GuaranteeBand />
				</div>
			</section>

			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-10 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>05</b> &nbsp;/&nbsp; Ways to start
						</p>
						<h2 className="max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.4rem]">
							Pick the entry point that fits where you are.
						</h2>
					</div>
					<p className="dimline hidden max-w-xs md:flex">
						Scoped · low-commitment
					</p>
				</div>
				<div className="reveal-stagger grid gap-5 md:grid-cols-3">
					{engagements.map((option) => (
						<article key={option.title} className="panel panel-hover group p-7">
							<span aria-hidden className="card-node" />
							<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface-violet text-violet">
								<option.icon className="h-5 w-5" />
							</div>
							<h2 className="font-heading text-xl font-semibold text-ink">
								{option.title}
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-mute">
								{option.detail}
							</p>
						</article>
					))}
				</div>
				<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
					<p className="flex items-center gap-2 text-sm text-mute">
						<CheckCircle2 className="h-4 w-4 shrink-0 text-violet" />
						Not sure which fits? Send the form and we'll suggest the right
						starting point.
					</p>
					<MagneticLink to="/plans" className="button-secondary">
						See flexible plans
						<ArrowRight className="h-4 w-4" />
					</MagneticLink>
				</div>
			</section>
		</>
	);
}
