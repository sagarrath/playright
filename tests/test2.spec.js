const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('PlayWright Vanilla JS - 2', () => {
  test('Scenario 2: Drag & Drop Sliders - Set value from default value to 95', async ({ page }) => {
    const dragAndDropSlider = page.locator("//a[normalize-space(text())='Drag & Drop Sliders']");
    const slider = page.locator("#slider3");
    const output = page.locator("#rangeSuccess");

    // Navigate to the Lambda Selenium Playground URL
    await page.goto('https://www.lambdatest.com/selenium-playground/');
    console.log("Navigated to Selenium Playground");

    // Click on 'Drag & Drop Sliders'
    await dragAndDropSlider.click();
    console.log("You have successflly clicked on 'Drag & Drop Sliders'");

    // Displaying the Initial value
    let currentValue = await output.textContent();
    console.log('The initial slider value is set to :', currentValue);

    // Setting the target value
    const targetValue = 95;

    // We will now adjust slider position
    if (slider) {
        let isCompleted = false;
        while (!isCompleted) {
            const sliderBox = await slider.boundingBox();
            if (sliderBox) {
                const initialX = sliderBox.x + sliderBox.width / 2;
                const initialY = sliderBox.y + sliderBox.height / 2;

                // Moving the slider to the right
                await page.mouse.move(initialX, initialY);
                await page.mouse.down();
                await page.mouse.move(initialX + 195, initialY); // Adjusting the movement based on slider behavior
                await page.mouse.up();

                // Check the updated value
                currentValue = await output.textContent();
                console.log('Current slider value:', currentValue);

                if (parseInt(currentValue) === targetValue) {
                    isCompleted = true;
                }
            }
        }
    }

    // Final validation
    console.log('The final slider value is set to :', currentValue);
    await expect(output).toHaveText(`${targetValue}`);
})
})