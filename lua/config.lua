-- CurrencyExchange SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CurrencyExchange",
      slug = "currency-exchange",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://hub.juheapi.com/exchangerate/v2",
      auth = {
        prefix = "",
        ["in"] = "query",
        name = "key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["convert"] = {},
        ["rate"] = {},
      },
    },
    entity = {
      ["convert"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["req"] = true,
            ["short"] = "Response code (0 indicates success)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "convert_result",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "msg",
            ["req"] = true,
            ["short"] = "Response message",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "time_update",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "convert",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 100,
                      ["kind"] = "query",
                      ["name"] = "amount",
                      ["orig"] = "amount",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "USD",
                      ["kind"] = "query",
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "CNY",
                      ["kind"] = "query",
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/convert",
                ["segments"] = {
                  {
                    ["lit"] = "convert",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "amount",
                    "from",
                    "key",
                    "to",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "convert",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["rate"] = {
        ["fields"] = {
          {
            ["name"] = "base",
            ["req"] = true,
            ["short"] = "Base currency code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "code",
            ["req"] = true,
            ["short"] = "Response code (0 indicates success)",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "date",
            ["short"] = "Date of the exchange rates",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "msg",
            ["req"] = true,
            ["short"] = "Response message",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rates",
            ["req"] = true,
            ["short"] = "Map of currency codes to exchange rates",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "time_update",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "rate",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "USD",
                      ["kind"] = "query",
                      ["name"] = "base",
                      ["orig"] = "base",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "2025-06-26",
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "CNY,EUR,GBP",
                      ["kind"] = "query",
                      ["name"] = "symbol",
                      ["orig"] = "symbol",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rates",
                ["segments"] = {
                  {
                    ["lit"] = "rates",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "base",
                    "date",
                    "key",
                    "symbol",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "rates",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
