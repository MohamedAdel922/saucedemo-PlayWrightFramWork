import { type Page, type Locator } from "@playwright/test";

/**
 * Home Page (Inventory) Page Object Model
 */
export class HomePage {
  readonly page: Page;
  readonly productsHeader: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly menuButton: Locator;
  readonly sidebar: Locator;
  readonly sortDropdown: Locator;
  readonly appLogo: Locator;

  constructor(page: Page) {
    this.page = page;

    // Selectors
    this.productsHeader = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.sidebar = page.locator('.bm-menu');
    this.sortDropdown = page.locator('.product_sort_container');
    this.appLogo = page.locator('.app_logo');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async getAllProducts() {
    return await this.inventoryItems.all();
  }

  getProductByName(productName: string) {
    return this.page.locator(`.inventory_item:has-text("${productName}")`);
  }

  async addProductToCart(productId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  async removeProductFromCart(productId: string) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async getCartItemCount() {
    if (await this.shoppingCartBadge.isVisible()) {
      const badgeText = await this.shoppingCartBadge.textContent();
      return parseInt(badgeText ?? '0');
    }
    return 0;
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    const closeButton = this.page.locator('#react-burger-cross-btn');
    await closeButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.page.locator('#logout_sidebar_link').click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.page.locator('#reset_sidebar_link').click();
    await this.closeMenu();
  }

  async sortProducts(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getAllProductNames() {
    const nameElements = await this.page.locator('.inventory_item_name').all();
    const names: string[] = [];
    for (const element of nameElements) {
      names.push(await element.textContent() ?? '');
    }
    return names;
  }

  async getAllProductPrices() {
    const priceElements = await this.page.locator('.inventory_item_price').all();
    const prices: number[] = [];
    for (const element of priceElements) {
      const priceText = await element.textContent();
      const price = parseFloat((priceText ?? '$0').replace('$', ''));
      prices.push(price);
    }
    return prices;
  }

  async clickProductName(productName: string) {
    await this.page.locator(`.inventory_item_name:has-text("${productName}")`).click();
  }

  async clickProductImage(productName: string) {
    const product = this.getProductByName(productName);
    await product.locator('.inventory_item_img').click();
  }

  async getProductDescription(productName: string) {
    const product = this.getProductByName(productName);
    return await product.locator('.inventory_item_desc').textContent();
  }

  async getProductPrice(productName: string) {
    const product = this.getProductByName(productName);
    const priceText = await product.locator('.inventory_item_price').textContent();
    return parseFloat((priceText ?? '$0').replace('$', ''));
  }

  async isProductInCart(productId: string) {
    const removeButton = this.page.locator(`[data-test="remove-${productId}"]`);
    return await removeButton.isVisible();
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async waitForProductsToLoad() {
    await this.inventoryList.waitFor({ state: 'visible' });
    await this.inventoryItems.first().waitFor({ state: 'visible' });
  }

  async isPageLoaded() {
    try {
      await this.productsHeader.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
