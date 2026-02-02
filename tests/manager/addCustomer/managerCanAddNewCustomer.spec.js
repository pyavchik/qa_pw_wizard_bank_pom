import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postalCode);
  await page.reload();
  await managerMainPage.open();
  await managerMainPage.clickCustomersButton();
  await customersListPage.assertLastRowContainsFirstName(firstName);
  await customersListPage.assertLastRowContainsLastName(lastName);
  await customersListPage.assertLastRowContainsPostalCode(postalCode);
  await customersListPage.assertLastRowAccountNumberIsEmpty();
});
