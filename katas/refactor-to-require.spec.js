import { piped, remove, replace, trim } from 'rambdax'
import {outputFile} from 'fs-extra'
function refactorToRequire(input){
  return input.split('\n')
  .map(line => {
    if(!line.startsWith('import'))return line

    const newLine /*?*/ = piped(
      line,
      trim,
      remove(';'),
      replace('import ', 'const '),
      replace('from ', ' = require('),
    )
      
    return `${newLine})`
  })
  .join('\n')
}

const testInput = `
import dayjs from 'dayjs'
import { path } from 'rambdax'
`.trim()

test('happy',async () => {
  const result = refactorToRequire(testInput)
  console.log({__filename})
  /*
    Big issue with Wallaby and __dirname __filename process.cwd()
  */
  await outputFile(
    `/home/deyan/repos/code-signal/katas/refactor-to-require.txt`,
    result
  )
})