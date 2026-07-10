import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import BrandMark from "./BrandMark";

const primaryNav = [
	{ label: "Home", to: "/" },
	{ label: "Solutions", to: "/what-we-build" },
	{ label: "Platform", to: "/approach" },
	{ label: "Case Studies", to: "/work" },
	{ label: "About", to: "/about" },
	{ label: "Contact", to: "/contact" },
] as const;

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
						? "border-border paper-glass"
						: "border-border/70 bg-canvas/90 backdrop-blur-xl"
				}`}
			>
				<div className="site-wide flex h-[4.75rem] items-center justify-between gap-8">
					<Link
						to="/"
						className="group inline-flex shrink-0 items-center gap-2.5"
						aria-label="Mation — home"
					>
						<BrandMark size={24} />
						<span className="font-display text-lg font-semibold text-ink">
							Mation
						</span>
					</Link>

					<nav className="hidden items-center gap-9 lg:flex">
						{primaryNav.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="text-[0.95rem] font-medium text-mute transition-colors duration-200 hover:text-ink"
								activeProps={{ className: "!text-ink !font-semibold" }}
							>
								{link.label}
							</Link>
						))}
					</nav>

					<div className="flex shrink-0 items-center gap-3">
						<Link
							to="/contact"
							className="button-primary hidden !rounded-full !px-5 !py-2.5 !text-sm md:inline-flex"
						>
							Start the build
							<ArrowUpRight className="h-4 w-4" />
						</Link>
						<button
							ref={toggleRef}
							type="button"
							onClick={() => setIsOpen((value) => !value)}
							className="inline-flex rounded-lg border border-border bg-surface p-2 text-mute transition hover:border-violet hover:text-ink lg:hidden"
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
				className={`fixed inset-0 z-40 bg-[rgba(20,16,28,0.55)] backdrop-blur-sm transition lg:hidden ${
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
				className={`fixed right-0 top-0 z-50 h-full w-[86vw] max-w-sm border-l border-border bg-surface p-7 shadow-[var(--shadow-lg)] transition-transform duration-300 ease-out lg:hidden ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="mb-10 mt-16 flex items-center gap-2.5">
					<BrandMark size={24} />
					<span className="font-display text-lg font-semibold text-ink">
						Mation
					</span>
				</div>
				<nav className="space-y-2.5">
					{primaryNav.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							onClick={() => setIsOpen(false)}
							className="block rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-medium text-ink-soft transition hover:border-violet hover:text-ink"
							activeProps={{
								className: "!border-violet !text-ink",
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
					Start the build
				</Link>
			</aside>
		</>
	);
}
