import { ms } from 'string-fn'
import { runTournament } from './run-tournament'
jest.setTimeout(ms('30 minutes'))

test('happy', async () => {
  await runTournament()
})