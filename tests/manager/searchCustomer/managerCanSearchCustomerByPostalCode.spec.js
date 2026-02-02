import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  page.once('dialog', (dialog) => dialog.accept());

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postalCode);
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await managerMainPage.open();
  await managerMainPage.clickCustomersButton();
  await customersListPage.fillSearchInput(postalCode);
  await customersListPage.assertCustomerRowIsPresent(postalCode);
  await customersListPage.assertOnlyOneRowIsPresent();
});
