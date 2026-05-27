import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footerLinks, mationMeta } from "../content/site";
import BrandMark from "./BrandMark";

export default function Footer() {
	return (
		<footer className="relative mt-8 border-t border-line">
			<div className="site-wide grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr]">
				<div className="space-y-5">
					<Link
						to="/"
						className="inline-flex items-center gap-2.5"
						aria-label="Mation — home"
					>
						<BrandMark size={30} />
						<span className="font-heading text-xl font-semibold tracking-tight text-ink">
							Mation
						</span>
					</Link>
					<p className="max-w-md text-sm leading-relaxed text-mute">
						{mationMeta.description}
					</p>
					<a
						href="https://mation.nz"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-bright transition hover:text-ink"
					>
						mation.nz
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>

				<div>
					<p className="kicker">Sitemap</p>
					<ul className="mt-5 space-y-3 text-sm text-mute">
						{footerLinks.map((link) => (
							<li key={link.to}>
								<Link
									to={link.to}
									className="transition hover:text-ink"
									activeProps={{ className: "!text-ink" }}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="kicker">Contact</p>
					<ul className="mt-5 space-y-3 text-sm text-mute">
						<li className="flex items-center gap-2.5">
							<Mail className="h-4 w-4 text-violet-bright" />
							<a
								href={`mailto:${mationMeta.email}`}
								className="transition hover:text-ink"
							>
								{mationMeta.email}
							</a>
						</li>
						<li className="flex items-center gap-2.5">
							<Phone className="h-4 w-4 text-violet-bright" />
							<a
								href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
								className="transition hover:text-ink"
							>
								{mationMeta.phone}
							</a>
						</li>
						<li className="flex items-center gap-2.5">
							<MapPin className="h-4 w-4 text-violet-bright" />
							<span>{mationMeta.location}</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="site-wide flex flex-col gap-3 border-t border-line py-6 font-mono text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
				<span>
					© {new Date().getFullYear()} Mation — {mationMeta.location}
				</span>
				<span className="tracking-[0.16em] uppercase">
					Bespoke software · built around your business
				</span>
			</div>
		</footer>
	);
}
