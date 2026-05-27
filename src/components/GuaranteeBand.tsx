import { ShieldCheck } from "lucide-react";
import { offer } from "../content/site";

/** The 60-day double-value, money-back guarantee — reused across pages. */
export default function GuaranteeBand() {
	return (
		<div className="glow">
			<div className="panel ticked relative overflow-hidden rounded-[22px] p-8 sm:p-10">
				<div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--color-violet),transparent_70%)] opacity-20 blur-3xl" />
				<div className="grid items-center gap-7 sm:grid-cols-[auto_1fr]">
					<div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(166,146,255,0.5)] bg-white/[0.03] text-violet-bright">
						<ShieldCheck className="h-8 w-8" />
					</div>
					<div>
						<p className="bp-coord mb-2">The guarantee</p>
						<h3 className="font-heading text-2xl font-semibold leading-tight text-ink sm:text-[1.95rem]">
							Double your investment in value in 60 days —{" "}
							<span className="gradient-ink">or your money back.</span>
						</h3>
						<p className="mt-3 max-w-2xl text-mute">{offer.guarantee}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
