// Typed models for the CurrencyExchange SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Convert is the typed data model for the convert entity.
type Convert struct {
	Code string `json:"code"`
	ConvertResult map[string]any `json:"convert_result"`
	Msg string `json:"msg"`
	TimeUpdate map[string]any `json:"time_update"`
}

// ConvertLoadMatch mirrors the convert fields as an all-optional match
// filter (Go analog of Partial<Convert>).
type ConvertLoadMatch struct {
	Code *string `json:"code,omitempty"`
	ConvertResult *map[string]any `json:"convert_result,omitempty"`
	Msg *string `json:"msg,omitempty"`
	TimeUpdate *map[string]any `json:"time_update,omitempty"`
}

// Rate is the typed data model for the rate entity.
type Rate struct {
	Base string `json:"base"`
	Code string `json:"code"`
	Date *string `json:"date,omitempty"`
	Msg string `json:"msg"`
	Rate map[string]any `json:"rate"`
	TimeUpdate map[string]any `json:"time_update"`
}

// RateLoadMatch mirrors the rate fields as an all-optional match
// filter (Go analog of Partial<Rate>).
type RateLoadMatch struct {
	Base *string `json:"base,omitempty"`
	Code *string `json:"code,omitempty"`
	Date *string `json:"date,omitempty"`
	Msg *string `json:"msg,omitempty"`
	Rate *map[string]any `json:"rate,omitempty"`
	TimeUpdate *map[string]any `json:"time_update,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
