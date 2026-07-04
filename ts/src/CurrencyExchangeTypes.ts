// Typed models for the CurrencyExchange SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Convert {
  code: string
  convert_result: Record<string, any>
  msg: string
  time_update: Record<string, any>
}

export type ConvertLoadMatch = Partial<Convert>

export interface Rate {
  base: string
  code: string
  date?: string
  msg: string
  rate: Record<string, any>
  time_update: Record<string, any>
}

export type RateLoadMatch = Partial<Rate>

