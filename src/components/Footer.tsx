import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footerLinks, mationMeta } from "../content/site";
import BrandMark from "./BrandMark";

export default function Footer() {
	return (
		<footer className="relative mt-8 border-t border-border bg-canvas-2/35">
			<div className="site-wide grid gap-12 py-16 lg:grid-cols-[1.5fr_0.7fr_0.9fr]">
				<div className="space-y-7">
					<Link
						to="/"
						className="inline-flex flex-col items-start gap-4"
						aria-label="Mation — home"
					>
						<BrandMark size={168} />
						<span className="font-display text-lg font-semibold text-ink">
							Mation
						</span>
					</Link>
					<p className="max-w-md text-sm leading-relaxed text-mute">
						Mation helps ambitious organisations redesign operations with
						agentic AI, autonomous workflows, and measurable business outcomes.
					</p>
					<a
						href="https://mation.nz"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-info"
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
							<Mail className="h-4 w-4 text-info" />
							<a
								href={`mailto:${mationMeta.email}`}
								className="transition hover:text-ink"
							>
								{mationMeta.email}
							</a>
						</li>
						<li className="flex items-center gap-2.5">
							<Phone className="h-4 w-4 text-info" />
							<a
								href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
								className="transition hover:text-ink"
							>
								{mationMeta.phone}
							</a>
						</li>
						<li className="flex items-center gap-2.5">
							<MapPin className="h-4 w-4 text-info" />
							<span>{mationMeta.location}</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="site-wide flex flex-col gap-3 border-t border-border py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
				<span>
					© {new Date().getFullYear()} Mation. Built for AI-first business
					transformation.
				</span>
				<span>{mationMeta.location}</span>
			</div>
		</footer>
	);
}
