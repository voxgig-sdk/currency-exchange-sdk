
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CurrencyExchangeSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CurrencyExchangeSDK.test()
    equal(testsdk instanceof CurrencyExchangeSDK, true,
      'CurrencyExchangeSDK.test() must return a client synchronously')
  })

})
