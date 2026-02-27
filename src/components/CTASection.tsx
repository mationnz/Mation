import { ArrowRight, CalendarClock } from "lucide-react";
import MagneticLink from "./MagneticLink";

type CTASectionProps = {
	title: string;
	description: string;
	primaryLabel?: string;
	secondaryLabel?: string;
};

export default function CTASection({
	title,
	description,
	primaryLabel = "Book a demo",
	secondaryLabel = "See how it works",
}: CTASectionProps) {
	return (
		<section className="site-shell section-shell">
			<div className="panel-glass relative overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12">
				<div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--brand-cyan),transparent_70%)] opacity-25 blur-3xl" />
				<p className="kicker">Next Move</p>
				<h2 className="mt-4 max-w-2xl text-balance font-heading text-3xl font-semibold text-white sm:text-4xl">
					{title}
				</h2>
				<p className="mt-4 max-w-2xl text-pretty text-base text-indigo-100/80 sm:text-lg">
					{description}
				</p>
				<div className="mt-8 flex flex-col gap-4 sm:flex-row">
					<MagneticLink
						to="/contact"
						className="button-primary inline-flex items-center gap-2"
					>
						<CalendarClock className="h-4 w-4" />
						{primaryLabel}
					</MagneticLink>
					<MagneticLink
						to="/product"
						className="button-secondary inline-flex items-center gap-2"
					>
						{secondaryLabel}
						<ArrowRight className="h-4 w-4" />
					</MagneticLink>
				</div>
			</div>
		</section>
	);
}
