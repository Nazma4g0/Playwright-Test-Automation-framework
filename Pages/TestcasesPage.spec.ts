import { Page,expect } from '@playwright/test';

export class TestcasesPage {
    private page: Page;
    readonly testCasesMenu: string;
    readonly testCasesHeading: string;
    readonly testCaseList: string;


    constructor(page: Page) {
        this.page = page;
        this.testCasesMenu = 'a[href="/test_cases"]';
        this.testCasesHeading = 'h2.title.text-center';
        this.testCaseList = 'div.features_items div.col-sm-4';  
    }
    async gotoTestCasesPage() {
        await this.page.locator(this.testCasesMenu).click();
    }
    async verifyTestCasesPage() {
        await expect(this.page.locator(this.testCasesHeading)).toBeVisible();
        await expect(this.page.locator(this.testCasesHeading)).toHaveText('Test Cases');

        //await expect(this.page.locator(this.testCasesHeading)).toContainText('TEST CASES');

    }

    async verifyTotalTestCases(expectedCount: number) {
        const bodyText = await this.page.locator('body').textContent();
        const matches = bodyText?.match(/Test Case \d+/g) || [];
        const actualCount = matches.length;

        expect(actualCount).toBe(expectedCount);
    }
}