import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.tableRows = page.getByRole('row').filter({ hasNotText: 'First Name' });
    this.lastTableRow = this.tableRows.last();
    this.lastRowFirstNameCell = this.lastTableRow.getByRole('cell').nth(0);
    this.lastRowLastNameCell = this.lastTableRow.getByRole('cell').nth(1);
    this.lastRowPostalCodeCell = this.lastTableRow.getByRole('cell').nth(2);
    this.lastRowAccountNumberCell = this.lastTableRow.getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async fillSearchInput(text) {
    await this.searchInput.fill(text);
  }

  getDeleteButtonForRow(rowLocator) {
    return rowLocator.getByRole('button', { name: 'Delete' });
  }

  /**
   * Returns the table row that contains the given customer's first name, last name, and postal code.
   * Use this instead of .last() to find a customer by unique data and make tests less brittle.
   */
  getRowByCustomer(firstName, lastName, postalCode) {
    return this.page
      .getByRole('row')
      .filter({ hasText: firstName })
      .filter({ hasText: lastName })
      .filter({ hasText: postalCode });
  }

  /**
   * Finds the row by the First Name column cell that contains customerName, then clicks Delete.
   * Using the name column (not hasText on the whole row) avoids matching text in other columns
   * and reduces the chance of multiple rows matching (e.g. same name in different cells).
   */
  async clickDeleteForCustomerRow(customerName) {
    const nameCell = this.page
      .getByRole('row')
      .getByRole('cell')
      .nth(0)
      .filter({ hasText: customerName })
      .first();
    const row = nameCell.locator('..');
    await this.getDeleteButtonForRow(row).click();
  }

  /**
   * Clicks Delete for the row matching the given customer (by unique first name, last name, postal code).
   * Prefer this over clickDeleteForCustomerRow(name) when you have full customer data.
   */
  async clickDeleteForCustomer(firstName, lastName, postalCode) {
    const row = this.getRowByCustomer(firstName, lastName, postalCode);
    await this.getDeleteButtonForRow(row).click();
  }

  async clickDeleteForLastRow() {
    await this.getDeleteButtonForRow(this.lastTableRow).click();
  }

  async assertLastRowContainsFirstName(firstName) {
    await expect(this.lastRowFirstNameCell).toContainText(firstName);
  }

  async assertLastRowContainsLastName(lastName) {
    await expect(this.lastRowLastNameCell).toContainText(lastName);
  }

  async assertLastRowContainsPostalCode(postalCode) {
    await expect(this.lastRowPostalCodeCell).toContainText(postalCode);
  }

  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumberCell).toHaveText('');
  }

  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumberCell).not.toHaveText('');
  }

  async assertCustomerRowIsPresent(customerName) {
    const row = this.page.getByRole('row').filter({ hasText: customerName });
    await expect(row).toBeVisible();
  }

  async assertCustomerRowIsNotPresent(customerName) {
    const row = this.page.getByRole('row').filter({ hasText: customerName });
    await expect(row).toBeHidden();
  }

  /**
   * Asserts that a row for the given customer exists and contains first name, last name, and postal code.
   */
  async assertCustomerRowContainsData(firstName, lastName, postalCode) {
    const row = this.getRowByCustomer(firstName, lastName, postalCode);
    await expect(row).toBeVisible();
    await expect(row.getByRole('cell').nth(0)).toContainText(firstName);
    await expect(row.getByRole('cell').nth(1)).toContainText(lastName);
    await expect(row.getByRole('cell').nth(2)).toContainText(postalCode);
  }

  /**
   * Asserts that the customer row has an empty account number cell.
   */
  async assertCustomerRowAccountNumberEmpty(firstName, lastName, postalCode) {
    const row = this.getRowByCustomer(firstName, lastName, postalCode);
    await expect(row.getByRole('cell').nth(3)).toHaveText('');
  }

  /**
   * Asserts that the customer row has a non-empty account number cell.
   */
  async assertCustomerRowAccountNumberNotEmpty(firstName, lastName, postalCode) {
    const row = this.getRowByCustomer(firstName, lastName, postalCode);
    await expect(row.getByRole('cell').nth(3)).not.toHaveText('');
  }

  /**
   * Asserts that no row exists for the given customer (by unique first name, last name, postal code).
   */
  async assertCustomerRowNotPresent(firstName, lastName, postalCode) {
    const row = this.getRowByCustomer(firstName, lastName, postalCode);
    await expect(row).toBeHidden();
  }

  async assertOnlyOneRowIsPresent() {
    await expect(this.tableRows).toHaveCount(1);
  }

  async assertRowCount(count) {
    await expect(this.tableRows).toHaveCount(count);
  }
}
