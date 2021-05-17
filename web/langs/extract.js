const { extract } = require("@formatjs/cli");
const glob = require("fast-glob");
const PO = require("pofile");
const { writeFile } = require("fs/promises");
const { parse, relative } = require("path");

const FILE = "**/*.{ts,tsx}";
const IGNORE = ["node_modules/**/*", ".next/**/*", "*.d.ts"];

function idInterpolationPattern(path) {
  const { ext } = parse(path);

  if (path.startsWith(process.cwd())) {
    path = relative(process.cwd(), path);
  }

  path = path.substr(0, path.length - ext.length).replace(/\//g, ".");

  return `${path}.[sha512:contenthash:hex:6]`;
}

(async () => {
  const files = await glob(FILE, { ignore: IGNORE });
  const extracted = JSON.parse(
    await extract(files, {
      extractSourceLocation: true,
      additionalFunctionNames: ["registerMessage"],
      idInterpolationPattern,
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

  await writeFile("langs/en_US.pot", po.toString());
})();

module.exports = {
  idInterpolationPattern,
};
