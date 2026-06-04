# CurrencyExchange SDK configuration

module CurrencyExchangeConfig
  def self.make_config
    {
      "main" => {
        "name" => "CurrencyExchange",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://hub.juheapi.com/exchangerate/v2",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "convert" => {},
          "rate" => {},
        },
      },
      "entity" => {
        "convert" => {
          "fields" => [
            {
              "name" => "code",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "convert_result",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "msg",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "time_update",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 3,
            },
          ],
          "name" => "convert",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "amount",
                        "orig" => "amount",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => "USD",
                        "kind" => "query",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "CNY",
                        "kind" => "query",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/convert",
                  "parts" => [
                    "convert",
                  ],
                  "select" => {
                    "exist" => [
                      "amount",
                      "from",
                      "key",
                      "to",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "rate" => {
          "fields" => [
            {
              "name" => "base",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "code",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "date",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "msg",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "rate",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "time_update",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 5,
            },
          ],
          "name" => "rate",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "USD",
                        "kind" => "query",
                        "name" => "base",
                        "orig" => "base",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "2025-06-26",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "CNY,EUR,GBP",
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/rates",
                  "parts" => [
                    "rates",
                  ],
                  "select" => {
                    "exist" => [
                      "base",
                      "date",
                      "key",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CurrencyExchangeFeatures.make_feature(name)
  end
end
