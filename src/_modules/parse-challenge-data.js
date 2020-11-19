import {
  filter,
  head,
  last,
  map,
  piped,
  remove,
  sort,
  split,
  trim,
} from 'rambdax'

const EXPECTED_OUTPUT = 'Expected Output:'
const EXPECTED_OUTPUT_END = 'Click the '
const FUNCTION = 'function '

function whenNext(testInput, next, rawText){
  const sk = piped(
    rawText,
    split(next),
    head,
    split(`${ testInput }:`),
    last,
    trim
  )

  return sk
}

function whenLast(testInput, rawText){
  const sk = piped(
    rawText,
    split(EXPECTED_OUTPUT),
    head,
    split(`${ testInput }:`),
    last,
    trim
  )

  return sk
}

function parseTestCase(testCase, testInputs){
  const sortedTestInputs = sort((x, y) => {
    const xPosition = testCase.rawText.indexOf(x)
    const yPosition = testCase.rawText.indexOf(y)

    return xPosition < yPosition ? -1 : 1
  }, testInputs)
  const hash = {}

  sortedTestInputs.forEach((x, i) => {
    const next = sortedTestInputs[ i + 1 ]
    if (!next){
      return hash[ x ] = whenLast(x, testCase.rawText)
    }

    hash[ x ] = whenNext(x, next, testCase.rawText)
  })
  const expected = piped(
    testCase.rawText,
    split(EXPECTED_OUTPUT_END),
    head,
    split(EXPECTED_OUTPUT),
    last,
    trim
  )

  return {expected, testInputs: hash}
}

export function parseChallengeData(challengeData){
  const functionName = piped(
    challengeData.replContent,
    split('('),
    head,
    remove(FUNCTION),
    trim
  )
  const testInputs = piped(
    challengeData.replContent,
    split('('),
    last,
    split(')'),
    head,
    split(','),
    map(trim)
  )
  if (testInputs.length === 0) throw new Error('testInputs.length')

  const testCases = piped(
    challengeData.testCases,
    filter(x => !x.rawText.endsWith('Hidden')),
    map(x => parseTestCase(x, testInputs))
  )

  return {testCases, functionName}
}