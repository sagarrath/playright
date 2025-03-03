import { test, expect } from '@playwright/test';

test.describe('PlayWright Vanilla JS - 1', () => {
test('Scenario 1: Test Demo for a simple form', async ({ page }) => {
    const inputMessage = "Welcome to LambdaTest";
    
    // Getting Locators
    const input = page.locator("//input[@id='user-message']"); // Locator by XPath
    const showInputMessageButton = page.locator("#showInput"); // Locator by CSS
    const simpleFormDemo = page.locator("//a[normalize-space(text())='Simple Form Demo']");

    // Navigate to the Lambda Selenium Playground URL
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    console.log("You have successfully navigated to LambdaTest Selenium Playground");

    // Click on 'Simple Form Demo' link
    await simpleFormDemo.click();
    console.log("You have successfully clicked on 'Simple Form Demo' link");

    // Verify that the URL contains 'simple-form-demo'
    console.log("Verifying the URL...");
    await expect(page).toHaveURL(/.*simple-form-demo.*/);

    // Populate the input field with the message
    console.log(`Filling the input field with message: "${inputMessage}"`);
    await input.fill(inputMessage);

    // Click the button to show the message
    console.log("Clicking the Get Checked Value button to display the input message...");
    await showInputMessageButton.click();

    // Verify the displayed message
    const actualMessage = page.locator("#message");
    const actualMessageText = await actualMessage.textContent();
    console.log(`The Displayed message is: "${actualMessageText}"`);    
    await expect(actualMessage).toHaveText(inputMessage)

})
})
