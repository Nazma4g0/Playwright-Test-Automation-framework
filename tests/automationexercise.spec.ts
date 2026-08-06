import { test, expect, type Locator } from '@playwright/test';

test("title of the webpage", async ({page})=>
{
    await page.goto("https://www.naukri.com");
    let title:string = await page.title();
    console.log("Title :" ,title);
    await expect(page).toHaveTitle("Jobs - Recruitment - Job Search - Employment - Job Vacancies - Naukri.com");
});

test("Verify the URL", async ({page})=>
{
    await page.goto("https://www.naukri.com");
    let Url:string = await page.url();
    console.log("URL :" ,Url);
    await expect(page).toHaveURL(/naukri/);
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('verify automation exercise test cases page and count', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  await expect(page).toHaveTitle('Automation Exercise');

  await page.locator('a[href="/test_cases"]').first().click();

  await expect(page).toHaveURL(/.*test_cases/);

  const testCaseCount = await page.locator('text=/Test Case \\d+:/').count();
  await expect(testCaseCount).toBe(26);
});
test('Text Input actions should fill the data entry form', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await expect(page).toHaveTitle('Automation Testing Practice');

    await page.getByRole('link', { name: 'Data Entry Form' }).click();

    await page.locator('#name').fill('Nazma');
    await expect(page.locator('#name')).toHaveValue('Nazma');
    await page.locator('#email').fill('nazmashaik115@gmail.com');
    await expect(page.locator('#email')).toHaveValue('nazmashaik115@gmail.com');
    await page.locator('#phone').fill('9550900710');
    await expect(page.locator('#phone')).toHaveValue('9550900710');
    await page.locator('#textarea').fill(
        'Mani Kanta Occational Colleage beside building, Tirumala Colony\nFarooq Nagar, Rangareddy District.'
    );
    await expect(page.locator('#textarea')).toHaveValue(
        'Mani Kanta Occational Colleage beside building, Tirumala Colony\nFarooq Nagar, Rangareddy District.'
    );

    await page.getByRole('radio', { name: 'Female' }).check();
    await expect(page.locator('#female')).toBeChecked();


});


test('Checkbox actions should work for Days section', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const daysSection = page.locator('div.form-group', { has: page.locator('label[for="days"]') });
    const dayCheckboxes = daysSection.locator('input[type="checkbox"]');

    await page.getByLabel('Sunday').check();
    await expect(page.getByLabel('Sunday')).toBeChecked();

    await expect(dayCheckboxes).toHaveCount(7);

    for (let i = 0; i < 7; i++) {
        await dayCheckboxes.nth(i).check();
        await expect(dayCheckboxes.nth(i)).toBeChecked();
    }

    for (let i = 4; i < 7; i++) {
        const checkbox = dayCheckboxes.nth(i);
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    for (let i = 0; i < 7; i++) {
        const checkbox = dayCheckboxes.nth(i);
        const checked = await checkbox.isChecked();
        if (checked) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    const randomIndices = [1, 3, 6];
    for (const index of randomIndices) {
        const checkbox = dayCheckboxes.nth(index);
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    await page.getByLabel('Friday').check();
    await expect(page.getByLabel('Friday')).toBeChecked();
});

test('Single select dropdown should select India and verify option count', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const countrySelect = page.locator('#country');
    await countrySelect.selectOption('india');
    await expect(countrySelect).toHaveValue('india');

    const countryOptions = countrySelect.locator('option');
    await expect(countryOptions).toHaveCount(10);
    await expect(countryOptions.filter({ hasText: 'Japan' })).toHaveCount(1);
});

test('Multi select dropdown should select Red, Blue, Green and verify options', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const colorsSelect = page.locator('#colors');
    await colorsSelect.selectOption([{ index: 0 }, { index: 1 }, { index: 2 }]);

    const selectedColors = await colorsSelect.evaluate((select: HTMLSelectElement) =>
        Array.from(select.selectedOptions).map((option) => option.text.trim())
    );

    expect(selectedColors).toEqual(['Red', 'Blue', 'Green']);

    const colorOptions = colorsSelect.locator('option');
    await expect(colorOptions).toHaveCount(7);
    await expect(colorOptions.filter({ hasText: 'Red' }).first()).toBeVisible();
});

test('Sorted select dropdown should be in sorted order', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const animalOptions = page.locator('#animals option');
    const animalNames = (await animalOptions.allTextContents()).map((text) => text.trim());

    const expectedSortedNames = [...animalNames].sort((a, b) => a.localeCompare(b));
    expect(animalNames).toEqual(expectedSortedNames);
});
test('Colors dropdown should contain duplicates and sorted dropdown should not', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const colorOptions = page.locator('#colors option');
    const colorValues = (await colorOptions.allTextContents()).map((text) => text.trim());

    const duplicateColors = colorValues.filter((value, index) => colorValues.indexOf(value) !== index);
    expect(duplicateColors.length, 'Colors dropdown should contain duplicate values').toBeGreaterThan(0);
    expect(duplicateColors).toContain('Red');
    expect(duplicateColors).toContain('Green');

    const animalOptions = page.locator('#animals option');
    const animalValues = (await animalOptions.allTextContents()).map((text) => text.trim());

    const duplicateAnimals = animalValues.filter((value, index) => animalValues.indexOf(value) !== index);
    expect(duplicateAnimals, 'Sorted list dropdown should not contain duplicate values').toEqual([]);
});

test("Verify Playwright Locators", async ({page}) =>
{
    await page.goto("https://demo.nopcommerce.com/");
    const logo:Locator = page.getByAltText("Icon for demo.nopcommerce.com");
    await expect(logo).toBeVisible();

;

// 2. page.getByText()

await expect(page.getByText("Welcome to our store")).toBeVisible();


//3.page.getByRole()

await page.getByRole("link",{name:'Register'}).click();

await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();


// 4. page.getByLabel()

await page.getByLabel('First name:').fill("Nazma");
await page.getByLabel('Last name:').fill("Shaik");
await page.getByLabel('Email:').fill("nazmashaik@gmail.com");


//5. page.getByPlaceholder()

page.getByPlaceholder('Search store').fill("Apple MacBook Pro");

});

test('verify nopCommerce home page, registration form, and search', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load', { timeout: 15000 }).catch(() => undefined);
  await page.waitForTimeout(3000);

  const title = await page.title();
  const bodyText = await page.locator('body').innerText();
  const isCloudflareChallenge = /just a moment|security verification|cloudflare/i.test(title) || /security verification|cloudflare/i.test(bodyText);

  if (isCloudflareChallenge) {
    test.skip(true, 'The nopCommerce site is currently serving a Cloudflare challenge in this environment.');
  }

  await expect(page.getByAltText(/nopCommerce demo store/i)).toBeVisible();
  await expect(page).toHaveTitle('nopCommerce demo store. Shopping Cart');

  await expect(page.getByText('Welcome to our store')).toBeVisible();

  const registerLink = page.getByRole('link', { name: 'Register' });
  await expect(registerLink).toBeVisible();
  await registerLink.click();
  await page.getByLabel('Female').check();
  await page.getByLabel('First name').fill('Nazma');
  await page.getByLabel('Last name').fill('Shaik');
  await page.getByLabel('Email').fill('nazmashaik115@gmail.com');
  await page.getByPlaceholder('Search store').fill('Apple MacBook Pro');
});

test('Register User', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  await expect(page.locator('text=Features Items')).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

  await page.locator('input[data-qa="signup-name"]').fill('Nazma');
  await page.locator('input[data-qa="signup-email"]').fill('nazmashaik115@gmail.com');
  await page.getByRole('button', { name: 'Signup' }).click();

  await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

  await page.getByLabel('Mrs.').check();
  await expect(page.locator('input[data-qa="name"]')).toHaveValue('Nazma');
  await expect(page.locator('input[data-qa="email"]')).toHaveValue('nazmashaik115@gmail.com');

  await page.locator('input[data-qa="password"]').fill('N@zma4g0');

  await page.locator('select[data-qa="days"]').selectOption('11');
  await page.locator('select[data-qa="months"]').selectOption('May');
  await page.locator('select[data-qa="years"]').selectOption('2000');

  await page.locator('#newsletter').check();
  await page.locator('#optin').check();

  await expect(page.getByRole('heading', { name: 'Address Information' })).toBeVisible();

  await page.locator('input[data-qa="first_name"]').fill('Nazma');
  await page.locator('input[data-qa="last_name"]').fill('Shaik');
  await page.locator('input[data-qa="company"]').fill('TCS');
  await page.locator('input[data-qa="address"]').fill('Mani Kanta Occational Colleage beside building');
  await page.locator('input[data-qa="address2"]').fill('Farooq Nagar, Rangareddy District.');
  await page.locator('select[data-qa="country"]').selectOption('India');
  await page.locator('input[data-qa="state"]').fill('Telangana');
  await page.locator('input[data-qa="city"]').fill('Shadnagar');
  await page.locator('input[data-qa="zipcode"]').fill('509216');
  await page.locator('input[data-qa="mobile_number"]').fill('9666187886');

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Account Created!')).toBeVisible();

  await page.getByRole('link', { name: 'Continue' }).click();

  await expect(page.getByText(/Logged in as/i)).toBeVisible();

  await page.getByRole('link', { name: 'Delete Account' }).click();

  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});

test('Static web table should be visible and its data should match the expected values', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const staticTableHeading = page.getByRole('heading', { name: 'Static Web Table' });
    await expect(staticTableHeading).toBeVisible();

    const table = page.locator('table[name="BookTable"]');
    await expect(table).toBeVisible();

    const rows = table.locator('tr');
    await expect(rows).toHaveCount(7);

    const headers = table.locator('th');
    await expect(headers).toHaveCount(4);

    const bodyRows = rows.filter({ has: page.locator('td') });
    const secondRowCells = bodyRows.nth(1).locator('td');
    const secondRowData = await secondRowCells.allTextContents();
    const normalizedSecondRowData = secondRowData.map((text) => text.trim());
    expect(normalizedSecondRowData).toEqual(['Learn Java', 'Mukesh', 'Java', '500']);

    const allRowsData = [] as string[][];
    for (let i = 0; i < await bodyRows.count(); i++) {
        const cells = bodyRows.nth(i).locator('td');
        const rowData = await cells.allTextContents();
        allRowsData.push(rowData.map((text) => text.trim()));
    }

    const mukeshBooks = allRowsData
        .filter((row) => row[1] === 'Mukesh')
        .map((row) => row[0]);

    expect(mukeshBooks).toEqual(['Learn Java', 'Master In Selenium']);

    const totalPrice = allRowsData.reduce((sum, row) => sum + Number(row[3]), 0);
    expect(totalPrice).toBe(7100);
});









