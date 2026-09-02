import { platformFacts, platformFactsMeasured } from "../content/site";

/** Verifiable facts about what sits underneath every tenant. */
export default function PlatformFacts() {
	return (
		<div>
			<dl className="facts">
				{platformFacts.map((fact) => (
					<div key={fact.label} className="fact">
						<dd className="fact-value m-0">{fact.value}</dd>
						<dt className="fact-label">{fact.label}</dt>
					</div>
				))}
			</dl>
			<p className="mt-3 text-sm text-mute">
				{platformFactsMeasured} Floors, not counts — each one can be
				demonstrated by running a tool against the repository.
			</p>
		</div>
	);
}
