---
to: packages/<%= h.changeCase.paramCase(name) %>/package.json
---
{
  "name": "<%= h.changeCase.paramCase(name) %>",
  "version": "0.0.0",
  "description": "<% if(locals.description) { locals.description  } -%>",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest",
    "coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "@types/jest": "^27.5.0",
    "config": "workspace:*",
    "eslint": "7.32.0",
    "jest": "^28.0.3",
    "ts-jest": "^27.1.4",
    "tsconfig": "workspace:*",
    "@types/node": "^17.0.12",
    "typescript": "^4.5.3"
  }
}