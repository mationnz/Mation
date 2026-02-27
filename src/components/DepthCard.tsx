import { type ReactNode, useRef } from "react";

type DepthCardProps = {
	children: ReactNode;
	className?: string;
};

export default function DepthCard({
	children,
	className = "",
}: DepthCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const card = cardRef.current;
		if (!card) {
			return;
		}

		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const rotateX = ((y / rect.height - 0.5) * -8).toFixed(2);
		const rotateY = ((x / rect.width - 0.5) * 10).toFixed(2);
		const glowX = ((x / rect.width) * 100).toFixed(2);
		const glowY = ((y / rect.height) * 100).toFixed(2);

		card.style.setProperty("--tilt-x", `${rotateX}deg`);
		card.style.setProperty("--tilt-y", `${rotateY}deg`);
		card.style.setProperty("--glow-x", `${glowX}%`);
		card.style.setProperty("--glow-y", `${glowY}%`);
	};

	const handleMouseLeave = () => {
		const card = cardRef.current;
		if (!card) {
			return;
		}

		card.style.setProperty("--tilt-x", "0deg");
		card.style.setProperty("--tilt-y", "0deg");
		card.style.setProperty("--glow-x", "50%");
		card.style.setProperty("--glow-y", "50%");
	};

	return (
		<div
			ref={cardRef}
			className={`depth-card ${className}`.trim()}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	);
}
