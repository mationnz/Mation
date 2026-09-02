import { createFileRoute, redirect } from "@tanstack/react-router";

/** The old /approach page. Its story moved to /how-it-works and /what-you-own. */
export const Route = createFileRoute("/approach")({
	beforeLoad: () => {
		throw redirect({ to: "/how-it-works", statusCode: 301 });
	},
});
