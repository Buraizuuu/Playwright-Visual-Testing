import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginPanel: Locator;
  readonly loginBranding: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.loginPanel = page.locator(".orangehrm-login-container");
    this.loginBranding = page.locator(".orangehrm-login-branding");
  }

  async navigate(): Promise<void> {
    await this.page.goto("/web/index.php/auth/login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
