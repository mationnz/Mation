import { ownership } from "../content/site";

/**
 * The ownership seam, as a table. Each row is a layer of the system, who owns
 * it, and what that means concretely. Filled square = yours, outlined = ours.
 * Stacks into cards below 720px (see .ledger in styles.css).
 */
export default function OwnershipLedger() {
	return (
		<div>
			<table className="ledger">
				<caption className="sr-only">What you own and what Mation owns</caption>
				<colgroup>
					<col className="w-[28%]" />
					<col className="w-[30%]" />
					<col />
				</colgroup>
				<thead>
					<tr>
						<th scope="col">Layer</th>
						<th scope="col">Owner</th>
						<th scope="col">Concretely</th>
					</tr>
				</thead>
				<tbody>
					{ownership.map((row) => (
						<tr key={row.layer}>
							<td className="ledger-layer">{row.layer}</td>
							<td>
								<span
									className={`ledger-owner ${row.owner === "you" ? "is-you" : "is-us"}`}
								>
									{row.ownerLabel}
								</span>
							</td>
							<td className="ledger-detail">{row.detail}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p className="mt-3 text-sm text-mute">
				<span className="swatch is-you" aria-hidden />
				Yours
				<span className="ml-5 swatch is-us" aria-hidden />
				Ours, licensed to you while you’re a client
			</p>
		</div>
	);
}

/** Compact two-column form of the same seam, for the home hero. */
export function OwnershipSplit() {
	const yours = ownership.filter((row) => row.owner === "you");
	const ours = ownership.filter((row) => row.owner === "mation");

	return (
		<div className="split">
			<div className="split-col">
				<p className="split-title">
					<span className="swatch is-you" aria-hidden />
					Yours
				</p>
				<ul className="split-list">
					{yours.map((row) => (
						<li key={row.layer}>
							{row.layer}
							<small>{row.ownerLabel}</small>
						</li>
					))}
				</ul>
			</div>
			<div className="split-col is-us">
				<p className="split-title">
					<span className="swatch is-us" aria-hidden />
					Ours
				</p>
				<ul className="split-list">
					{ours.map((row) => (
						<li key={row.layer}>
							{row.layer}
							<small>Licensed to you for use, never sold</small>
						</li>
					))}
					<li>
						Every fix, for every client
						<small>One tested spine underneath every system</small>
					</li>
				</ul>
			</div>
		</div>
	);
}
