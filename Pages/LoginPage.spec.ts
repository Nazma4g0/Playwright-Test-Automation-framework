import type { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private loginLink: string;
    private emailInput: string;
    private passwordInput: string;
    private loginButton: string;
    private errorMessage: string;
    private logoutLink: string;
    

    constructor(page: Page) {
        this.page = page;
        this.loginLink = "a[href='/login']";
        this.emailInput = "input[data-qa='login-email']";
        this.passwordInput = "input[data-qa='login-password']";
        this.loginButton = "button[data-qa='login-button']";
        this.errorMessage = "p:has-text('Your email or password is incorrect!')";
        this.logoutLink = "a[href='/logout']";
        
    }

    async gotoLoginPage() {
        await this.page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded', timeout: 120000 });
    }

    async Login(emailaddress: string, password: string) {
        await this.gotoLoginPage();
        await this.page.locator(this.loginLink).click();
        await this.page.locator(this.emailInput).fill(emailaddress);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
       
    
    async verifyErrorMessage() {
        await this.page.locator(this.errorMessage).waitFor({ state: 'visible', timeout: 10000 });
        const errorMessageVisible = await this.page.locator(this.errorMessage).isVisible();
        return errorMessageVisible;
    } 
    async clickLogout() {
        await Promise.all([
            this.page.waitForURL('**/login', { waitUntil: 'domcontentloaded', timeout: 120000 }),
            this.page.locator(this.logoutLink).click()
        ]);
        await this.page.waitForLoadState('domcontentloaded');
    }  
       
}