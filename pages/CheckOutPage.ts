import { type Page, type Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  // Checkout Information
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Checkout Overview
  readonly checkoutSummary: Locator;
  readonly cartItems: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelOverviewButton: Locator;

  // Checkout Complete
  readonly successMessage: Locator;
  readonly successText: Locator;
  readonly backHomeButton: Locator;
  readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Checkout Information Selectors
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Checkout Overview Selectors
    this.checkoutSummary = page.locator('.checkout_summary_container');
    this.cartItems = page.locator('.cart_item');
    this.paymentInfo = page.locator('.summary_info_label:has-text("Payment Information:")');
    this.shippingInfo = page.locator('.summary_info_label:has-text("Shipping Information:")');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelOverviewButton = page.locator('[data-test="cancel"]');

    // Checkout Complete Selectors
    this.successMessage = page.locator('.complete-header');
    this.successText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.ponyExpressImage = page.locator('.pony_express');
  }

  async gotoStepOne() {
    await this.page.goto('/checkout-step-one.html');
  }

  async gotoStepTwo() {
    await this.page.goto('/checkout-step-two.html');
  }

  async gotoComplete() {
    await this.page.goto('/checkout-complete.html');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async cancelFromOverview() {
    await this.cancelOverviewButton.click();
  }
}
