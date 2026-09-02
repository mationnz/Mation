import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old case-study URLs. See work.index.tsx. */
export const Route = createFileRoute("/work/$slug")({
	beforeLoad: () => {
		throw redirect({ to: "/what-we-build", statusCode: 301 });
	},
});
