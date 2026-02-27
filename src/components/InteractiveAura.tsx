import { useEffect, useRef } from "react";

export default function InteractiveAura() {
	const auraRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const aura = auraRef.current;
		if (!aura) {
			return;
		}

		let frame = 0;

		const handleMouseMove = (event: MouseEvent) => {
			const x = (event.clientX / window.innerWidth) * 100;
			const y = (event.clientY / window.innerHeight) * 100;

			if (frame) {
				cancelAnimationFrame(frame);
			}

			frame = requestAnimationFrame(() => {
				aura.style.setProperty("--cursor-x", `${x.toFixed(2)}%`);
				aura.style.setProperty("--cursor-y", `${y.toFixed(2)}%`);
			});
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, []);

	return <div ref={auraRef} className="interactive-aura" aria-hidden />;
}
