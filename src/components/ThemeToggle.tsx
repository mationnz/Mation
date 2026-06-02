import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

/**
 * Light/dark toggle. The actual theme is set on <html data-theme> by a
 * pre-paint inline script in __root.tsx (no flash); this only flips + persists
 * it. The icon is driven purely by the `dark:` variant so it is correct on the
 * very first paint with no hydration mismatch.
 */
export default function ThemeToggle() {
	useEffect(() => {
		// Enable the body color cross-fade only after first paint, so toggling
		// feels like a lamp warming but the initial load never animates.
		const id = requestAnimationFrame(() => {
			document.documentElement.classList.add("theme-ready");
		});
		return () => cancelAnimationFrame(id);
	}, []);

	const toggle = () => {
		const root = document.documentElement;
		const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
		root.setAttribute("data-theme", next);
		try {
			localStorage.setItem("theme", next);
		} catch {
			// localStorage unavailable (private mode) — toggle still works for the session
		}
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle light or dark theme"
			title="Toggle theme"
			className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-mute transition hover:border-violet hover:text-ink"
		>
			<Moon className="h-[18px] w-[18px] dark:hidden" />
			<Sun className="hidden h-[18px] w-[18px] dark:block" />
		</button>
	);
}
