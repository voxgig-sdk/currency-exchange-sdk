<?php
declare(strict_types=1);

// CurrencyExchange SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CurrencyExchangeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CurrencyExchangeBaseFeature();
            case "test":
                return new CurrencyExchangeTestFeature();
            default:
                return new CurrencyExchangeBaseFeature();
        }
    }
}
