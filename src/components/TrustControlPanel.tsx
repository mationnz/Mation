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

	const protection = useMemo(() => {
		let score = 0.29;
		if (controls.humanApproval) score += 0.17;
		if (controls.policyRestrictions) score += 0.15;
		if (controls.leastPrivilege) score += 0.11;
		if (controls.scopedReach) score += 0.13;
		if (controls.auditTrail) score += 0.1;
		return Math.min(0.95, score);
	}, [controls]);

	const activeCount = Object.values(controls).filter(Boolean).length;
	const allOn = activeCount === 5;

	return (
		<div className="grid gap-4 text-left lg:grid-cols-[0.57fr_0.43fr]">
			<div className="panel rounded-[18px] p-6 sm:p-7">
				<div className="mb-5 flex items-center justify-between gap-3">
					<p className="kicker">Safeguards we build in</p>
					<div
						className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${
							allOn
								? "border-[var(--color-success)] text-[var(--color-success)]"
								: "border-border text-mute"
						}`}
					>
						<ShieldCheck className="h-3.5 w-3.5" />
						{activeCount}/5 on
					</div>
				</div>

				<div className="flex flex-col gap-px overflow-hidden rounded-[12px] border border-border bg-border">
					{(Object.keys(controls) as ControlKey[]).map((key) => (
						<div
							key={key}
							className="flex items-center justify-between gap-4 bg-surface p-4"
						>
							<p className="text-sm text-ink-soft">{controlLabels[key]}</p>
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
				<p className="kicker">More safeguards, less risk</p>
				<p className="mt-4 metric-value">{(protection * 100).toFixed(0)}%</p>
				<p className="mt-2 text-sm text-mute">
					A live read on how protected you are — every safeguard you turn on
					closes off more risk.
				</p>

				<div className="trust-meter mt-5">
					<div style={{ width: `${protection * 100}%` }} />
				</div>

				<div className="mt-6 rounded-[12px] border border-border bg-canvas-2 p-4">
					<p className="kicker">Audit stream</p>
					<div className="mt-3 space-y-2 text-sm text-ink-soft">
						<p className="flex items-start gap-2">
							<LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-success)]" />
							Policy check passed before the action ran
						</p>
						<p className="flex items-start gap-2">
							<LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-success)]" />
							Approval requested for a change above threshold
						</p>
						<p className="flex items-start gap-2">
							<LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-success)]" />
							Every step recorded against the user who ran it
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
