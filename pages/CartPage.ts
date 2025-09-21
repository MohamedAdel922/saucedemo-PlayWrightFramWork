import { type Page, type Locator } from "@playwright/test";

/**
 * Cart Page Object Model
 */
export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartList: Locator;

  constructor(page: Page) {
    this.page = page;

    // Selectors
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartList = page.locator('.cart_list');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async getAllCartItems() {
    return await this.cartItems.all();
  }

  getCartItemByName(itemName: string) {
    return this.page.locator(`.cart_item:has-text("${itemName}")`);
  }

  async removeItem(productId: string) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async hasItem(itemName: string) {
    const item = this.getCartItemByName(itemName);
    return await item.isVisible();
  }

  async removeAllItems() {
    const items = await this.getAllCartItems();
      const removeButtons = await this.page.locator('[data-test*="remove-"]').all();
        await removeButtons[0].click();
        await removeButtons[1].click();

    
  }

  async waitForLoad() {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.cartList.waitFor({ state: 'visible' });
  }

  async isCheckoutButtonEnabled() {
    return await this.checkoutButton.isEnabled();
  }

  async isContinueShoppingButtonVisible() {
    return await this.continueShoppingButton.isVisible();
  }
}
