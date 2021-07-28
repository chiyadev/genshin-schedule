const glob = require("fast-glob");
const path = require("path");
const PO = require("pofile");
const { readFile, writeFile } = require("fs/promises");

const FILE = "langs/*.{po,pot}";
const IGNORE = [];

(async () => {
  const files = await glob(FILE, { ignore: IGNORE });

  for (file of files) {
    const data = await readFile(file, "utf-8");
    const po = PO.parse(data);
    const map = new Map();

    for (const item of po.items) {
      if (item.flags.fuzzy === true) continue;
      if (!item.msgstr[0] && !file.endsWith(".pot")) continue;

      let id = item.msgctxt;

      if (id.startsWith("db.")) {
        id = item.msgid;
      }

      map.set(id, item.msgstr[0] || item.msgid);
    }

    await writeFile(`langs/${path.parse(file).name}.json`, JSON.stringify(Object.fromEntries(map), null, 2));
  }
})();
