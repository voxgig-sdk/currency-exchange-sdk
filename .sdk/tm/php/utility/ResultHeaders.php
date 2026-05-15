<?php
declare(strict_types=1);

// CurrencyExchange SDK utility: result_headers

class CurrencyExchangeResultHeaders
{
    public static function call(CurrencyExchangeContext $ctx): ?CurrencyExchangeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
