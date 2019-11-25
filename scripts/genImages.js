const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const md5 = require("md5");

const baseDir = "./src/images";
const ymlDir = "./";

const processDir = dir => {
  console.log("dir", dir);
  const ymlName = dir + ".yml";
  const yml = path.join(ymlDir, ymlName);
  //  const doc = fs.exists(yml) ? yaml.safeLoad(fs.readFileSync(yml, "utf8")) : [];

  const subDir = path.join(baseDir, dir);
  const files = fs.readdirSync(subDir);

  const imports = [];
  const importedAlready = new Set();
  const exports = ["\n\nexport default {"];
  files.forEach(file => {
    if (!file.match(/.(jpg|jpeg|png)$/i)) return;
    if (fs.statSync(path.join(subDir, file)).isDirectory()) return;
    const md = "md_" + md5(file);
    if (importedAlready.has(md)) return;
    importedAlready.add(md);
    imports.push(`import ${md} from "./images/${dir}/${file}";`);
    exports.push(`  "${file}": ${md},`);
  });
  const out = imports.join("\n") + exports.join("\n") + "\n}\n";
  fs.writeFileSync(`./src/img_${dir}.js`, out);
  /*
  fs.writeFileSync("./src/tripdata.json", JSON.stringify(doc, null, 2));
  */
};

try {
  const files = fs.readdirSync(baseDir);
  files.forEach(file => {
    if (fs.statSync(path.join(baseDir, file)).isDirectory()) processDir(file);
  });
} catch (e) {
  console.log(e);
}
