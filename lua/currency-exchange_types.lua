-- Typed models for the CurrencyExchange SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Convert
---@field code string
---@field convert_result table
---@field msg string
---@field time_update table

---@class ConvertLoadMatch
---@field amount? number
---@field from string
---@field key string
---@field to string

---@class Rate
---@field base string
---@field code string
---@field date? string
---@field msg string
---@field rates table
---@field time_update table

---@class RateLoadMatch
---@field base string
---@field date? string
---@field key string
---@field symbol? string

local M = {}

return M
