# CurrencyExchange SDK utility: prepare_body
module CurrencyExchangeUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
