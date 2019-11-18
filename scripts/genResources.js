const yaml = require("js-yaml");
const fs = require("fs");
const md5 = require("md5");

let doc;

const main = () => {
  doc = yaml.safeLoad(fs.readFileSync("./data/tripdata.yml", "utf8"));
};

try {
  main();
  fs.writeFileSync("./src/tripdata.json", JSON.stringify(doc, null, 2));
  const imports = [];
  const importedAlready = new Set();
  const exports = ["\n\nexport default {"];
  doc.locations.forEach(location => {
    const { link } = location.details;
    if (!link) return;
    const md = "md_" + md5(link);
    if (importedAlready.has(md)) return;
    importedAlready.add(md);
    imports.push(`import ${md} from "./resources/${link}";`);
    exports.push(`  "${link}": ${md},`);
  });
  const out = imports.join("\n") + exports.join("\n") + "\n}\n";
  fs.writeFileSync("./src/tripdata.js", out);
} catch (e) {
  console.log(e);
}
