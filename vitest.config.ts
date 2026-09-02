import { defineConfig } from "vitest/config";

// Unit tests only; the app's Vite plugins (TanStack Start, Nitro) are not
// loaded here, and the legacy .agent/ hook tests are out of scope.
export default defineConfig({
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
		environment: "node",
	},
});
