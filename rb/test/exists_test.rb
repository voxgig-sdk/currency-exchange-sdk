# CurrencyExchange SDK exists test

require "minitest/autorun"
require_relative "../CurrencyExchange_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CurrencyExchangeSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
