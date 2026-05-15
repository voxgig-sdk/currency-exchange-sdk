# CurrencyExchange SDK utility: make_context

from core.context import CurrencyExchangeContext


def make_context_util(ctxmap, basectx):
    return CurrencyExchangeContext(ctxmap, basectx)
