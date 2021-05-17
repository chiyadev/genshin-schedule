const { idInterpolationPattern } = require("./langs/extract");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "formatjs",
      {
        idInterpolationPattern,
      },
    ],
  ],
};
