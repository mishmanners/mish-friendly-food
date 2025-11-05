import { test, expect } from "@playwright/test";

test("page opens", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Mish Friendly Food");
  await expect(page.locator("h1", { hasText: "Mish Friendly Food" })).toHaveText("Mish Friendly Food");
  await expect(page.locator("h2", { hasText: "Search and Translate" })).toHaveText("Search and Translate");
});

test("has a search form", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("form")).toBeVisible();
});

test("can translate a word", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("German");
  await page.getByLabel("Translate food/s").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  await expect(
    page.getByTestId("translation-results").locator("li li")
  ).toHaveText([/Milch/, /Milchprodukt/]);
});

test("shows an error when there is no translation", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("Latin");
  await page.getByLabel("Translate food/s").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  await expect(page.getByTestId("translation-results")).toHaveText(
    /Translations not found for selected language combination/
  );
});

test("translates food dietaries", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("French");
  await page.getByLabel("Translate food/s").fill("gluten-free, vegan, dairy-free");

  await page.getByRole("button", { name: "Translate" }).click();

  await expect(
    page.getByTestId("translation-results").locator("li li")
  ).toHaveText([
    /sans gluten/i,
    /végétalienne/i,
    /végétalien/i,
    /végan/i,
    /sans lactose/i,
    /sans produits laitiers/i,
  ]);
});

test("deduplicates words in search field", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("German");
  await page.getByLabel("Translate food/s").fill("egg,egg");

  await page.getByRole("button", { name: "Translate" }).click();

  await expect(
    page.getByTestId("translation-results").locator("li li")
  ).toHaveText([
    /Ei/,
    /Eier/,
    /Eiweiß/,
    /Eigelb/,
  ]);
});

/* removing tests whilst translation is disabled
test("exports translation as a cute card", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("German");
  await page.getByLabel("Translate food/s").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  // Wait for translation results to appear
  await expect(
    page.getByTestId("translation-results").locator("li li")
  ).toHaveText([/Milch/, /Milchprodukt/]);

  // Click the export button for a specific card styles
  await page.getByRole("button", { name: "Cute Card" }).click();

  // Mock the download behavior by checking for UI changes or other indicators
  await page.waitForSelector("#export-success-message", { state: "visible" });
});

test("exports translation as a modern card", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("German");
  await page.getByLabel("Translate food/s").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  // Wait for translation results to appear
  await expect(
    page.getByTestId("translation-results").locator("li li")
  ).toHaveText([/Milch/, /Milchprodukt/]);

  // Click the export button for Modern Card
  await page.getByRole("button", { name: "Modern Card" }).click();

  // Mock the download behavior by checking for UI changes or other indicators
  await page.waitForSelector("#export-success-message", { state: "visible" });
});

test("exports translation as an anime card", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("German");
  await page.getByLabel("Translate food/s").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  // Wait for translation results to appear
  await expect(
    page.getByTestId("translation-results").locator("li li")
  ).toHaveText([/Milch/, /Milchprodukt/]);

  // Click the export button for Anime Card
  await page.getByRole("button", { name: "Anime Card" }).click();

  // Mock the download behavior by checking for UI changes or other indicators
  await page.waitForSelector("#export-success-message", { state: "visible" });
});

test("exports translation as a corporate card", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("From").selectOption("English");
  await page.getByLabel("To").selectOption("German");
  await page.getByLabel("Translate food/s").fill("milk");

  await page.getByRole("button", { name: "Translate" }).click();

  // Wait for translation results to appear
  await expect(
    page.getByTestId("translation-results").locator("li li")
  ).toHaveText([/Milch/, /Milchprodukt/]);

  // Click the export button for Corporate Card
  await page.getByRole("button", { name: "Corporate Card" }).click();

  // Mock the download behavior by checking for UI changes or other indicators
  await page.waitForSelector("#export-success-message", { state: "visible" });
});

*/
