import { appendFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

/**
 * A contact submission as it is stored. One JSON object per line, appended to
 * a file the server can always write to. This is the system of record for
 * enquiries: email is a notification, not the store.
 */
export type StoredSubmission = {
	id: string;
	receivedAt: string;
	name: string;
	email: string;
	company: string;
	message: string;
	/** Where the submission came from, for triage — never trusted. */
	userAgent?: string;
};

export const DEFAULT_STORE_PATH = "data/contact-submissions.jsonl";

/** Resolves the store path from the environment, relative to the working dir. */
export function resolveStorePath(
	env: Record<string, string | undefined> = process.env,
): string {
	return resolve(process.cwd(), env.CONTACT_STORE_PATH ?? DEFAULT_STORE_PATH);
}

/**
 * Appends one submission to the JSONL store, creating the directory on first
 * use. Returns true when the line is on disk. Never throws — the caller
 * decides what to do when persistence is unavailable.
 */
export async function persistSubmission(
	submission: StoredSubmission,
	storePath: string = resolveStorePath(),
): Promise<boolean> {
	try {
		await mkdir(dirname(storePath), { recursive: true });
		await appendFile(storePath, `${JSON.stringify(submission)}\n`, "utf8");
		return true;
	} catch (error) {
		console.error("[contact] could not persist submission:", error);
		return false;
	}
}

/** Reads every stored submission. Used by tests and by hand when triaging. */
export async function readSubmissions(
	storePath: string = resolveStorePath(),
): Promise<StoredSubmission[]> {
	let raw: string;
	try {
		raw = await readFile(storePath, "utf8");
	} catch {
		return [];
	}
	return raw
		.split("\n")
		.filter((line) => line.trim().length > 0)
		.map((line) => JSON.parse(line) as StoredSubmission);
}

/**
 * Optional second sink: POST the submission as JSON to a webhook (a CRM, a
 * spreadsheet connector, anything). Returns true on a 2xx response.
 */
export async function forwardToWebhook(
	submission: StoredSubmission,
	url: string | undefined = process.env.CONTACT_WEBHOOK_URL,
): Promise<boolean> {
	if (!url) {
		return false;
	}
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(submission),
		});
		if (!response.ok) {
			console.error(`[contact] webhook responded ${response.status}`);
		}
		return response.ok;
	} catch (error) {
		console.error("[contact] webhook request threw:", error);
		return false;
	}
}
