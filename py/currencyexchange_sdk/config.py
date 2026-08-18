# CurrencyExchange SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://hub.juheapi.com/exchangerate/v2",
            "auth": {
                "prefix": "",
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
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "convert_result",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "msg",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "time_update",
            "req": True,
            "type": "`$OBJECT`",
          },
        ],
        "name": "convert",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 100,
                      "kind": "query",
                      "name": "amount",
                      "orig": "amount",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "CNY",
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/convert",
                "parts": [
                  "convert",
                ],
                "select": {
                  "exist": [
                    "amount",
                    "from",
                    "key",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "msg",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "rates",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "time_update",
            "req": True,
            "type": "`$OBJECT`",
          },
        ],
        "name": "rate",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "USD",
                      "kind": "query",
                      "name": "base",
                      "orig": "base",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2025-06-26",
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "CNY,EUR,GBP",
                      "kind": "query",
                      "name": "symbol",
                      "orig": "symbol",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/rates",
                "parts": [
                  "rates",
                ],
                "select": {
                  "exist": [
                    "base",
                    "date",
                    "key",
                    "symbol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
