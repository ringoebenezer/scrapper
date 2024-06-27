async function getResults() {
  const url =
    "https://matokeo.necta.go.tz/results/2023/csee/CSEE2023/results/s4459.htm";

  try {
    // Fetching the HTML content of the web page
    const response = await fetch(url);
    const htmlText = await response.text();

    // Parsing the HTML text into a document object
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlText, "text/html");

    // Selecting the results table
    const resultsTable = htmlDoc.querySelector(
      "body > table:nth-child(7) > tbody"
    );

    // Extracting all rows from the results table except the header row
    const rows = resultsTable.querySelectorAll("tr:not(:first-child)");

    const results = Array.from(rows).map(row => {
      // Extracting all td elements (cells) from the current row
      const cells = row.querySelectorAll("td");

      // Extracting and cleaning required data from the cells
      const examNumber = cells[0].innerText.trim();
      const points = cells[2].innerText.trim();
      const division = cells[3].innerText.trim();
      const subjects = cells[4].innerText
        .trim()
        .split("' ")
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

    return results;
  } catch (error) {
    return error;
  }
}

getResults().then(results => {
  console.log(results);
});
