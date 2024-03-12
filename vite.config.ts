/// <reference types="vitest" />
import { defineConfig } from "vite";
import prefresh from "@prefresh/vite";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  plugins: [prefresh()],
  resolve: {
    alias: {
      react: "preact/compat",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["./**/*.test.tsx"],
    globals: true,
  },
});
