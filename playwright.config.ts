import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { validateEnv } from "./utils/validateEnv";

const env = process.env.ENV || "local";

dotenv.config({
  path: path.resolve(__dirname, `env/.env.${env}`),
});

const missing = validateEnv();
if (missing.length > 0) {
  throw new Error(`Missing environment variables: ${missing.join(", ")}`);
}

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./configs/global-setup",
  globalTeardown: "./configs/global-teardown",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"]],

  snapshotDir: "./snapshots",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{arg}{ext}",

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
    },
  },

  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Fixed viewport required for stable cross-machine snapshots
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: "setup",
      testMatch: "**/auth.setup.ts",
    },
    {
      name: "chromium",
      testMatch: "**/*.visual.spec.ts",
      use: {
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
