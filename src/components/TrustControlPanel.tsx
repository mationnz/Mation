import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

type ControlKey =
	| "humanApproval"
	| "policyRestrictions"
	| "leastPrivilege"
	| "scopedReach"
	| "auditTrail";

type Controls = Record<ControlKey, boolean>;

const initialControls: Controls = {
	humanApproval: true,
	policyRestrictions: true,
	leastPrivilege: true,
	scopedReach: true,
	auditTrail: true,
};

const controlLabels: Record<ControlKey, string> = {
	humanApproval: "Approval gates on sensitive actions",
	policyRestrictions: "Policy rules on what can run",
	leastPrivilege: "Least-privilege access by role",
	scopedReach: "Scoped reach to approved systems",
	auditTrail: "Full audit trail of every action",
};

export default function TrustControlPanel() {
	const [controls, setControls] = useState<Controls>(initialControls);

	const exposure = useMemo(() => {
		let score = 0.71;
		if (controls.humanApproval) score -= 0.17;
		if (controls.policyRestrictions) score -= 0.15;
		if (controls.leastPrivilege) score -= 0.11;
		if (controls.scopedReach) score -= 0.13;
		if (controls.auditTrail) score -= 0.1;
		return Math.max(0.05, score);
	}, [controls]);

	const activeCount = Object.values(controls).filter(Boolean).length;

	return (
		<div className="grid gap-4 text-left lg:grid-cols-[0.57fr_0.43fr]">
			<div className="panel rounded-[18px] p-6 sm:p-7">
				<div className="mb-5 flex items-center justify-between gap-3">
					<p className="kicker">Controls we build in</p>
					<div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-violet-bright">
						<ShieldCheck className="h-3.5 w-3.5" />
						{activeCount}/5 active
					</div>
				</div>

				<div className="flex flex-col gap-px overflow-hidden rounded-[12px] border border-line bg-[var(--color-line)]">
					{(Object.keys(controls) as ControlKey[]).map((key) => (
						<div
							key={key}
							className="flex items-center justify-between gap-4 bg-panel p-4"
						>
							<p className="text-sm text-ink/85">{controlLabels[key]}</p>
							<button
								type="button"
								onClick={() =>
									setControls((previous) => ({
										...previous,
										[key]: !previous[key],
									}))
								}
								className={`trust-toggle ${controls[key] ? "is-on" : ""}`}
								aria-pressed={controls[key]}
								aria-label={`Toggle ${controlLabels[key]}`}
							>
								<span />
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="panel rounded-[18px] p-6 sm:p-7">
				<p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-mute">
					Exposure with controls on
				</p>
				<p className="mt-4 metric-value">{(exposure * 100).toFixed(0)}%</p>
				<p className="mt-2 text-sm text-mute">
					The more guardrails on, the less surface area exposed.
				</p>

				<div className="trust-meter mt-5">
					<div style={{ width: `${100 - exposure * 100}%` }} />
				</div>

				<div className="mt-6 rounded-[12px] border border-line bg-white/[0.02] p-4">
					<p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
						Audit stream
					</p>
					<div className="mt-3 space-y-2 text-sm text-ink/82">
						<p className="flex items-start gap-2">
							<LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-bright" />
							Policy check passed before the action ran
						</p>
						<p className="flex items-start gap-2">
							<LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-bright" />
							Approval requested for a change above threshold
						</p>
						<p className="flex items-start gap-2">
							<LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-bright" />
							Every step recorded against the user who ran it
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
