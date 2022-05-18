import { readFileSync } from "fs"

export const markdownString = readFileSync(`${process.cwd()}/__test__/markdownTest.md`)



// export const markdownString = 
// `---
// title: Hello World
// foo: bar
// ---
// # This is an Example

// Some text lives here

// ---
// title: Section 1
// ---
// ## The First

// hello world. It's me, the tester.

// ---
// title: Section 2
// extra: 
//   - fun
//   - array
//   - in
//   - yaml
// ---
// ## Second Section

// A whole new world, but not that new

// ---
// title: Itsa Me Section 3
// mario: luigi
// castle:
//   has_peach: false
//   difficulty: 4
// ---

// ## Bowser

// We all know the story.
// `