# CurrencyExchange SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CurrencyExchangeFeatures
  def self.make_feature(name)
    case name
    when "base"
      CurrencyExchangeBaseFeature.new
    when "ratelimit"
      CurrencyExchangeRatelimitFeature.new
    when "retry"
      CurrencyExchangeRetryFeature.new
    when "test"
      CurrencyExchangeTestFeature.new
    when "timeout"
      CurrencyExchangeTimeoutFeature.new
    else
      CurrencyExchangeBaseFeature.new
    end
  end
end
