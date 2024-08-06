import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.use({ launchOptions: { slowMo: 2500 } });
test.setTimeout(480000);
const randomEmail = faker.internet.email({ provider: "test.com" });
const randomPassword = faker.internet.password({ length: 6 });
const randomTicker = faker.string.alpha({ length: 4, casing: "upper" });
const randomEntryPrice = faker.number
  .float({
    min: 0.01,
    max: 1999.99,
    fractionDigits: 2,
  })
  .toString();

const randomQuantity = faker.number
  .float({
    min: 1,
    max: 100000,
    fractionDigits: 0,
  })
  .toString();

const randomExitPrice = faker.number
  .float({
    min: 0.01,
    max: 1999.99,
    fractionDigits: 2,
  })
  .toString();

const randomPL = faker.number
  .float({
    min: -50000,
    max: 50000,
    fractionDigits: 2,
  })
  .toString();

test.describe("E2E testing of the TradeVault React App", () => {
  test("E2E testing of the TradeVault React App", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await test.step("Home Page is Visible", async () => {
      await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
      await expect(
        page.getByRole("heading", { name: "Welcome to TradeVault" })
      ).toBeVisible();

      await expect(
        page.getByText("TradeVault is a comprehensive")
      ).toBeVisible();
      await expect(page.getByText("Our mission is to empower")).toBeVisible();
    });

    await test.step("All Posted Trades", async () => {
      await page.getByRole("link", { name: "All Posted Trades" }).click();
      await expect(
        page.getByRole("heading", { name: "All Posted Trades" })
      ).toBeVisible();
    });

    await test.step("Login", async () => {
      await page.getByRole("link", { name: "Login" }).click();
      await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    });
    await test.step("Register", async () => {
      await page.getByRole("link", { name: "Register", exact: true }).click();
      await expect(
        page.getByRole("heading", { name: "Register" })
      ).toBeVisible();
    });

    await test.step("Perform Login with Valid Credentials", async () => {
      await page.getByRole("link", { name: "Login here" }).click();
      await page
        .getByPlaceholder("IvanDavidov@softuni.bg")
        .fill("peter@abv.bg");
      await page.getByLabel("Password:").fill("123456");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByRole("heading", { name: "Hello, peter@abv.bg" })
      ).toBeVisible();
    });

    await test.step("Perform Logout", async () => {
      await page.getByRole("link", { name: "Logout" }).click();
      await expect(
        page.getByRole("heading", { name: "Get Started" })
      ).toBeVisible();
    });

    await test.step("Perform Registration", async () => {
      await page
        .locator("#main-content")
        .getByRole("link", { name: "Register" })
        .click();
      await page.getByPlaceholder("IvanDavidov@softuni.bg").fill(randomEmail);
      await page.getByLabel("Password:").fill(randomPassword);
      await page.locator("#rePassword").fill(randomPassword);
      await page.getByRole("button", { name: "Register" }).click();
      await expect(
        page.getByRole("heading", { name: `Hello, ${randomEmail}` })
      ).toBeVisible();
    });

    await test.step("Add Trade", async () => {
      await page
        .locator("#main-content")
        .getByRole("link", { name: "Add Trade" })
        .click();

      await page
        .locator("#main-content")
        .getByLabel("* Ticker Symbol:")
        .fill(randomTicker);

      await page.getByLabel("* Date:").fill("2024-08-01");
      await page.getByLabel("* Entry Price:").fill(randomEntryPrice);
      await page.getByLabel("* Quantity:").fill(randomQuantity);
      await page
        .getByLabel("* Image Link:")
        .fill(
          "https://www.forbes.com/advisor/wp-content/uploads/2023/03/stock_chart-900x510.jpeg"
        );
      await page.getByRole("button", { name: "Add Trade" }).click();
      await expect(
        page.getByRole("heading", { name: randomTicker })
      ).toBeVisible();
    });

    await test.step("Edit the Trade", async () => {
      await page.getByRole("link", { name: "Edit" }).click();
      await page.getByLabel("Exit Price (Optional):").fill(randomExitPrice);
      await page.getByLabel("P/L (Optional):").fill(randomPL);
      await page.getByRole("button", { name: "Edit Trade" }).click();

      const exitPrice = await page.getByText("Exit Price: $").textContent();
      expect(exitPrice).toEqual(`Exit Price: $${randomExitPrice}`);

      const pl = await page.getByText(`P/L: ${randomPL}`).textContent();
      expect(pl).toEqual(`P/L: ${randomPL}`);
    });

    await test.step("Delete the Trade", async () => {
      await page.getByRole("link", { name: "Delete" }).click();
      await expect(
        page.getByRole("heading", { name: `${randomTicker}` })
      ).not.toBeVisible();
    });

    await test.step("Like a trade", async () => {
      await page.locator(".details-button").first().click();
      await page.getByRole("button", { name: "Like" }).click();
      await expect(page.getByText("Liked!")).toBeVisible();
    });
  });
});
