import { Given, When, Then } from '@cucumber/cucumber';
import { page, region_data } from './BackgroundSteps';
import { ProductConfigurePage } from '../pageobjects/ProductConfigurePage';
import { expect } from '@playwright/test';

let _productConfigurePage: ProductConfigurePage;

When('I expand any module', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  await _productConfigurePage.SelectViewConfiguration();
  await _productConfigurePage.ExpandAnyRandomModule();

});

When('I go to view quote page', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  await _productConfigurePage.ClickOnViewQuotePageBtn();
});

When('I expand thin os activation license module', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  await _productConfigurePage.SelectViewConfiguration();
  await _productConfigurePage.ExpandThinOSModule();

});

When('I select thin os activation license check box', async () => {
  await _productConfigurePage.SelectThinOSActivationLSChkBox();

});

When('I click on thin os activation license arrow', async () => {
  await _productConfigurePage.ClickOnOSActivationLSArrow();
});

When('I scroll the page to the bottom', async () => {
  await _productConfigurePage.ScrollPageToTheBottom();
});


Then('I should validate is DPA column displayed', async (dataTable) => {
  let isDPADisplayed = dataTable['rawTable'][1][0];
  let validation = await _productConfigurePage.ValidateDPAColumnNamePresent();
  expect(isDPADisplayed).toBe(validation.toString());
});

Then('I should see prduct list loaded', async () => {
  let validation = await _productConfigurePage.ValidateProductListMFESection();
  expect(validation).toBeTruthy();
});

Then('I sould see product details loaded', async () => {
  let orderCode = region_data['Normal_Config_OC'];
  let validation = await _productConfigurePage.ValidateProductDetailsMFESection(orderCode);
  expect(validation).toBeTruthy();
});

Then('I should see SS recommendations section loaded', async () => {
  let validation = await _productConfigurePage.ValidateSmartSelectMFESection();
  expect(validation).toBeTruthy();
});

Then('I should see module and option Ids displayed', async () => {
  let validation = await _productConfigurePage.ValidateMFEModluesAndOptionsPresent();
  expect(validation).toBeTruthy();
});

Then('I should see model recommendations displayed', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidateMFEModelReccomendationsPresent();
  expect(validation).toBeTruthy();
});

Then('I should see only margin icons displayed', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidateOnlyMarginIconDisplayed();
  expect(validation).toBeTruthy();
});

Then('I should see margin icons with values displayed', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidateOnlyMarginIconDisplayed();
  expect(validation).toBeTruthy();
});

Then('I should see brand Id alert message displayed displayed', async () => {
  let brandIdAlertMsg = region_data['BrandIdAlertMsg'];
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidateBrandIdAlertMsgDisplayed(brandIdAlertMsg);
  expect(validation).toBeTruthy();
});

Then('I should see this os activation license quantity check box availabe', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidateThisOSActivationLSQtyChkBox();
  expect(validation).toBeTruthy();
});

Then('I should see curreny symbol as dollar', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidatePotentialCurrencySymbol();
  expect(validation).toBeTruthy();
});

Then('I should see back to top button displayed', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidateBackToTopButtonIsDisplayed();
  expect(validation).toBeTruthy();
});

Then('I should see incite alert message along with incite expression id', async () => {
  _productConfigurePage = new ProductConfigurePage(page);
  let validation = await _productConfigurePage.ValidateInciteAlertMsgWithIncideExpressionIdDisplayed();
  expect(validation).toBeTruthy();
});
