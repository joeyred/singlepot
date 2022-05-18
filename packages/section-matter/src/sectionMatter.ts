import { getLineType, LINETYPES, LineTypeState, LineTypeReturn } from './getLineType'
import * as yaml from 'js-yaml'

// TODO write typings for section matter output object.
interface Matter {
  [key: string]: any
}

interface Section {
  // Keeps compatability with js-yaml typings.
  data: unknown
  content: string
}

type ContentNode = {
  // Get from filename
  name: string,
  data: {},
  sections: Section[],
  content: string 
}

type DataFromFile = {
  data: Matter | unknown,
  content: string,
  sections: Section[]
}

type SectionPreParsed = {
  isFirst?: boolean,
  matter: string[],
  content: string[]
}

const getLines = (fileContents: string): string[] => {
  return fileContents.split(/\r?\n/)
}

/**
 * 
 * @param fileContents The extracted file contents as a string
 * @returns 
 */
// export const sectionMatter = (fileContents: string) => {
//   const lines = getLines(fileContents)
//   // console.log(lines)
//   let line = ''
//   let lineType = ''
//   // This makes typescript happy... gross
//   let getLineTypeOutput: LineTypeReturn = {
//     type: '',
//     typeState: {
//       delimOpen: false,
//       isFrontmatter: true,
//       isMatter: false,
//       isSection: false
//     }
//   }
//   const frontmatter: string[] = []
//   const sections: Section[] = []
//   const content: string[] = []

//   const section: SectionPreParsed = {
//     // TODO Remove this
//     isFirst: true,
//     matter: [],
//     content: []
//   }

//   let delimOpen = false
//   let isFrontmatter = true
//   let isMatter = false
//   let isSection = false

//   const initSection = (): void => {
//     section.matter = []
//     section.content = []
//   }
  
//   const buildOutput = (): DataFromFile => {
//     // const frontmatterString = frontmatter.join('\n')
//     return {
//       data: yaml.load(frontmatter.join('\n')),
//       content: content.join('\n'),
//       sections,
//     }
//   }

//   for (let i = 0; i < lines.length; i += 1) {
//     line = lines[i]
//     // This needs to return the passed type state values.
//     // That way we can assign the function scoped variables on
//     // each run.
//     getLineTypeOutput = getLineType(
//       line, {
//       delimOpen,
//       isFrontmatter,
//       isMatter,
//       isSection
//     })
 
//     lineType = getLineTypeOutput.type
//     delimOpen = getLineTypeOutput.typeState.delimOpen
//     isFrontmatter = getLineTypeOutput.typeState.isFrontmatter
//     isMatter = getLineTypeOutput.typeState.isMatter
//     isSection = getLineTypeOutput.typeState.isSection




//     if (lineType === LINETYPES.front) frontmatter.push(line)
//     if (lineType === LINETYPES.content) content.push(line)

//     // FIXME Why is `open being used to determine closed states?? was this an early attempt at 
//     // detecting front-matter before the `OPEN-FRONT-MATTER` type was implimented??
//     if (lineType === LINETYPES.open) {
//       // Check for the first delim, which means we're working with frontmatter
//       // if (section.isFirst) {
//       //   // TODO This should be handled by the file line type parser
//       //   //      instead of having to check if the delim is the first one,
//       //   //      we should instead be able to check for the 
//       //   //      `OPEN-DELIM-FRONT` type.
//       //   section.isFirst = false
//     } else {
//       console.log('=SM=SM=SM=SM===========')
//       console.log(section.matter)
//       sections.push({
//         data: yaml.load(section.matter.join('\n')),
//         content: section.content.join('\n')
//       })
//       initSection()
//     }
//     if (lineType === LINETYPES.data) section.matter.push(line)
//     if (lineType === LINETYPES.secContent) section.content.push(line)
//   }
//     // getLineType(line)
//   console.log('SECTION MATTER START')
//   console.log(buildOutput())
//   return buildOutput()
// }

//
//

// ====================== // ====================== // ====================== //
// ====================== // ====================== // ====================== //
// ====================== // ====================== // ====================== //
// ====================== // ====================== // ====================== //
// ====================== // ====================== // ====================== //
// ====================== // ====================== // ====================== //

//
//

export const sectionMatter = (fileContents: string) => {
  const lines = getLines(fileContents)
  // console.log(lines)
  let line = ''
  let lineType = ''
  let secMatterString = ''
  let frontMatterString = ''
  // This makes typescript happy... gross
  let getLineTypeOutput: LineTypeReturn = {
    type: '',
    typeState: {
      delimOpen: false,
      isFrontmatter: true,
      isMatter: false,
      isSection: false
    }
  }
  const sections: Section[] = []

  let content = ''

  let delimOpen = false
  let isFrontmatter = true
  let isMatter = false
  let isSection = false

  for (let i = 0; i < lines.length; i += 1) {
    line = lines[i]
    // This needs to return the passed type state values.
    // That way we can assign the function scoped variables on
    // each run.
    getLineTypeOutput = getLineType(
      line, {
      delimOpen,
      isFrontmatter,
      isMatter,
      isSection
    })

    // console.log(
    //   delimOpen,
    //   isFrontmatter,
    //   isMatter,
    //   isSection
    // )

    lineType = getLineTypeOutput.type
    delimOpen = getLineTypeOutput.typeState.delimOpen
    isFrontmatter = getLineTypeOutput.typeState.isFrontmatter
    isMatter = getLineTypeOutput.typeState.isMatter
    isSection = getLineTypeOutput.typeState.isSection

    if (lineType === LINETYPES.front) frontMatterString += `${line}\n`
    // if (lineType === LINETYPES.closeFront) frontMatter =

    if (lineType === LINETYPES.content) content += `${line}\n`

    if (lineType === LINETYPES.open) {
      sections.push({
        data: {},
        content: ''
      })
    }
    if (lineType === LINETYPES.data) secMatterString += `${line}\n`

    if (lineType === LINETYPES.close) {
      sections[sections.length - 1].data = yaml.load(secMatterString)
      secMatterString = ''
    }

    if (lineType === LINETYPES.secContent) sections[sections.length - 1].content += `${line}\n`
    
  }

  return {
    data: yaml.load(frontMatterString),
    content,
    sections
  }
}

// NOTE
// The major problem is that we are checking for the NEXT `open` to finish up the 
// section and dump it to data. This is meant to capture both section content and data. 
// HOWEVER, the final section has no following open delim. Thus, the final section 
//will never be pushed. So push as we go? This makes sense, considering they types 
// are more specific.
//
// the only thing to really leave in the old solution is `initSection()`. This can happen 
// on each OPEN-DELIM. This way all data is pushed, and the only thing never done are the 
// final OPEN-DELIM is a clearing of the `section` object, which is a temporary holder anyway.

// Should i ditch a section placeholder and go by grabbing the current section via 
// `sections.length - 1` and update line by line???