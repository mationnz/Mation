import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { navLinks } from "../content/site";
import BrandMark from "./BrandMark";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const menuId = useId();
	const toggleRef = useRef<HTMLButtonElement>(null);
	const asideRef = useRef<HTMLElement>(null);
	const wasOpen = useRef(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Focus management + scroll lock for the mobile drawer.
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			asideRef.current?.querySelector<HTMLElement>("a, button")?.focus();
		} else {
			document.body.style.overflow = "";
			if (wasOpen.current) {
				toggleRef.current?.focus();
			}
		}
		wasOpen.current = isOpen;
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

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

	const trapFocus = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key !== "Tab") {
			return;
		}
		const focusables = asideRef.current?.querySelectorAll<HTMLElement>(
			"a[href], button:not([disabled])",
		);
		if (!focusables || focusables.length === 0) {
			return;
		}
		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	return (
		<>
			<header
				className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
					scrolled
						? "border-line bg-[rgba(7,6,14,0.82)] backdrop-blur-xl"
						: "border-transparent bg-transparent"
				}`}
			>
				<div className="site-wide flex h-20 items-center justify-between gap-6">
					<Link
						to="/"
						className="group inline-flex items-center gap-2.5"
						aria-label="Mation — home"
					>
						<BrandMark size={30} />
						<span className="font-heading text-[1.2rem] font-semibold tracking-tight text-ink">
							Mation
						</span>
					</Link>

					<nav className="hidden items-center gap-7 lg:flex">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="text-[0.92rem] font-medium text-mute transition-colors duration-200 hover:text-ink"
								activeProps={{ className: "!text-ink" }}
							>
								{link.label}
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-3">
						<Link
							to="/contact"
							className="button-primary hidden md:inline-flex"
						>
							Book a free session
							<ArrowUpRight className="h-4 w-4" />
						</Link>
						<button
							ref={toggleRef}
							type="button"
							onClick={() => setIsOpen((value) => !value)}
							className="inline-flex rounded-lg border border-line bg-white/[0.02] p-2 text-mute transition hover:border-[rgba(166,146,255,0.5)] hover:text-ink lg:hidden"
							aria-label={isOpen ? "Close menu" : "Open menu"}
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

			<button
				type="button"
				aria-hidden={!isOpen}
				tabIndex={-1}
				aria-label="Close menu"
				className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition lg:hidden ${
					isOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				onClick={() => setIsOpen(false)}
			/>

			<aside
				ref={asideRef}
				id={menuId}
				inert={!isOpen}
				aria-hidden={!isOpen}
				onKeyDown={trapFocus}
				className={`fixed right-0 top-0 z-50 h-full w-[86vw] max-w-sm border-l border-line bg-[rgba(8,7,18,0.98)] p-7 transition-transform duration-300 ease-out lg:hidden ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="mb-10 mt-16 flex items-center gap-2.5">
					<BrandMark size={30} />
					<span className="font-heading text-xl font-semibold text-ink">
						Mation
					</span>
				</div>
				<nav className="space-y-2.5">
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							onClick={() => setIsOpen(false)}
							className="block rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm font-medium text-mute transition hover:border-[rgba(166,146,255,0.45)] hover:text-ink"
							activeProps={{
								className: "!border-[rgba(166,146,255,0.45)] !text-ink",
							}}
						>
							{link.label}
						</Link>
					))}
				</nav>
				<Link
					to="/contact"
					onClick={() => setIsOpen(false)}
					className="button-primary mt-7 inline-flex w-full justify-center"
				>
					Book a free session
				</Link>
			</aside>
		</>
	);
}
