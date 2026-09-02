import { Link } from "@tanstack/react-router";
import { pricing, tiers } from "../content/site";

/**
 * The two tiers. Managed is built and priced. Owned deployment is a
 * conversation — the copy promises scoping and an honest answer, never a
 * product, a date or a price.
 */
export default function Tiers() {
	const platform = pricing.lines[1];
	const setup = pricing.lines[0];

	return (
		<div className="grid gap-5 md:grid-cols-2">
			{tiers.map((tier) => (
				<article
					key={tier.name}
					className={`panel flex flex-col p-7 sm:p-8 ${tier.priced ? "" : "bg-surface-2"}`}
				>
					<p className="label">{tier.tag}</p>
					<h3 className="h3 mt-3">{tier.name}</h3>
					<p className="mt-4 text-[0.98rem] leading-relaxed text-mute text-pretty">
						{tier.desc}
					</p>
					<div className="mt-auto border-t border-border pt-5">
						{tier.priced ? (
							<>
								<p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
									<span className="money text-[1.35rem] text-violet-ink">
										{pricing.currency} {setup.amount}
									</span>
									<span className="text-sm text-mute">setup + GST</span>
								</p>
								<p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
									<span className="money text-[1.35rem] text-violet-ink">
										{pricing.currency} {platform.amount}
									</span>
									<span className="text-sm text-mute">
										per month + GST · {pricing.term}
									</span>
								</p>
								<Link to="/pricing" className="button-ghost mt-4">
									The full price list
								</Link>
							</>
						) : (
							<>
								<p className="font-display text-[1.35rem] text-ink">
									No price on the page.
								</p>
								<p className="mt-1 text-sm text-mute">
									Scoped for your situation, and only after that conversation.
								</p>
								<Link to="/contact" className="button-ghost mt-4">
									Start that conversation
								</Link>
							</>
						)}
					</div>
				</article>
			))}
		</div>
	);
}
