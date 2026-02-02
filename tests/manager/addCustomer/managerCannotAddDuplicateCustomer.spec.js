import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

test('Assert manager cannot add duplicate customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

  const firstName = 'Hermoine';
  const lastName = 'Granger';
  const postalCode = 'H101PP';

  await addCustomerPage.open();

  
  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await addCustomerPage.addCustomer(firstName, lastName, postalCode);

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  await addCustomerPage.addCustomer(firstName, lastName, postalCode);
  
  if (dialogMessage !== 'Please check the details. Customer may be duplicate.') {
    throw new Error(`Unexpected dialog message: ${dialogMessage}`);
  }
});
