import { createServerFn } from "@tanstack/react-start";

export type ContactInput = {
	name: string;
	email: string;
	company: string;
	role: string;
	industry: string;
	timeline: string;
	systems: string;
	message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/**
 * Sends a contact-form submission to the Mation inbox via Resend.
 * Runs server-side only (the Resend API has no CORS + the key must stay secret).
 * Requires RESEND_API_KEY; honours CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL overrides.
 */
export const sendContact = createServerFn({ method: "POST" })
	.inputValidator((data: ContactInput): ContactInput => {
		const required: (keyof ContactInput)[] = [
			"name",
			"email",
			"company",
			"role",
			"systems",
			"message",
		];
		for (const key of required) {
			if (!String(data?.[key] ?? "").trim()) {
				throw new Error(`Missing required field: ${key}`);
			}
		}
		return data;
	})
	.handler(async ({ data }): Promise<ContactResult> => {
		const apiKey = process.env.RESEND_API_KEY;
		const to = process.env.CONTACT_TO_EMAIL ?? "cam@mation.nz";
		const from =
			process.env.CONTACT_FROM_EMAIL ?? "Mation website <noreply@mation.nz>";

		if (!apiKey) {
			console.error("[contact] RESEND_API_KEY is not set — cannot send email.");
			return { ok: false, error: "not_configured" };
		}

		const rows: [string, string][] = [
			["Name", data.name],
			["Work email", data.email],
			["Company", data.company],
			["Role", data.role],
			["Industry", data.industry || "—"],
			["Timeline", data.timeline || "—"],
			["Systems in use", data.systems],
		];

		const text = [
			...rows.map(([key, value]) => `${key}: ${value}`),
			"",
			"What they want to automate or improve:",
			data.message,
		].join("\n");

		const html = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#111">
	<h2 style="margin:0 0 14px">New enquiry from the Mation website</h2>
	<table style="border-collapse:collapse;margin-bottom:16px">${rows
		.map(
			([key, value]) =>
				`<tr><td style="padding:4px 14px 4px 0;color:#666;vertical-align:top">${escapeHtml(key)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
		)
		.join("")}</table>
	<p style="margin:0 0 4px;color:#666">What they want to automate or improve:</p>
	<p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
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
					reply_to: data.email,
					subject: `New enquiry — ${data.company} (${data.name})`,
					text,
					html,
				}),
			});

			if (!response.ok) {
				const detail = await response.text().catch(() => "");
				console.error(
					`[contact] Resend send failed (${response.status}): ${detail}`,
				);
				return { ok: false, error: "send_failed" };
			}

			return { ok: true };
		} catch (error) {
			console.error("[contact] Resend request threw:", error);
			return { ok: false, error: "network_error" };
		}
	});
