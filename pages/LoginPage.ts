import { expect, type Page, type Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly passWord: Locator;
  readonly login_btn: Locator;
  readonly errorMessage : Locator;

  //readonly url : string ='https://www.saucedemo.com/';


  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('[data-test="username"]');
    this.passWord = page.locator('[data-test="password"]');
    this.login_btn = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');


  }
    async goto() {
    await this.page.goto('/');
  }

  
    async login(userName: string, passWord: string) {
    await this.userName.fill(userName);
    await this.passWord.fill(passWord);
    await this.login_btn.click();
  }
}