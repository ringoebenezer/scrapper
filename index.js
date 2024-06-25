const getResults = require("./stjude.js");
const joshW = require("./joshw");
const swizec = require("./swizec.js");
const overReacted = require("./overreacted.js");

async function main() {
  await getResults();
  await joshW();
  await swizec();
  await overReacted();
}

main();
