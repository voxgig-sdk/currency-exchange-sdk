
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'CurrencyExchange',
        slug: "currency-exchange",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://hub.juheapi.com/exchangerate/v2",

    auth: {
      prefix: '',
      in: 'query',
      name: 'key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        convert: {
        },
  
        rate: {
        },
  
    }
  }


  entity = {
    "convert": {
      "fields": [
        {
          "name": "code",
          "title": "Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Response code (0 indicates success)"
        },
        {
          "name": "convert_result",
          "title": "Convert Result",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "msg",
          "title": "Msg",
          "type": "`$STRING`",
          "req": true,
          "short": "Response message"
        },
        {
          "name": "time_update",
          "title": "Time Update",
          "type": "`$OBJECT`",
          "req": true
        }
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
                  "lit": "convert"
                }
              ],
              "parts": [
                "convert"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "amount",
                    "orig": "amount",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": 100
                  },
                  {
                    "name": "from",
                    "orig": "from",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "USD"
                  },
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "to",
                    "orig": "to",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "CNY"
                  }
                ]
              },
              "select": {
                "exist": [
                  "amount",
                  "from",
                  "key",
                  "to"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rate": {
      "fields": [
        {
          "name": "base",
          "title": "Base",
          "type": "`$STRING`",
          "req": true,
          "short": "Base currency code"
        },
        {
          "name": "code",
          "title": "Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Response code (0 indicates success)"
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "short": "Date of the exchange rates",
          "format": "date"
        },
        {
          "name": "msg",
          "title": "Msg",
          "type": "`$STRING`",
          "req": true,
          "short": "Response message"
        },
        {
          "name": "rates",
          "title": "Rates",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Map of currency codes to exchange rates"
        },
        {
          "name": "time_update",
          "title": "Time Update",
          "type": "`$OBJECT`",
          "req": true
        }
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
                  "lit": "rates"
                }
              ],
              "parts": [
                "rates"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "base",
                    "orig": "base",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "USD"
                  },
                  {
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-06-26"
                  },
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "symbol",
                    "orig": "symbol",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "CNY,EUR,GBP"
                  }
                ]
              },
              "select": {
                "exist": [
                  "base",
                  "date",
                  "key",
                  "symbol"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

