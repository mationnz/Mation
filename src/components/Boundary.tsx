import { antiGuarantee } from "../content/site";

/**
 * The anti-guarantee. Full width, coral rule, no softening. It will cost
 * deals, which is why it is the most trust-building copy on the site.
 */
export default function Boundary() {
	return (
		<section className="boundary my-10" aria-label="The boundary">
			<div className="site-wide grid gap-8 py-14 sm:py-20 lg:grid-cols-[12rem_minmax(0,1fr)]">
				<p className="doc-label !static">The boundary</p>
				<div>
					<h2 className="h2 max-w-3xl">{antiGuarantee.title}</h2>
					<p className="prose mt-6 text-[1.05rem] leading-relaxed text-ink-soft">
						{antiGuarantee.body}
					</p>
					<p className="mt-8 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight text-ink text-balance max-w-3xl">
						{antiGuarantee.close}
					</p>
				</div>
			</div>
		</section>
	);
}
