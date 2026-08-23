# CurrencyExchange SDK configuration

module CurrencyExchangeConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "CurrencyExchange",
        "slug" => "currency-exchange",
        "version" => "0.0.1",
        "target" => "rb",
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
        "auth" => {
          "prefix" => "",
        },
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
              "short" => "Response code (0 indicates success)",
              "type" => "`$STRING`",
            },
            {
              "name" => "convert_result",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "msg",
              "req" => true,
              "short" => "Response message",
              "type" => "`$STRING`",
            },
            {
              "name" => "time_update",
              "req" => true,
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "convert",
          "op" => {
            "load" => {
              "input" => "data",
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
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "USD",
                        "kind" => "query",
                        "name" => "from",
                        "orig" => "from",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "CNY",
                        "kind" => "query",
                        "name" => "to",
                        "orig" => "to",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "short" => "Base currency code",
              "type" => "`$STRING`",
            },
            {
              "name" => "code",
              "req" => true,
              "short" => "Response code (0 indicates success)",
              "type" => "`$STRING`",
            },
            {
              "name" => "date",
              "short" => "Date of the exchange rates",
              "type" => "`$STRING`",
            },
            {
              "name" => "msg",
              "req" => true,
              "short" => "Response message",
              "type" => "`$STRING`",
            },
            {
              "name" => "rates",
              "req" => true,
              "short" => "Map of currency codes to exchange rates",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "time_update",
              "req" => true,
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "rate",
          "op" => {
            "load" => {
              "input" => "data",
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
                      },
                      {
                        "example" => "2025-06-26",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "CNY,EUR,GBP",
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
