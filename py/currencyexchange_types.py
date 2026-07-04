# Typed models for the CurrencyExchange SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Convert:
    code: str
    convert_result: dict
    msg: str
    time_update: dict


@dataclass
class ConvertLoadMatch:
    code: Optional[str] = None
    convert_result: Optional[dict] = None
    msg: Optional[str] = None
    time_update: Optional[dict] = None


@dataclass
class Rate:
    base: str
    code: str
    msg: str
    rate: dict
    time_update: dict
    date: Optional[str] = None


@dataclass
class RateLoadMatch:
    base: Optional[str] = None
    code: Optional[str] = None
    date: Optional[str] = None
    msg: Optional[str] = None
    rate: Optional[dict] = None
    time_update: Optional[dict] = None

