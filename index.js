const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  // launching the browser and opening a new blank page.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //navigating the page to the passed url
  await page.goto(url);

  const el = await page.waitForSelector("div > #landingImage");
  const src = await el.getProperty("src");
  const imageSrc = await src.jsonValue(src);

  const el2 = await page.waitForSelector("h1 > #productTitle");
  const txt = await el2.getProperty("textContent");
  const title = await txt.jsonValue(txt);

  const el3 = await page.waitForSelector(".slot-price > span");
  const price = await el3.getProperty("textContent");
  const priceText = await price.jsonValue(txt);

  console.log({ imageSrc, title, priceText });

  browser.close();
}

scrapeProduct(
  "https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X"
);
