import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage';

test('Assert the money can be withdrawn', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  const depositAmount = 1000;
  const withdrawAmount = 400;
  const expectedBalance = depositAmount - withdrawAmount;

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  await accountPage.clickDepositButton();
  await accountPage.fillAmountInputField(depositAmount.toString());
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  await accountPage.clickWithdrawlButton();
  await accountPage.fillAmountInputField(withdrawAmount.toString());
  await accountPage.clickWithdrawlFormButton();
  await accountPage.assertWithdrawSuccessfulMessageIsVisible();

  await accountPage.assertAccountLineContainsText(`Balance : ${expectedBalance}`);

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();

  await transactionsPage.waitForTransactionRows(2);

  await transactionsPage.assertTransactionRowExists(depositAmount.toString(), 'Credit');
  await transactionsPage.assertTransactionRowExists(withdrawAmount.toString(), 'Debit');
});
