const fs = require("fs");

async function getResults() {
  const url =
    "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";

  try {
    const response = await fetch(url);
    let html = await response.text();

    const tableRegex = /<TABLE[^>]*>(.*?)<\/TABLE>/gis;
    const tables = [];
    let match;
    while ((match = tableRegex.exec(html)) !== null) {
      tables.push(match[0]);
    }

    const targetTable = tables[2];

    const rowRegex = /<TR[^>]*>(.*?)<\/TR>/gis;
    let rows = [];
    while ((match = rowRegex.exec(targetTable)) !== null) {
      rows.push(match[0]);
    }

    rows.shift();

    const results = rows.map(row => {
      const cellRegex = /<TD[^>]*>(.*?)<\/TD>/gis;
      let cells = [];
      while ((match = cellRegex.exec(row)) !== null) {
        const cellContent = match[1].replace(/<\/?[^>]+(>|$)/g, "");
        cells.push(cellContent);
      }

      const examNumber = cells[0];
      const points = cells[2];
      const division = cells[3];
      const subjects = cells[4].split("' ").map(value => {
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

    console.log(JSON.stringify(results, null, 2));

    await page.close();
    await browser.close();

    return;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getResults();
