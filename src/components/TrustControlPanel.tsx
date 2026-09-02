import { useState } from "react";

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

const controls: Record<ControlKey, { label: string; on: string; off: string }> =
	{
		humanApproval: {
			label: "Approval gates on sensitive actions",
			on: "Irreversible actions wait for a person to say yes.",
			off: "Sensitive actions would run without a human in the loop.",
		},
		policyRestrictions: {
			label: "Policy rules on what can run",
			on: "Only the workflows and tools your policy allows can execute.",
			off: "Anything the system can reach, it could run.",
		},
		leastPrivilege: {
			label: "Least-privilege access by role",
			on: "Each person and process sees only what their role needs.",
			off: "Every user would see and do more than their job requires.",
		},
		scopedReach: {
			label: "Scoped reach to approved systems",
			on: "Integrations connect only to the systems you’ve approved.",
			off: "Connections could extend to systems nobody signed off.",
		},
		auditTrail: {
			label: "Full audit trail of every action",
			on: "Every action is recorded against who ran it and when.",
			off: "You’d have no record of what ran, or who asked for it.",
		},
	};

/**
 * Interactive illustration of the safeguards a tenant runs with. Toggling a
 * control changes what the panel says is protected — in words, deliberately.
 * There is no percentage here because no honest one exists.
 */
export default function TrustControlPanel() {
	const [state, setState] = useState<Controls>(initialControls);
	const keys = Object.keys(controls) as ControlKey[];
	const activeCount = keys.filter((key) => state[key]).length;

	return (
		<div className="grid gap-5 lg:grid-cols-[0.55fr_0.45fr]">
			<div className="panel p-6 sm:p-7">
				<div className="mb-5 flex items-center justify-between gap-3">
					<p className="label">Safeguards</p>
					<span className="font-mono text-sm text-mute">
						{activeCount} of {keys.length} on
					</span>
				</div>
				<ul className="m-0 list-none divide-y divide-border p-0">
					{keys.map((key) => (
						<li
							key={key}
							className="flex items-center justify-between gap-4 py-3.5"
						>
							<span className="text-[0.95rem] text-ink-soft">
								{controls[key].label}
							</span>
							<button
								type="button"
								onClick={() =>
									setState((previous) => ({
										...previous,
										[key]: !previous[key],
									}))
								}
								className={`trust-toggle ${state[key] ? "is-on" : ""}`}
								aria-pressed={state[key]}
								aria-label={controls[key].label}
							>
								<span />
							</button>
						</li>
					))}
				</ul>
			</div>

			<div className="panel bg-surface-2 p-6 sm:p-7" aria-live="polite">
				<p className="label">What that means</p>
				<ul className="mt-4 m-0 list-none space-y-3 p-0">
					{keys.map((key) => (
						<li
							key={key}
							className={`flex items-start gap-3 text-[0.95rem] leading-relaxed ${
								state[key] ? "text-ink-soft" : "text-warm-ink"
							}`}
						>
							<span
								aria-hidden
								className={`mt-[0.55em] h-2 w-2 flex-none rounded-[2px] ${
									state[key] ? "bg-violet" : "bg-warm"
								}`}
							/>
							{state[key] ? controls[key].on : controls[key].off}
						</li>
					))}
				</ul>
				<p className="mt-5 border-t border-border pt-4 text-sm text-mute">
					In a real tenant these are configured to your policy and enforced in
					code, not in a toggle on a web page.
				</p>
			</div>
		</div>
	);
}
