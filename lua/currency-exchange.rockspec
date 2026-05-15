package = "voxgig-sdk-currency-exchange"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/currency-exchange-sdk.git"
}
description = {
  summary = "CurrencyExchange SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["currency-exchange_sdk"] = "currency-exchange_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
