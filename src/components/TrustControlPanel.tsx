import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

type ControlKey =
	| "humanApproval"
	| "policyRestrictions"
	| "piiRedaction"
	| "budgetGuardrails"
	| "auditTrail";

type Controls = Record<ControlKey, boolean>;

const initialControls: Controls = {
	humanApproval: true,
	policyRestrictions: true,
	piiRedaction: true,
	budgetGuardrails: true,
	auditTrail: true,
};

const controlLabels: Record<ControlKey, string> = {
	humanApproval: "Human approval gates",
	policyRestrictions: "Policy action restrictions",
	piiRedaction: "PII redaction enforcement",
	budgetGuardrails: "Spend and risk guardrails",
	auditTrail: "Execution + reasoning logs",
};

export default function TrustControlPanel() {
	const [controls, setControls] = useState<Controls>(initialControls);

	const riskScore = useMemo(() => {
		let score = 0.71;
		if (controls.humanApproval) score -= 0.17;
		if (controls.policyRestrictions) score -= 0.15;
		if (controls.piiRedaction) score -= 0.11;
		if (controls.budgetGuardrails) score -= 0.13;
		if (controls.auditTrail) score -= 0.1;
		return Math.max(0.05, score);
	}, [controls]);

	const activeCount = Object.values(controls).filter(Boolean).length;

	return (
		<div className="grid gap-4 lg:grid-cols-[0.57fr_0.43fr]">
			<div className="panel-glass rounded-3xl p-6 sm:p-7">
				<div className="mb-5 flex items-center justify-between">
					<p className="kicker">Trust & Governance</p>
					<div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3 py-1.5 text-xs text-cyan-100">
						<ShieldCheck className="h-3.5 w-3.5" />
						{activeCount}/5 controls active
					</div>
				</div>

				<div className="space-y-3">
					{(Object.keys(controls) as ControlKey[]).map((key) => (
						<div
							key={key}
							className="data-card flex items-center justify-between gap-4"
						>
							<p className="text-sm text-indigo-100/84">{controlLabels[key]}</p>
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
							>
								<span />
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="panel-glass rounded-3xl p-6 sm:p-7">
				<p className="font-tech text-[0.66rem] uppercase tracking-[0.2em] text-indigo-100/62">
					Live compliance posture
				</p>
				<p className="mt-4 font-heading text-5xl font-semibold text-white">
					{(riskScore * 100).toFixed(1)}%
				</p>
				<p className="mt-2 text-sm text-indigo-100/78">Residual risk index</p>

				<div className="trust-meter mt-5">
					<div style={{ width: `${100 - riskScore * 100}%` }} />
				</div>

				<div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4">
					<p className="font-tech text-[0.62rem] uppercase tracking-[0.2em] text-indigo-100/62">
						Audit stream
					</p>
					<div className="mt-3 space-y-2 text-sm text-indigo-100/82">
						<p className="flex items-center gap-2">
							<LockKeyhole className="h-3.5 w-3.5 text-cyan-200" />
							Policy check passed for proposal generation workflow
						</p>
						<p className="flex items-center gap-2">
							<LockKeyhole className="h-3.5 w-3.5 text-cyan-200" />
							Human approval requested for pricing exception above threshold
						</p>
						<p className="flex items-center gap-2">
							<LockKeyhole className="h-3.5 w-3.5 text-cyan-200" />
							Reasoning trace captured and archived for audit readiness
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
