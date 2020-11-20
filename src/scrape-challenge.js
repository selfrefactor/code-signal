import { playwrightRun } from 'playwright-wrap'
import { delay, mapAsync } from 'rambdax'

const replSelector = '.lines-content'

async function getRawData(_){
  await _.waitFor(replSelector)
  const replContentEl = await _.page.$(replSelector)
  const replContent  = await replContentEl.textContent()
  const instructionsEl = await _.page.$('[class="-layout-v -fit"]')
  const instructions = await instructionsEl.textContent()
  const testCasesTitlesEls = await _.page.$$(
    '.test-case--title'
  )
  let shouldStop = false
  const iterator = async (x, i) => {
    if(shouldStop) return {}
    await x.click()
    await delay(100)  
    const testCasesEls = await _.page.$$(
      '.test-case'
    )
    const testCaseTitle = await x.textContent()
    const testCaseText = await testCasesEls[i].textContent()
    await delay(100)
    if(testCaseText.endsWith('Hidden')) {
      shouldStop = true
      return {}
    }  

    return {rawText: testCaseText, title: testCaseTitle}
  }

  const testCases = await mapAsync(iterator, testCasesTitlesEls)
  const filteredTestCases = testCases.filter(x => x.rawText)

  return {replContent, instructions, testCases: filteredTestCases}
}

function handleError(err){
  console.log(err)
}

export async function scrapeChallenge(challengeID){
  const url  = `https://app.codesignal.com/challenge/${challengeID}`
  /*
    fallback, just like R.switcher.default, should be able to pass error
  */
  const rawData = await playwrightRun({fn: getRawData, fallback: null, url, handleError})
  if(!rawData) throw new Error('!rawData')
  
  return rawData
}