import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "convert",
    "accessor": "Convert",
    "op": "load",
    "method": "GET",
    "path": "/convert",
    "args": [],
    "select": {
      "amount": 100,
      "from": "USD",
      "key": "v1",
      "to": "CNY"
    },
    "headers": [],
    "query": [
      "from",
      "to",
      "amount",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "code": "0",
      "msg": "Success",
      "convert_result": {
        "base": "USD",
        "target": "CNY",
        "rate": 7.26
      },
      "time_update": {
        "time_unix": 1750959474,
        "time_utc": "2025-06-26T03:17:54Z",
        "time_zone": "UTC"
      }
    },
    "idField": "id"
  },
  {
    "entity": "rate",
    "accessor": "Rate",
    "op": "load",
    "method": "GET",
    "path": "/rates",
    "args": [],
    "select": {
      "base": "USD",
      "date": "2025-06-26",
      "key": "v1",
      "symbol": "v1"
    },
    "headers": [],
    "query": [
      "base",
      "date",
      "symbols",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "code": "0",
      "msg": "Success",
      "base": "USD",
      "date": "2025-06-26",
      "rates": {
        "CNY": 7.26,
        "EUR": 0.92,
        "GBP": 0.79,
        "JPY": 149.85
      },
      "time_update": {
        "time_unix": 1750959474,
        "time_utc": "2025-06-26T03:17:54Z",
        "time_zone": "UTC"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
