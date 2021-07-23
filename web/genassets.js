const { readdir, rename, writeFile, unlink } = require("fs/promises");
const path = require("path");
const exec = require("await-exec");

(async () => {
  const assetPath = "assets/game";
  const assetRenamePrefix = /^(Weapon|Item|UI|Icon)_/;

  // rename assets
  for (const file of await readdir(assetPath)) {
    if (file.match(assetRenamePrefix)) {
      await rename(
        path.join(assetPath, file),
        path.join(assetPath, file.replace(assetRenamePrefix, "").replace(/_/g, " "))
      );
    }
  }

  // convert webp to png
  for (const file of await readdir(assetPath)) {
    if (!file.startsWith(".") && file.endsWith(".webp")) {
      await exec(`dwebp "${path.join(assetPath, file)}" -o "${path.join(assetPath, path.parse(file).name + ".png")}"`);
      await unlink(path.join(assetPath, file));
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
${names.map((name, i) => `    case "${path.parse(files[i]).name}": return ${name}.src;`).join("\n")}
  }
}
`
  );
})();
