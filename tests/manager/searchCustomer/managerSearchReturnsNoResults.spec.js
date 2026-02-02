import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert search returns no results for non-existent customer', async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await managerMainPage.open();
  await managerMainPage.clickCustomersButton();
  
  await customersListPage.fillSearchInput('NonExistentCustomerName');
  await customersListPage.assertRowCount(0);
});
