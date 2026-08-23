# CurrencyExchange TypeScript SDK Reference

Complete API reference for the CurrencyExchange TypeScript SDK.


## CurrencyExchangeSDK

### Constructor

```ts
new CurrencyExchangeSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CurrencyExchangeSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CurrencyExchangeSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CurrencyExchangeSDK` instance in test mode.


### Instance Methods

#### `Convert(data?: object)`

Create a new `Convert` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConvertEntity` instance.

#### `Rate(data?: object)`

Create a new `Rate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RateEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CurrencyExchangeSDK.test()`.

**Returns:** `CurrencyExchangeSDK` instance in test mode.


---

## ConvertEntity

```ts
const convert = client.Convert()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | Response code (0 indicates success) |
| `convert_result` | `Record<string, any>` | Yes |  |
| `msg` | `string` | Yes | Response message |
| `time_update` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Convert().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConvertEntity` instance with the same client and
options.

#### `client()`

Return the parent `CurrencyExchangeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RateEntity

```ts
const rate = client.Rate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | `string` | Yes | Base currency code |
| `code` | `string` | Yes | Response code (0 indicates success) |
| `date` | `string` | No | Date of the exchange rates |
| `msg` | `string` | Yes | Response message |
| `rates` | `Record<string, any>` | Yes | Map of currency codes to exchange rates |
| `time_update` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Rate().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RateEntity` instance with the same client and
options.

#### `client()`

Return the parent `CurrencyExchangeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CurrencyExchangeSDK({
  feature: {
    test: { active: true },
  }
})
```

