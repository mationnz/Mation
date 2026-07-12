/**
 * TrustedBy — social proof logo cloud of the businesses Mation partners with.
 * Wordmark tiles (real logos drop in later); tasteful hover lift. The heading
 * carries the meaning, the row carries the credibility.
 */

const partners = [
	"CCC",
	"Dominion Constructors",
	"RJ Doughty",
	"Luke’s Kitchen",
	"BTPT",
	"Max Raw Fitness",
];

export default function TrustedBy() {
	return (
		<div className="reveal-stagger grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
			{partners.map((name) => (
				<div key={name} className="logo-tile">
					<span className="logo-word">{name}</span>
				</div>
			))}
		</div>
	);
}
