const glob = require("fast-glob");
const path = require("path");
const PO = require("pofile");
const { readFile, writeFile } = require("fs/promises");

const FILE = "langs/*.po";
const IGNORE = [];
const SKIP_FUZZY = true;
const SKIP_EMPTY = true;

(async () => {
  const files = await glob(FILE, { ignore: IGNORE });

  for (file of files) {
    const data = await readFile(file, "utf-8");
    const po = PO.parse(data);
    const map = new Map();

    for (const item of po.items) {
      if (SKIP_FUZZY && item.flags.fuzzy === true) continue;
      if (SKIP_EMPTY && (item.msgstr.length === 0 || !item.msgstr[0])) continue;

      map.set(item.msgctxt, item.msgstr[0]);
    }

    await writeFile(`langs/${path.parse(file).name}.json`, JSON.stringify(Object.fromEntries(map), null, 2));
  }
})();
