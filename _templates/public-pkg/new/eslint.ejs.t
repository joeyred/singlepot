---
to: packages/<%= h.changeCase.paramCase(name) %>/.eslintrc.js
---

const base = require("config/eslint.pkg.js");

module.exports = {
  ...base
};