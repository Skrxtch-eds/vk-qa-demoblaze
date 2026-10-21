// @ts-check
const { test, expect } = require('@playwright/test');

test('Cart contains only Samsung galaxy s6 after adding the product', async ({ page }) => {
  const productName = 'Samsung galaxy s6';

  await page.goto('/');
  await page.getByRole('link', { name: productName, exact: true }).click();

  // Ждём уведомление до клика и нажимаем OK до перехода в корзину.
  await Promise.all([
    page.waitForEvent('dialog').then((dialog) => dialog.accept()),
    page.getByRole('link', { name: 'Add to cart', exact: true }).click(),
  ]);

  await page.getByRole('link', { name: 'Cart', exact: true }).click();

  // Проверяем все строки товаров, а не только наличие нужного названия.
  const cartRows = page.locator('#tbodyid').getByRole('row');
  await expect(cartRows).toHaveCount(1);
  await expect(cartRows.getByRole('cell').nth(1)).toHaveText(productName);
  await expect(cartRows).toBeVisible();
});
