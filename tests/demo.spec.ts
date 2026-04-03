import { test } from "@playwright/test";
import { DemoPage } from "../pages/demo.page";
import { faker } from "@faker-js/faker";


test("DEMO search with POM", async ({ page }) => {

  console.log("HELLO WORLD");
  const demo = new DemoPage(page);
  await demo.open();
  const searchTerm = faker.word.words(1);
  await demo.search(searchTerm);
});
