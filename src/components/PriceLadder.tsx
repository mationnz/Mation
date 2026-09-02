import { pricing } from "../content/site";

/**
 * The Managed tier, priced in full. Every line carries the currency and the
 * GST position, because a price without them is a shape, not a price.
 * Stacks below 720px (see .ladder in styles.css).
 */
export default function PriceLadder({
	compact = false,
}: {
	compact?: boolean;
}) {
	return (
		<div>
			<table className={`ladder ${compact ? "is-compact" : ""}`.trim()}>
				<caption className="sr-only">Managed tier pricing</caption>
				<colgroup>
					<col className="w-[22%]" />
					<col className={compact ? undefined : "w-[34%]"} />
					{compact ? null : <col />}
				</colgroup>
				<thead className="sr-only">
					<tr>
						<th scope="col">Line</th>
						<th scope="col">Price</th>
						{compact ? null : <th scope="col">What it covers</th>}
					</tr>
				</thead>
				<tbody>
					{pricing.lines.map((line) => (
						<tr key={line.line}>
							<td className="ladder-line">{line.line}</td>
							<td>
								<span className="ladder-price">
									{line.gst ? <small>{pricing.currency}</small> : null}
									<span className="money-lg">{line.amount}</span>
									<small>
										{line.unit}
										{line.gst ? " · + GST" : ""}
									</small>
								</span>
							</td>
							{compact ? null : <td className="ladder-note">{line.note}</td>}
						</tr>
					))}
				</tbody>
			</table>
			<p className="mt-3 text-sm text-mute">
				{pricing.gstNote} Platform fee is on a {pricing.term}.
			</p>
		</div>
	);
}
