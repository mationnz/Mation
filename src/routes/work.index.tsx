import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The old /work page carried placeholder case studies. There are no published
 * client cases yet, so it redirects until there is a real one to show.
 */
export const Route = createFileRoute("/work/")({
	beforeLoad: () => {
		throw redirect({ to: "/what-we-build", statusCode: 301 });
	},
});
