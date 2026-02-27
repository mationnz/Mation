import { createFileRoute } from "@tanstack/react-router";
import {
	CalendarDays,
	Mail,
	MessageSquareText,
	Phone,
	Send,
} from "lucide-react";
import { useState } from "react";
import { mationMeta } from "../content/site";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Contact Mation | Start Your AI Transformation" },
			{
				name: "description",
				content:
					"Connect with Mation to plan your AI transformation roadmap and launch enterprise automation programs with measurable outcomes.",
			},
		],
	}),
});

function ContactPage() {
	const [isSubmitted, setIsSubmitted] = useState(false);

	return (
		<>
			<section className="section-shell">
				<div className="site-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
					<div>
						<p className="kicker">Contact</p>
						<h1 className="mt-5 font-heading text-5xl font-semibold text-white sm:text-6xl">
							Let’s design your
							<span className="gradient-title"> next AI growth leap</span>
						</h1>
						<p className="mt-6 max-w-2xl text-lg leading-relaxed text-indigo-100/78 sm:text-xl">
							Share your biggest operational bottleneck and we will map a
							pragmatic transformation pathway with clear milestones, technical
							architecture, and value targets.
						</p>

						<div className="mt-8 space-y-3">
							<a
								href={`mailto:${mationMeta.email}`}
								className="data-card flex items-center gap-3"
							>
								<Mail className="h-4 w-4 text-cyan-200" />
								<span className="text-sm font-semibold text-indigo-100/86">
									{mationMeta.email}
								</span>
							</a>
							<a
								href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
								className="data-card flex items-center gap-3"
							>
								<Phone className="h-4 w-4 text-cyan-200" />
								<span className="text-sm font-semibold text-indigo-100/86">
									{mationMeta.phone}
								</span>
							</a>
							<a
								href="https://mation.nz"
								target="_blank"
								rel="noopener noreferrer"
								className="data-card flex items-center gap-3"
							>
								<CalendarDays className="h-4 w-4 text-cyan-200" />
								<span className="text-sm font-semibold text-indigo-100/86">
									Book a discovery call at mation.nz
								</span>
							</a>
						</div>
					</div>

					<div className="panel-glass rounded-3xl p-7 sm:p-8">
						{isSubmitted ? (
							<div className="rounded-2xl border border-cyan-200/30 bg-cyan-200/10 p-6">
								<p className="kicker">Inquiry Received</p>
								<h2 className="mt-4 font-heading text-3xl font-semibold text-white">
									Thank you. We’ll respond within one business day.
								</h2>
								<p className="mt-4 text-base leading-relaxed text-indigo-100/76">
									Our team will review your goals and come back with a focused
									plan for your first transformation sprint.
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
								<p className="kicker">Start Here</p>
								<div className="grid gap-5 sm:grid-cols-2">
									<label className="text-sm text-indigo-100/82">
										Name *
										<input
											required
											type="text"
											name="name"
											className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65"
											placeholder="Alex Carter"
										/>
									</label>
									<label className="text-sm text-indigo-100/82">
										Work email *
										<input
											required
											type="email"
											name="email"
											className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65"
											placeholder="alex@company.com"
										/>
									</label>
								</div>

								<div className="grid gap-5 sm:grid-cols-2">
									<label className="text-sm text-indigo-100/82">
										Company *
										<input
											required
											type="text"
											name="company"
											className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65"
											placeholder="Company Name"
										/>
									</label>
									<label className="text-sm text-indigo-100/82">
										Role *
										<input
											required
											type="text"
											name="role"
											className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65"
											placeholder="e.g. Head of Operations"
										/>
									</label>
								</div>

								<div className="grid gap-5 sm:grid-cols-2">
									<label className="text-sm text-indigo-100/82">
										Industry
										<select
											name="industry"
											className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65 appearance-none"
										>
											<option value="">Select industry</option>
											<option value="manufacturing">Manufacturing</option>
											<option value="finance">Finance & Insurance</option>
											<option value="healthcare">Healthcare</option>
											<option value="technology">Technology</option>
											<option value="logistics">Logistics & Field Services</option>
											<option value="other">Other</option>
										</select>
									</label>
									<label className="text-sm text-indigo-100/82">
										Timeline
										<select
											name="timeline"
											className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65 appearance-none"
										>
											<option value="">Select timeline</option>
											<option value="0-30">0-30 days</option>
											<option value="30-90">30-90 days</option>
											<option value="90+">90+ days</option>
										</select>
									</label>
								</div>

								<label className="block text-sm text-indigo-100/82">
									Systems in use (comma separated) *
									<input
										required
										type="text"
										name="systems"
										className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65"
										placeholder="e.g. Salesforce, Jira, SAP, Slack"
									/>
								</label>

								<label className="block text-sm text-indigo-100/82">
									What do you want to automate or improve? *
									<textarea
										required
										name="message"
										rows={3}
										className="mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-200/65"
										placeholder="Tell us your biggest friction points."
									/>
								</label>

								<button
									type="submit"
									className="button-primary w-full sm:w-auto"
								>
									Request demo
									<Send className="h-4 w-4" />
								</button>
								<p className="text-xs text-indigo-100/60 mt-3 text-center sm:text-left">
									We respond with a proposed pilot scope and a security-first rollout plan.
								</p>
							</form>
						)}
					</div>
				</div>
			</section>

			<section className="section-shell pt-0">
				<div className="site-shell grid gap-4 md:grid-cols-3">
					{[
						{
							icon: CalendarDays,
							title: "Discovery Sprint",
							detail:
								"A focused 2-week engagement to identify your highest-value AI opportunities and architecture path.",
						},
						{
							icon: MessageSquareText,
							title: "Executive Briefing",
							detail:
								"A strategic session for leadership teams on AI operating model design, governance, and sequencing.",
						},
						{
							icon: Mail,
							title: "Technical Deep Dive",
							detail:
								"Hands-on review of your systems, data landscape, and workflow opportunities with Mation architects.",
						},
					].map((option) => (
						<article key={option.title} className="panel-glass rounded-2xl p-6">
							<div className="mb-4 inline-flex rounded-xl border border-cyan-200/25 bg-cyan-200/10 p-3 text-cyan-100">
								<option.icon className="h-5 w-5" />
							</div>
							<h2 className="font-heading text-2xl font-semibold text-white">
								{option.title}
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-indigo-100/74">
								{option.detail}
							</p>
						</article>
					))}
				</div>
			</section>
		</>
	);
}
