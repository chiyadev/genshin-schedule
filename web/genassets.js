const fs = require("fs");
const path = require("path");
const util = require("util");

const readdir = util.promisify(fs.readdir);
const rename = util.promisify(fs.rename);
const writeFile = util.promisify(fs.writeFile);

(async () => {
  const assetPath = "assets/game";
  const assetRenamePrefix = /^(Weapon|Item)_/;

  // rename assets
  for (const file of await readdir(assetPath)) {
    if (file.match(assetRenamePrefix)) {
      await rename(
        path.join(assetPath, file),
        path.join(assetPath, file.replace(assetRenamePrefix, "").replace(/_/g, " "))
      );
    }
  }

  const files = await readdir(assetPath);
  const names = files.map((file) => path.parse(file).name.replace(/\s|-|'|\(|\)/g, ""));

  // generate assets file
  await writeFile(
    "assets/index.ts",
    `// This file was generated using \`yarn genassets\`.
${names.map((name, i) => `import ${name} from "./game/${files[i]}";`).join("\n")}

export {
${names.map((name) => `  ${name},`).join("\n")}
};

export function getAssetByName(name: string): string | undefined {
  switch (name) {
${names.map((name, i) => `    case "${path.parse(files[i]).name}": return ${name};`).join("\n")}
  }
}
`
  );
})();
