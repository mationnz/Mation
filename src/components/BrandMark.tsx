type BrandMarkProps = {
	size?: number;
	className?: string;
	decorative?: boolean;
};

export default function BrandMark({
	size = 40,
	className = "",
	decorative = true,
}: BrandMarkProps) {
	return (
		<img
			src="/mation-mark.svg"
			alt={decorative ? "" : "Mation"}
			aria-hidden={decorative}
			width={size}
			height={size}
			className={`select-none ${className}`.trim()}
			loading="eager"
			decoding="async"
		/>
	);
}
