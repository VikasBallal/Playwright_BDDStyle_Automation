import { Page, Locator, expect } from '@playwright/test';

export class SearchProductPageUS {
    readonly page: Page;
    readonly OrderCodeSrchBox: Locator;
    readonly ProductSearchBtn: Locator;
    readonly QueryingForProductsSpin: Locator;
    readonly AddBtn: Locator;
    readonly ConfigureBtn: Locator;
    readonly DSAselectCatalog: Locator;
    readonly WaitForConfigurationLoad: Locator;

    constructor(page: Page) {
        this.page = page;
        this.OrderCodeSrchBox = this.page.locator('#productSearch_orderCode');
        this.ProductSearchBtn = this.page.locator('#productSearch_SearchButton');
        this.QueryingForProductsSpin = this.page.locator('//p[text()="Querying for Products..."]/parent::div/parent::div');
        this.AddBtn = this.page.locator('#productResult_grid_add');
        this.ConfigureBtn = this.page.locator('#productResult_grid_configure');
        this.DSAselectCatalog = this.page.locator('//button[@id="button_select_aubsd1f"]');
        this.WaitForConfigurationLoad = this.page.locator('//app-product-configurepoc//span[text()="Processing...Please wait."]/preceding::overlay-busy/div[@class="dds__modal busy-indicator-wrapper"]');

    }

    async EnterOrderCode(orderCode: string) {
        await this.OrderCodeSrchBox.clear();
        await this.page.waitForTimeout(5000);
        await this.OrderCodeSrchBox.fill(orderCode);
        await this.page.waitForTimeout(5000);
    }

    async ClickOnOrderCodeSearchBtn() {
        await this.ProductSearchBtn.click();
        await this.page.waitForTimeout(15000);
        //await this.WaitforProcessingToComplete();
    }

    async WaitforProcessingToComplete() {
        //await expect(this.QueryingForProductsSpin).toBeHidden({timeout:1000000});
        //await this.page.waitForTimeout(5000);
    }

    async ClickOnAddBtn() {
        await this.AddBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async ClickOnConfigureBtn() {
        await this.ConfigureBtn.click();
        await this.page.waitForTimeout(5000);
        await this.WaitforConfigurationToLoad();
    }

    async WaitforConfigurationToLoad() {
        //await expect(this.WaitForConfigurationLoad).toBeVisible({timeout:1000000});
        await this.page.waitForTimeout(15000);
    }

}
module.exports = { SearchProductPageUS };