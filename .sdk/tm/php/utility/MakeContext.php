<?php
declare(strict_types=1);

// CurrencyExchange SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CurrencyExchangeMakeContext
{
    public static function call(array $ctxmap, ?CurrencyExchangeContext $basectx): CurrencyExchangeContext
    {
        return new CurrencyExchangeContext($ctxmap, $basectx);
    }
}
