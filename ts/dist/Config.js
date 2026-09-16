"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'CurrencyExchange',
        slug: "currency-exchange",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://hub.juheapi.com/exchangerate/v2",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            convert: {},
            rate: {},
        }
    };
    entity = {
        "convert": {
            "fields": [
                {
                    "name": "code",
                    "req": true,
                    "short": "Response code (0 indicates success)",
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
                    "short": "Response message",
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
                            "segments": [
                                {
                                    "lit": "convert"
                                }
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
                            },
                            "parts": [
                                "convert"
                            ]
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
                    "short": "Base currency code",
                    "type": "`$STRING`"
                },
                {
                    "name": "code",
                    "req": true,
                    "short": "Response code (0 indicates success)",
                    "type": "`$STRING`"
                },
                {
                    "format": "date",
                    "name": "date",
                    "short": "Date of the exchange rates",
                    "type": "`$STRING`"
                },
                {
                    "name": "msg",
                    "req": true,
                    "short": "Response message",
                    "type": "`$STRING`"
                },
                {
                    "name": "rates",
                    "req": true,
                    "short": "Map of currency codes to exchange rates",
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
                            "segments": [
                                {
                                    "lit": "rates"
                                }
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
                            },
                            "parts": [
                                "rates"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map