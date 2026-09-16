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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "base", "req": true, "short": "Base currency code", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "code", "req": true, "short": "Response code (0 indicates success)", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date", "name": "date", "req": false, "short": "Date of the exchange rates", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "msg", "req": true, "short": "Response message", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "rates", "req": true, "short": "Map of currency codes to exchange rates", "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "time_update", "req": true, "type": "`$OBJECT`", "index$": 5 }], "name": "rate", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "USD", "kind": "query", "name": "base", "orig": "base", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "2025-06-26", "kind": "query", "name": "date", "orig": "date", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "CNY,EUR,GBP", "kind": "query", "name": "symbol", "orig": "symbol", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /rates", "json": "{\"operationId\":\"getExchangeRates\",\"parameters\":[{\"description\":\"Base currency code (e.g., USD, EUR, JPY)\",\"in\":\"query\",\"name\":\"base\",\"required\":true,\"schema\":{\"example\":\"USD\",\"type\":\"string\"}},{\"description\":\"Date for historical rates in YYYY-MM-DD format. If not provided, returns latest rates.\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"example\":\"2025-06-26\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Comma-separated list of target currency codes to limit results (e.g., CNY,EUR,GBP)\",\"in\":\"query\",\"name\":\"symbols\",\"required\":false,\"schema\":{\"example\":\"CNY,EUR,GBP\",\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"base\":\"USD\",\"code\":\"0\",\"date\":\"2025-06-26\",\"msg\":\"Success\",\"rates\":{\"CNY\":7.26,\"EUR\":0.92,\"GBP\":0.79,\"JPY\":149.85},\"time_update\":{\"time_unix\":1750959474,\"time_utc\":\"2025-06-26T03:17:54Z\",\"time_zone\":\"UTC\"}},\"schema\":{\"properties\":{\"base\":{\"description\":\"Base currency code\",\"example\":\"USD\",\"type\":\"string\"},\"code\":{\"description\":\"Response code (0 indicates success)\",\"example\":\"0\",\"type\":\"string\"},\"date\":{\"description\":\"Date of the exchange rates\",\"example\":\"2025-06-26\",\"format\":\"date\",\"type\":\"string\"},\"msg\":{\"description\":\"Response message\",\"example\":\"Success\",\"type\":\"string\"},\"rates\":{\"additionalProperties\":{\"format\":\"double\",\"type\":\"number\"},\"description\":\"Map of currency codes to exchange rates\",\"example\":{\"CNY\":7.26,\"EUR\":0.92,\"GBP\":0.79,\"JPY\":149.85},\"type\":\"object\"},\"time_update\":{\"properties\":{\"time_unix\":{\"description\":\"Unix timestamp of the last update\",\"example\":1750959474,\"format\":\"int64\",\"type\":\"integer\"},\"time_utc\":{\"description\":\"UTC timestamp in ISO 8601 format\",\"example\":\"2025-06-26T03:17:54Z\",\"format\":\"date-time\",\"type\":\"string\"},\"time_zone\":{\"description\":\"Time zone of the timestamp\",\"example\":\"UTC\",\"type\":\"string\"}},\"required\":[\"time_unix\",\"time_utc\",\"time_zone\"],\"type\":\"object\"}},\"required\":[\"code\",\"msg\",\"base\",\"rates\"],\"type\":\"object\"}}},\"description\":\"Successful response with exchange rates\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Get your free API key at https://www.juheapi.com\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/rates", "segments": [{ "lit": "rates" }], "select": { "exist": ["base", "date", "key", "symbol"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "rate", "name__orig": "rate", "Name": "Rate", "name_": "rate", "name-": "rate", "NAME": "RATE", "index$": 1 }, { "active": true, "entity": "rate", "key$": "BasicRateFlow", "kind": "basic", "name": "BasicRateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "rate_ref01", "srcdatavar": "rate_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-rate_ref01" } }], "index$": 0 }] }, 'Rate');
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