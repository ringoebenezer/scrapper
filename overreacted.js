const puppeteer = require("puppeteer");

const url = "https://overreacted.io/";

const overReacted = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const allArticles = await page.evaluate(() => {
    const articles = document.querySelectorAll("a.block");

    return Array.from(articles)
      .slice(0, 3)
      .map(a => {
        const title = a.querySelector("article h2").innerText;
        const url = a.href;
        return { title, url };
      });
  });

  console.log(allArticles);

  await browser.close();
};

module.exports = overReacted;
