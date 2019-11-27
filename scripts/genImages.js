const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");
const md5 = require("md5");

const baseDir = "./src/images";
const ymlDir = "./data";

/** order the rndf array according to the order provided in the ordf array */
/** and merge content */
const orderFiles = (rndfIn, ordf) => {
  const rndf = rndfIn.map(filename => ({ filename }));
  if (!ordf || ordf.length === 0) return rndf;

  const ord_match = [];
  ordf.forEach(ord => {
    rndf.forEach(rnd => {
      if (ord.filename === rnd.filename) {
        ord_match.push(ord);
      }
    });
  });

  const remainder = rndf.filter(
    r => ord_match.filter(o => o.filename === r.filename).length === 0
  );
  return [...ord_match, ...remainder];
};
const processDir = dir => {
  console.log("dir", dir);
  const ymlIn = path.join(ymlDir, dir + "In.yml");
  const ymlOut = path.join(ymlDir, dir + ".yml");
  const docs = fs.existsSync(ymlIn)
    ? yaml.safeLoad(fs.readFileSync(ymlIn, "utf8"))
    : [];

  const subDir = path.join(baseDir, dir);
  const filesIn = fs.readdirSync(subDir);

  const files = orderFiles(filesIn, docs);

  const imports = [];
  const exports = ["\n\nexport default ["];
  files.forEach(file => {
    if (!file.filename.match(/.(jpg|jpeg|png)$/i)) return;
    if (fs.statSync(path.join(subDir, file.filename)).isDirectory()) return;
    const md = "md_" + md5(file.filename);
    imports.push(`import ${md} from "./images/${dir}/${file.filename}";`);
    exports.push(`  {`);
    Object.keys(file).map(k =>
      k === "active"
        ? exports.push(`    ${k}: ${file[k]},`)
        : exports.push(`    ${k}: "${file[k]}",`)
    );
    exports.push(`    img : ${md},`);
    exports.push(`  },`);
  });
  const out = imports.join("\n") + exports.join("\n") + "\n]\n";
  fs.writeFileSync(`./src/img_${dir}.js`, out);
  fs.writeFileSync(ymlOut, yaml.safeDump(files));
};

try {
  const files = fs.readdirSync(baseDir);
  files.forEach(file => {
    if (fs.statSync(path.join(baseDir, file)).isDirectory()) processDir(file);
  });
} catch (e) {
  console.log(e);
}
