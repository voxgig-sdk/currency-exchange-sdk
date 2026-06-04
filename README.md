# CurrencyExchange SDK

Daily exchange rates and on-demand conversions across global fiat currencies and major cryptocurrencies

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Currency Exchange API

The Currency Exchange API is published on the [Juhe API hub](https://hub.juheapi.com/), a marketplace of HTTP APIs aggregated behind a single key-based gateway. The service exposes daily foreign-exchange rates and a conversion calculator that spans a broad set of national currencies plus major cryptocurrencies such as BTC.

What you get from the API:

- A lookup of supported currency codes so callers can validate inputs before pricing a conversion.
- A conversion endpoint that takes a source code, a target code and an amount, and returns the converted value at the latest published rate.
- Coverage across global fiat currencies and selected crypto assets.

Operational notes: requests are authenticated with an `apikey` query parameter issued by Juhe. The freepublicapis.com directory currently lists CORS as disabled, an average response time around 826 ms and a 100% reliability score over the last 30 days, so browser-side calls should be proxied through your own backend.

## Try it

**TypeScript**
```bash
npm install currency-exchange
```

**Python**
```bash
pip install currency-exchange-sdk
```

**PHP**
```bash
composer require voxgig/currency-exchange-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/currency-exchange-sdk/go
```

**Ruby**
```bash
gem install currency-exchange-sdk
```

**Lua**
```bash
luarocks install currency-exchange-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CurrencyExchangeSDK } from 'currency-exchange'

const client = new CurrencyExchangeSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o currency-exchange-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "currency-exchange": {
      "command": "/abs/path/to/currency-exchange-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Convert** | Converts an amount from one currency code to another using the latest published rate, exposed as a GET endpoint that takes source, target and amount parameters. | `/convert` |
| **Rate** | Lists the currency and cryptocurrency codes supported by the service so callers can validate inputs before requesting a conversion. | `/rates` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from currencyexchange_sdk import CurrencyExchangeSDK

client = CurrencyExchangeSDK({})


# Load a specific convert
convert, err = client.Convert(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'currencyexchange_sdk.php';

$client = new CurrencyExchangeSDK([]);


// Load a specific convert
[$convert, $err] = $client->Convert(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/currency-exchange-sdk/go"

client := sdk.NewCurrencyExchangeSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "CurrencyExchange_sdk"

client = CurrencyExchangeSDK.new({})


# Load a specific convert
convert, err = client.Convert(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("currency-exchange_sdk")

local client = sdk.new({})


-- Load a specific convert
local convert, err = client:Convert(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CurrencyExchangeSDK.test()
const result = await client.Convert().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CurrencyExchangeSDK.test(None, None)
result, err = client.Convert(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CurrencyExchangeSDK::test(null, null);
[$result, $err] = $client->Convert(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Convert(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CurrencyExchangeSDK.test(nil, nil)
result, err = client.Convert(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Convert(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Currency Exchange API

- Upstream: [https://hub.juheapi.com/exchangerate/v2](https://hub.juheapi.com/exchangerate/v2)

---

Generated from the Currency Exchange API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
