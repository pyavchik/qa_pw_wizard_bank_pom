import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can switch between accounts', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  const accounts = [
    { id: '1004', currency: 'Dollar' },
    { id: '1005', currency: 'Pound' },
    { id: '1006', currency: 'Rupee' }
  ];

  for (const account of accounts) {
    await accountPage.selectAccount(account.id);
    await accountPage.assertAccountIdInDropDownHasValue(account.id);
    await accountPage.assertAccountLineContainsText(`Account Number : ${account.id}`);
    await accountPage.assertAccountLineContainsText(`Currency : ${account.currency}`);
  }
});
