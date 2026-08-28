<?php
declare(strict_types=1);

// Typed models for the CurrencyExchange SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Convert entity data model. */
class Convert
{
    public string $code;
    public array $convert_result;
    public string $msg;
    public array $time_update;
}

/** Request payload for Convert#load. */
class ConvertLoadMatch
{
    public ?float $amount = null;
    public string $from;
    public string $key;
    public string $to;
}

/** Rate entity data model. */
class Rate
{
    public string $base;
    public string $code;
    public ?string $date = null;
    public string $msg;
    public array $rates;
    public array $time_update;
}

/** Request payload for Rate#load. */
class RateLoadMatch
{
    public string $base;
    public ?string $date = null;
    public string $key;
    public ?string $symbol = null;
}

