import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run start",
    port: 3000,
    reuseExistingServer: true,
  },
});
