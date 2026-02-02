export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerFormButton = page.getByRole('form').getByRole('button', {
      name: 'Add Customer',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerFormButton.click();
  }

  async addCustomer(firstName, lastName, postalCode) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
    await this.clickAddCustomerButton();
  }
}
