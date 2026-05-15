-- CurrencyExchange SDK error

local CurrencyExchangeError = {}
CurrencyExchangeError.__index = CurrencyExchangeError


function CurrencyExchangeError.new(code, msg, ctx)
  local self = setmetatable({}, CurrencyExchangeError)
  self.is_sdk_error = true
  self.sdk = "CurrencyExchange"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CurrencyExchangeError:error()
  return self.msg
end


function CurrencyExchangeError:__tostring()
  return self.msg
end


return CurrencyExchangeError
