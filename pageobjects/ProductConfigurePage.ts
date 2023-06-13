
import { Page, Locator, expect } from '@playwright/test';

export class ProductConfigurePage {
    readonly page: Page;
    readonly ConfigurationDropDown: Locator;
    readonly Modules: Locator;
    readonly ModuleColumnList: Locator;
    readonly ModuleRows: Locator;
    readonly ViewQuoteBtn: Locator;
    readonly ProductListHeader: Locator;
    readonly SelectAllLink: Locator;
    readonly ProductList: Locator;
    readonly ProductDetailsSectionCount: Locator;
    readonly OrderCode: Locator;
    readonly OrderCodeQuantity: Locator;
    readonly SmartSelectSection: Locator;
    readonly SmartSelectHeader: Locator;
    readonly ModelRecommendationHeader: Locator;
    readonly ModelRecommendationsRefreshLink: Locator;
    readonly ModelRecommendationMsgs: Locator;
    readonly MarginIconAndValue: Locator;
    readonly BrandIdAlertMsgs: Locator;
    readonly ThinOS_7135Module: Locator;
    readonly ThinOSActivationLSChkBox: Locator;
    readonly ThinOSActivationLSArrow: Locator;
    readonly ThinOSActivationLSQtyChkBox: Locator;
    readonly ExpandedModule1stOptionListPrc: Locator;
    readonly BackToTopBtn: Locator;
    readonly InciteAlertMsgWithId: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ConfigurationDropDown = this.page.locator('#select-0');
        this.Modules = this.page.locator('//div/h4[text()="System"]/parent::div/parent::div/div[2]/div');
        this.ModuleColumnList = this.page.locator('//table[contains(@id,"productConfig")]/thead/tr/th');
        this.ModuleRows = this.page.locator('//table[contains(@id,"productConfig")]//tr');
        this.ViewQuoteBtn = this.page.locator('#productConfig_viewQuote');
        this.ProductListHeader = this.page.locator('//div[@id="listHeader"]/h5');
        this.SelectAllLink = this.page.locator('//div[@id="listHeader"]//a');
        this.ProductList = this.page.locator('//div[@id="prd-list-border"]/div');
        this.ProductDetailsSectionCount = this.page.locator('//div[@id="columnWidth"]/parent::div/div');
        this.OrderCode = this.page.locator('//span[text()="OrderCode:"]/parent::div/following-sibling::div/span');
        this.OrderCodeQuantity = this.page.locator('//input[contains(@id,"productInfoLI_itemQuantity")]');
        this.SmartSelectSection = this.page.locator('//smart-select-recommendations[@ng-reflect-is-primary-product-display="true"]');
        this.SmartSelectHeader = this.page.locator('//smart-select-recommendations[@ng-reflect-is-primary-product-display="true"]//p');
        this.ModelRecommendationHeader = this.page.locator('//product-recommendations-poc//h5[contains(text(),"Recommendations")]');
        this.ModelRecommendationsRefreshLink = this.page.locator('//product-recommendations-poc/div/div//a[text()="Refresh"]');
        this.ModelRecommendationMsgs = this.page.locator('//product-recommendations-poc/div/div/div[@class="dds__message-bar"]');
        this.MarginIconAndValue = this.page.locator('//tr[contains(@id,"options_0")]/td[6]//*');
        this.BrandIdAlertMsgs = this.page.locator('//span[contains(@id,"_productInfoLI_integratedMessagingAlert")]/parent::div/parent::div/parent::div/parent::div');
        this.ThinOS_7135Module = this.page.locator('//span[contains(text(),"Dell ThinOS Activation License")]');
        this.ThinOSActivationLSChkBox = this.page.locator('//input[@ng-reflect-name="productConfig_WyseThinOSMainte"]');
        this.ThinOSActivationLSArrow = this.page.locator('//a[@class="k-icon k-i-arrow-s"]');
        this.ThinOSActivationLSQtyChkBox = this.page.locator('//input[@ng-reflect-name="inputOptionQuantity_1"]');
        this.ExpandedModule1stOptionListPrc = this.page.locator('//tr[contains(@id,"options_0")]/td[4]//span');
        this.BackToTopBtn = this.page.locator('#back-to-top');
        this.InciteAlertMsgWithId = this.page.locator('//div[@id="_productInfoLI_validationError_0"]//span');
    }

    async SelectViewConfiguration() {
        await this.ConfigurationDropDown.selectOption({ index: 0 })
        await this.page.waitForTimeout(5000);
    }

    async ExpandAnyRandomModule() {
        let moduleCount = await this.Modules.count();
        let randomModuleNum = Math.floor(Math.random() * moduleCount) + 1;
        await this.page.locator('//div/h4[text()="System"]/parent::div/parent::div/div[2]/div[' + randomModuleNum + ']/module//button').click();
        await this.page.waitForTimeout(5000);
    }

    async ValidateDPAColumnNamePresent() {
        const dpaColumnPresent = (await this.ModuleColumnList.innerText()).toString();
        return dpaColumnPresent.toLowerCase().includes('dpa');
    }

    async ClickOnViewQuotePageBtn() {
        await this.ViewQuoteBtn.click();
        await this.page.waitForTimeout(10000);
    }

    async ExpandThinOSModule() {
        await this.ThinOS_7135Module.click();
        await this.page.waitForTimeout(5000);

    }

    async SelectThinOSActivationLSChkBox() {
        await this.ThinOSActivationLSChkBox.click();
        await this.page.waitForTimeout(5000);

    }

    async ClickOnOSActivationLSArrow() {
        await this.ThinOSActivationLSArrow.click();
        await this.page.waitForTimeout(5000);

    }

    async ScrollPageToTheBottom() {
        await this.page.waitForTimeout(5000);
        await this.page.keyboard.down('End');
        await this.page.waitForTimeout(5000);
    }
    async ValidateProductListMFESection() {
        const productListHeadertxt = await this.ProductListHeader.innerText();
        const SelectAllLinktxt = await this.SelectAllLink.innerText();
        const ProductsCount = await this.ProductList.count();
        const firstValidation = productListHeadertxt.toLowerCase().includes('products list');
        const secondValidation = SelectAllLinktxt.toLowerCase().includes('select all');
        const thirdValidation = ProductsCount > 0;
        return firstValidation && secondValidation && thirdValidation;
    }

    async ValidateProductDetailsMFESection(orderCode: string) {
        const productDetailsCount = await this.ProductDetailsSectionCount.count();
        const OrderCodeTxt = await this.OrderCode.innerText();
        const Quantity = Number(await this.OrderCodeQuantity.getAttribute('ng-reflect-model'));
        const firstValidation = productDetailsCount == 8;
        const secondValidation = OrderCodeTxt.toLowerCase().includes(orderCode.toLowerCase());
        const thirdValidation = Quantity == 1;
        return firstValidation && secondValidation && thirdValidation;
    }

    async ValidateSmartSelectMFESection() {
        const SmartSelectSection = await this.SmartSelectSection.count();
        const SmartSelectHeaderTxt = await this.SmartSelectHeader.innerText();
        const firstValidation = SmartSelectSection == 1;
        const secondValidation = SmartSelectHeaderTxt.toLowerCase().includes('primary matching smart selection');
        return firstValidation && secondValidation;
    }

    async ValidateMFEModluesAndOptionsPresent() {
        const numberofColumnsPresent = await this.ModuleColumnList.count();
        const numberOfRows = await this.ModuleRows.count();
        const firstValidation = numberofColumnsPresent >= 8;
        const secondValidation = numberOfRows >= 1;
        return firstValidation && secondValidation;
    }

    async ValidateMFEModelReccomendationsPresent() {
        const ModelRecommendationHeaderTxt = await this.ModelRecommendationHeader.innerText();
        const ModelRecommendationRfrshLnlTxt = await this.ModelRecommendationsRefreshLink.innerText();
        const ModelRecommendationMsges = await this.ModelRecommendationMsgs.allInnerTexts();
        const firstValidation = ModelRecommendationHeaderTxt.toLowerCase().includes("recommendations");
        const secondValidation = ModelRecommendationRfrshLnlTxt.toLowerCase().includes("refresh");
        const thirdValidation = ModelRecommendationMsges.includes(" Retrieving Recommendations... ");
        const fourthValidation = ModelRecommendationMsges.includes("We are unable to show you any recommendations at this time. Please try again later.");
        return firstValidation && secondValidation && thirdValidation && fourthValidation;
    }

    async ValidateOnlyMarginIconDisplayed() {
        const MarginIconAndValueCount = await this.MarginIconAndValue.count();
        const firstValidation = MarginIconAndValueCount == 1;
        return firstValidation;
    }

    async ValidateOnlyMarginIconWithValueDisplayed() {
        const MarginIconAndValueCount = await this.MarginIconAndValue.count();
        const firstValidation = MarginIconAndValueCount == 2;
        return firstValidation;
    }

    async ValidateBrandIdAlertMsgDisplayed(brandIdAlertMsg: string) {
        const BrandIdAlertMsgTexts = await this.BrandIdAlertMsgs.allInnerTexts().toString();
        const firstValidation = BrandIdAlertMsgTexts.includes(brandIdAlertMsg);
        return firstValidation;
    }

    async ValidateThisOSActivationLSQtyChkBox() {
        const ThinOSActivationLSQtyChkBoxCount = await this.ThinOSActivationLSQtyChkBox.count();
        const firstValidation = ThinOSActivationLSQtyChkBoxCount == 1;
        return firstValidation;
    }
    async ValidatePotentialCurrencySymbol() {
        const ListPrice = await this.ExpandedModule1stOptionListPrc.innerText();
        const firstValidation = ListPrice.includes('$');
        return firstValidation;
    }
    async ValidateBackToTopButtonIsDisplayed() {
        const firstValidation = await this.BackToTopBtn.isEnabled();
        const classvalue = await this.BackToTopBtn.getAttribute('class');
        const secondValidation = classvalue?.toString().toLocaleLowerCase().includes('show');
        return firstValidation && secondValidation;
    }

    async ValidateInciteAlertMsgWithIncideExpressionIdDisplayed() {
        const InciteAlertTxtWithId = await this.InciteAlertMsgWithId.innerText();
        const firstValidation = InciteAlertTxtWithId.includes('[');
        const secondValidation = InciteAlertTxtWithId.includes(']');
        return firstValidation && secondValidation;
    }
}
module.exports = { ProductConfigurePage };