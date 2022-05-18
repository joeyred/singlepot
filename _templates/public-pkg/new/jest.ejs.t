---
to: packages/<%= h.changeCase.paramCase(name) %>/jest.config.js
---
const base = require('config/jest.base.js')

module.exports = {
  ...base
};