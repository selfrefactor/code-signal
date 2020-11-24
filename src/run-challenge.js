import { last } from 'rambdax'

import { createKata } from './_modules/create-kata'
import { parseChallengeData } from './_modules/parse-challenge-data'
import { KATA_DIR } from './constants'
import { scrapeChallenge } from './scrape-challenge'

export async function runChallenge(){
  console.time('challenge')
  const challengeID = last(process.argv)
  const scrapeData = await scrapeChallenge(challengeID)
  const parsedData = parseChallengeData(scrapeData)
  await createKata(KATA_DIR, parsedData)
  console.timeEnd('challenge')
}
