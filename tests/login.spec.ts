import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await page.goto('/'); 
  });

  test('should login with valid credentials', async ({ page }) => {
    // Test data
    const username = 'standard_user';
    const password = 'secret_sauce';

    await loginPage.login(username, password);

    // Verify successful login
    await expect(homePage.productsHeader).toBeVisible();
    await expect(page.url()).toContain('/inventory.html');
  });

  test('should show error with invalid credentials', async () => {
    const username = 'invalid_user';
    const password = 'wrong_password';

    await loginPage.login(username, password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match' );
  });

  test('should show error when username is empty', async () => {
    const username = '';
    const password = 'secret_sauce';

    await loginPage.login(username, password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('should show error when password is empty', async () => {
    const username = 'standard_user';
    const password = '';

    await loginPage.login(username, password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});
