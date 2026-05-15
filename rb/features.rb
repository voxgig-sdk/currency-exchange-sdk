# CurrencyExchange SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CurrencyExchangeFeatures
  def self.make_feature(name)
    case name
    when "base"
      CurrencyExchangeBaseFeature.new
    when "test"
      CurrencyExchangeTestFeature.new
    else
      CurrencyExchangeBaseFeature.new
    end
  end
end
