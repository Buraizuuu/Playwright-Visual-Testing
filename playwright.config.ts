import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { validateEnv } from "./utils/validateEnv";

const env = process.env.ENV || "staging";

// Load env FIRST
dotenv.config({
  path: path.resolve(__dirname, `env/.env.${env}`),
});

// Validate and STOP immediately if missing
const missing = validateEnv();

if (missing.length > 0) {
  throw new Error(
    `🚫 Missing environment variables: ${missing.join(", ")}`
  );
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    headless: false,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    launchOptions: {
      args: ["--start-maximized"],
    },
    viewport: null,
  },

  projects: [
    {
      name: "chromium",
      use: {
        viewport: null,
      },
    },
  ],
});