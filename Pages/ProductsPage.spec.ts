import { Page,expect } from '@playwright/test';

export class ProductsPage {
    private page: Page;
    private productsLink: string
    private productheading: string;
    private productList: string;
    private firstViewProduct: string;
    private productDetailsPage: string;
    private productNameDetails: string;
    private productCategoryDetails: string;
    private productPriceDetails: string;
    private productAvailabilityDetails: string;
    private productConditionDetails: string;
    private productBrandDetails: string;
    private searchInput: string;
    private searchButton: string;
    private searchedProductsheading: string;
    private searchResults: string;
    private addToCartButton: string;
    private continueShoppingButton: string;
    private productQuantity: string;
    private quantity: string
    private category:string;
    private womensCategory:string;
    private menCategory:string;
    private dressSubCategory:string;
    private tshirtsSubCategory:string;
    private verifyDressestext:string;
    private verifytshirtstext:string;
    private dressesProductList:string;
    private tshirtsProductList:string;
    private brands:string;
    private poloBrand:string;
    private poloBrandProductList:string;
    private verifypolobrandtext:string;
    private madameBrand:string;
    private madamebrandProductList:string;
    private verifymadamebrandtext:string;
    private addToCartButtons:string;
    private nineProductsInCart:string;
    private productReviewHeading:string;
    private nameProductReview:string
    private emailProductReview:string;
    private writeProductReview:string;
    private submitProductReview:string;
    private reviewSubmittedMessage:string; 




    
    
        
    
    constructor(page: Page) {
        this.page = page;
        this.productsLink = "a[href='/products']";
        this.productheading = "h2.title.text-center";
        this.productList = "div[class='productinfo text-center']";
        this.firstViewProduct = 'a[href*="/product_details/"]';        ;
        this.productDetailsPage = "div.product-information";
        this.productNameDetails = "div.product-information h2";
        this.productCategoryDetails = "div.product-information p:has-text('Category')";
        this.productPriceDetails = "div.product-information span span";
        this.productAvailabilityDetails = "div.product-information p:has-text('Availability')";
        this.productConditionDetails = "div.product-information p:has-text('Condition')";
        this.productBrandDetails = "div.product-information p:has-text('Brand')";
        this.searchInput = "input#search_product";
        this.searchButton = "button#submit_search";
        this.searchedProductsheading = "h2.title.text-center";
        this.searchResults = "div[class='productinfo text-center']";
        this.addToCartButton = "button[class='btn btn-default cart']";
        this.continueShoppingButton = "button[data-dismiss='modal']";
        this.productQuantity = "input#quantity";
        this.quantity = ".cart_quantity button"
        this.category = "//h2[normalize-space()='Category']";
        this.womensCategory = "a[href='#Women']";
        this.menCategory = "a[href='#Men']";
        this.dressSubCategory ="a[href='/category_products/1']"
        this.tshirtsSubCategory = "a[href='/category_products/3']";
        this.verifyDressestext = "h2.title.text-center";
        this.verifytshirtstext = "h2.title.text-center";
        this.dressesProductList = "div.productinfo.text-center";
        this.tshirtsProductList = "div.productinfo.text-center";
        this.brands = "div.brands_products > h2";
        this.poloBrand = "a[href='/brand_products/Polo']";
        this.madameBrand = "a[href='/brand_products/Madame']";
        this.verifypolobrandtext = "h2.title.text-center";
        this.verifymadamebrandtext ="h2.title.text-center"
        this.poloBrandProductList = "div.productinfo.text-center";
        this.madamebrandProductList = "div.productinfo.text-center";
        this.addToCartButtons = ".features_items .product-overlay .add-to-cart";
        this.nineProductsInCart = "#cart_info_table tbody tr";
        this. productReviewHeading = "a[href='#reviews']";
        this.nameProductReview = '#name';
        this.emailProductReview = '#email';
        this.writeProductReview = 'textarea#review';
        this.submitProductReview = '#button-review';
        this.reviewSubmittedMessage = "div.alert-success.alert > span";











        
    }

    async gotoProductsPage() {
        await Promise.all([
            this.page.waitForURL('**/products', { waitUntil: 'domcontentloaded', timeout: 120000 }),
            this.page.locator(this.productsLink).click()
        ]);
        await this.page.locator(this.productheading).filter({ hasText: 'All Products' }).first().waitFor({ state: 'visible', timeout: 10000 });
    }
    async allProductsheading() {
        const heading = this.page.locator(this.productheading).filter({ hasText: 'All Products' }).first();
        await expect(heading).toBeVisible();
        await expect(heading).toHaveText('All Products');
    }
    

    async verifyProductCount(expectedCount: number) {
        await expect(this.page.locator(this.productList)).toHaveCount(expectedCount);
        //await expect(this.page.locator(this.productList)).toBeVisible();
    }
    async clickFirstViewProduct() {
        //await expect(this.page.locator(this.firstViewProduct)).toBeVisible();
        await this.page.locator(this.firstViewProduct).first().click();
        

    }
    async verifyProductDetailsPage() {
        await expect(this.page.locator(this.productDetailsPage)).toBeVisible();
        await expect(this.page.locator(this.productNameDetails)).toBeVisible();
        await expect(this.page.locator(this.productNameDetails)).toHaveText('Blue Top');
        await expect(this.page.locator(this.productCategoryDetails)).toBeVisible();
        await expect(this.page.locator(this.productCategoryDetails)).toHaveText('Category: Women > Tops');
        await expect(this.page.locator(this.productPriceDetails)).toBeVisible();
        await expect(this.page.locator(this.productPriceDetails)).toHaveText('Rs. 500');
        await expect(this.page.locator(this.productAvailabilityDetails)).toBeVisible();
        await expect(this.page.locator(this.productAvailabilityDetails)).toHaveText('Availability: In Stock');
        await expect(this.page.locator(this.productConditionDetails)).toBeVisible();
        await expect(this.page.locator(this.productConditionDetails)).toHaveText('Condition: New');
        await expect(this.page.locator(this.productBrandDetails)).toBeVisible();
        await expect(this.page.locator(this.productBrandDetails)).toHaveText('Brand: Polo');
    }
    async searchProduct(productName: string) {
        await this.page.locator(this.searchInput).fill(productName);
        await Promise.all([
            this.page.locator(this.searchButton).click(),
            this.page.locator(this.searchResults).first().waitFor({ state: 'visible', timeout: 10000 })
        ]);
    }
    async verifySearchedProductstext() {
        await expect(this.page.locator(this.searchedProductsheading)).toBeVisible();
        await expect(this.page.locator(this.searchedProductsheading)).toHaveText('Searched Products');

    }
    async verifySearchResults(expectedcount :number) {
        //await expect(this.page.locator(this.searchResults)).toBeVisible();
        await expect(this.page.locator(this.searchResults)).toHaveCount(expectedcount);

    }
    
    async increaseProductQuantity(quantity: string) {
        //await this.page.locator(this.quantityincreaseButton).click();
        await this.page.locator(this.productQuantity).fill(quantity);
    }
    
    async addProductToCart() {
        await this.page.locator(this.addToCartButton).click();
        const cartModal = this.page.locator('div#cartModal');
        await cartModal.waitFor({ state: 'visible', timeout: 5000 });
        await cartModal.locator(this.continueShoppingButton).click();
        await cartModal.waitFor({ state: 'hidden', timeout: 5000 });
    }
    
      
    async getProductQuantity(expectedQuantity: string) {
        await expect(this.page.locator(this.quantity).first()).toHaveText(expectedQuantity);
    }
    async verifyCategoryheading() {
        await expect(this.page.locator(this.category)).toBeVisible();
        await expect(this.page.locator(this.category)).toHaveText('Category');

    }
    async womensCategorySection(expectedCount: number) {
        await this.page.locator(this.womensCategory).click();
        await this.page.locator(this.dressSubCategory).click();
        //this.page.waitForTimeout(5000);
        await expect(this.page.locator(this.verifyDressestext)).toHaveText('Women -  Dress Products');
        await expect(this.page.locator(this.dressesProductList)).toHaveCount(expectedCount);
    }
   async mensCategorySection(expectedCount: number) {
    await this.page.locator(this.menCategory).click();
    await this.page.locator(this.tshirtsSubCategory).click();
    //this.page.waitForTimeout(5000);
    await expect(this.page.locator(this.verifytshirtstext)).toHaveText('Men -  Tshirts Products');
    await expect(this.page.locator(this.tshirtsProductList)).toHaveCount(expectedCount);

   }
   async verifyBrandsheading() {
    await expect(this.page.locator(this.brands)).toBeVisible();
    await expect(this.page.locator(this.brands)).toHaveText('Brands');
}
async poloBrandSection(expectedCount: number) {
    await this.page.locator(this.poloBrand).click();
    await expect(this.page.locator(this.verifypolobrandtext)).toHaveText('Brand -  Polo Products');
    await expect(this.page.locator(this.poloBrandProductList)).toHaveCount(expectedCount);
    }

async madameBrandSection(expectedCount: number) {
    await this.page.locator(this.madameBrand).click();
    await expect(this.page.locator(this.verifymadamebrandtext)).toHaveText('Brand - Madame Products');
    await expect(this.page.locator(this.madamebrandProductList)).toHaveCount(expectedCount);
    }

async addAllVisibleProductsToCart() {
    const products = this.page.locator('.product-image-wrapper, div.productinfo.text-center');
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const addButton = product.locator('a.add-to-cart').first();
      await addButton.waitFor({ state: 'visible', timeout: 10000 });
      await addButton.scrollIntoViewIfNeeded();
      await addButton.click({ force: true });

      const cartModal = this.page.locator('div#cartModal');
      await cartModal.waitFor({ state: 'visible', timeout: 10000 });
      await cartModal.locator(this.continueShoppingButton).click();
      await cartModal.waitFor({ state: 'hidden', timeout: 10000 });
    }
  }
  async verifyNineProductsInCart(expectedCount: number) {
    await expect(this.page.locator(this.nineProductsInCart)).toHaveCount(expectedCount);
    }
    async verifyProduceReviewPage(name:string, email:string, review:string) {
        await expect(this.page.locator(this.productReviewHeading)).toHaveText('Write Your Review');
        await this.page.locator(this.nameProductReview).fill(name);
        await this.page.locator(this.emailProductReview).fill(email);
        await this.page.locator(this.writeProductReview).fill(review);
        await this.page.locator(this.submitProductReview).click();
        await expect(this.page.locator(this.reviewSubmittedMessage)).toBeVisible();
        await expect(this.page.locator(this.reviewSubmittedMessage)).toHaveText('Thank you for your review.');
    }
    
    }



    


    

    

    
    

    
