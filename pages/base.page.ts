import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    if (!url) {
      throw new Error("❌ URL is required");
    }

    await this.page.goto(url);
  }

  async waitForLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}