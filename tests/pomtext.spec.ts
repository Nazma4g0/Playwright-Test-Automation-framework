import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec';
import { HomePage } from '../Pages/HomePage.spec';
import { CartPage } from '../Pages/CartPage.spec';
import { SignupPage } from '../Pages/SignupPage.spec';
import { ContactUsPage } from '../Pages/ContactUs.spec';
import { TestcasesPage } from '../Pages/TestcasesPage.spec';
import { ProductsPage } from '../Pages/ProductsPage.spec';

test.describe.configure({ mode: 'default' });

test('Test Product is added to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.Login('nazmashaik115@gmail.com', 'N@zma4g0');
    const homePage = new HomePage(page);
    await homePage.VerifyHomePage();
    await homePage.addProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    const isProductInCart = await cartPage.verifyProductInCart();
    expect(isProductInCart).toBe(true);
});

test('Test Product is removed from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.Login('nazmashaik115@gmail.com', 'N@zma4g0');
    const homePage = new HomePage(page);
    await homePage.addProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    const isProductInCart = await cartPage.verifyProductInCart();
    expect(isProductInCart).toBe(true);
    await cartPage.removeProductFromCart();
    const isProductRemoved = await cartPage.verifyProductRemovedFromCart();
    expect(isProductRemoved).toBe(true);
});

test('Register new user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    const signupPage = new SignupPage(page);
    await signupPage.clickSignupLink();
    await signupPage.verifyNewUserSignup();
    const uniqueEmail = `nazmashaik${Date.now()}@example.com`;
    await signupPage.signUp('Nazma', uniqueEmail);
    await signupPage.verifyAccountInformation();
    await signupPage.fillAccountInformation('Mrs', 'N@zma4g0', '11', '05', '2000', 'Nazma', 'Shaik', 'Capgemini', 'Mani Kanta Occational Colleage beside building, Tirumala Colony', 'Farooq Nagar, Rangareddy District.', 'India', 'Telangana', 'Shadnagar', '509210', '9666187886');
    await signupPage.verifyAccountCreated();
    await signupPage.clickContinue();
    await signupPage.verifyLoggedInAsUser();
    await signupPage.deleteAccount();
    await signupPage.verifyAccountDeleted();
    await signupPage.clickContinueAfterDelete();
});

test('Login User with correct email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.Login('nazmashaik1805@gmail.com', 'N@zma4g0');
    const signupPage = new SignupPage(page);
    await signupPage.verifyLoggedInAsUser();
    
});

test.only('Login User with incorrect email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.Login('nazmashaik1130@gmail.com', 'N@zma1234g0');
    const isErrorMessageVisible = await loginPage.verifyErrorMessage();
    expect(isErrorMessageVisible).toBe(true);
    await page.close();
});

test('Logout User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.Login('nazmashaik115@gmail.com', 'N@zma4g0');
    await loginPage.clickLogout();

});

test('Register User with Existing Email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    const signupPage = new SignupPage(page);
    await signupPage.clickSignupLink();
    await signupPage.verifyNewUserSignup();
    await signupPage.signUp('Nazma Shaik', 'nazmashaik115@gmail.com');
    const isExistingUserErrorVisible = await signupPage.verifyExistingUserErrorMessage();
    expect(isExistingUserErrorVisible).toBe(true);
})

test('Contact US Form', async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.gotoContactUsPage();
    await contactUsPage.fillContactForm('Nazma Shaik', 'nazmashaik115@gmail.com', 'We really appreciate your response to our website', 'We really appreciate your response to our website.', 'Downloads/error-context-2.md');
    await contactUsPage.submitForm();
    const isSuccessMessageVisible = await contactUsPage.verifySuccessMessage();
    expect(isSuccessMessageVisible).toBe(true);
});

test('Verify Test Cases Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    const testCasesPage = new TestcasesPage(page);
    await testCasesPage.gotoTestCasesPage();
    await testCasesPage.verifyTestCasesPage();
    await testCasesPage.verifyTotalTestCases(26); // Replace 3 with the expected number of test cases

});

test('Verify All Products and product details page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();
    await productsPage.allProductsheading();
    await productsPage.verifyProductCount(34);
    await productsPage.clickFirstViewProduct();
    await productsPage.verifyProductDetailsPage();
});

test('Search Product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();
    await productsPage.allProductsheading();
    await productsPage.searchProduct('Tops');
    await productsPage.verifySearchResults(13);
});

test('Verify Subscription in Cart page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    const homePage = new HomePage(page);
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    await cartPage.verifySubscriptionSection();
    await cartPage.subscribeToNewsletter('nazmashaik115@gmail.com');
    const isSubscriptionSuccessVisible = await cartPage.verifySubscriptionSuccessMessage();
    expect(isSubscriptionSuccessVisible).toBe(true);
});

test('Add Products in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    await homePage.addProductToCart();
    await homePage.hoverToSecondProduct();
    await homePage.addSecondProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    await cartPage.verifyBothProductsInCart();
    await cartPage.verifyProduct(
        0,
        'Blue Top',
        'Women',
        'Rs. 500',
        '1',
        'Rs. 500');
    await cartPage.verifyProduct(
        1,
        'Men Tshirt',
        'Men',
        'Rs. 400',
        '1',
        'Rs. 400');

});

test('Verify Product Quantity in Cart', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();
    await productsPage.allProductsheading();
    await productsPage.clickFirstViewProduct();
    await productsPage.verifyProductDetailsPage();
    await productsPage.increaseProductQuantity('4');
    await productsPage.addProductToCart();
    await homePage.goToCartPage();
    await productsPage.getProductQuantity('4');
});

test('Place Order:Register while Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    await homePage.addProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    await cartPage.clickproceedtocheckout();
    await cartPage.registerLoginBtn()
    const signupPage = new SignupPage(page);
    await signupPage.verifyNewUserSignup();
    const uniqueEmail = `nazmashaik${Date.now()}@example.com`;
    await signupPage.signUp('Nazma', uniqueEmail);
    await signupPage.verifyAccountInformation();
    await signupPage.fillAccountInformation('Mrs', 'N@zma4g0', '11', '05', '2000', 'Nazma', 'Shaik', 'Capgemini', 'Mani Kanta Occational Colleage beside building, Tirumala Colony', 'Farooq Nagar, Rangareddy District.', 'India', 'Telangana', 'Shadnagar', '509210', '9666187886');
    await signupPage.verifyAccountCreated();
    await signupPage.clickContinue();
    await signupPage.verifyLoggedInAsUser();
    await homePage.goToCartPage();
    await cartPage.clickproceedtocheckout();
    await cartPage.verifyAddressreview('I like this this product, I hope it will receive as it is', 'Nazma', '123456789', '311', '05', '20230');
    await signupPage.deleteAccount();
    await signupPage.verifyAccountDeleted();
    await signupPage.clickContinueAfterDelete();
});

test('Place Order:Register Before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    const signupPage = new SignupPage(page);
    await signupPage.clickSignupLink();
    await signupPage.verifyNewUserSignup();
    const uniqueEmail = `nazmashaik${Date.now()}@example.com`;
    await signupPage.signUp('Nazma', uniqueEmail);
    await signupPage.verifyAccountInformation();
    await signupPage.fillAccountInformation('Mrs', 'N@zma4g0', '11', '05', '2000', 'Nazma', 'Shaik', 'Capgemini', 'Mani Kanta Occational Colleage beside building, Tirumala Colony', 'Farooq Nagar, Rangareddy District.', 'India', 'Telangana', 'Shadnagar', '509210', '9666187886');
    await signupPage.verifyAccountCreated();
    await signupPage.clickContinue();
    await signupPage.verifyLoggedInAsUser();
    await homePage.addProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    await cartPage.clickproceedtocheckout();
    await cartPage.verifyAddressreview('I like this product, I hope it will receive as it is', 'Nazma', '123456789', '311', '05', '2030');
    await signupPage.deleteAccount();
    await signupPage.verifyAccountDeleted();
    await signupPage.clickContinueAfterDelete();
});

test('Place Order: Login Before Checkout', async ({ page }) => {
    const login = new LoginPage(page);
    await login.Login('nazmashaik115@gmail.com', 'N@zma4g0');
    const signupPage = new SignupPage(page);
    await signupPage.verifyLoggedInAsUser();
    const homePage = new HomePage(page);
    await homePage.addProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    await cartPage.clickproceedtocheckout();
    await cartPage.verifyAddressreview('I like this product, I hope it will receive as it is', 'Nazma', '123456789', '311', '05', '2030');
});

test('View Category Products', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();
    await productsPage.verifyCategoryheading();
    await productsPage.womensCategorySection(3);
    await productsPage.mensCategorySection(6);
});

test('View & Cart Brand Products', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();
    await productsPage.verifyBrandsheading();
    await productsPage.poloBrandSection(6);
    await productsPage.madameBrandSection(5);

});

test('Search Products and Verify Cart After Login', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage()
    await productsPage.allProductsheading();
    await productsPage.searchProduct('Dress');
    await productsPage.verifySearchedProductstext();
    await productsPage.verifySearchResults(9);
    await productsPage.addAllVisibleProductsToCart();
    const homepage = new HomePage(page);
    await homepage.goToCartPage();
    await productsPage.verifyNineProductsInCart(9);
    const signup = new SignupPage(page);
    await signup.clickSignupLink();
    await signup.loginDetails('nazmashaik115@gmail.com', 'N@zma4g0');
    await homepage.goToCartPage();
    await productsPage.verifyNineProductsInCart(9);
});

test('Add review on product', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage()
    await productsPage.allProductsheading();
    await productsPage.clickFirstViewProduct();
    await productsPage.verifyProduceReviewPage('Nazma', 'nazmashaik115@gmail.com', 'Excellent Product');
    

});  
//Add to cart from Recommended items

test('Add to cart from Recommended items', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    await homePage.scrollToBottom();
    await homePage.addFirstRecommendedProductToCart(6, 'Blue Top');
});

test('Verify address details in checkbox page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    const signupPage = new SignupPage(page);
    await signupPage.clickSignupLink();
    await signupPage.verifyNewUserSignup();
    const uniqueEmail = `nazmashaik${Date.now()}@example.com`;
    await signupPage.signUp('Nazma', uniqueEmail);
    await signupPage.verifyAccountInformation();
    await signupPage.fillAccountInformation('Mrs', 'N@zma4g0', '11', '05', '2000', 'Nazma', 'Shaik', 'Capgemini', 'Mani Kanta Occational Colleage beside building, Tirumala Colony', 'Farooq Nagar, Rangareddy District.', 'India', 'Telangana', 'Shadnagar', '509210', '9666187886');
    await signupPage.verifyAccountCreated();
    await signupPage.clickContinue();
    await signupPage.verifyLoggedInAsUser();
    const homePage = new HomePage(page);
    await homePage.addProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    await cartPage.clickproceedtocheckout();
    await cartPage.verifyDeliveryAndBillingAddress();
    await signupPage.deleteAccount();
    await signupPage.verifyAccountDeleted();
    await signupPage.clickContinueAfterDelete();

});
test('Download Invoice after purchase order', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    await homePage.addProductToCart();
    await homePage.goToCartPage();
    const cartPage = new CartPage(page);
    await cartPage.clickproceedtocheckout();
    await cartPage.registerLoginBtn()
    const signupPage = new SignupPage(page);
    await signupPage.verifyNewUserSignup();
    const uniqueEmail = `nazmashaik${Date.now()}@example.com`;
    await signupPage.signUp('Nazma', uniqueEmail);
    await signupPage.verifyAccountInformation();
    await signupPage.fillAccountInformation('Mrs', 'N@zma4g0', '11', '05', '2000', 'Nazma', 'Shaik', 'Capgemini', 'Mani Kanta Occational Colleage beside building, Tirumala Colony', 'Farooq Nagar, Rangareddy District.', 'India', 'Telangana', 'Shadnagar', '509210', '9666187886');
    await signupPage.verifyAccountCreated();
    await signupPage.clickContinue();
    await signupPage.verifyLoggedInAsUser();
    await homePage.goToCartPage();
    await cartPage.clickproceedtocheckout();
    await cartPage.verifyAddressreview('I like this this product, I hope it will receive as it is', 'Nazma', '123456789', '311', '05', '20230');
    await cartPage.downloadOrderInvoice();
    await signupPage.deleteAccount();
    await signupPage.verifyAccountDeleted();
    await signupPage.clickContinueAfterDelete();
});
test('Verify Scroll Up using “Arrow” button and Scroll Down functionality', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    await homePage.scrollToBottom();
    const cartPage = new CartPage(page);
    await cartPage.verifySubscriptionSection();
    await homePage.clickScrollUpArrow();
    await homePage.verifyPageScrolledUp();
});

test('Verify Scroll Up without “Arrow” button and Scroll Down functionality', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();
    await homePage.VerifyHomePage();
    await homePage.scrollToBottom();
    const cartPage = new CartPage(page);
    await cartPage.verifySubscriptionSection();
    await homePage.scrollToTop();
    await homePage.verifyPagewithoutScrolledUp();

});


















