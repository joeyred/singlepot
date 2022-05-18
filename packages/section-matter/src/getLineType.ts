export interface LineTypeState {
  /** 
   * Only updates when a line contains a delimiter. 
   * True when an opening delim, or the line contains matter 
   */
  delimOpen: boolean
  /** 
   * true when the current line is FrontMatter
   * 
   * As FrontMatter is at the top of a file, it defaults to true. 
   */
  isFrontmatter: boolean
  isMatter: boolean
  isSection: boolean
}

export interface LineTypeReturn {
  type: string
  typeState: LineTypeState
}

const DEFAULTS = {
  delim: '---'
}

const options = {}; // Temp options object
// options should be done via an exportable function.
const { delim } = Object.assign({}, DEFAULTS, options)

export const LINETYPES = {
  open:        `OPEN-DELIM`,
  // openSection: `OPEN-SECTION-DELIM`,
  openFront:   `OPEN-DELIM-FRONT`,
  closeFront:  `CLOSE-DELIM-FRONT`,
  close:       `CLOSE-DELIM`,
  front:       `FRONTMATTER-DATA`,
  data:        `MATTER-DATA`,
  content:     `CONTENT`,
  secContent:  `SECTION-CONTENT`
}


// let delimOpen = false
// let isFrontmatter = true
// let isMatter = false
// let isSection = false

// Add Types:
// Sub-sections
// - sub-section open
// - sub-section content
// TODO Detect Snippets of code via code blocks
// - Should this be opt-in/out, or default?
//   The issue being, 


export function getLineType(line: string, {
  delimOpen = false,
  isFrontmatter = true,
  isMatter = false,
  isSection = false
}: LineTypeState): LineTypeReturn {
  let type = 'Error: No Type Found'
  // check if the line is a delim
  // NOTE `trim()` is for accidental whitespace
  if (line.trim() === delim) {

    // Check if an opening delimiter
    delimOpen = delimOpen === false ? true : false

    // TOO FANCY???
    // if (delimOpen && !isMatter) type = isFrontmatter ? LINETYPES.openFront : LINETYPES.open

    // Is Open Delim
    if (delimOpen && !isMatter) type = LINETYPES.open
      
    // Is First Open Delimn aka Frontmatter Delim
    if (delimOpen && !isMatter && isFrontmatter) type = LINETYPES.openFront

    // If this is an opening delimiter, then update `isMatter` to true for the next line
    if (delimOpen) isMatter = true
    if (!delimOpen) isMatter = false

    // if an opening delim, and not the first in the file, then it's a section.
    if (delimOpen && !isFrontmatter) isSection = true

    if (!delimOpen && !isMatter) type = LINETYPES.close

    if (!delimOpen && !isMatter && isFrontmatter) {
      type = LINETYPES.closeFront
      isFrontmatter = false
    }
  // Line is not a delim, so check for content or matter data
  } else {
    // if (isMatter) type = LINETYPES.data
    // if (isFrontmatter) type = LINETYPES.front
    if (isMatter) {
      if (isFrontmatter) {
        // Is FrontMatter Data
        type = LINETYPES.front
      } else {
        // Is SectionMatter Data
        type = LINETYPES.data
      }
    } else {
      // type = isSection ? LINETYPES.secContent : LINETYPES.content

      // Is Content
      if (!isSection) type = LINETYPES.content
      if (isSection) type = LINETYPES.secContent
    }
  }
  
  // console.log(type, line)
  return {
    type, 
    typeState: {
      delimOpen,
      isFrontmatter,
      isMatter,
      isSection
    }
  }
}