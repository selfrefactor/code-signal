import { parseChallengeData } from './parse-challenge-data'
import {data} from '../challange-test-data.json'

test('happy', () => {
  const result = parseChallengeData(data)
  expect(
    result
  ).toMatchSnapshot()
})