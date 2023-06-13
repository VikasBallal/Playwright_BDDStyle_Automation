import { Given, When, Then } from '@cucumber/cucumber';
import { page, region_data } from './BackgroundSteps';
import { DSAHomePage } from '../pageobjects/DSAHomePage';
import { SearchProductPageUS } from '../pageobjects/SearchProductPageUS';
import { SearchProductPageGOP } from '../pageobjects/SearchProductPageGOP';
import { ViewQuotePage } from '../pageobjects/ViewQuotePage';
import { ProductConfigurePage } from '../pageobjects/ProductConfigurePage';
import { expect } from '@playwright/test';

let _viewQuotePage: ViewQuotePage;

When('I patch a customer number', async (dataTable) => {
  let csutNumber = dataTable['rawTable'][1][0];
  let customerNumber = region_data[csutNumber];
  _viewQuotePage = new ViewQuotePage(page);
  await _viewQuotePage.PatchCustomerNumber(customerNumber);
});

When('I create a quote', async () => {
  await _viewQuotePage.ClickOnSaveQuoteBtn();
});

When('I click on first product configure btn', async () => {
  await _viewQuotePage.ClickOnFirstProductConfigureBtn();
});

Then('I should be able to see the quote number generated', async () => {
  let quoteNumber = await _viewQuotePage.GetQuoteNumber();
  await expect(quoteNumber?.trim().length).toBe(13);
});