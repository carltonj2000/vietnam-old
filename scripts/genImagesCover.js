const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const md5 = require("md5");

const baseDir = "./src/images";
const ymlDir = "./data";

try {
  const yml = path.join(ymlDir, "cover-picturesIn.yml");
  if (!fs.existsSync(yml)) return console.log("Cover page generation skipped.");
  const docs = yaml.safeLoad(fs.readFileSync(yml, "utf8"));

  const imports = [];
  const exports = ["\n\nexport default ["];
  docs.forEach(file => {
    const { dir, filename, description } = file;
    if (fs.statSync(path.join(baseDir, dir, filename)).isDirectory())
      return console.log(`${dir}/${file} not found. Skipping`);
    const md = "md_" + md5(file.filename);
    imports.push(`import ${md} from "./images/${dir}/${file.filename}";`);
    exports.push(`  {`);
    Object.keys(file).map(k => exports.push(`    ${k}: "${file[k]}",`));
    exports.push(`    img : ${md},`);
    exports.push(`  },`);
  });
  const out = imports.join("\n") + exports.join("\n") + "\n]\n";
  fs.writeFileSync(`./src/img_cover_pics.js`, out);
} catch (e) {
  console.log(e);
}
