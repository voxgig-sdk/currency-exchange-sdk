<?php
declare(strict_types=1);

// CurrencyExchange SDK utility: prepare_body

class CurrencyExchangePrepareBody
{
    public static function call(CurrencyExchangeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
