import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { mationMeta, navLinks } from "../content/site";
import BrandMark from "./BrandMark";

export default function Footer() {
	return (
		<footer className="border-t border-white/10 pb-12 pt-16">
			<div className="site-shell grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<BrandMark size={32} />
						<span className="font-heading text-xl font-semibold tracking-tight text-white">
							Mation
						</span>
					</div>
					<p className="max-w-md text-sm leading-relaxed text-indigo-100/70">
						{mationMeta.description}
					</p>
					<a
						href="https://mation.nz"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
					>
						mation.nz
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>

				<div>
					<p className="kicker">Sitemap</p>
					<ul className="mt-4 space-y-3 text-sm text-indigo-100/80">
						{navLinks.map((link) => (
							<li key={link.to}>
								<Link
									to={link.to}
									className="transition hover:text-white"
									activeProps={{ className: "text-cyan-200" }}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="kicker">Contact</p>
					<ul className="mt-4 space-y-3 text-sm text-indigo-100/80">
						<li className="flex items-center gap-2">
							<Mail className="h-4 w-4 text-cyan-200" />
							<a
								href={`mailto:${mationMeta.email}`}
								className="transition hover:text-white"
							>
								{mationMeta.email}
							</a>
						</li>
						<li className="flex items-center gap-2">
							<Phone className="h-4 w-4 text-cyan-200" />
							<a
								href={`tel:${mationMeta.phone.replace(/\s+/g, "")}`}
								className="transition hover:text-white"
							>
								{mationMeta.phone}
							</a>
						</li>
						<li className="flex items-center gap-2">
							<MapPin className="h-4 w-4 text-cyan-200" />
							<span>{mationMeta.location}</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="site-shell mt-12 border-t border-white/10 pt-6 text-xs text-indigo-100/60">
				© {new Date().getFullYear()} Mation. Built for AI-first business
				transformation.
			</div>
		</footer>
	);
}
