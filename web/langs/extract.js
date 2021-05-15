const { extract } = require("@formatjs/cli");
const glob = require("fast-glob");
const PO = require("pofile");
const { writeFile } = require("fs/promises");
const { parse } = require("path");

const FILE = "**/*.{ts,tsx}";
const IGNORE = ["node_modules/**/*", ".next/**/*", "*.d.ts"];

(async () => {
  const files = await glob(FILE, { ignore: IGNORE });
  const extracted = JSON.parse(
    await extract(files, {
      extractSourceLocation: true,
      idInterpolationPattern: (path) => {
        const { ext } = parse(path);
        path = path.substr(0, path.length - ext.length).replace(/\//g, ".");

        return `${path}.[sha512:contenthash:hex:6]`;
      },
    })
  );

  const po = new PO();

  for (const [id, info] of Object.entries(extracted)) {
    const item = new PO.Item();
    item.msgid = info.defaultMessage;
    item.msgctxt = id;
    item.references = [`${info.file}:${info.line}`];

    if (info.description) {
      item.extractedComments = [info.description];
    }

    po.items.push(item);
  }

  await writeFile("langs/en-US.pot", po.toString());
})();
