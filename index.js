const puppeteer = require("puppeteer");
const fs = require("fs");

const url =
  "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const allResults = await page.evaluate(() => {
    const resultsTable = document.querySelectorAll(
      "body > table:nth-child(7) > tbody > tr:not(:first-child)"
    );

    return Array.from(resultsTable).map(row => {
      const cells = row.querySelectorAll("td");

      const examNumber = cells[0].innerText;
      const points = cells[2].innerText;
      const division = cells[3].innerText;
      const subjects = cells[4].innerText.split("' ").map(value => {
        const [subject, grade] = value.split(" - '");
        return { subject, grade };
      });

      return {
        examNumber,
        points,
        division,
        subjects,
      };
    });
  });

  console.log(allResults);

  await page.close();
  await browser.close();

  fs.writeFileSync("results.json", JSON.stringify(allResults, null, 1));
};

main();
