import { test, expect } from "@playwright/test"; 
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckOutPage';

test.describe("Checkout Flow Tests", () => {
  let homePage: HomePage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test
    await page.goto("/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');

    // Verify we're on the inventory page
    await expect(page.locator(".title")).toContainText("Products");
  });

  test("should complete full checkout process", async ({ page }) => {
    await homePage.addProductToCart("sauce-labs-backpack");
    await homePage.addProductToCart("sauce-labs-bike-light");

    await homePage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.proceedToCheckout();

   const firstName = "Eslam";
    const lastName = "Ahmed";
    const zipCode = "54321";

    await checkoutPage.fillCheckoutInformation(firstName, lastName, zipCode);

    await checkoutPage.continueToOverview();
    await expect(checkoutPage.checkoutSummary).toBeVisible();

    await checkoutPage.finishCheckout();
    await expect(checkoutPage.successMessage).toContainText("Thank you for your order!");
    await expect(checkoutPage.successMessage).toBeVisible();
  });

  test("should show error when required fields are empty", async () => {
    await homePage.addProductToCart("sauce-labs-backpack");
    await homePage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText("First Name is required");
  });

  test("should calculate total price correctly", async () => {
    await homePage.addProductToCart("sauce-labs-backpack");
    await homePage.addProductToCart("sauce-labs-bike-light");
    await homePage.addProductToCart("sauce-labs-bolt-t-shirt");

    await homePage.goToCart();
    await cartPage.proceedToCheckout();

    const firstName = "Eslam";
    const lastName = "Ahmed";
    const zipCode = "54321";

    await checkoutPage.fillCheckoutInformation(firstName, lastName, zipCode);

  });

  test("should allow user to cancel checkout", async ({ page }) => {
    await homePage.addProductToCart("sauce-labs-backpack");
    await homePage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.cancelCheckout();

    await expect(page.url()).toContain("/cart.html");
    await expect(cartPage.cartItems).toHaveCount(1);
  });
});
