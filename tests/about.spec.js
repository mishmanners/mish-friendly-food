import { test, expect } from "@playwright/test";

test("page opens", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveTitle("About Mish Friendly Food");
  await expect(page.locator("h1", { hasText: "About Mish Friendly Food" })).toHaveText("About Mish Friendly Food");
  await expect(page.locator("h2", { hasText: "Why Mish Friendly Food?" })).toHaveText("Why Mish Friendly Food?");
});
