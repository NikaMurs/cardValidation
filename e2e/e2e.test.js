/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */
import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("cardWidget should render on page start", async () => {
    await page.goto(baseUrl);
    await page.waitForSelector(".card-validation-widget");
  });

  test("cardWidget should be add .valid class to title if card is valid", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".card-validation-widget");

    const widget = await page.$(".card-validation-widget");
    const input = await widget.$(".card-form-input");
    const button = await widget.$(".card-form-submit");

    await input.type("6011111111111117");
    await button.click();

    await page.waitForSelector(".title.valid");
  });
});
