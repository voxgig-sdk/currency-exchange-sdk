
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CurrencyExchangeSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CurrencyExchangeSDK.test()
    equal(null !== testsdk, true)
  })

})
