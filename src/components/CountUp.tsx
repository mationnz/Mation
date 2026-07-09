import { useEffect, useRef, useState } from "react";

type CountUpProps = {
	/** The final display value, e.g. "120+", "67%", "3.6x", "6.4 months". */
	value: string;
	className?: string;
	durationMs?: number;
};

/**
 * Animates the numeric part of a label from 0 to its final value the first
 * time it scrolls into view. Non-numeric parts (prefixes, +, %, x, units) are
 * preserved exactly. SSR-safe: renders the final value until mounted, and skips
 * the animation entirely under prefers-reduced-motion.
 */
export default function CountUp({
	value,
	className,
	durationMs = 1400,
}: CountUpProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const [display, setDisplay] = useState(value);
	const played = useRef(false);

	// Parse "120+" -> { pre:"", num:120, decimals:0, post:"+" }
	const match = value.match(/^(\D*)([\d.,]+)(.*)$/s);

	useEffect(() => {
		if (!match) {
			return;
		}
		const node = ref.current;
		if (!node) {
			return;
		}

		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce) {
			return;
		}

		const [, pre, rawNum, post] = match;
		const target = Number.parseFloat(rawNum.replace(/,/g, ""));
		const decimals = rawNum.includes(".")
			? rawNum.split(".")[1].length
			: 0;

		const format = (n: number) =>
			`${pre}${n.toLocaleString("en-US", {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals,
			})}${post}`;

		const run = () => {
			if (played.current) {
				return;
			}
			played.current = true;
			const start = performance.now();

			const tick = (now: number) => {
				const t = Math.min((now - start) / durationMs, 1);
				// easeOutExpo for a snappy, premium settle
				const eased = t === 1 ? 1 : 1 - 2 ** (-10 * t);
				setDisplay(format(target * eased));
				if (t < 1) {
					requestAnimationFrame(tick);
				}
			};
			setDisplay(format(0));
			requestAnimationFrame(tick);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						run();
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.4 },
		);
		observer.observe(node);

		return () => observer.disconnect();
	}, [match, durationMs]);

	return (
		<span ref={ref} className={className}>
			{display}
		</span>
	);
}
