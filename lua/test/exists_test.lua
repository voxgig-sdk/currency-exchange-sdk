-- CurrencyExchange SDK exists test

local sdk = require("currency-exchange_sdk")

describe("CurrencyExchangeSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
