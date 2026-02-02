import { test } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can Login', async ({ page }) => {

  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickBankManagerLoginButton();
  await managerMainPage.assertAddCustomerButtonIsVisible();
  await managerMainPage.assertOpenAccountButtonIsVisible();
  await managerMainPage.assertCustomersButtonIsVisible();
});
