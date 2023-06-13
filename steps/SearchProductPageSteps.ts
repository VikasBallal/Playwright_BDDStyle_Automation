import { Given, When, Then } from '@cucumber/cucumber';
import { page, region_data } from './BackgroundSteps';
import { SearchProductPageUS } from '../pageobjects/SearchProductPageUS';
import { SearchProductPageGOP } from '../pageobjects/SearchProductPageGOP';
import { expect } from '@playwright/test';

let _seacrhProductPage: any;
let BU: any;

When('I search and add an order code', async (dataTable) => {
  let orderCodeFieldInJson = dataTable['rawTable'][1][0];
  let orderCode = region_data[orderCodeFieldInJson];
  BU = region_data['BU_Select'];
  if (BU === "") { _seacrhProductPage = new SearchProductPageUS(page); }
  else { _seacrhProductPage = new SearchProductPageGOP(page); }
  await _seacrhProductPage.EnterOrderCode(orderCode);
  await _seacrhProductPage.ClickOnOrderCodeSearchBtn();
  await _seacrhProductPage.ClickOnAddBtn();

});

When('I search for an svp sku', async () => {
  let orderCode = region_data['SVP_Sku'];
  _seacrhProductPage = new SearchProductPageGOP(page);
  await _seacrhProductPage.EnterOrderCode(orderCode);
  await _seacrhProductPage.ClickOnOrderCodeSearchBtn();
});

When('I click on add', async () => {
  await _seacrhProductPage.ClickOnAddBtn();
});

When('I click on svp sku add', async () => {
  await _seacrhProductPage.ClickOnSVPSkuAddBtn();
});

When('I go to configure page', async () => {
  await _seacrhProductPage.ClickOnConfigureBtn();
});

When('I click on more options', async () => {
  _seacrhProductPage = new SearchProductPageGOP(page);
  await _seacrhProductPage.ClickOnMoreOptionsBtn();
});

When('I click on import order code or chassis Id', async () => {
  await _seacrhProductPage.ClickOnImportOrderCodeLink();
});

Then('I should see import import order code or chassis Id pop up', async () => {
  let validation = await _seacrhProductPage.ValidateImportOrderCodePopUpAndItsDetails();
  expect(validation).toBeTruthy();
  await _seacrhProductPage.CloseImportOCPopUp();
});

Then('I should see add svp pop up', async () => {
  let validation = await _seacrhProductPage.ValidateAddSVPPopUpAndItsDetails();
  expect(validation).toBeTruthy();
  await _seacrhProductPage.CloseAddSVPSkuPopUp();
});