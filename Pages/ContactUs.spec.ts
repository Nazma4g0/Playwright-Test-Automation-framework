import type { Page } from '@playwright/test';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import * as path from 'path';

export class ContactUsPage {
    private page: Page;
    private contactUsLink: string;
    private nameInput: string;
    private emailInput: string;
    private subjectInput: string;
    private messageInput: string;
    private uploadFileInput: string;
    private submitButton: string;
    private successMessage: string;

    constructor(page: Page) {
        this.page = page;
        this.contactUsLink = "a[href='/contact_us']";
        this.nameInput = "input[data-qa='name']";
        this.emailInput = "input[data-qa='email']";
        this.subjectInput = "input[data-qa='subject']";
        this.messageInput = "textarea[data-qa='message']";
        this.uploadFileInput = "input[type='file']";
        this.submitButton = "input[data-qa='submit-button']";
        this.successMessage = "div.status.alert.alert-success";
    }

    async gotoContactUsPage() {
        await this.page.goto('https://automationexercise.com/contact_us');
        await this.page.locator(this.contactUsLink).click();
    }

    async fillContactForm(name: string, email: string, subject: string, message: string, filePath: string) {
        await this.page.locator(this.nameInput).fill(name);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.subjectInput).fill(subject);
        await this.page.locator(this.messageInput).fill(message);

        const resolvedPath = path.resolve(filePath);
        if (!existsSync(resolvedPath)) {
            await mkdir(path.dirname(resolvedPath), { recursive: true });
            await writeFile(resolvedPath, 'Test attachment for contact form');
        }

        await this.page.locator(this.uploadFileInput).setInputFiles(resolvedPath);
    }

    async submitForm() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await this.page.locator(this.submitButton).click();
    }

    async verifySuccessMessage() {
        await this.page.locator(this.successMessage).waitFor({ state: 'visible', timeout: 10000 });
        const successMessageVisible = await this.page.locator(this.successMessage).isVisible();
        return successMessageVisible;
    }
}