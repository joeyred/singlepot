import { expect, describe, it } from 'vitest'
import { getLineType } from '../src/getLineType'

type TypeBools = [boolean, boolean, boolean, boolean]

const boolFactory = (inputBools: TypeBools, outputBools: TypeBools) => {
  return {
    in: {
      delimOpen: inputBools[0],
      isFrontmatter: inputBools[1],
      isMatter: inputBools[2],
      isSection: inputBools[3]
    },
    out: {
      delimOpen: outputBools[0],
      isFrontmatter: outputBools[1],
      isMatter: outputBools[2],
      isSection: outputBools[3]
    }
  }
}

const lineTypes = {
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

const lines = {
  delim: '---',
  matter: 'key: value',
  content: 'Lorem Foo Bar',
}

const lineTypeBools = {
  open:        boolFactory(
    [false, false, false, false],
    [true, false, true, true]
  ),
  // openSection: `OPEN-SECTION-DELIM`,
  openFront:   boolFactory(
    [false, true, false, false],
    [true, true, true, false]
  ),
  closeFront:  boolFactory(
    [true, true, true, false],
    [false, false, false, false]
  ),
  close:       boolFactory(
    [true, false, true, true],
    [false, false, false, true]
  ),
  front:       boolFactory(
    [true, true, true, false],
    [true, true, true, false]
  ),
  data:        boolFactory(
    [true, false, true, true],
    [true, false, true, true]
  ),
  content:     boolFactory(
    [false, false, false, false],
    [false, false, false, false]
  ),
  secContent:  boolFactory(
    [false, false, false, true],
    [false, false, false, true]
  )
}

describe('OPEN-DELIM-FRONT', () => {
  it('returns OPEN-DELIM-FRONT with no whitespace', () => {
    expect(
      getLineType(lines.delim, lineTypeBools.openFront.in)
    ).to.deep.equal(
      {type: lineTypes.openFront, typeState: lineTypeBools.openFront.out}
    )
  })

  it('returns OPEN-DELIM-FRONT with whitespace', () => {
    // Whitespace after the delimiter
    expect(
      getLineType(`${lines.delim} `, lineTypeBools.openFront.in)
    ).to.deep.equal(
      {type: lineTypes.openFront, typeState: lineTypeBools.openFront.out}
    )
    // Whitespace before the delimiter
    expect(
      getLineType(` ${lines.delim}`, lineTypeBools.openFront.in)
    ).to.deep.equal(
      {type: lineTypes.openFront, typeState: lineTypeBools.openFront.out}
    )
    // Whitespace before and after the delimiter
    expect(
      getLineType(` ${lines.delim} `, lineTypeBools.openFront.in)
    ).to.deep.equal(
      {type: lineTypes.openFront, typeState: lineTypeBools.openFront.out}
    )
  })
})

describe('CLOSE-DELIM-FRONT', () => {
  it('returns OPEN-DELIM-FRONT with no whitespace', () => {
    expect(
      getLineType(lines.delim, lineTypeBools.closeFront.in)
    ).to.deep.equal(
      {type: lineTypes.closeFront, typeState: lineTypeBools.closeFront.out}
    )
  })

  it('returns CLOSE-DELIM-FRONT with whitespace', () => {
    // Whitespace after the delimiter
    expect(
      getLineType(`${lines.delim} `, lineTypeBools.closeFront.in)
    ).to.deep.equal(
      {type: lineTypes.closeFront, typeState: lineTypeBools.closeFront.out}
    )
    // Whitespace before the delimiter
    expect(
      getLineType(` ${lines.delim}`, lineTypeBools.closeFront.in)
    ).to.deep.equal(
      {type: lineTypes.closeFront, typeState: lineTypeBools.closeFront.out}
    )
    // Whitespace before and after the delimiter
    expect(
      getLineType(` ${lines.delim} `, lineTypeBools.closeFront.in)
    ).to.deep.equal(
      {type: lineTypes.closeFront, typeState: lineTypeBools.closeFront.out}
    )
  })
})

describe('OPEN-DELIM', () => {
  it('returns OPEN-DELIM with no whitespace', () => {
    expect(
      getLineType(lines.delim, lineTypeBools.open.in)
    ).to.deep.equal(
      {type: lineTypes.open, typeState: lineTypeBools.open.out}
    )
  })

  it('returns OPEN-DELIM with whitespace', () => {
    // Whitespace after the delimiter
    expect(
      getLineType(`${lines.delim} `, lineTypeBools.open.in)
    ).to.deep.equal(
      {type: lineTypes.open, typeState: lineTypeBools.open.out}
    )
    // Whitespace before the delimiter
    expect(
      getLineType(` ${lines.delim}`, lineTypeBools.open.in)
    ).to.deep.equal(
      {type: lineTypes.open, typeState: lineTypeBools.open.out}
    )
    // Whitespace before and after the delimiter
    expect(
      getLineType(` ${lines.delim} `, lineTypeBools.open.in)
    ).to.deep.equal(
      {type: lineTypes.open, typeState: lineTypeBools.open.out}
    )
  })
})

describe('CLOSE-DELIM', () => {
  it('returns CLOSE-DELIM with no whitespace', () => {
    expect(
      getLineType(lines.delim, lineTypeBools.close.in)
    ).to.deep.equal(
      {type: lineTypes.close, typeState: lineTypeBools.close.out}
    )
  })
  it('returns CLOSE-DELIM with whitespace', () => {
    // Whitespace after the delimiter
    expect(
      getLineType(`${lines.delim} `, lineTypeBools.close.in)
    ).to.deep.equal(
      {type: lineTypes.close, typeState: lineTypeBools.close.out}
    )
    // Whitespace before the delimiter
    expect(
      getLineType(` ${lines.delim}`, lineTypeBools.close.in)
    ).to.deep.equal(
      {type: lineTypes.close, typeState: lineTypeBools.close.out}
    )
    // Whitespace before and after the delimiter
    expect(
      getLineType(` ${lines.delim} `, lineTypeBools.close.in)
    ).to.deep.equal(
      {type: lineTypes.close, typeState: lineTypeBools.close.out}
    )
  })
})

describe('FRONTMATTER-DATA', () => {
  it('returns FRONTMATTER-DATA', () => {
    expect(
      getLineType(lines.matter, lineTypeBools.front.in)
    ).to.deep.equal(
      {type: lineTypes.front, typeState: lineTypeBools.front.out}
    )
  })
})
describe('MATTER-DATA', () => {
  it('returns MATTER-DATA', () => {
    expect(
      getLineType(lines.matter, lineTypeBools.data.in)
    ).to.deep.equal(
      {type: lineTypes.data, typeState: lineTypeBools.data.out}
    )
  })
})
describe('CONTENT', () => {
  it('returns CONTENT', () => {
    expect(
      getLineType(lines.content, lineTypeBools.content.in)
    ).to.deep.equal(
      {type: lineTypes.content, typeState: lineTypeBools.content.out}
    )
  })
})
describe('SECTION-CONTENT', () => {
  it('returns CONTENT', () => {
    expect(
      getLineType(lines.content, lineTypeBools.secContent.in)
    ).to.deep.equal(
      {type: lineTypes.secContent, typeState: lineTypeBools.secContent.out}
    )
  })
})

