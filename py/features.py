# CurrencyExchange SDK feature factory

from feature.base_feature import CurrencyExchangeBaseFeature
from feature.test_feature import CurrencyExchangeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CurrencyExchangeBaseFeature(),
        "test": lambda: CurrencyExchangeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
