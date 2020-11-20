import { writeFile } from "fs-extra"
import { interpolate, join, piped, tail , map, tap } from "rambdax"

function getExpectedDeclaration({expected}){
  return `const expected = ${expected}`
}

function getDeclarations(sortedTestInputs, testCase){
  return piped(
    sortedTestInputs,
    map(x => `    const ${x} = ${testCase.testInputs[x]}`),
    join('\n')    
  )
}

const restCasesTemplate = `
  Inputs:

  {{inputs}}

  Expected: 
  
  {{expected}}
`.trim()

function getRestTestCases(testCases){
  return piped(
    testCases,
    tail,
    map(x => interpolate(restCasesTemplate, {expected: JSON.stringify(x.expected), inputs: JSON.stringify(x.testInputs)})),
    join('\n===\n')
  )
}

function getInputLines(sortedTestInputs){
  return piped(
    sortedTestInputs,
    map(x => `    ${x}`),
    join(',\n'),
  )
}

function getFileContent({sortedTestInputs,functionName, testCases}){
  const template = `
function {{name}}(
  {{inputLines}}
){
  
  return
}

test('happy', () => {
  {{declarations}}
  const result = {{name}}(
    {{inputLines}}
  )

  {{expectedDeclaration}}    
  expect(result).toEqual(expected)
})


/*

  {{restTestCases}}

*/
`.trim()

  const templateArguments = {
    name: functionName,
    declarations: getDeclarations(sortedTestInputs, testCases[0]),
    inputLines: getInputLines(sortedTestInputs),
    restTestCases: getRestTestCases(testCases),
    expectedDeclaration: getExpectedDeclaration(testCases[0])
  }
  return interpolate(template, templateArguments)
}

export async function createKata(dir, parsedData){
  const fileContent = getFileContent(parsedData)
  const filePath = `${dir}/${parsedData.functionName}.js`

  await writeFile(filePath, fileContent)
  fileContent
}