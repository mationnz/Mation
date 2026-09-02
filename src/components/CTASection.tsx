import { Link } from "@tanstack/react-router";
import { cta, type RoutePath } from "../content/site";

type CTASectionProps = {
	title: string;
	description: string;
	secondary?: { label: string; to: RoutePath };
};

/**
 * One primary action, optionally one secondary. The primary verb is "talk"
 * because that is what the button does: it opens a form that reaches a person.
 */
export default function CTASection({
	title,
	description,
	secondary,
}: CTASectionProps) {
	return (
		<section className="site-wide section">
			<div className="panel p-8 sm:p-12">
				<h2 className="h2 max-w-2xl">{title}</h2>
				<p className="lede mt-4">{description}</p>
				<div className="mt-8 flex flex-col gap-3 sm:flex-row">
					<Link to={cta.primary.to} className="button-primary">
						{cta.primary.label}
					</Link>
					{secondary ? (
						<Link to={secondary.to} className="button-secondary">
							{secondary.label}
						</Link>
					) : null}
				</div>
				<p className="mt-5 text-sm text-mute">{cta.replyPromise}</p>
			</div>
		</section>
	);
}
