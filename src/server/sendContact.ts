import { createServerFn } from "@tanstack/react-start";

export type ContactInput = {
	name: string;
	email: string;
	company: string;
	message: string;
	/** Honeypot. Humans never see it; anything in it is dropped silently. */
	website?: string;
};

export type ContactResult =
	| { ok: true; stored: boolean; emailed: boolean }
	| { ok: false; error: "not_delivered" };

const MAX_FIELD = 200;
const MAX_MESSAGE = 5000;

function clean(value: unknown, max: number): string {
	return String(value ?? "")
		.trim()
		.slice(0, max);
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/**
 * Handles a contact-form submission.
 *
 * Order matters: the submission is written to the local store first, then
 * forwarded to the optional webhook, then emailed via Resend. Email is a
 * notification; the store is the record. The form only reports failure when
 * none of the three sinks accepted the submission.
 *
 * Environment:
 *   CONTACT_STORE_PATH   where the JSONL store lives (default data/contact-submissions.jsonl)
 *   CONTACT_WEBHOOK_URL  optional — POST each submission as JSON
 *   RESEND_API_KEY       optional — email each submission
 *   CONTACT_TO_EMAIL     inbox for notifications (default cam@mation.nz)
 *   CONTACT_FROM_EMAIL   sender on a Resend-verified domain
 */
export const sendContact = createServerFn({ method: "POST" })
	.inputValidator((data: ContactInput): ContactInput => {
		const input: ContactInput = {
			name: clean(data?.name, MAX_FIELD),
			email: clean(data?.email, MAX_FIELD),
			company: clean(data?.company, MAX_FIELD),
			message: clean(data?.message, MAX_MESSAGE),
			website: clean(data?.website, MAX_FIELD),
		};
		for (const key of ["name", "email", "company", "message"] as const) {
			if (!input[key]) {
				throw new Error(`Missing required field: ${key}`);
			}
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
			throw new Error("Invalid email address");
		}
		return input;
	})
	.handler(async ({ data }): Promise<ContactResult> => {
		// Bots fill the hidden field. Pretend it worked and drop it.
		if (data.website) {
			return { ok: true, stored: false, emailed: false };
		}

		const { persistSubmission, forwardToWebhook } = await import(
			"./contactStore"
		);

		const submission = {
			id: `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
			receivedAt: new Date().toISOString(),
			name: data.name,
			email: data.email,
			company: data.company,
			message: data.message,
		};

		const stored = await persistSubmission(submission);
		const forwarded = await forwardToWebhook(submission);
		const emailed = await emailSubmission(submission);

		console.info(
			`[contact] ${submission.id} stored=${stored} forwarded=${forwarded} emailed=${emailed}`,
		);

		if (!stored && !forwarded && !emailed) {
			// Last resort: the host's logs are still a record.
			console.error(
				"[contact] no sink accepted the submission:",
				JSON.stringify(submission),
			);
			return { ok: false, error: "not_delivered" };
		}

		return { ok: true, stored, emailed };
	});

async function emailSubmission(submission: {
	id: string;
	receivedAt: string;
	name: string;
	email: string;
	company: string;
	message: string;
}): Promise<boolean> {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.warn("[contact] RESEND_API_KEY is not set — stored only.");
		return false;
	}
	const to = process.env.CONTACT_TO_EMAIL ?? "cam@mation.nz";
	const from =
		process.env.CONTACT_FROM_EMAIL ?? "Mation website <noreply@mation.nz>";

	const rows: [string, string][] = [
		["Name", submission.name],
		["Work email", submission.email],
		["Company", submission.company],
		["Received", submission.receivedAt],
		["Reference", submission.id],
	];

	const text = [
		...rows.map(([key, value]) => `${key}: ${value}`),
		"",
		"Message:",
		submission.message,
	].join("\n");

	const html = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#111">
	<h2 style="margin:0 0 14px">New enquiry from mation.nz</h2>
	<table style="border-collapse:collapse;margin-bottom:16px">${rows
		.map(
			([key, value]) =>
				`<tr><td style="padding:4px 14px 4px 0;color:#666;vertical-align:top">${escapeHtml(key)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
		)
		.join("")}</table>
	<p style="margin:0 0 4px;color:#666">Message:</p>
	<p style="margin:0;white-space:pre-wrap">${escapeHtml(submission.message)}</p>
</div>`;

	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from,
				to: [to],
				reply_to: submission.email,
				subject: `New enquiry — ${submission.company} (${submission.name})`,
				text,
				html,
			}),
		});
		if (!response.ok) {
			const detail = await response.text().catch(() => "");
			console.error(
				`[contact] Resend send failed (${response.status}): ${detail}`,
			);
			return false;
		}
		return true;
	} catch (error) {
		console.error("[contact] Resend request threw:", error);
		return false;
	}
}
