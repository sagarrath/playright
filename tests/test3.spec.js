const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('PlayWright Vanilla JS - 3', () => {
  test('Scenario 3: Testing the submitting of the Input Form', async ({ page }) => {
    const messageAfterSubmission = "Thanks for contacting us, we will get back to you shortly.";

    // Getting Locators
    const inputFormSubmit = page.locator("//a[normalize-space()='Input Form Submit']");
    const submitButton = page.locator("//button[text()='Submit']");
    const actualMessageAfterSubmission = page.locator("//p[@class='success-msg.hidden']");
    const name = page.locator("input[name='name']");
    const email = page.locator("#inputEmail4");
    const password = page.locator("#inputPassword4");
    const company = page.locator("#company");
    const webSiteName = page.locator("#websitename");
    const city = page.locator("#inputCity");
    const address1 = page.locator("#inputAddress1");
    const address2 = page.locator("#inputAddress2");
    const state = page.locator("#inputState");
    const zipCode = page.locator("#inputZip");

    // Navigate to the Lambda Selenium Playground URL
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    console.log("Navigated to Selenium Playground");

    // Clicking on the 'Input Form Submit' link
    await inputFormSubmit.click();
    console.log("You have successfully clicked on 'Input Form Submit' link");

    // Clicking the submit without filling the form and checking the validation message
    await submitButton.click();
    console.log("You have clicked submit button to check the form validation");

    page.on('dialog', async alert => {
 
      const text = alert.message();
      console.log(text);
      expect(text).toBe('Please fill out this field.');
    });
       // Fill in the form fields
    console.log("Filling in the form fields...");
    await name.fill("Araja Naik");
    await email.fill("arajanaik@testCompany.com");
    await password.fill("Araja13*");
    await company.fill("testCompany");
    await webSiteName.fill("testCompanyWebsite");
    await page.selectOption("//select[@name='country']", { label: "United States" }); // Select by label
    await city.fill("New York");
    await address1.fill("5 times square");
    await address2.fill("New York");
    await state.fill("New York");
    await zipCode.fill("10003");

    // Submit the form
    await submitButton.click();
    console.log("You have successfully submitted the form");

   // Validate the success message “Thanks for contacting us, we will get back to you shortly.” on the screen
  const successMessage = page.locator('//p[@class="success-msg hidden"]');
  await expect(successMessage).toHaveText('Thanks for contacting us, we will get back to you shortly.');
})
})