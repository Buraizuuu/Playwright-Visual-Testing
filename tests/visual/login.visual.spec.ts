import { test, expect } from "../../fixtures";
import { logger } from "../../utils/logger";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("OrangeHRM Login Page — Visual Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("[Login] full page matches snapshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("login-full-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
    logger.info("Snapshot: login-full-page.png");
  });

  test("[Login] login panel matches snapshot", async ({ loginPage }) => {
    await expect(loginPage.loginPanel).toHaveScreenshot("login-panel.png", {
      maxDiffPixelRatio: 0.02,
    });
    logger.info("Snapshot: login-panel.png");
  });

  test("[Login] branding matches snapshot", async ({ loginPage }) => {
    await expect(loginPage.loginBranding).toHaveScreenshot(
      "login-branding.png",
      { maxDiffPixelRatio: 0.02 }
    );
    logger.info("Snapshot: login-branding.png");
  });

  test("[Login] login form matches snapshot", async ({ page }) => {
    const form = page.locator(".orangehrm-login-form");
    await expect(form).toHaveScreenshot("login-form.png", {
      maxDiffPixelRatio: 0.02,
    });
    logger.info("Snapshot: login-form.png");
  });
});
