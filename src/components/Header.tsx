import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { navLinks } from "../content/site";
import BrandMark from "./BrandMark";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const menuId = useId();

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const onEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		window.addEventListener("keydown", onEscape);
		return () => window.removeEventListener("keydown", onEscape);
	}, [isOpen]);

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(6,7,18,0.72)] backdrop-blur-xl">
				<div className="site-shell flex h-20 items-center justify-between">
					<Link
						to="/"
						className="group inline-flex items-center gap-3"
						aria-label="Mation home"
					>
						<div className="rounded-xl border border-white/20 bg-white/5 p-2 transition group-hover:border-cyan-200/60 group-hover:bg-white/10">
							<BrandMark size={28} />
						</div>
						<span className="hidden font-heading text-xl font-semibold text-white sm:inline">
							Mation
						</span>
					</Link>

					<nav className="hidden items-center gap-8 xl:flex">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="text-sm font-semibold tracking-wide text-indigo-100/70 transition hover:text-white"
								activeOptions={{ exact: link.to === "/" }}
								activeProps={{ className: "text-cyan-200" }}
							>
								{link.label}
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<Link
							to="/demo"
							className="button-primary hidden md:inline-flex"
						>
							Start the build
						</Link>
						<button
							type="button"
							onClick={() => setIsOpen((value) => !value)}
							className="inline-flex rounded-xl border border-white/20 bg-white/5 p-2 text-indigo-100 transition hover:border-cyan-200/60 hover:text-white xl:hidden"
							aria-label="Toggle menu"
							aria-expanded={isOpen}
							aria-controls={menuId}
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</header>

			<div
				aria-hidden={!isOpen}
				className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition ${
					isOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				onClick={() => setIsOpen(false)}
			/>

			<aside
				id={menuId}
				className={`fixed right-0 top-0 z-50 h-full w-[84vw] max-w-sm border-l border-white/10 bg-[rgba(8,10,25,0.96)] p-7 transition-transform duration-300 ease-out xl:hidden ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="mb-10 mt-16 flex items-center gap-3">
					<BrandMark size={30} />
					<span className="font-heading text-2xl font-semibold text-white">
						Mation
					</span>
				</div>
				<nav className="space-y-4">
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							onClick={() => setIsOpen(false)}
							className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-indigo-100/85 transition hover:border-cyan-200/40 hover:text-white"
							activeOptions={{ exact: link.to === "/" }}
							activeProps={{ className: "border-cyan-200/60 text-cyan-200" }}
						>
							{link.label}
						</Link>
					))}
				</nav>
				<Link
					to="/demo"
					onClick={() => setIsOpen(false)}
					className="button-primary mt-8 inline-flex w-full justify-center"
				>
					Start the build
				</Link>
			</aside>
		</>
	);
}
