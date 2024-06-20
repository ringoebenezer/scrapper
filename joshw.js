const puppeteer = require("puppeteer");

const url = "https://www.joshwcomeau.com/";

const joshW = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const allArticles = await page.evaluate(() => {
    const articles = document.querySelectorAll("article");

    return Array.from(articles)
      .slice(0, 3)
      .map(article => {
        const title = article.querySelector("h3").innerText;
        const url = article.querySelector("a").href;
        return { title, url };
      });
  });

  console.log(allArticles);

  await browser.close();
};

module.exports = joshW;
