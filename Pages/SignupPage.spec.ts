import type { Page } from '@playwright/test';

export class SignupPage {
    private page: Page;
    private signupLink: string;
    private nameInput: string;
    private emailInput: string;
    private signupButton: string;
    private titleradiobtn: string;
    private passwordInput: string;
    private dayInput: string;
    private monthInput: string;
    private yearInput: string;
    private newsletterCheckbox: string;
    private offersCheckbox: string;
    private firstNameInput: string;
    private lastNameInput: string;
    private companyInput: string;
    private address1Input: string;
    private address2Input: string; 
    private countryInput: string;   
    private stateInput: string; 
    private cityInput: string;
    private zipcodeInput: string; 
    private mobileNumberInput: string; 
    private createAccountButton: string;
    private accountCreatedMessage: string;
    private clickContinueButton: string;
    private LoggedAsUser: string;
    private deleteAccountLink: string;
    private accountDeletedMessage: string;
    private continueButton: string;
    private verifyExistingUserError: string;
    private emailLoginInput: string;
    private passwordLoginInput: string;
    private loginButton: string;


    
    constructor(page: Page) {
        this.page = page;
        this.signupLink = 'a[href = "/login"] > i';
        this.nameInput = 'input[data-qa="signup-name"]';
        this.emailInput = 'input[data-qa="signup-email"]';
        this.signupButton = 'button[data-qa="signup-button"]';
        this.titleradiobtn = 'input[name="title"]';
        this.passwordInput = 'input[data-qa="password"]';
        this.dayInput = 'select[data-qa="days"]';
        this.monthInput = 'select[data-qa="months"]';
        this.yearInput = 'select[data-qa="years"]';
        this.newsletterCheckbox = 'input[name="newsletter"]';
        this.offersCheckbox = 'input[name="optin"]';
        this.firstNameInput = 'input[data-qa="first_name"]';
        this.lastNameInput = 'input[data-qa="last_name"]';
        this.companyInput = 'input[data-qa="company"]';
        this.address1Input = 'input[data-qa="address"]';
        this.address2Input = 'input[data-qa="address2"]';
        this.countryInput = 'select[data-qa="country"]';
        this.stateInput = 'input[data-qa="state"]';
        this.cityInput = 'input[data-qa="city"]';
        this.zipcodeInput = 'input[data-qa="zipcode"]';
        this.mobileNumberInput = 'input[data-qa="mobile_number"]';
        this.createAccountButton = 'button[data-qa="create-account"]';
        this.accountCreatedMessage = 'h2:has-text("Account Created!")';
        this.clickContinueButton = 'a[data-qa="continue-button"]';
        this.LoggedAsUser = 'text=Logged in as';
        this.deleteAccountLink = 'a:has-text("Delete Account")';
        this.accountDeletedMessage = 'h2:has-text("Account Deleted!")';
        this.continueButton = 'a:has-text("Continue")';
        this.verifyExistingUserError = 'p:has-text("Email Address already exist!")';
        this.emailLoginInput = "input[data-qa='login-email']";
        this.passwordLoginInput = "input[data-qa='login-password']";
        this.loginButton = "button[data-qa='login-button']";
    }
    async clickSignupLink() {
        const signupLink = this.page.locator(this.signupLink);
        if (await signupLink.count() > 0) {
            await signupLink.click();
        }

        await this.page.locator(this.nameInput).waitFor({ state: 'visible', timeout: 5000 });

    }
    async loginDetails(emailaddress: string, password: string) {
        await this.page.locator(this.emailLoginInput).fill(emailaddress);
        await this.page.locator(this.passwordLoginInput).fill(password);
        await this.page.locator(this.loginButton).click();
     }
    async verifyNewUserSignup(){
        await this.page.waitForSelector('h2:has-text("New User Signup!")', { state: 'visible' });

    }
    async signUp(name: string, email: string) {
        await this.page.locator(this.nameInput).fill(name);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.signupButton).click();
    }
    async verifyAccountInformation() {
        await this.page.waitForSelector('h2:has-text("Enter Account Information")', { state: 'visible' });
    }
    async fillAccountInformation(titleradiobtn: string, password: string, day: string, month: string, year: string, firstName: string, lastName: string, company: string, address1: string, address2: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string) {
        await this.page.locator(`input[name="title"][value="${titleradiobtn}"]`).check();
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.dayInput).selectOption({ label: String(Number(day)) });

        const monthNames: { [key: string]: string } = {
          '01': 'January', '1': 'January',
          '02': 'February', '2': 'February',
          '03': 'March', '3': 'March',
          '04': 'April', '4': 'April',
          '05': 'May', '5': 'May',
          '06': 'June', '6': 'June',
          '07': 'July', '7': 'July',
          '08': 'August', '8': 'August',
          '09': 'September', '9': 'September',
          '10': 'October',
          '11': 'November',
          '12': 'December'
        };
        const monthLabel = monthNames[month] ?? month;
        await this.page.locator(this.monthInput).selectOption({ label: monthLabel });
        await this.page.locator(this.yearInput).selectOption({ label: year });
        await this.page.locator(this.newsletterCheckbox).check({ force: true });
        await this.page.locator(this.offersCheckbox).check({ force: true });
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.companyInput).fill(company);
        await this.page.locator(this.address1Input).fill(address1);
        await this.page.locator(this.address2Input).fill(address2);
        await this.page.locator(this.countryInput).selectOption({ label: country });
        await this.page.locator(this.stateInput).fill(state);
        await this.page.locator(this.cityInput).fill(city);
        await this.page.locator(this.zipcodeInput).fill(zipcode);
        await this.page.locator(this.mobileNumberInput).fill(mobileNumber);
        await this.page.locator(this.createAccountButton).click();

}
    async verifyAccountCreated() {
        await this.page.waitForSelector(this.accountCreatedMessage, { state: 'visible', timeout: 30000 });
    }
    async clickContinue() {
        await Promise.all([
            this.page.waitForURL('**/', { waitUntil: 'domcontentloaded', timeout: 120000 }),
            this.page.locator(this.clickContinueButton).click()
        ]);
    }
    async verifyLoggedInAsUser() {
        await this.page.waitForSelector(this.LoggedAsUser, { state: 'visible' });
    }
    async deleteAccount() {
        await this.page.locator(this.deleteAccountLink).click();
    }
    async verifyAccountDeleted() {
        await this.page.waitForSelector(this.accountDeletedMessage, { state: 'visible' });
    }
    async clickContinueAfterDelete() {
        await Promise.all([
            this.page.waitForURL('**/', { waitUntil: 'domcontentloaded', timeout: 120000 }),
            this.page.locator(this.continueButton).click()
        ]);
    }
    async verifyExistingUserErrorMessage() {
        await this.page.locator(this.verifyExistingUserError).waitFor({ state: 'visible', timeout: 10000 });
        const errorMessageVisible = await this.page.locator(this.verifyExistingUserError).isVisible();
        return errorMessageVisible;
    }
   
}