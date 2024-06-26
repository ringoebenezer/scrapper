const puppeteer = require("puppeteer");

const url = "https://swizec.com/blog/";

const swizec = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const allArticles = await page.evaluate(() => {
    const articles = document.querySelectorAll("div.css-zo9vbf");

    return Array.from(articles)
      .slice(0, 3)
      .map(article => {
        const titleElement = article.querySelector(
          "a.css-jhttf5 h2.css-b2rryz"
        );
        const urlElement = article.querySelector("a.css-jhttf5");

        const title = titleElement ? titleElement.innerText : null;
        const url = urlElement ? urlElement.href : null;

        return { title, url };
      });
  });

  console.log(allArticles);

  await browser.close();
};

module.exports = swizec;

/**
 * @WebpageStructure
 * <div class="css-zo9vbf">
 *  <a href="/blog/why-you-shouldnt-use-ai-to-write-your-tests/" class="css-jhttf5">
 *       <h2 class="css-b2rryz">Why you shouldn't use AI to write your tests</h2>
 *  </a>
 * </div>
 */
