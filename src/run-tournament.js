import { envFn } from "env-fn";
envFn('special')

import { last, mapAsync, range } from "rambdax"
import { createKata } from "./_modules/create-kata"
import {KATA_DIR} from './constants'
import {replSelector, getRawData} from './scrape-challenge'
import {playwrightInit, wrap} from 'playwright-wrap'

const URL_BASE = 'https://app.codesignal.com'
const LOGIN = `${URL_BASE}/login`
const TOURNAMENT = id => `${URL_BASE}/tournaments/${id}/A`

function getAuthInfo(){
  const user = process.env.CODE_SIGNAL_USER
  const password = process.env.CODE_SIGNAL_PASSWORD
  if(!user && !password){
    throw new Error('process.env.CODE_SIGNAL_*')
  }
  return {user, password}
}

const USER_FIELD = `input[name="username"]`
const PASSWORD_FIELD = `input[type="password"]`
const MODE = '[class="-layout-h -space-h-4 -center-center"]'
const TASK = '.tournament_task--task-status'

async function isCodewriting(_){
  const allModes = await _.page.$$(MODE)
  const currentMode = await allModes[1].textContent()
  return currentMode.includes('codewriting')
}

const tasksIndexes = ['A','B','C','D','E', 'F', 'H']

async function scrapeTask(_, i, isFirst = false){

}

export async function runTournament(){
  console.time('tournament')
  const tournamentID = last(process.argv)
  const options = {
    headless:  process.env.HEADLESS !== 'OFF',
    logFlag: false,
    url: LOGIN,
    browser: 'chromium',
    waitCondition: {
      waitUntil: 'domcontentloaded',
      timeout: 600000
    },
  };
  const { browser, page } = await playwrightInit(options);
  const _ = wrap(page)
  await _.waitFor(USER_FIELD)
  const {user, password} = getAuthInfo()
  await _.page.fill(USER_FIELD, user)
  await _.page.fill(PASSWORD_FIELD, password)
  await _.clickWithText('Sign in')
  await _.waitAgainst(USER_FIELD)
  await _.sleep()

  await _.goto(TOURNAMENT(tournamentID))
  await _.waitFor(replSelector)
  const numTasks = await _.count(TASK)
  if(await isCodewriting(_)){
    await scrapeTask(_, 0, true)
  }

  await mapAsync(async i => await scrapeTask(_, i), range(1,numTasks))
  console.timeEnd('tournament')
}