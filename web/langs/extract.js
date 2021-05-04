const { extract } = require("@formatjs/cli");
const glob = require("fast-glob");
const PO = require("pofile");
const { writeFile } = require('fs/promises');

const FILE = "**/*.{ts,tsx}";
const IGNORE = ["node_modules/**/*", ".next/**/*", "*.d.ts"];
const PATTERN = "[sha512:contenthash:base64:6]";

(async () => {
  const files = await glob(FILE, { ignore: IGNORE });
  const extracted = JSON.parse(await extract(files, { extractSourceLocation: true, idInterpolationPattern: PATTERN }));

  const po = new PO();
  for (const [id, info] of Object.entries(extracted)) {
    const item = new PO.Item();
    item.msgid = info.defaultMessage;
    item.msgctxt = id;
    item.references = [`${info.file}:${info.line}`];
    if (info.description)
      item.extractedComments = [info.description];
    po.items.push(item);
  }

  for (const [id, string] of Object.entries(require("./static.json"))) {
    const item = new PO.Item();
    item.msgid = string;
    item.msgctxt = id;
    po.items.push(item);
  }

  await writeFile("langs/en-US.pot", po.toString());
})();
