

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CurrencyExchangeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ConvertEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CURRENCY_EXCHANGE_TEST_LIVE=TRUE.
  afterEach(liveDelay('CURRENCY_EXCHANGE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CurrencyExchangeSDK.test()
    const ent = testsdk.Convert()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CURRENCY_EXCHANGE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'convert.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":true,"short":"Response code (0 indicates success)","type":"`$STRING`","index$":0},{"active":true,"name":"convert_result","req":true,"type":"`$OBJECT`","index$":1},{"active":true,"name":"msg","req":true,"short":"Response message","type":"`$STRING`","index$":2},{"active":true,"name":"time_update","req":true,"type":"`$OBJECT`","index$":3}],"name":"convert","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":100,"kind":"query","name":"amount","orig":"amount","reqd":false,"type":"`$NUMBER`","index$":0},{"active":true,"example":"USD","kind":"query","name":"from","orig":"from","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2},{"active":true,"example":"CNY","kind":"query","name":"to","orig":"to","reqd":true,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /convert","json":"{\"operationId\":\"convertCurrency\",\"parameters\":[{\"description\":\"Source currency code (e.g., USD, EUR, JPY)\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"example\":\"USD\",\"type\":\"string\"}},{\"description\":\"Target currency code (e.g., CNY, GBP, EUR)\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"example\":\"CNY\",\"type\":\"string\"}},{\"description\":\"Amount to convert\",\"in\":\"query\",\"name\":\"amount\",\"required\":false,\"schema\":{\"default\":1,\"example\":100,\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"0\",\"convert_result\":{\"base\":\"USD\",\"rate\":7.26,\"target\":\"CNY\"},\"msg\":\"Success\",\"time_update\":{\"time_unix\":1750959474,\"time_utc\":\"2025-06-26T03:17:54Z\",\"time_zone\":\"UTC\"}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response code (0 indicates success)\",\"example\":\"0\",\"type\":\"string\"},\"convert_result\":{\"properties\":{\"base\":{\"description\":\"Base (source) currency code\",\"example\":\"USD\",\"type\":\"string\"},\"rate\":{\"description\":\"Exchange rate from base to target currency\",\"example\":7.26,\"format\":\"double\",\"type\":\"number\"},\"target\":{\"description\":\"Target currency code\",\"example\":\"CNY\",\"type\":\"string\"}},\"required\":[\"base\",\"target\",\"rate\"],\"type\":\"object\"},\"msg\":{\"description\":\"Response message\",\"example\":\"Success\",\"type\":\"string\"},\"time_update\":{\"properties\":{\"time_unix\":{\"description\":\"Unix timestamp of the last update\",\"example\":1750959474,\"format\":\"int64\",\"type\":\"integer\"},\"time_utc\":{\"description\":\"UTC timestamp in ISO 8601 format\",\"example\":\"2025-06-26T03:17:54Z\",\"format\":\"date-time\",\"type\":\"string\"},\"time_zone\":{\"description\":\"Time zone of the timestamp\",\"example\":\"UTC\",\"type\":\"string\"}},\"required\":[\"time_unix\",\"time_utc\",\"time_zone\"],\"type\":\"object\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Successful conversion\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid currency code\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Get your free API key at https://www.juheapi.com\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/convert","segments":[{"lit":"convert"}],"select":{"exist":["amount","from","key","to"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"convert","name__orig":"convert","Name":"Convert","name_":"convert","name-":"convert","NAME":"CONVERT","index$":0}, {"active":true,"entity":"convert","key$":"BasicConvertFlow","kind":"basic","name":"BasicConvertFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"convert_ref01","srcdatavar":"convert_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-convert_ref01"}}],"index$":0}]}, 'Convert')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let convert_ref01_data = Object.values(setup.data.existing.convert)[0] as any

    // LOAD
    const convert_ref01_ent = client.Convert()
    const convert_ref01_match_dt0: any = {}
    const convert_ref01_data_dt0 = (await convert_ref01_ent.load(convert_ref01_match_dt0)).data()
    assert(null != convert_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/convert/ConvertTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CurrencyExchangeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['convert01','convert02','convert03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CURRENCY_EXCHANGE_TEST_CONVERT_ENTID': idmap,
    'CURRENCY_EXCHANGE_TEST_LIVE': 'FALSE',
    'CURRENCY_EXCHANGE_TEST_EXPLAIN': 'FALSE',
    'CURRENCY_EXCHANGE_APIKEY': '',
  })

  idmap = env['CURRENCY_EXCHANGE_TEST_CONVERT_ENTID']

  const live = 'TRUE' === env.CURRENCY_EXCHANGE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CURRENCY_EXCHANGE_TEST_CONVERT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CurrencyExchangeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
