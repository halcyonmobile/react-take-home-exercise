import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      exclude: [
        "src/main.tsx",
        "**/*.config.js",
        ...configDefaults.exclude,
      ],
    },
  },
});
