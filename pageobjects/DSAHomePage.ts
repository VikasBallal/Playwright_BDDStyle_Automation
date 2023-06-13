import { Page, Locator, expect } from '@playwright/test';

export class DSAHomePage {
    readonly page: Page;
    readonly contryDropDown: Locator;
    readonly BUok: Locator;
    readonly ConfigureProductsLnk: Locator;
    readonly SearchProductLnk: Locator;
    readonly DSAselectCatalog: Locator;
    readonly ProcessingSpin: Locator;

    constructor(page: Page) {

        this.page = page;
        this.contryDropDown = this.page.locator('//button[@id="buContext"]/i[1]');
        this.BUok = this.page.locator('//h3[text()="Change Business Unit - Confirm"]/parent::div/parent::div//button[@id="buModal_dialog_yes"]');
        this.ConfigureProductsLnk = this.page.locator('//span[contains(text(),"Configure Products")]');
        this.SearchProductLnk = this.page.locator('#menu_productSearch');
        this.DSAselectCatalog = this.page.locator('//button[@id="button_select_aubsd1f"]');
        this.ProcessingSpin = this.page.locator('//div[@class="content-view"]//p[text()="Processing..."]/parent::div/parent::div');

    }

    async SelectCountry(CountryName: string) {
        if (CountryName !== "") {
            await this.contryDropDown.click();
            await this.page.waitForTimeout(5000);
            await this.page.locator("//button[contains(text(),'" + CountryName + "')]").click();
            await this.page.waitForTimeout(5000);
            await this.BUok.click();
            await this.page.waitForTimeout(5000);
        }
    }

    async ClickOnConfigureProductsLnk() {
        await this.ConfigureProductsLnk.click();
        await this.page.waitForTimeout(5000);
    }

    async ClickOnOSearchProduct() {
        await this.SearchProductLnk.click();
        await this.page.waitForTimeout(5000);
    }

    async SelectCatalog(catalog: string) {
        await this.page.locator("#button_select_" + catalog + "").click();
        await this.page.waitForTimeout(5000);
        //await this.WaitforProcessingToComplete();
    }

    async WaitforProcessingToComplete() {
        await expect(this.ProcessingSpin).toBeHidden({ timeout: 12000 });
        await this.page.waitForTimeout(5000);
    }

}
module.exports = { DSAHomePage };