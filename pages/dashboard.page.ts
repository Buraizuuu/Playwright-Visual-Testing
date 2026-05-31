import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly topbar: Locator;
  readonly sidebar: Locator;
  readonly quickLaunch: Locator;
  readonly userDropdown: Locator;
  readonly dashboardTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topbar = page.locator(".oxd-topbar");
    this.sidebar = page.locator(".oxd-sidepanel");
    this.quickLaunch = page.locator(".orangehrm-quick-launch");
    this.userDropdown = page.locator(".oxd-userdropdown");
    this.dashboardTitle = page.locator(".oxd-topbar-header-title");
  }

  async navigate(): Promise<void> {
    await this.page.goto("/web/index.php/dashboard/index");
  }

  async waitForDashboard(): Promise<void> {
    await this.page.waitForURL("**/dashboard/index");
    await this.dashboardTitle.waitFor({ state: "visible" });
  }
}
