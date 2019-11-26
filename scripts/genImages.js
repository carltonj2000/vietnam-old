const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const md5 = require("md5");

const baseDir = "./src/images";
const ymlDir = "./data";

const processDir = dir => {
  console.log("dir", dir);
  const ymlNameIn = dir + "In.yml";
  const ymlIn = path.join(ymlDir, ymlNameIn);
  const ymlNameOut = dir + ".yml";
  const ymlOut = path.join(ymlDir, ymlNameOut);
  const docs = fs.existsSync(ymlIn)
    ? yaml.safeLoad(fs.readFileSync(ymlIn, "utf8"))
    : [];

  const subDir = path.join(baseDir, dir);
  const files = fs.readdirSync(subDir);

  const imports = [];
  const exports = ["\n\nexport default ["];
  files.forEach(file => {
    if (!file.match(/.(jpg|jpeg|png)$/i)) return;
    if (fs.statSync(path.join(subDir, file)).isDirectory()) return;
    const md = "md_" + md5(file);
    const matchedFiles = docs.filter(doc => doc.filename === file);
    const matches = matchedFiles.length;
    let keys;
    if (matches === 0) docs.push({ filename: file });
    else keys = Object.keys(matchedFiles[0]).filter(k => k !== "filename");
    imports.push(`import ${md} from "./images/${dir}/${file}";`);
    exports.push(`  {`);
    exports.push(`    filename: "${file}",`);
    exports.push(`    img: ${md},`);
    if (keys) {
      keys.map(k => {
        const mf = matchedFiles[0][k];
        if (typeof mf === "string") exports.push(`    ${k}: "${mf}",`);
        else exports.push(`    ${k}: ${mf},`);
      });
    }
    exports.push(`  },`);
  });
  const out = imports.join("\n") + exports.join("\n") + "\n]\n";
  fs.writeFileSync(`./src/img_${dir}.js`, out);
  fs.writeFileSync(ymlOut, yaml.safeDump(docs));
};

try {
  const files = fs.readdirSync(baseDir);
  files.forEach(file => {
    if (fs.statSync(path.join(baseDir, file)).isDirectory()) processDir(file);
  });
} catch (e) {
  console.log(e);
}
