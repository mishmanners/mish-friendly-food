import { test, expect } from "@playwright/test";

test("page opens", async ({ page }) => {
  await page.goto("/translations");
  await expect(page).toHaveTitle("Mish Friendly Food");
  await expect(page.locator("h1")).toHaveText("Translations");
});

test("has a search form", async ({ page }) => {
  await page.goto("/translations");
  await expect(page.locator("form")).toBeVisible();
});

test("can translate a word", async ({ page }) => {
  await page.goto("/translations");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("German");
  await page.getByLabel("Word").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  await expect(
    page.getByTestId("translation-results").locator("> li")
  ).toHaveText([/Milch/, /Milchprodukt/]);
});

test("shows an error when there is no translation", async ({ page }) => {
  await page.goto("/translations");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("Latin");
  await page.getByLabel("Word").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  await expect(page.getByTestId("translation-results")).toHaveText(
    /Translations not found for selected language combination/
  );
});
