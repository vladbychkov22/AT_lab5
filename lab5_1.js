const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

async function testWebsiteFeatures() {
    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        .build();

    try {
        await driver.get('https://hotline.ua/');

        await driver.findElement(By.css('input[type="search"]'));

        await driver.findElement(By.css('.cart-button'));

        await driver.findElement(By.css('.menu-toggler'));

        await driver.findElement(By.css('.menu-container'));

        await driver.findElement(By.css('.popular-articles'));

        console.log('Всі основні функціональні частини сайту присутні.');

    } catch (error) {
        console.error('Помилка під час перевірки:', error);
    } finally {
        await driver.quit();
        console.log('Тест завершено, браузер закрито.');
    }
}

testWebsiteFeatures();
