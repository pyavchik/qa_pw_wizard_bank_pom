import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.getByTestId('userSelect');
    this.currencySelect = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertCurrencyDropdownHasValue(value) {
    await expect(this.currencySelect).toHaveValue(value);
  }
}
