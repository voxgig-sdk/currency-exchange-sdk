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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://hub.juheapi.com/exchangerate/v2",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "key",
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
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Response code (0 indicates success)",
					},
					map[string]any{
						"name": "convert_result",
						"title": "Convert Result",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "msg",
						"title": "Msg",
						"type": "`$STRING`",
						"req": true,
						"short": "Response message",
					},
					map[string]any{
						"name": "time_update",
						"title": "Time Update",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "convert",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/convert",
								"segments": []any{
									map[string]any{
										"lit": "convert",
									},
								},
								"parts": []any{
									"convert",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "amount",
											"orig": "amount",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "USD",
										},
										map[string]any{
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "CNY",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"amount",
										"from",
										"key",
										"to",
									},
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
						"title": "Base",
						"type": "`$STRING`",
						"req": true,
						"short": "Base currency code",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Response code (0 indicates success)",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"short": "Date of the exchange rates",
						"format": "date",
					},
					map[string]any{
						"name": "msg",
						"title": "Msg",
						"type": "`$STRING`",
						"req": true,
						"short": "Response message",
					},
					map[string]any{
						"name": "rates",
						"title": "Rates",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Map of currency codes to exchange rates",
					},
					map[string]any{
						"name": "time_update",
						"title": "Time Update",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "rate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rates",
								"segments": []any{
									map[string]any{
										"lit": "rates",
									},
								},
								"parts": []any{
									"rates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "base",
											"orig": "base",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "USD",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-06-26",
										},
										map[string]any{
											"name": "key",
											"orig": "key",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "query",
											"example": "CNY,EUR,GBP",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base",
										"date",
										"key",
										"symbol",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
