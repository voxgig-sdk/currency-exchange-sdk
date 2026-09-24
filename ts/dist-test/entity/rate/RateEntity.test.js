"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CURRENCY_EXCHANGE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CURRENCY_EXCHANGE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CurrencyExchangeSDK.test();
        const ent = testsdk.Rate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CURRENCY_EXCHANGE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'rate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "base": { "a": true, "h": "Base", "n": "base", "r": true, "sh": "Base currency code", "t": "`$STRING`", "key$": "base", "index$": 0 }, "code": { "a": true, "h": "Code", "n": "code", "r": true, "sh": "Response code (0 indicates success)", "t": "`$STRING`", "key$": "code", "index$": 1 }, "date": { "a": true, "fo": "date", "h": "Date", "n": "date", "r": false, "sh": "Date of the exchange rates", "t": "`$STRING`", "key$": "date", "index$": 2 }, "msg": { "a": true, "h": "Msg", "n": "msg", "r": true, "sh": "Response message", "t": "`$STRING`", "key$": "msg", "index$": 3 }, "rates": { "a": true, "h": "Rates", "n": "rates", "r": true, "sh": "Map of currency codes to exchange rates", "t": "`$OBJECT`", "key$": "rates", "index$": 4 }, "time_update": { "a": true, "h": "Time Update", "n": "time_update", "r": true, "t": "`$OBJECT`", "key$": "time_update", "index$": 5 } }, "name": "rate", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /rates", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "USD", "k": "query", "n": "base", "or": "base", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2025-06-26", "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "CNY,EUR,GBP", "k": "query", "n": "symbol", "or": "symbol", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/rates", "q": { "exist": ["base", "date", "key", "symbol"] }, "r": {}, "s": [{ "lit": "rates" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "rate", "name__orig": "rate", "Name": "Rate", "name_": "rate", "name-": "rate", "NAME": "RATE", "index$": 1 }, { "active": true, "entity": "rate", "key$": "BasicRateFlow", "kind": "basic", "name": "BasicRateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "rate_ref01", "srcdatavar": "rate_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-rate_ref01" } }], "index$": 0 }] }, 'Rate', { "GET /rates": { "protocol": "http", "operationId": "getExchangeRates", "responses": { "200": { "description": "Successful response with exchange rates", "content": { "application/json": { "schema": { "type": "object", "properties": { "code": { "description": "Response code (0 indicates success)", "example": "0", "key$": "code", "type": "string" }, "msg": { "description": "Response message", "example": "Success", "key$": "msg", "type": "string" }, "base": { "description": "Base currency code", "example": "USD", "key$": "base", "type": "string" }, "date": { "description": "Date of the exchange rates", "example": "2025-06-26", "format": "date", "key$": "date", "type": "string" }, "rates": { "additionalProperties": { "format": "double", "type": "number" }, "description": "Map of currency codes to exchange rates", "example": { "CNY": 7.26, "EUR": 0.92, "GBP": 0.79, "JPY": 149.85 }, "key$": "rates", "type": "object" }, "time_update": { "key$": "time_update", "properties": { "time_unix": { "description": "Unix timestamp of the last update", "example": 1750959474, "format": "int64", "type": "integer" }, "time_utc": { "description": "UTC timestamp in ISO 8601 format", "example": "2025-06-26T03:17:54Z", "format": "date-time", "type": "string" }, "time_zone": { "description": "Time zone of the timestamp", "example": "UTC", "type": "string" } }, "required": ["time_unix", "time_utc", "time_zone"], "type": "object", "x-ref": "#/components/schemas/TimeUpdate" } }, "required": ["code", "msg", "base", "rates"], "x-ref": "#/components/schemas/RatesResponse", "index$": 0 }, "example": { "code": "0", "msg": "Success", "base": "USD", "date": "2025-06-26", "rates": { "CNY": 7.26, "EUR": 0.92, "GBP": 0.79, "JPY": 149.85 }, "time_update": { "time_unix": 1750959474, "time_utc": "2025-06-26T03:17:54Z", "time_zone": "UTC" } } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "400" }, "msg": { "type": "string", "description": "Error message", "example": "Invalid currency code" } }, "required": ["code", "msg"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "401": { "description": "Unauthorized - Invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "400" }, "msg": { "type": "string", "description": "Error message", "example": "Invalid currency code" } }, "required": ["code", "msg"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "429": { "description": "Too many requests - Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "400" }, "msg": { "type": "string", "description": "Error message", "example": "Invalid currency code" } }, "required": ["code", "msg"], "x-ref": "#/components/schemas/ErrorResponse" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "code": { "type": "string", "description": "Error code", "example": "400" }, "msg": { "type": "string", "description": "Error message", "example": "Invalid currency code" } }, "required": ["code", "msg"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "base", "in": "query", "description": "Base currency code (e.g., USD, EUR, JPY)", "required": true, "schema": { "type": "string", "example": "USD" }, "index$": 0 }, { "name": "date", "in": "query", "description": "Date for historical rates in YYYY-MM-DD format. If not provided, returns latest rates.", "required": false, "schema": { "type": "string", "format": "date", "example": "2025-06-26" }, "index$": 1 }, { "name": "symbols", "in": "query", "description": "Comma-separated list of target currency codes to limit results (e.g., CNY,EUR,GBP)", "required": false, "schema": { "type": "string", "example": "CNY,EUR,GBP" }, "index$": 2 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 3 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Get your free API key at https://www.juheapi.com" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let rate_ref01_data = Object.values(setup.data.existing.rate)[0];
        // LOAD
        const rate_ref01_ent = client.Rate();
        const rate_ref01_match_dt0 = {};
        const rate_ref01_data_dt0 = (await rate_ref01_ent.load(rate_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != rate_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/rate/RateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CurrencyExchangeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['rate01', 'rate02', 'rate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CURRENCY_EXCHANGE_TEST_RATE_ENTID': idmap,
        'CURRENCY_EXCHANGE_TEST_LIVE': 'FALSE',
        'CURRENCY_EXCHANGE_TEST_EXPLAIN': 'FALSE',
        'CURRENCY_EXCHANGE_APIKEY': '',
    });
    idmap = env['CURRENCY_EXCHANGE_TEST_RATE_ENTID'];
    const live = 'TRUE' === env.CURRENCY_EXCHANGE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CURRENCY_EXCHANGE_TEST_RATE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CurrencyExchangeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CURRENCY_EXCHANGE_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CURRENCY_EXCHANGE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RateEntity.test.js.map