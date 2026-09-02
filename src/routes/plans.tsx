import { createFileRoute, redirect } from "@tanstack/react-router";

/** The old /plans page. Pricing now lives at /pricing. */
export const Route = createFileRoute("/plans")({
	beforeLoad: () => {
		throw redirect({ to: "/pricing", statusCode: 301 });
	},
});
