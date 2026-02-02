import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer balance updates correctly after multiple operations', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  await accountPage.assertAccountLineContainsText('Balance : 0');

  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField('1000');
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  await accountPage.fillAmountInputField('500');
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  await accountPage.assertAccountLineContainsText('Balance : 1500');

  await accountPage.clickWithdrawlButton();
  await accountPage.fillAmountInputField('700');
  await accountPage.clickWithdrawlFormButton();
  // Note: The app may not show a withdraw success message; balance assertion below validates completion.
  await accountPage.assertAccountLineContainsText('Balance : 800', { timeout: 10000 });
});
