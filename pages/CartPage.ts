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
  readonly cartBadge: Locator;
  readonly cartList: Locator;

  constructor(page: Page) {
    this.page = page;

    // Selectors
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
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

  async getItemQuantity(itemName: string) {
    const item = this.getCartItemByName(itemName);
    const quantityText = await item.locator('.cart_quantity').textContent();
    return parseInt(quantityText ?? '0');
  }

  async getItemPrice(itemName: string) {
    const item = this.getCartItemByName(itemName);
    const priceText = await item.locator('.inventory_item_price').textContent();
    return parseFloat((priceText ?? '$0').replace('$', ''));
  }

  async getItemDescription(itemName: string) {
    const item = this.getCartItemByName(itemName);
    return await item.locator('.inventory_item_desc').textContent();
  }

  async hasItem(itemName: string) {
    const item = this.getCartItemByName(itemName);
    return await item.isVisible();
  }

  async removeAllItems() {
    const items = await this.getAllCartItems();
    for (let i = 0; i < items.length; i++) {
      const removeButtons = await this.page.locator('[data-test*="remove-"]').all();
      if (removeButtons.length > 0) {
        await removeButtons[0].click();
      }
    }
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      const badgeText = await this.cartBadge.textContent();
      return parseInt(badgeText ?? '0');
    }
    return 0;
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
