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

/** Match filter for Convert#load (any subset of Convert fields). */
class ConvertLoadMatch
{
    public ?string $code = null;
    public ?array $convert_result = null;
    public ?string $msg = null;
    public ?array $time_update = null;
}

/** Rate entity data model. */
class Rate
{
    public string $base;
    public string $code;
    public ?string $date = null;
    public string $msg;
    public array $rate;
    public array $time_update;
}

/** Match filter for Rate#load (any subset of Rate fields). */
class RateLoadMatch
{
    public ?string $base = null;
    public ?string $code = null;
    public ?string $date = null;
    public ?string $msg = null;
    public ?array $rate = null;
    public ?array $time_update = null;
}

