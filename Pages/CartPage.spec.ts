import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
    private page: Page;
    private cartItems: string;
    private subscriptiontext: string;
    private subscriptionInput: string;
    private arrowButton: string;
    private successMessage: string;
    private bothproducts: Locator;
    private bothporductsdetails: Locator;
    private proceedtocheckout: string;
    private registerLink: string;
    private addressDetails: string;
    private reviewOrder: string;
    private descriptiontext: string;
    private placeOrder: string;
    private cardName: string;
    private cardNumber: string;
    private cardCvc: string;
    private cardExpirarionMonth: string;
    private cardExpirationYear: string;
    private payandConfirm: string;
    private orderPlacedMessage: string;
    private deliveryAddress: string;
    private billingAddress: string;
    private downloadInvoice:string;
    private continueButton:string;



    constructor(page: Page) {
        this.page = page;
        this.cartItems = 'div#cart_info table#cart_info_table tbody tr';
        //this.ScrollToDown = "div#scrollUp";
        this.subscriptiontext = "div[class='single-widget'] h2";
        this.subscriptionInput = "input[id='susbscribe_email']";
        this.arrowButton = "button#subscribe";
        this.successMessage = "div[class='alert-success alert']";
        this.bothproducts = this.page.locator("div#cart_info table#cart_info_table tbody tr");
        this.bothporductsdetails = this.page.locator("tbody tr");
        this.proceedtocheckout = "//a[contains(text(),'Proceed To Checkout')]"
        this.registerLink = 'a[href="/login"] > u';
        this.addressDetails = "//h2[normalize-space()='Address Details']"
        this.reviewOrder = "//h2[normalize-space()='Review Your Order']"
        this.descriptiontext = "textarea.form-control"
        this.placeOrder = 'a[href="/payment"]';
        this.cardName = "input[name='name_on_card']";
        this.cardNumber = "input[name='card_number']";
        this.cardCvc = "input[name='cvc']";
        this.cardExpirarionMonth = "input[name='expiry_month']";
        this.cardExpirationYear = "input[name='expiry_year']";
        this.payandConfirm = "#submit";
        this.orderPlacedMessage = "p.alert-success, h2:has-text('Order Placed'), h2:has-text('Congratulations!')";
        this.deliveryAddress = '#address_delivery';
        this.billingAddress = '#address_invoice';
        this.downloadInvoice = "a.btn.btn-default.check_out";
        this.continueButton = "a.btn.btn-primary";



    }

    async verifyProductInCart() {
        await this.page.locator('div#cart_info').waitFor({ state: 'visible', timeout: 10000 });
        const cartItemsCount = await this.page.locator(this.cartItems).count();
        return cartItemsCount > 0;
    }

    async removeProductFromCart() {
        await this.page.locator('div#cart_info').waitFor({ state: 'visible', timeout: 10000 });

        let remainingRows = await this.page.locator(this.cartItems).count();
        while (remainingRows > 0) {
            const deleteButton = this.page.locator('a.cart_quantity_delete').first();
            await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
            const previousRows = remainingRows;
            await deleteButton.click({ force: true, timeout: 10000 });
            await this.page.waitForFunction(
                (selector, previousCount) => document.querySelectorAll(selector).length < previousCount,
                [this.cartItems, previousRows],
                { timeout: 10000 }
            ).catch(() => {});
            await this.page.waitForTimeout(500);
            remainingRows = await this.page.locator(this.cartItems).count();
        }
    }

    async verifyProductRemovedFromCart() {
        await this.page.waitForFunction(
            (selector) => {
                const rows = document.querySelectorAll(selector).length;
                return rows === 0 || !!document.querySelector('#empty_cart');
            },
            this.cartItems,
            { timeout: 15000 }
        );
        const cartItemsCount = await this.page.locator(this.cartItems).count();
        const emptyCartVisible = await this.page.locator('#empty_cart').isVisible().catch(() => false);
        return cartItemsCount === 0 || emptyCartVisible;
    }

    async verifySubscriptionSection() {
        await expect(this.page.locator(this.subscriptiontext)).toBeVisible();
        await expect(this.page.locator(this.subscriptiontext)).toHaveText('Subscription');
    }
    async subscribeToNewsletter(email: string) {
        await this.page.locator(this.subscriptionInput).fill(email);
        await this.page.locator(this.arrowButton).click();
    }
    async verifySubscriptionSuccessMessage() {
        await this.page.locator(this.successMessage).waitFor({ state: 'visible', timeout: 10000 });
        const successMessageVisible = await this.page.locator(this.successMessage).isVisible();
        return successMessageVisible;
    }
    async verifyBothProductsInCart() {
        await this.page.locator('div#cart_info').waitFor({ state: 'visible', timeout: 10000 });
        const cartItemsCount = await this.bothproducts.count();
        return cartItemsCount === 2;
    }
    async verifyProduct(
        index: number,
        name: string,
        description: string,
        price: string,
        quantity: string,
        total: string
    ) {

        const row = this.bothporductsdetails.nth(index);

        await expect(row.locator('.cart_description h4 a')).toHaveText(name);
        await expect(row.locator('.cart_description p')).toContainText(description);
        await expect(row.locator('.cart_price p')).toHaveText(price);
        await expect(row.locator('.cart_quantity button')).toHaveText(quantity);
        await expect(row.locator('.cart_total p')).toHaveText(total);
    }
    async clickproceedtocheckout() {
        await this.page.locator(this.proceedtocheckout).click();

    }
    async registerLoginBtn() {
        const registerLink = this.page.locator(this.registerLink);
        await registerLink.waitFor({ state: 'visible', timeout: 10000 });
        await registerLink.click();
    }
    async verifyAddressreview(description: string, Cname: string, Cnumber: string, Ccvc: string, CEmonth: string, CEyear: string) {
        await expect(this.page.locator(this.addressDetails)).toHaveText("Address Details");
        await expect(this.page.locator(this.reviewOrder)).toHaveText("Review Your Order");
        await this.page.locator(this.descriptiontext).fill(description);
        await this.page.locator(this.placeOrder).click();
        await this.page.locator(this.cardName).fill(Cname);
        await this.page.locator(this.cardNumber).fill(Cnumber);
        await this.page.locator(this.cardCvc).fill(Ccvc);
        await this.page.locator(this.cardExpirarionMonth).fill(CEmonth);
        await this.page.locator(this.cardExpirationYear).fill(CEyear);
        await this.page.locator(this.payandConfirm).click();
        await expect(this.page.getByRole('heading', { name: 'Order Placed!' })).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible({ timeout: 15000 });
        return true;

    }
    async verifyDeliveryAndBillingAddress() {
    const delivery = (await this.page.locator(this.deliveryAddress).innerText())
      .replace('Your delivery address', '').replace(/\s+/g, ' ')
      .trim();

    const billing = (await this.page.locator(this.billingAddress).innerText())
      .replace('Your billing address', '').replace(/\s+/g, ' ')
      .trim();

    // Verify both addresses are identical
    expect(delivery).toBe(billing);

    // Verify expected values
    const expectedAddress = [
      'Mrs. Nazma Shaik',
      'Capgemini',
      'Mani Kanta Occational Colleage beside building, Tirumala Colony',
      'Farooq Nagar, Rangareddy District.',
      'Shadnagar Telangana 509210',
      'India',
      '9666187886'
    ];
    for (const value of expectedAddress) {
      expect(delivery).toContain(value);
      expect(billing).toContain(value);
    }
  }
  async downloadOrderInvoice() {
        // Click the download link directly rather than calling click() on an expect matcher
        await this.page.locator(this.downloadInvoice).click();
        await this.page.locator(this.continueButton).click();
    
  }
    

}