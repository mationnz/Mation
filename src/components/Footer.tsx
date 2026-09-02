import { Link } from "@tanstack/react-router";
import { footerLinks, mationMeta, pricing } from "../content/site";
import BrandMark from "./BrandMark";

export default function Footer() {
	return (
		<footer className="mt-12 border-t border-border-strong">
			<div className="site-wide grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
				<div className="space-y-5">
					<Link
						to="/"
						className="inline-flex items-center gap-2.5"
						aria-label="Mation — home"
					>
						<BrandMark size={28} />
						<span className="font-display text-xl text-ink">Mation</span>
					</Link>
					<p className="max-w-md text-[0.95rem] leading-relaxed text-mute text-pretty">
						{mationMeta.tagline}
					</p>
					<address className="not-italic text-[0.95rem] leading-relaxed text-mute">
						<a
							href={`mailto:${mationMeta.email}`}
							className="link-underline block w-fit"
						>
							{mationMeta.email}
						</a>
						<a
							href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
							className="link-underline mt-1 block w-fit"
						>
							{mationMeta.phone}
						</a>
						<span className="mt-1 block">{mationMeta.location}</span>
					</address>
				</div>

				{footerLinks.map((group) => (
					<nav key={group.heading} aria-label={group.heading}>
						<p className="label">{group.heading}</p>
						<ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-soft">
							{group.links.map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className="transition hover:text-violet-ink"
										activeProps={{ className: "!text-ink" }}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				))}
			</div>

			<div className="site-wide flex flex-col gap-2 border-t border-border py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
				<span>
					© {new Date().getFullYear()} Mation · {mationMeta.location}
				</span>
				<span>{pricing.gstNote}</span>
			</div>
		</footer>
	);
}
