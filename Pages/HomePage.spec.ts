import { Page, expect } from '@playwright/test';

export class HomePage {
    private page: Page;
    private homePageLogo: string;
    private productList: string;
    private addToCartButton: string;
    private continueShoppingButton: string;
    private hovertosecondproduct: string;
    private addToCartButtonSecondProduct: string;
    private recommendedItems:string
    private recommendedItemsList:string;
    private firstRecommendedProduct:string
    private firstRecommendedAddToCart:string;
    private productName:string;
    private scrollUpArrow:string;
    private automationText:string;


    
    

    constructor(page: Page) {
        this.page = page;
        this.homePageLogo = "img[alt='Website for automation practice']";
        this.productList = "div[class='productinfo text-center']";
        this.addToCartButton = "a[data-product-id='1']";
        this.continueShoppingButton = "button[data-dismiss='modal']";
        this.hovertosecondproduct = "div.productinfo.text-center:nth-of-type(2)";
        this.addToCartButtonSecondProduct = "a[data-product-id='2']";
        this.recommendedItems = "//h2[normalize-space()='recommended items']";
        this.recommendedItemsList = "//div[@id='recommended-item-carousel']//p";
        this.firstRecommendedProduct = "(//div[@id='recommended-item-carousel']//div[@class='product-image-wrapper'])[1]";
        this.firstRecommendedAddToCart = '(//div[@id="recommended-item-carousel"]//a[contains(@class,"add-to-cart")])[1]';
        this.productName = "#cart_info_table tbody tr td.cart_description h4 a";
        this.scrollUpArrow = '#scrollUp';
        this.automationText = "(//h2[normalize-space()='Full-Fledged practice website for Automation Engineers'])[1]";






    }
    async gotoHomePage() {
        await this.page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded', timeout: 120000 });
    }
    async VerifyHomePage() {
        await expect(this.page.locator(this.homePageLogo)).toBeVisible();
        
    }
        
    async addProductToCart() {
        const firstProduct = this.page.locator('div.productinfo.text-center').first();
        await firstProduct.hover();
        const addButton = firstProduct.locator("a[data-product-id='1']");
        await addButton.waitFor({ state: 'visible', timeout: 10000 });
        await addButton.scrollIntoViewIfNeeded();
        await addButton.click({ force: true });

        const cartModal = this.page.locator('div#cartModal');
        await cartModal.waitFor({ state: 'visible', timeout: 10000 });
        await cartModal.locator(this.continueShoppingButton).click();
        await cartModal.waitFor({ state: 'hidden', timeout: 10000 });
    }

    async goToCartPage() {
        await Promise.all([
            this.page.waitForURL('**/view_cart', { waitUntil: 'domcontentloaded' }),
            this.page.locator("a[href='/view_cart']").first().click()
        ]);
    }
    async hoverToSecondProduct() {
        await this.page.locator(this.productList).nth(1).hover();
    }
    async addSecondProductToCart() {
        const secondProduct = this.page.locator('div.productinfo.text-center').nth(1);
        await secondProduct.hover();
        const addButton = secondProduct.locator("a[data-product-id='2']");
        await addButton.waitFor({ state: 'visible', timeout: 10000 });
        await addButton.click();

        const cartModal = this.page.locator('div#cartModal');
        await cartModal.waitFor({ state: 'visible', timeout: 10000 });
        await cartModal.locator(this.continueShoppingButton).click();
        await cartModal.waitFor({ state: 'hidden', timeout: 10000 });
    }
    
    async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
  async addFirstRecommendedProductToCart(expectedCount:number, productName:string) {
    await expect(this.page.locator(this.recommendedItems)).toHaveText("recommended items");
    await expect(this.page.locator(this.recommendedItemsList)).toHaveCount(expectedCount);
    const recommendedProduct = this.page.locator(this.firstRecommendedProduct);
    await recommendedProduct.hover();
    await recommendedProduct.click();
    await this.page.locator(this.firstRecommendedAddToCart).click();
    await this.page.locator(this.continueShoppingButton).click();
    await this.goToCartPage();
    await expect(this.page.locator(this.productName)).toHaveText(productName);
}
async clickScrollUpArrow() {
        await this.page.locator(this.scrollUpArrow).click();
  }

  async verifyPageScrolledUp() {
        const automationTextLocator = this.page.locator(this.automationText);
        await expect(automationTextLocator).toBeVisible();
        await expect(automationTextLocator).toBeInViewport();
  }
  async scrollToTop() {
  await this.page.evaluate(() => {
    window.scrollTo(0, 0);
  });
}
  async verifyPagewithoutScrolledUp() {
        const automationTextLocator = this.page.locator(this.automationText);
        await expect(automationTextLocator).toBeVisible();
        await expect(automationTextLocator).toBeInViewport();

}
  }