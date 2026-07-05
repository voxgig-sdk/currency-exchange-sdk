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
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] convert_result
#   @return [Hash, nil]
#
# @!attribute [rw] msg
#   @return [String, nil]
#
# @!attribute [rw] time_update
#   @return [Hash, nil]
ConvertLoadMatch = Struct.new(
  :code,
  :convert_result,
  :msg,
  :time_update,
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
# @!attribute [rw] rate
#   @return [Hash]
#
# @!attribute [rw] time_update
#   @return [Hash]
Rate = Struct.new(
  :base,
  :code,
  :date,
  :msg,
  :rate,
  :time_update,
  keyword_init: true
)

# Request payload for Rate#load.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] msg
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Hash, nil]
#
# @!attribute [rw] time_update
#   @return [Hash, nil]
RateLoadMatch = Struct.new(
  :base,
  :code,
  :date,
  :msg,
  :rate,
  :time_update,
  keyword_init: true
)

