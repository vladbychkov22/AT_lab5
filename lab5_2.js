const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');


async function testSearchResults(driver) {
    await driver.get('https://hotline.ua/');
    await driver.findElement(By.css('input[type="search"]')).sendKeys('iPhone', Key.RETURN);
    let searchResult = await driver.findElement(By.css('.item-title')).getText();
    if (!searchResult.includes('iPhone')) {
        console.log('Тест не пройшов: результати пошуку некоректні.');
    }
}

async function testSearchSuggestions(driver) {
    await driver.get('https://hotline.ua/');
    await driver.findElement(By.css('input[type="search"]')).sendKeys('ноутбук');
    let suggestionsBox = await driver.findElement(By.css('.suggestions-container'));
    if (!await suggestionsBox.isDisplayed()) {
        console.log('Тест не пройшов: підказки не відображаються.');
    }
}

async function testCaseSensitivity(driver) {
    await driver.get('https://hotline.ua/');
    await driver.findElement(By.css('input[type="search"]')).sendKeys('Samsung');
    let resultUpperCase = await driver.findElement(By.css('.item-title')).getText();
    await driver.findElement(By.css('input[type="search"]')).clear();
    await driver.findElement(By.css('input[type="search"]')).sendKeys('samsung');
    let resultLowerCase = await driver.findElement(By.css('.item-title')).getText();
    if (resultUpperCase !== resultLowerCase) {
        console.log('Тест не пройшов: пошук чутливий до регістру.');
    }
}

async function testClearSearchField(driver) {
    await driver.get('https://hotline.ua/');
    let searchInput = await driver.findElement(By.css('input[type="search"]'));
    await searchInput.sendKeys('планшет', Key.RETURN);
    await searchInput.clear();
    if (await searchInput.getAttribute('value') !== '') {
        console.log('Тест не пройшов: поле пошуку не очистилося.');
    }
}

async function testInvalidSearchQuery(driver) {
    await driver.get('https://hotline.ua/');
    await driver.findElement(By.css('input[type="search"]')).sendKeys('???!!!', Key.RETURN);
    let noResultsMessage = await driver.findElement(By.css('.no-results-message'));
    if (!await noResultsMessage.isDisplayed()) {
        console.log('Тест не пройшов: повідомлення про відсутність результатів не з явилося.');
    }
}