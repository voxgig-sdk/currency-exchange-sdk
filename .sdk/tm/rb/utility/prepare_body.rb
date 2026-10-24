# CurrencyExchange SDK utility: prepare_body
require_relative 'media'
module CurrencyExchangeUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CurrencyExchangeUtilities.raw_body(ctx.reqdata) if CurrencyExchangeUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
