import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { ENV } from "../config/env";

export class DemoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // 🔍 Locators
  private locators = {
    search: {
      txtSearch: "#searchBox",
      btnSearch: "input[name='btnK']"
    },
    header: {
      imgLogo: "//img[@id='logo']",
      btnProfile: "//button[@id='profile']"
    },
    dashboard: {
      lblDashboard: "//h1[contains(text(),'Dashboard')]"
    }
  };

  // 🚀 Actions
  async open() {
    if (!ENV.BASE_URL) throw new Error("❌ BASE_URL is missing");
    await this.goto(ENV.BASE_URL);
  }

  async search(query: string) {
    await this.page.locator(this.locators.search.txtSearch).fill(query);
    await this.page.keyboard.press("Enter");
  }

  async clickSearchButton() {
    await this.page.locator(this.locators.search.btnSearch).click();
  }

  // ✅ Assertions
  async expectTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text, "i"));
  }

  async expectDashboardVisible() {
    await expect(this.page.locator(this.locators.dashboard.lblDashboard)).toBeVisible();
  }
}