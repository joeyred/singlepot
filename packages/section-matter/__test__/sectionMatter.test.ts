import { expect, describe, it } from 'vitest'
import { sectionMatter } from '../src'
import { markdownString } from './markdownString'

describe('sectionMatter', () => {
  it('returns an object with data, content, and sections', () => {
    const data = {
      data: {
        title: 'Hello World',
        foo: 'bar',
      },
      content:
        '\n' +
        '# This is an Example\n' +
        '\n' +
        'Some text lives here\n' +
        '\n'
      ,
      sections: [
        {
          data: {
            title: 'Section 1'
          },
          content:
            '\n' +
            '## The First\n' +
            '\n' +
            'hello world. It\'s me, the tester.\n' +
            '\n'
        },
        {
          data: {
            title: 'Section 2',
            extra: [
              'fun',
              'array',
              'in',
              'yaml'
            ]        
          },
          content:
              '\n' +
              '## Second Section\n' +
              '\n' +
              'A whole new world, but not that new\n' +
              '\n' 
        },
        {
          data: {
            title: 'Itsa Me Section 3',
            mario: 'luigi',
            castle: {
              haspeach: false,
              difficulty: 4
            }
          },
          content:
            '\n' +
            '## Bowser\n' +
            '\n' +
            'We all know the story.\n'
        }
      ]
    }

    // console.log('====================')
    // console.log(markdownString.toString().split('\n'))
    // console.log('==================== TEST DATA ====')
    // console.log(data)
    // console.log('==================== RESULT DATA ====')
    // console.log(sectionMatterNew(markdownString.toString()))
    expect(sectionMatter(markdownString.toString())).to.deep.equal(data)
  })
})
