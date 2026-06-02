import { useId } from "react";

type BrandMarkProps = {
	size?: number;
	className?: string;
	decorative?: boolean;
};

/**
 * Mation monogram, rendered inline so it tracks the Field Journal palette in
 * both themes: a two-ink "M" in violet with one coral facet, never the old
 * cold near-black/cyan gradient. Fills point at var(--violet)/var(--warm) and
 * lean on currentColor so the mark sits with the adjacent wordmark on warm
 * paper and warm charcoal alike.
 */
export default function BrandMark({
	size = 40,
	className = "",
	decorative = true,
}: BrandMarkProps) {
	// Unique gradient ids so multiple marks on a page never collide.
	const uid = useId();
	const violet = `${uid}-violet`;
	const violetDeep = `${uid}-violet-deep`;
	const coral = `${uid}-coral`;

	return (
		<svg
			viewBox="72 110 368 308"
			width={size}
			height={size}
			className={`select-none ${className}`.trim()}
			role={decorative ? undefined : "img"}
			aria-hidden={decorative || undefined}
			aria-label={decorative ? undefined : "Mation"}
		>
			{!decorative && <title>Mation</title>}
			<defs>
				<linearGradient
					id={violet}
					x1="72"
					y1="118"
					x2="248"
					y2="260"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--violet)" />
					<stop offset="1" stopColor="var(--violet-ink)" />
				</linearGradient>
				<linearGradient
					id={violetDeep}
					x1="72"
					y1="214"
					x2="194"
					y2="418"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--violet-ink)" />
					<stop offset="1" stopColor="var(--violet)" />
				</linearGradient>
				<linearGradient
					id={coral}
					x1="248"
					y1="224"
					x2="440"
					y2="126"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--violet)" />
					<stop offset="1" stopColor="var(--warm)" />
				</linearGradient>
			</defs>

			<path d="M72 118L248 224L215 251L72 162V118Z" fill={`url(#${violet})`} />
			<path d="M248 224L440 110V162L281 253L248 224Z" fill={`url(#${coral})`} />
			<path d="M72 214L194 287V418L72 358V214Z" fill={`url(#${violetDeep})`} />
			<path
				d="M318 287L440 214V358L318 418V287Z"
				fill={`url(#${violetDeep})`}
			/>
			<path d="M215 251L248 224L281 253L248 275L215 251Z" fill="var(--warm)" />
		</svg>
	);
}
