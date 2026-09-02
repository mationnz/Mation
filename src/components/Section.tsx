import type { ReactNode } from "react";

type SectionProps = {
	/** Short label set in the left margin, e.g. "What you own". */
	label: string;
	/** Optional mono index above the label — use only for genuine sequences. */
	index?: string;
	id?: string;
	className?: string;
	children: ReactNode;
};

/**
 * A document row: label in the margin, content on the right, hairline above.
 * The structural signature of the site — it replaces cards, eyebrows and
 * decorative numerals with the one device that actually carries information.
 */
export default function Section({
	label,
	index,
	id,
	className = "",
	children,
}: SectionProps) {
	return (
		<section id={id} className={`site-wide doc ${className}`.trim()}>
			<p className="doc-label">
				{index ? <b>{index}</b> : null}
				{label}
			</p>
			<div className="doc-body">{children}</div>
		</section>
	);
}
