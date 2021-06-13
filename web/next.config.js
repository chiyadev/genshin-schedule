// next.config.js
const withImages = require("next-images");

module.exports = withImages({
  future: {
    webpack5: true,
  },
  experimental: {
    scrollRestoration: true,
  },
});
