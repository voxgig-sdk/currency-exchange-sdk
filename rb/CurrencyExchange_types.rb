# frozen_string_literal: true

# Typed models for the CurrencyExchange SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Convert entity data model.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] convert_result
#   @return [Hash]
#
# @!attribute [rw] msg
#   @return [String]
#
# @!attribute [rw] time_update
#   @return [Hash]
Convert = Struct.new(
  :code,
  :convert_result,
  :msg,
  :time_update,
  keyword_init: true
)

# Request payload for Convert#load.
#
# @!attribute [rw] amount
#   @return [Float, nil]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
ConvertLoadMatch = Struct.new(
  :amount,
  :from,
  :key,
  :to,
  keyword_init: true
)

# Rate entity data model.
#
# @!attribute [rw] base
#   @return [String]
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] msg
#   @return [String]
#
# @!attribute [rw] rates
#   @return [Hash]
#
# @!attribute [rw] time_update
#   @return [Hash]
Rate = Struct.new(
  :base,
  :code,
  :date,
  :msg,
  :rates,
  :time_update,
  keyword_init: true
)

# Request payload for Rate#load.
#
# @!attribute [rw] base
#   @return [String]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] symbol
#   @return [String, nil]
RateLoadMatch = Struct.new(
  :base,
  :date,
  :key,
  :symbol,
  keyword_init: true
)

