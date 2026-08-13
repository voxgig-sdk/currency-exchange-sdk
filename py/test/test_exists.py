# CurrencyExchange SDK exists test

import pytest
from currencyexchange_sdk import CurrencyExchangeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CurrencyExchangeSDK.test(None, None)
        assert testsdk is not None
