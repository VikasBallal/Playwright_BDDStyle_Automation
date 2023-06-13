import { Given, When, Then } from '@cucumber/cucumber';
import { page, region_data } from './BackgroundSteps';
import { DSAHomePage } from '../pageobjects/DSAHomePage';
import { ViewQuotePage } from '../pageobjects/ViewQuotePage';
import { ProductConfigurePage } from '../pageobjects/ProductConfigurePage';
import { expect } from '@playwright/test';

let _dsaHomePage: DSAHomePage;
let _seacrhProductPage: any;
let _productConfigPage: ProductConfigurePage;
let _viewQuotePage: ViewQuotePage;
let BU: any;

When('I select required BU', async () => {
  BU = region_data["BU_Select"];
  _dsaHomePage = new DSAHomePage(page);
  await _dsaHomePage.SelectCountry(BU);
});

When('I go to search product page', async () => {
  _dsaHomePage = new DSAHomePage(page);
  await _dsaHomePage.ClickOnConfigureProductsLnk();
  await _dsaHomePage.ClickOnOSearchProduct();
});

When('I go to search product page by selecting a catalog', async (dataTable) => {
  let catalog = dataTable['rawTable'][1][0];
  await _dsaHomePage.ClickOnConfigureProductsLnk();
  await _dsaHomePage.ClickOnOSearchProduct();
  await _dsaHomePage.SelectCatalog(catalog);
});

