
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'CurrencyExchange',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://hub.juheapi.com/exchangerate/v2",

    auth: {
      prefix: '',
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
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "convert_result",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "msg",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "time_update",
          "req": true,
          "type": "`$OBJECT`"
        }
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
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": "USD",
                    "kind": "query",
                    "name": "from",
                    "orig": "from",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "key",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "CNY",
                    "kind": "query",
                    "name": "to",
                    "orig": "to",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/convert",
              "parts": [
                "convert"
              ],
              "select": {
                "exist": [
                  "amount",
                  "from",
                  "key",
                  "to"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "date",
          "type": "`$STRING`"
        },
        {
          "name": "msg",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "rates",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "time_update",
          "req": true,
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2025-06-26",
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "key",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "CNY,EUR,GBP",
                    "kind": "query",
                    "name": "symbol",
                    "orig": "symbol",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/rates",
              "parts": [
                "rates"
              ],
              "select": {
                "exist": [
                  "base",
                  "date",
                  "key",
                  "symbol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
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
  config
}

