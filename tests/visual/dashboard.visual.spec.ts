import { test, expect } from "../../fixtures";
import { logger } from "../../utils/logger";

test.describe("OrangeHRM Dashboard Page — Visual Tests", () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigate();
    await dashboardPage.waitForDashboard();
  });

  test("[Dashboard] sidebar matches snapshot", async ({ dashboardPage }) => {
    await expect(dashboardPage.sidebar).toHaveScreenshot(
      "dashboard-sidebar.png",
      { maxDiffPixelRatio: 0.02 }
    );
    logger.info("Snapshot: dashboard-sidebar.png");
  });

  test("[Dashboard] topbar matches snapshot", async ({ dashboardPage }) => {
    await expect(dashboardPage.topbar).toHaveScreenshot(
      "dashboard-topbar.png",
      {
        mask: [dashboardPage.userDropdown],
        maxDiffPixelRatio: 0.03,
      }
    );
    logger.info("Snapshot: dashboard-topbar.png");
  });

  test("[Dashboard] quick launch panel matches snapshot", async ({
    dashboardPage,
  }) => {
    await expect(dashboardPage.quickLaunch).toHaveScreenshot(
      "dashboard-quick-launch.png",
      { maxDiffPixelRatio: 0.03 }
    );
    logger.info("Snapshot: dashboard-quick-launch.png");
  });

  test("[Dashboard] full page matches snapshot", async ({
    page,
    dashboardPage,
  }) => {
    await expect(page).toHaveScreenshot("dashboard-full-page.png", {
      fullPage: true,
      mask: [dashboardPage.userDropdown],
      maxDiffPixelRatio: 0.05,
    });
    logger.info("Snapshot: dashboard-full-page.png");
  });
});
