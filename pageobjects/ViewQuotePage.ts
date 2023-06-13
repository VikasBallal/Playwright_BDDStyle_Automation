import { Page, Locator, expect } from '@playwright/test';

export class ViewQuotePage {
    readonly page: Page;
    readonly SaveQuoteBtn: Locator;
    readonly CustomerNumber: Locator;
    readonly QuoteName: Locator;
    readonly EndUserAckCheckBox: Locator;
    readonly QuoteNumber: Locator;
    readonly QuoteStatus: Locator;
    readonly SearchProductLnk: Locator;
    readonly DSAselectCatalog: Locator;
    readonly ProcessingSpin: Locator;
    readonly firstItemConfigureBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.SaveQuoteBtn = this.page.locator('#quoteCreate_saveQuote');
        this.CustomerNumber = this.page.locator('#quoteCreate_customerNumber');
        this.QuoteName = this.page.locator('#quoteCreate_quoteName');
        this.EndUserAckCheckBox = this.page.locator('//*[@id="quoteCreate_endUserCustomerAcknowledge_checkbox"]/parent::label//span');
        this.QuoteNumber = this.page.locator('#quoteNumber');
        this.QuoteStatus = this.page.locator('#headerQuoteStatusTitle');
        this.SearchProductLnk = this.page.locator('#menu_productSearch');
        this.DSAselectCatalog = this.page.locator('//button[@id="button_select_aubsd1f"]');
        this.ProcessingSpin = this.page.locator('//div[@class="content-view"]//p[text()="Processing..."]/parent::div/parent::div');
        this.firstItemConfigureBtn = this.page.locator('//button[contains(@id,"quoteCreate_LI_configItem_0_0")]');
    }

    async EnterCustomerNumber(customerNumber: string) {
        await this.CustomerNumber.fill(customerNumber);
        await this.page.waitForTimeout(5000);
    }

    async ClikcOnQuoteName() {
        await this.QuoteName.click();
        await this.page.waitForTimeout(15000);
    }

    async ClikcOnEndUserAckCheckBox() {
        const test = await this.EndUserAckCheckBox.count();
        if (test == 1) {
            await this.EndUserAckCheckBox.click();
            await this.page.waitForTimeout(10000);
        }
    }
    async PatchCustomerNumber(customerNumber: string) {
        await this.EnterCustomerNumber(customerNumber);
        await this.ClikcOnQuoteName();
        await this.ClikcOnEndUserAckCheckBox();
        await this.page.waitForTimeout(10000);
    }
    async ClickOnSaveQuoteBtn() {
        await this.SaveQuoteBtn.click();
        await this.page.waitForTimeout(15000);
    }

    async ClickOnOSearchProduct() {
        await this.SearchProductLnk.click();
        await this.page.waitForTimeout(5000);
    }

    async ClickOnFirstProductConfigureBtn() {
        await this.firstItemConfigureBtn.click();
        await this.page.waitForTimeout(5000);
    }
    async SelectCatalog(catalog: string) {
        await this.page.locator("#button_select_" + catalog + "").click(); 12
        await this.page.waitForTimeout(5000);
        await this.WaitforProcessingToComplete();
    }

    async WaitforProcessingToComplete() {
        await expect(this.ProcessingSpin).toBeHidden({ timeout: 1000000 });
        await this.page.waitForTimeout(5000);
    }

    async GetQuoteNumber() {
        return await this.QuoteNumber.textContent();
    }

}
module.exports = { ViewQuotePage };