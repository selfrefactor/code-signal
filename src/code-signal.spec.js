import {codeSignal} from './code-signal'

const challengeID = 'F356AsueiKuhyYaAk'

test('happy', async () => {
  await codeSignal(challengeID)
})