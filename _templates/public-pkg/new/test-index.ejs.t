---
to: packages/<%= h.changeCase.paramCase(name) %>/__test__/index.ts
---
import { helloWorld } from '../' 

describe('<%= name %> ', () => {
  it('runs test', () => {
    expect(helloWorld('hello')).toBe('hello')
  })
})