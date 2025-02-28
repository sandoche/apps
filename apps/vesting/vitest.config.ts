import { defineConfig } from "vitest/config";

// @ts-ignore
import { sharedConfig } from "vitest-config-custom";

export default defineConfig({
  ...sharedConfig,
  test: {
    ...sharedConfig.test,
    setupFiles: ["vitest.setup.ts"],
  },
});
