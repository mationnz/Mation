import { useState } from "react";

/**
 * Dev-only A/B design comparison.
 *
 * The OLD ("Blueprint") design runs as a separate dev server — a git worktree
 * of `main` — on the origin below. Selecting "Old" overlays that server in a
 * full-screen iframe at the current path, so you can flip between the real old
 * and new designs on any page while browsing. Only mounted in dev (see
 * __root.tsx). Delete this component + the worktree to remove.
 *
 * Start the old server:  (in the worktree)  bun --bun vite dev --port 6970
 */
const OLD_ORIGIN = "http://localhost:6970";

export default function DesignCompareToggle() {
	const [showOld, setShowOld] = useState(false);
	const [oldSrc, setOldSrc] = useState(OLD_ORIGIN);

	const openOld = () => {
		// Open the old design at whatever page you're currently viewing.
		setOldSrc(OLD_ORIGIN + window.location.pathname + window.location.search);
		setShowOld(true);
	};

	return (
		<>
			{showOld ? (
				<iframe
					title="Old design — Blueprint"
					src={oldSrc}
					style={{
						position: "fixed",
						inset: 0,
						width: "100vw",
						height: "100vh",
						border: 0,
						zIndex: 2147483000,
						background: "#07060e",
					}}
				/>
			) : null}

			<div
				style={{ position: "fixed", left: 14, bottom: 14, zIndex: 2147483001 }}
				className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 text-xs shadow-[var(--shadow-lg)]"
			>
				<span className="pl-2 pr-0.5 font-semibold tracking-tight text-mute">
					Design
				</span>
				<button
					type="button"
					onClick={() => setShowOld(false)}
					className={`rounded-full px-2.5 py-1 font-semibold transition ${
						showOld ? "text-ink-soft hover:text-ink" : "bg-violet text-white"
					}`}
				>
					New
				</button>
				<button
					type="button"
					onClick={openOld}
					className={`rounded-full px-2.5 py-1 font-semibold transition ${
						showOld ? "bg-violet text-white" : "text-ink-soft hover:text-ink"
					}`}
				>
					Old
				</button>
			</div>
		</>
	);
}
