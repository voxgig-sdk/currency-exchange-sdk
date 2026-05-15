# CurrencyExchange SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CurrencyExchangeUtility.registrar = ->(u) {
  u.clean = CurrencyExchangeUtilities::Clean
  u.done = CurrencyExchangeUtilities::Done
  u.make_error = CurrencyExchangeUtilities::MakeError
  u.feature_add = CurrencyExchangeUtilities::FeatureAdd
  u.feature_hook = CurrencyExchangeUtilities::FeatureHook
  u.feature_init = CurrencyExchangeUtilities::FeatureInit
  u.fetcher = CurrencyExchangeUtilities::Fetcher
  u.make_fetch_def = CurrencyExchangeUtilities::MakeFetchDef
  u.make_context = CurrencyExchangeUtilities::MakeContext
  u.make_options = CurrencyExchangeUtilities::MakeOptions
  u.make_request = CurrencyExchangeUtilities::MakeRequest
  u.make_response = CurrencyExchangeUtilities::MakeResponse
  u.make_result = CurrencyExchangeUtilities::MakeResult
  u.make_point = CurrencyExchangeUtilities::MakePoint
  u.make_spec = CurrencyExchangeUtilities::MakeSpec
  u.make_url = CurrencyExchangeUtilities::MakeUrl
  u.param = CurrencyExchangeUtilities::Param
  u.prepare_auth = CurrencyExchangeUtilities::PrepareAuth
  u.prepare_body = CurrencyExchangeUtilities::PrepareBody
  u.prepare_headers = CurrencyExchangeUtilities::PrepareHeaders
  u.prepare_method = CurrencyExchangeUtilities::PrepareMethod
  u.prepare_params = CurrencyExchangeUtilities::PrepareParams
  u.prepare_path = CurrencyExchangeUtilities::PreparePath
  u.prepare_query = CurrencyExchangeUtilities::PrepareQuery
  u.result_basic = CurrencyExchangeUtilities::ResultBasic
  u.result_body = CurrencyExchangeUtilities::ResultBody
  u.result_headers = CurrencyExchangeUtilities::ResultHeaders
  u.transform_request = CurrencyExchangeUtilities::TransformRequest
  u.transform_response = CurrencyExchangeUtilities::TransformResponse
}
