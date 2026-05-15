
import { Context } from './Context'


class CurrencyExchangeError extends Error {

  isCurrencyExchangeError = true

  sdk = 'CurrencyExchange'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CurrencyExchangeError
}

