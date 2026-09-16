# CurrencyExchange SDK feature factory

from currencyexchange_sdk.feature.base_feature import CurrencyExchangeBaseFeature
from currencyexchange_sdk.feature.ratelimit_feature import CurrencyExchangeRatelimitFeature
from currencyexchange_sdk.feature.retry_feature import CurrencyExchangeRetryFeature
from currencyexchange_sdk.feature.test_feature import CurrencyExchangeTestFeature
from currencyexchange_sdk.feature.timeout_feature import CurrencyExchangeTimeoutFeature


_FEATURES = {
    "base": lambda: CurrencyExchangeBaseFeature(),
    "ratelimit": lambda: CurrencyExchangeRatelimitFeature(),
    "retry": lambda: CurrencyExchangeRetryFeature(),
    "test": lambda: CurrencyExchangeTestFeature(),
    "timeout": lambda: CurrencyExchangeTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
