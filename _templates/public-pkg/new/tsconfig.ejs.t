---
to: packages/<%= h.changeCase.paramCase(name) %>/tsconfig.json
---
{
  "extends": "tsconfig/pkg.json",
  "exclude": ["node_modules"]
}