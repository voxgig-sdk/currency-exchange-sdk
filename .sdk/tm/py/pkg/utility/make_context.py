# CurrencyExchange SDK utility: make_context

from projectname_sdk.core.context import CurrencyExchangeContext


def make_context_util(ctxmap, basectx):
    return CurrencyExchangeContext(ctxmap, basectx)
