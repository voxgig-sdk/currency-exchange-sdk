package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CurrencyExchange",
			"slug": "currency-exchange",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://hub.juheapi.com/exchangerate/v2",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"convert": map[string]any{},
				"rate": map[string]any{},
			},
		},
		"entity": map[string]any{
			"convert": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"req": true,
						"short": "Response code (0 indicates success)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "convert_result",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "msg",
						"req": true,
						"short": "Response message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "time_update",
						"req": true,
						"type": "`$OBJECT`",
					},
				},
				"name": "convert",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "amount",
											"orig": "amount",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "USD",
											"kind": "query",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "CNY",
											"kind": "query",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/convert",
								"parts": []any{
									"convert",
								},
								"select": map[string]any{
									"exist": []any{
										"amount",
										"from",
										"key",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base",
						"req": true,
						"short": "Base currency code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"req": true,
						"short": "Response code (0 indicates success)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"short": "Date of the exchange rates",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "msg",
						"req": true,
						"short": "Response message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rates",
						"req": true,
						"short": "Map of currency codes to exchange rates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "time_update",
						"req": true,
						"type": "`$OBJECT`",
					},
				},
				"name": "rate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "USD",
											"kind": "query",
											"name": "base",
											"orig": "base",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2025-06-26",
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "CNY,EUR,GBP",
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/rates",
								"parts": []any{
									"rates",
								},
								"select": map[string]any{
									"exist": []any{
										"base",
										"date",
										"key",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
