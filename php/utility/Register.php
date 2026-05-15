<?php
declare(strict_types=1);

// CurrencyExchange SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CurrencyExchangeUtility::setRegistrar(function (CurrencyExchangeUtility $u): void {
    $u->clean = [CurrencyExchangeClean::class, 'call'];
    $u->done = [CurrencyExchangeDone::class, 'call'];
    $u->make_error = [CurrencyExchangeMakeError::class, 'call'];
    $u->feature_add = [CurrencyExchangeFeatureAdd::class, 'call'];
    $u->feature_hook = [CurrencyExchangeFeatureHook::class, 'call'];
    $u->feature_init = [CurrencyExchangeFeatureInit::class, 'call'];
    $u->fetcher = [CurrencyExchangeFetcher::class, 'call'];
    $u->make_fetch_def = [CurrencyExchangeMakeFetchDef::class, 'call'];
    $u->make_context = [CurrencyExchangeMakeContext::class, 'call'];
    $u->make_options = [CurrencyExchangeMakeOptions::class, 'call'];
    $u->make_request = [CurrencyExchangeMakeRequest::class, 'call'];
    $u->make_response = [CurrencyExchangeMakeResponse::class, 'call'];
    $u->make_result = [CurrencyExchangeMakeResult::class, 'call'];
    $u->make_point = [CurrencyExchangeMakePoint::class, 'call'];
    $u->make_spec = [CurrencyExchangeMakeSpec::class, 'call'];
    $u->make_url = [CurrencyExchangeMakeUrl::class, 'call'];
    $u->param = [CurrencyExchangeParam::class, 'call'];
    $u->prepare_auth = [CurrencyExchangePrepareAuth::class, 'call'];
    $u->prepare_body = [CurrencyExchangePrepareBody::class, 'call'];
    $u->prepare_headers = [CurrencyExchangePrepareHeaders::class, 'call'];
    $u->prepare_method = [CurrencyExchangePrepareMethod::class, 'call'];
    $u->prepare_params = [CurrencyExchangePrepareParams::class, 'call'];
    $u->prepare_path = [CurrencyExchangePreparePath::class, 'call'];
    $u->prepare_query = [CurrencyExchangePrepareQuery::class, 'call'];
    $u->result_basic = [CurrencyExchangeResultBasic::class, 'call'];
    $u->result_body = [CurrencyExchangeResultBody::class, 'call'];
    $u->result_headers = [CurrencyExchangeResultHeaders::class, 'call'];
    $u->transform_request = [CurrencyExchangeTransformRequest::class, 'call'];
    $u->transform_response = [CurrencyExchangeTransformResponse::class, 'call'];
});
