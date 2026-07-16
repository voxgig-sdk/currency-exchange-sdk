<?php
declare(strict_types=1);

// CurrencyExchange SDK base feature

class CurrencyExchangeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CurrencyExchangeContext $ctx, array $options): void {}
    public function PostConstruct(CurrencyExchangeContext $ctx): void {}
    public function PostConstructEntity(CurrencyExchangeContext $ctx): void {}
    public function SetData(CurrencyExchangeContext $ctx): void {}
    public function GetData(CurrencyExchangeContext $ctx): void {}
    public function GetMatch(CurrencyExchangeContext $ctx): void {}
    public function SetMatch(CurrencyExchangeContext $ctx): void {}
    public function PrePoint(CurrencyExchangeContext $ctx): void {}
    public function PreSpec(CurrencyExchangeContext $ctx): void {}
    public function PreRequest(CurrencyExchangeContext $ctx): void {}
    public function PreResponse(CurrencyExchangeContext $ctx): void {}
    public function PreResult(CurrencyExchangeContext $ctx): void {}
    public function PreDone(CurrencyExchangeContext $ctx): void {}
    public function PreUnexpected(CurrencyExchangeContext $ctx): void {}
}
