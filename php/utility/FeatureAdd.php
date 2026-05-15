<?php
declare(strict_types=1);

// CurrencyExchange SDK utility: feature_add

class CurrencyExchangeFeatureAdd
{
    public static function call(CurrencyExchangeContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
