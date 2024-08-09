import { test, expect } from "@playwright/test";

test("page opens", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Mish Friendly Food");
  await expect(page.locator("h1")).toHaveText("Mish Friendly Food");
});
