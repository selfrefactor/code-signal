import {scrapeChallangeData} from './code-signal'
import { ms } from 'string-fn'
import { writeJson } from 'fs-extra'
import { CHALLENGE_TEST_DATA } from './constants'

const challengeID = 'F356AsueiKuhyYaAk'
jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  const result = await scrapeChallangeData(challengeID)

  await writeJson(CHALLENGE_TEST_DATA, {data:result})
})