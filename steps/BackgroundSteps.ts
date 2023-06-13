import { Given, When, Then } from '@cucumber/cucumber';
const { getBrowser } = require("../utils/playwrightbrowser");
import { Page } from '@playwright/test';
import { Console } from 'console';

let environmentSpecifcData = require('../utils/environmentspecifcdata');
let DSAURL = environmentSpecifcData.params.App_Url;
let moonExecution = environmentSpecifcData.params.MoonExecution;
let gitLabRunner = environmentSpecifcData.params.GitLabRunner;

let page: Page;
let region_data: any;

Given('I read the data and navigate to DSA application for a given environment', async (dataTable) => {
  let region = dataTable['rawTable'][1][0];
  let browseName = dataTable['rawTable'][1][1];
  region_data = environmentSpecifcData.params[region];
  console.log('Execution Started...');
  page = await getBrowser(moonExecution, browseName)
  DSAURL = environmentSpecifcData.params["App_Url"];

  await page.goto(DSAURL);
  if (moonExecution == true) {
    await page.locator('[id="username"]').waitFor()
    await page.locator('[id="username"]').fill('svc_nposcoutlooktst')
    await page.locator('[id="Password"]').fill('iuqTrV5wJkmpX~4n7+abc16Y')
    await page.locator('[value="Sign On"]').click()
    await page.waitForLoadState('networkidle');
    console.log('Login done......')
  }

});
export { page, region_data }
