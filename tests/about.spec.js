import { test, expect } from "@playwright/test";

test("page opens", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveTitle("About Mish Friendly Food");
  await expect(page.locator("h1")).toHaveText("About Mish Friendly Food");
  await expect(page.locator("h2")).toHaveText("Why Mish Friendly Food?");
});
