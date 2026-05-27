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
	primaryLabel = "Book a discovery call",
	secondaryLabel = "See our approach",
}: CTASectionProps) {
	return (
		<section className="site-shell section-shell">
			<div className="panel ticked relative overflow-hidden rounded-[22px] p-8 sm:p-12">
				<div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-violet),transparent_70%)] opacity-20 blur-3xl" />
				<p className="kicker">Start here</p>
				<h2 className="mt-5 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-[2.6rem] sm:leading-[1.05]">
					{title}
				</h2>
				<p className="mt-4 max-w-2xl text-pretty text-base text-mute sm:text-lg">
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
						to="/approach"
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
