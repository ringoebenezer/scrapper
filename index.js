const puppeteer = require("puppeteer");

const url =
  "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const allResults = await page.evaluate(() => {
    const rows = document.querySelectorAll(
      "body > table:nth-child(7) > tbody > tr"
    );

    return Array.from(rows).map(row => {
      const cells = row.querySelectorAll("td");

      const candidateNo = cells[0].innerText.trim();
      const points = cells[2].innerText.trim();
      const division = cells[3].innerText.trim();
      const subjects = cells[4].innerText
        .trim()
        .split("' ")
        .map(item => {
          const [subject, grade] = item.split(" - '");
          return { subject, grade };
        });

      return { examNumber: candidateNo, points, division, subjects: subjects };
      // return { examNumber.: candidateNo, points, division };
    });
  });

  console.log(allResults);
};

main();
