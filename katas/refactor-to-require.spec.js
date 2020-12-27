import { piped, replace } from 'rambdax'
import {outputFile} from 'fs-extra'
function refactorToRequire(input){
  return input.split('\n')
  .map(line => {
    if(!line.startsWith('import'))return line

    const newLine /*?*/ = piped(
      line,
      replace('import ', 'const '),
      replace('} from', '} = require('),
    )
      
    return `${newLine})`
  })
  .join('\n')
}

const testInput = `
import { outputJson } from 'fs-extra'
import { playwrightInit } from 'playwright-init'
import { wrap } from 'playwright-wrap'
import { delay, mapAsync } from 'rambdax'

import { getRepoData } from './get-repo-data'
import { sortResult } from './sort-result'
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