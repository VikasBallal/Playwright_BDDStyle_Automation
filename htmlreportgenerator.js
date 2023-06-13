const reporter = require('cucumber-html-reporter');
const sendMail = require('./sendEmail');
var date = new Date();
var currentDate = date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getFullYear() + "_" + date.getHours() + "_"
    + date.getMinutes + "_" + date.getSeconds();

var options = {
    brandTitle: "Product Configuratior Automation Test Report",
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_report_' + currentDate + '.html',
    screenshotsDirectory: './screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metaData: {
        "App Version": "1.1.1",
        "Test Environment": process.env.ENVTEST,
        "Browser": "Chrome  112",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};
reporter.generate(options);
//sendMail.getTokenAndSendEmail(options.output);