# CurrencyExchange SDK utility: feature_add
module CurrencyExchangeUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
