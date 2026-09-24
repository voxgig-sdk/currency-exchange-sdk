# CurrencyExchange SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CurrencyExchange",
            "slug": "currency-exchange",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://hub.juheapi.com/exchangerate/v2",
            "auth": {
                "prefix": "",
                "in": "query",
                "name": "key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "convert": {},
                "rate": {},
            },
        },
        "entity": {
      "convert": {
        "fields": [
          {
            "name": "code",
            "title": "Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Response code (0 indicates success)",
          },
          {
            "name": "convert_result",
            "title": "Convert Result",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "msg",
            "title": "Msg",
            "type": "`$STRING`",
            "req": True,
            "short": "Response message",
          },
          {
            "name": "time_update",
            "title": "Time Update",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "convert",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/convert",
                "segments": [
                  {
                    "lit": "convert",
                  },
                ],
                "parts": [
                  "convert",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "amount",
                      "orig": "amount",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 100,
                    },
                    {
                      "name": "from",
                      "orig": "from",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "USD",
                    },
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "to",
                      "orig": "to",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "CNY",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "amount",
                    "from",
                    "key",
                    "to",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "rate": {
        "fields": [
          {
            "name": "base",
            "title": "Base",
            "type": "`$STRING`",
            "req": True,
            "short": "Base currency code",
          },
          {
            "name": "code",
            "title": "Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Response code (0 indicates success)",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "Date of the exchange rates",
            "format": "date",
          },
          {
            "name": "msg",
            "title": "Msg",
            "type": "`$STRING`",
            "req": True,
            "short": "Response message",
          },
          {
            "name": "rates",
            "title": "Rates",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Map of currency codes to exchange rates",
          },
          {
            "name": "time_update",
            "title": "Time Update",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "rate",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/rates",
                "segments": [
                  {
                    "lit": "rates",
                  },
                ],
                "parts": [
                  "rates",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "base",
                      "orig": "base",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "USD",
                    },
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2025-06-26",
                    },
                    {
                      "name": "key",
                      "orig": "key",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "CNY,EUR,GBP",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "base",
                    "date",
                    "key",
                    "symbol",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
