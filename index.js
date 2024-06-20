const joshW = require("./joshw");
const overReacted = require("./overreacted.js");
const swizec = require("./swizec.js");

const main = async () => {
  await joshW();
  await overReacted();
  await swizec();
};

main();
