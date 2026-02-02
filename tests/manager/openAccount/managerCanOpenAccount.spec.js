import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
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

test('Assert manager can open a new account for a customer', async ({ page }) => {
  const customerFullName = `${firstName} ${lastName}`;
  const managerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await managerMainPage.open();
  await managerMainPage.clickOpenAccountButton();
  await openAccountPage.selectCustomer(customerFullName);
  await openAccountPage.selectCurrency('Dollar');

  page.once('dialog', (dialog) => dialog.accept());
  await openAccountPage.clickProcessButton();

  await managerMainPage.clickCustomersButton();
  await customersListPage.assertCustomerRowAccountNumberNotEmpty(firstName, lastName, postalCode);
});
