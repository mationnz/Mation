import { createFileRoute } from "@tanstack/react-router";
import {
	CalendarClock,
	CalendarDays,
	CheckCircle2,
	Mail,
	MapPin,
	MessageSquareText,
	Phone,
	Workflow,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import InteractiveAura from "../components/InteractiveAura";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Book a discovery call — Mation" },
			{
				name: "description",
				content:
					"Start a build with Mation. Tell us how your business runs today and we'll map the bespoke system it should run on, with clear scope and a value case.",
			},
			{
				property: "og:title",
				content: "Book a discovery call — Mation",
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
	"mt-2 w-full rounded-[10px] border border-line bg-panel px-4 py-3 text-ink outline-none transition placeholder:text-mute/60 focus:border-[rgba(166,146,255,0.55)] focus:ring-2 focus:ring-[rgba(123,97,255,0.25)]";
const labelClass =
	"block font-mono text-xs uppercase tracking-[0.14em] text-mute";

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

function ContactPage() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const fieldId = useId();
	const successRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (isSubmitted) {
			successRef.current?.focus();
		}
	}, [isSubmitted]);

	return (
		<>
			<InteractiveAura />

			<section className="glow section-shell">
				<div className="site-wide">
					<div className="dimline reveal-up mb-10">
						Mation — start here · discovery call · Auckland NZ
					</div>
					<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
						<div>
							<p className="kicker reveal-up">Start here</p>
							<h1 className="reveal-up delay-1 mt-5 display text-[2.5rem] text-ink sm:text-6xl lg:text-[3.6rem]">
								Tell us how your business runs.{" "}
								<span className="gradient-ink">We'll map the system.</span>
							</h1>
							<p className="reveal-up delay-2 mt-6 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
								Start with a discovery call. Share where the work gets stuck
								today and we'll come back with the bespoke system it should run
								on — clear scope, a value case, and the path to build it.
							</p>

							<div className="reveal-up delay-3 mt-8">
								<p className="bp-coord mb-3">Reach us directly</p>
								<div className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--color-line)]">
									<a
										href={`mailto:${mationMeta.email}`}
										className="panel-hover flex items-center gap-3 bg-panel p-5"
									>
										<Mail className="h-4 w-4 shrink-0 text-violet-bright" />
										<span className="text-sm text-ink/85">
											{mationMeta.email}
										</span>
									</a>
									<a
										href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
										className="panel-hover flex items-center gap-3 bg-panel p-5"
									>
										<Phone className="h-4 w-4 shrink-0 text-violet-bright" />
										<span className="text-sm text-ink/85">
											{mationMeta.phone}
										</span>
									</a>
									<div className="flex items-center gap-3 bg-panel p-5">
										<MapPin className="h-4 w-4 shrink-0 text-violet-bright" />
										<span className="text-sm text-ink/85">
											{mationMeta.location}
										</span>
									</div>
								</div>
							</div>

							<ul className="reveal-up delay-4 mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-mute">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-3.5 w-3.5 text-violet-bright" />{" "}
									Reply within one business day
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-3.5 w-3.5 text-violet-bright" /> No
									obligation
								</li>
							</ul>
						</div>

						<div className="reveal-up delay-2 relative">
							<div className="panel ticked rounded-[22px] p-7 sm:p-8">
								{isSubmitted ? (
									<div
										aria-atomic="true"
										aria-live="polite"
										className="panel-line rounded-[14px] p-6 sm:p-7"
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
											We'll review how you operate today and come back with a
											focused plan for your discovery call.
										</p>
										<button
											type="button"
											onClick={() => setIsSubmitted(false)}
											className="button-secondary mt-6"
										>
											Send another message
										</button>
									</div>
								) : (
									<form
										className="space-y-5"
										onSubmit={(event) => {
											event.preventDefault();
											setIsSubmitted(true);
										}}
									>
										<div className="flex items-center justify-between">
											<p className="section-index">
												<b>01</b> &nbsp;/&nbsp; About you
											</p>
											<span className="bp-coord">REQ-FORM · LOCAL</span>
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

										<button
											type="submit"
											className="button-primary w-full sm:w-auto"
										>
											<CalendarClock className="h-4 w-4" />
											Book a discovery call
										</button>
										<p className="mt-3 text-center text-xs text-mute sm:text-left">
											We'll respond with proposed scope for a discovery call —
											no obligation.
										</p>
									</form>
								)}
							</div>
							<div className="absolute -right-3 -top-3 hidden rounded-lg border border-line bg-canvas px-3 py-2 sm:block">
								<span className="bp-coord">1 business day</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="site-wide section-shell pt-0">
				<div className="reveal-scroll mb-10 flex flex-wrap items-end justify-between gap-4">
					<div>
						<p className="section-index mb-4">
							<b>03</b> &nbsp;/&nbsp; Ways to start
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
							<div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-line bg-white/[0.03] text-violet-bright">
								<span
									aria-hidden
									className="pointer-events-none absolute inset-0 opacity-40"
									style={{
										backgroundImage:
											"linear-gradient(rgba(123,97,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.18) 1px, transparent 1px)",
										backgroundSize: "8px 8px",
									}}
								/>
								<option.icon className="relative h-5 w-5" />
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
				<p className="mt-6 flex items-center justify-center gap-2 text-sm text-mute">
					<CheckCircle2 className="h-4 w-4 text-violet-bright" />
					Not sure which fits? Send the form and we'll suggest the right
					starting point.
				</p>
			</section>
		</>
	);
}
