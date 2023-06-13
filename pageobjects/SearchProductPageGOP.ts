import { Page, Locator, expect } from '@playwright/test';

export class SearchProductPageGOP {
    readonly page: Page;
    readonly OrderCodeSrchBox: Locator;
    readonly ProductSearchBtn: Locator;
    readonly QueryingForProductsSpin: Locator;
    readonly AddBtn: Locator;
    readonly ConfigureBtn: Locator;
    readonly WaitForConfigurationLoad: Locator;
    readonly MoreOptionsBtn: Locator;
    readonly ImporOrderCodeBtn: Locator;
    readonly ImportOrderCodePopUp: Locator;
    readonly ImportOCPopUpHeader: Locator;
    readonly ImportOCPopUpTxtBox: Locator;
    readonly ImportOCPopUpButtons: Locator;
    readonly ImportOCPopUpClose: Locator;
    readonly SVPSkuAddBtn: Locator;
    readonly SVPPopUpDetails: Locator;
    readonly SVPPopUpCloseIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.OrderCodeSrchBox = this.page.locator('#txtPDSearch');
        this.ProductSearchBtn = this.page.locator('//button[contains(text(),"Search")]');
        this.QueryingForProductsSpin = this.page.locator('//p[text()="Querying for Products..."]/parent::div/parent::div');
        this.AddBtn = this.page.locator('//button[contains(text(),"Add")]');
        this.SVPSkuAddBtn = this.page.locator('//button[contains(text(),"Add")]/preceding::thead/following-sibling::tbody//tr[1]//button');
        this.ConfigureBtn = this.page.locator('//button[contains(@class,"PD_productlist-configure")]');
        this.WaitForConfigurationLoad = this.page.locator('//app-product-configurepoc//span[text()="Processing...Please wait."]/preceding::overlay-busy/div[@class="dds__modal busy-indicator-wrapper"]');
        this.MoreOptionsBtn = this.page.locator('#pd-more-options-action-menu');
        this.ImporOrderCodeBtn = this.page.locator('//a[contains(text(),"Import Order Code or Chassis ID")]');
        this.ImportOrderCodePopUp = this.page.locator('//div[@id="importOrderCode"]/div/div');
        this.ImportOCPopUpHeader = this.page.locator('//div[@id="importOrderCode"]/div/div//h3');
        this.ImportOCPopUpTxtBox = this.page.locator('//div[@id="importOrderCode"]/div/div//input');
        this.ImportOCPopUpButtons = this.page.locator('//div[@id="importOrderCode"]/div/div//button');
        this.ImportOCPopUpClose = this.page.locator('//div[@id="importOrderCode"]/div/div//button/child::span[@class="dds__icon dds__icon--close-x"]');
        this.SVPPopUpDetails = this.page.locator('//div[@class="dds__modal__content svvp_modal_content"]');
        this.SVPPopUpCloseIcon = this.page.locator('//div[@class="dds__modal__content svvp_modal_content"]//i');
    }

    async EnterOrderCode(orderCode: string) {
        await this.OrderCodeSrchBox.clear();
        await this.page.waitForTimeout(5000);
        await this.OrderCodeSrchBox.fill(orderCode);
        await this.page.waitForTimeout(5000);
    }

    async ClickOnOrderCodeSearchBtn() {
        await this.ProductSearchBtn.click();
        await this.WaitforProcessingToComplete();
    }

    async WaitforProcessingToComplete() {
        //await expect(this.QueryingForProductsSpin).toBeHidden({timeout:1000000});
        await this.page.waitForTimeout(15000);
    }

    async ClickOnAddBtn() {
        await this.AddBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async ClickOnSVPSkuAddBtn() {
        await this.SVPSkuAddBtn.click();
        await this.page.waitForTimeout(5000);
    }
    async ClickOnConfigureBtn() {
        await this.ConfigureBtn.click();
        await this.WaitforConfigurationToLoad();
    }

    async WaitforConfigurationToLoad() {
        //await expect(this.WaitForConfigurationLoad).toBeVisible({timeout:1000000});
        await this.page.waitForTimeout(15000);
    }

    async ClickOnMoreOptionsBtn() {
        await this.MoreOptionsBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async ClickOnImportOrderCodeLink() {
        await this.ImporOrderCodeBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async CloseImportOCPopUp() {
        await this.ImportOCPopUpClose.click();
        await this.page.waitForTimeout(5000);
    }
    async ValidateImportOrderCodePopUpAndItsDetails() {
        const ImportOCPopUpCount = await this.ImportOrderCodePopUp.count();
        const ImportOCPopUpHeaderTxt = await this.ImportOCPopUpHeader.innerText();
        const ImportOCPopUpTxtFldCount = await this.ImportOCPopUpTxtBox.count();
        const ImportOCPopUpBtnsCount = await this.ImportOCPopUpButtons.count();

        const firstValidation = ImportOCPopUpCount == 1;
        const secondValidation = ImportOCPopUpHeaderTxt.toLowerCase().includes("import order code or chassis id");
        const thirdValidation = ImportOCPopUpTxtFldCount == 1;
        const fourthValidation = ImportOCPopUpBtnsCount == 4;

        return firstValidation && secondValidation && thirdValidation && fourthValidation;
    }

    async ValidateAddSVPPopUpAndItsDetails() {
        const SVPPopUpDetailsCount = await this.SVPPopUpDetails.locator('//*').count();
        const SVPPopUpHeaderTxt = await this.SVPPopUpDetails.locator('//h3').innerText();
        const SVPPopUpMinMaxTxtCount = await this.SVPPopUpDetails.locator('//strong').allInnerTexts();
        const SVPPopUpListPriceTxt = await this.SVPPopUpDetails.locator('//h6').innerText();
        const SVPPopUpListPriceValue = await this.SVPPopUpDetails.locator('//h4').innerText();
        const SVPPopUpQtyBoxCount = await this.SVPPopUpDetails.locator('//input').count();
        const SVPPopUpDetailsBtnCount = await this.SVPPopUpDetails.locator('//button').count();

        const firstValidation = SVPPopUpDetailsCount > 10;
        return firstValidation;
    }

    async CloseAddSVPSkuPopUp() {
        await this.SVPPopUpCloseIcon.click();
        await this.page.waitForTimeout(5000);
    }
}
module.exports = { SearchProductPageGOP };