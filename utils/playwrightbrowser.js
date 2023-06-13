require('ssl-root-cas')
  //.create()
  .inject()  // Injecting Root certificate according to application users can use 
  .addFile(__dirname + '/cert/Dell Technologies Issuing CA 101.pem')
  .addFile(__dirname + '/cert/Dell Technologies Issuing CA 102.pem')
  .addFile(__dirname + '/cert/Dell Technologies Issuing CA 301.pem')
  .addFile(__dirname + '/cert/Dell Technologies Issuing CA 302.pem')
  .addFile(__dirname + '/cert/Dell Technologies Root Certificate Authority 2018.pem')
  .addFile(__dirname + '/cert/sales.pem');

const { bootstrap } = require('global-agent');
bootstrap();


const { devices, chromium } = require('@playwright/test');
const { After, setDefaultTimeout, Status } = require("@cucumber/cucumber");
var request = require('request');

let page
let browser

setDefaultTimeout();
const getBrowser = async (moonExecution, browserName) => {
  if (moonExecution == false) {
    browser = await chromium.launch({
      headless: false,
      channel: browserName.toLowerCase(),
      args: ['--start-maximized']
    })
    const context = await browser.newContext({
      viewport: null,
      ignoreHTTPSErrors: true,
      //httpCredentials: { username: "svc_nposcoutlooktst", password: "iuqTrV5wJkmpX~4n7+abc16Y" }
    })
    context.setDefaultTimeout(300000)
    context.setDefaultNavigationTimeout(300000)
    page = await context.newPage();
  }
  else if (moonExecution == true) {
    console.log('Connecting to moon server.....');
    var data = await getMoonURL('afe318be-76d1-414b-8f32-e0ccd765eb32');
    var moon_url_data = data.replace('https', 'wss').replace('/wd/hub', '') + '/playwright/chromium/playwright-1.34.0?headless=false&enableVideo=false&name=PDconfig'
    browser = await chromium.connect({
      timeout: 0,
      ignoreHTTPSErrors: true,
      wsEndpoint: moon_url_data
    });
    const context = await browser.newContext({
      viewport: null,
      args: ['--start-maximized'],
      proxy: {
        server: `proxy-aus.dell.com:80`,
        username: 'svc_nposcoutlooktst',
        password: 'iuqTrV5wJkmpX~4n7+abc16Y',
        bypass: '.dell.com'
      },
    });
    context.setDefaultTimeout(180000);
    context.setDefaultNavigationTimeout(180000);
    page = await context.newPage();
    console.log('Moon server connection is successful.....')
  }
  return page;
}

const getMoonURL = function (token) {
  const customPromise = new Promise((resolve, reject) => {
    var URL = "No URL";
    var options = {
      'method': 'GET',
      'url': 'https://moon.us.dell.com/getmoondriver/' + token,
      'headers': {
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
      URL = response.body;
      if (URL != null) {
        resolve(URL)
      } else {
        reject(new Error('Did not get moon URL ' + URL))
      }
    });
  })
  return customPromise;
}

After(async function (Scenario) {
  if (Scenario.result.status === Status.FAILED) {
    this.attach(
      await page.screenshot({
        path: `./screenshots/failedScreenShot.png`,
        fullPage: true
      }),
      "image/png"
    )
  }
  await browser.close();
})
module.exports = { getBrowser }
