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

  async clickProductName(productName: string) {
    await this.page.locator(`.inventory_item_name:has-text("${productName}")`).click();
  }

  async clickProductImage(productName: string) {
    const product = this.getProductByName(productName);
    await product.locator('.inventory_item_img').click();
  }

  async waitForProductsToLoad() {
    await this.inventoryList.waitFor({ state: 'visible' });
    await this.inventoryItems.first().waitFor({ state: 'visible' });
  }
}
