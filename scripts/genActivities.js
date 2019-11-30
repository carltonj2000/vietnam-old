const yaml = require("js-yaml");
const fs = require("fs");

try {
  const doc = yaml.safeLoad(fs.readFileSync("./data/activities.yml", "utf8"));
  fs.writeFileSync("./src/activities.json", JSON.stringify(doc, null, 2));
} catch (e) {
  console.log(e);
}
