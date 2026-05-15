<?php
declare(strict_types=1);

// CurrencyExchange SDK utility: result_body

class CurrencyExchangeResultBody
{
    public static function call(CurrencyExchangeContext $ctx): ?CurrencyExchangeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
