import { Link } from "@tanstack/react-router";
import { type ReactNode, useRef } from "react";
import type { NavLink } from "../content/site";

type MagneticLinkProps = {
	to: NavLink["to"];
	className?: string;
	children: ReactNode;
};

export default function MagneticLink({
	to,
	className = "",
	children,
}: MagneticLinkProps) {
	const shellRef = useRef<HTMLSpanElement>(null);

	const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
		const shell = shellRef.current;
		if (!shell) {
			return;
		}

		const rect = shell.getBoundingClientRect();
		const x = event.clientX - rect.left - rect.width / 2;
		const y = event.clientY - rect.top - rect.height / 2;

		shell.style.setProperty("--mx", `${(x * 0.16).toFixed(2)}px`);
		shell.style.setProperty("--my", `${(y * 0.2).toFixed(2)}px`);
	};

	const handleMouseLeave = () => {
		const shell = shellRef.current;
		if (!shell) {
			return;
		}

		shell.style.setProperty("--mx", "0px");
		shell.style.setProperty("--my", "0px");
	};

	return (
		<span
			ref={shellRef}
			className="magnetic-shell"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<Link to={to} className={`magnetic-target ${className}`.trim()}>
				{children}
			</Link>
		</span>
	);
}
