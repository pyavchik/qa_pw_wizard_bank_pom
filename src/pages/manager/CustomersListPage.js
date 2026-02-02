import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.tableRows = page.getByRole('row').filter({ hasNotText: 'First Name' });
    this.lastTableRow = page.getByRole('row').last();
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

  async clickDeleteForCustomerRow(customerName) {
    const row = this.page.getByRole('row').filter({ hasText: customerName });
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

  async assertOnlyOneRowIsPresent() {
    await expect(this.tableRows).toHaveCount(1);
  }

  async assertRowCount(count) {
    await expect(this.tableRows).toHaveCount(count);
  }
}
