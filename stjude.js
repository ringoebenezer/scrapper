async function getResults() {
  const url =
    "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";

  try {
    // Fetching the html content of the web page
    const response = await fetch(url);
    let html = await response.text();

    const tableRegex = /<table[^>]*>(.*?)<\/table>/gis; // Regex to match all table elements
    const tables = [];
    let match;

    // Extracting all tables from the html content of the web page
    while ((match = tableRegex.exec(html)) !== null) {
      tables.push(match[0]);
    }

    const resultsTable = tables[2];

    const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gis; // Regex to match all tr elements (rows) within the table (resultsTable)
    let rows = [];

    // Extracting all tr elements (rows) from the resultsTable
    while ((match = rowRegex.exec(resultsTable)) !== null) {
      rows.push(match[0]);
    }

    rows.shift(); // Removes the first row (header row)

    const results = rows.map(row => {
      const cellRegex = /<td[^>]*>(.*?)<\/td>/gis; // Regex to match all td elements (cells) within the row
      let cells = [];

      // Extracting all td elements (cells) from the currrent row
      while ((match = cellRegex.exec(row)) !== null) {
        const cellContent = match[1].replace(/<\/?[^>]+(>|$)/g, ""); // Removes html tags from cell content
        cells.push(cellContent);
      }

      // Extracting and cleaning required data from the cells.
      const examNumber = cells[0].replace("\r\n", "").trim();
      const points = cells[2].replace("\r\n", "").trim();
      const division = cells[3].replace("\r\n", "").trim();
      const subjects = cells[4]
        .split("' ")
        .filter(value => value.trim())
        .map(value => {
          let [subject, grade] = value.split(" - '");

          subject = `${subject}`.replace("\r\n", "").trim();
          grade = `${grade}`.replace("\r\n", "").trim();

          return { subject, grade };
        });

      return {
        examNumber,
        points,
        division,
        subjects,
      };
    });

    console.log(results);

    return results;
  } catch (error) {
    console.error("Ooops, error fetching data:", error);
  }
}

module.exports = getResults;
