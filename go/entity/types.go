// Typed models for the CurrencyExchange SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/currency-exchange-sdk/go/core"
)

// Convert is the typed data model for the convert entity.
type Convert struct {
	Code string `json:"code"`
	ConvertResult map[string]any `json:"convert_result"`
	Msg string `json:"msg"`
	TimeUpdate map[string]any `json:"time_update"`
}

// ConvertLoadMatch is the typed request payload for Convert.LoadTyped.
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
	Rates map[string]any `json:"rates"`
	TimeUpdate map[string]any `json:"time_update"`
}

// RateLoadMatch is the typed request payload for Rate.LoadTyped.
type RateLoadMatch struct {
	Base *string `json:"base,omitempty"`
	Code *string `json:"code,omitempty"`
	Date *string `json:"date,omitempty"`
	Msg *string `json:"msg,omitempty"`
	Rates *map[string]any `json:"rates,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
