import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	DEFAULT_STORE_PATH,
	persistSubmission,
	readSubmissions,
	resolveStorePath,
	type StoredSubmission,
} from "./contactStore";

const sample = (
	overrides: Partial<StoredSubmission> = {},
): StoredSubmission => ({
	id: "sub_1",
	receivedAt: "2026-09-02T00:00:00.000Z",
	name: "Alex Carter",
	email: "alex@example.co.nz",
	company: "Example Ltd",
	message: "We run on spreadsheets and email.\nIt is not working.",
	...overrides,
});

describe("contact submission store", () => {
	let dir: string;

	beforeEach(async () => {
		dir = await mkdtemp(join(tmpdir(), "mation-contact-"));
	});

	afterEach(async () => {
		await rm(dir, { recursive: true, force: true });
	});

	it("creates the directory and appends one JSON line per submission", async () => {
		const path = join(dir, "nested", "store.jsonl");

		expect(await persistSubmission(sample(), path)).toBe(true);
		expect(await persistSubmission(sample({ id: "sub_2" }), path)).toBe(true);

		const raw = await readFile(path, "utf8");
		expect(raw.trim().split("\n")).toHaveLength(2);

		const stored = await readSubmissions(path);
		expect(stored.map((s) => s.id)).toEqual(["sub_1", "sub_2"]);
		// Multi-line messages survive the round trip intact.
		expect(stored[0].message).toContain("\n");
	});

	it("returns an empty list when nothing has been stored yet", async () => {
		expect(await readSubmissions(join(dir, "missing.jsonl"))).toEqual([]);
	});

	it("returns false instead of throwing when the path is unwritable", async () => {
		// A directory where a file should be — appendFile must fail.
		expect(await persistSubmission(sample(), dir)).toBe(false);
	});

	it("resolves the store path from the environment", () => {
		expect(resolveStorePath({})).toBe(join(process.cwd(), DEFAULT_STORE_PATH));
		expect(resolveStorePath({ CONTACT_STORE_PATH: "/var/data/x.jsonl" })).toBe(
			"/var/data/x.jsonl",
		);
	});
});
