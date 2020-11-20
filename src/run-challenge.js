import { nth } from "rambdax"
import { scrapeChallenge } from "./scrape-challenge"
import { createKata } from "./_modules/create-kata"
import { parseChallengeData } from "./_modules/parse-challenge-data"
import {KATA_DIR} from './constants'

export async function runChallenge(){
  console.time('challenge')
  const challengeID = nth(3, process.argv)
  const scrapeData = await scrapeChallenge(challengeID)
  const parsedData = parseChallengeData(scrapeData)
  await createKata(KATA_DIR, parsedData)
  console.timeEnd('challenge')
}