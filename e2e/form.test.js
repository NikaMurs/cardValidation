/* eslint-disable jest/expect-expect */
import puppeteer from "puppeteer";

describe("cardWidget test", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      //slowMo: 100,
      //devtools: true,
    });

    page = await browser.newPage();
  });

  test("cardWidget should render on page start", async () => {
    await page.goto("http://localhost:9000");

    await page.waitForSelector(".card-validation-widget");
  });

  test("cardWidget should be add .valid class to title if card is valid", async () => {
    await page.goto("http://localhost:9000");

    await page.waitForSelector(".card-validation-widget");

    const widget = await page.$(".card-validation-widget");
    const input = await widget.$(".card-form-input");
    const button = await widget.$(".card-form-submit");

    await input.type("6011111111111117");
    await button.click();

    await page.waitForSelector(".title.valid");
  }, 10000);

  test("cardWidget should be add .invalid class to title if card is invalid", async () => {
    await page.goto("http://localhost:9000");

    await page.waitForSelector(".card-validation-widget");

    const widget = await page.$(".card-validation-widget");
    const input = await widget.$(".card-form-input");
    const button = await widget.$(".card-form-submit");

    await input.type("4111 1111 1111 1113");
    await button.click();

    await page.waitForSelector(".title.invalid");
  }, 10000);

  afterEach(async () => {
    await browser.close();
  });
});
