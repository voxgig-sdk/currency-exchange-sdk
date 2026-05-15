# CurrencyExchange SDK utility: make_context
require_relative '../core/context'
module CurrencyExchangeUtilities
  MakeContext = ->(ctxmap, basectx) {
    CurrencyExchangeContext.new(ctxmap, basectx)
  }
end
