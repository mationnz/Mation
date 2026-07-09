import { useEffect } from "react";

/**
 * Global cursor-follow spotlight controller.
 *
 * Instead of one listener per card, a single delegated pointermove listener
 * finds the [data-spotlight] surface under the cursor and writes the local
 * coordinates to --spot-x / --spot-y (plus --spot-opacity to fade the glow in
 * and out). Cheap, SSR-safe, and honours reduced-motion via CSS.
 */
export default function SpotlightFX() {
	useEffect(() => {
		let active: HTMLElement | null = null;

		const clear = () => {
			if (active) {
				active.style.setProperty("--spot-opacity", "0");
				active = null;
			}
		};

		const onMove = (event: PointerEvent) => {
			const target = (event.target as Element | null)?.closest<HTMLElement>(
				"[data-spotlight]",
			);

			if (!target) {
				clear();
				return;
			}

			if (target !== active) {
				clear();
				active = target;
				target.style.setProperty("--spot-opacity", "1");
			}

			const rect = target.getBoundingClientRect();
			target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
			target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
		};

		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerdown", onMove, { passive: true });
		window.addEventListener("blur", clear);

		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerdown", onMove);
			window.removeEventListener("blur", clear);
		};
	}, []);

	return null;
}
