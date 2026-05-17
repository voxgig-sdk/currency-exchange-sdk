package voxgigcurrencyexchangesdk

import (
	"github.com/voxgig-sdk/currency-exchange-sdk/go/core"
	"github.com/voxgig-sdk/currency-exchange-sdk/go/entity"
	"github.com/voxgig-sdk/currency-exchange-sdk/go/feature"
	_ "github.com/voxgig-sdk/currency-exchange-sdk/go/utility"
)

// Type aliases preserve external API.
type CurrencyExchangeSDK = core.CurrencyExchangeSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CurrencyExchangeEntity = core.CurrencyExchangeEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CurrencyExchangeError = core.CurrencyExchangeError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewConvertEntityFunc = func(client *core.CurrencyExchangeSDK, entopts map[string]any) core.CurrencyExchangeEntity {
		return entity.NewConvertEntity(client, entopts)
	}
	core.NewRateEntityFunc = func(client *core.CurrencyExchangeSDK, entopts map[string]any) core.CurrencyExchangeEntity {
		return entity.NewRateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCurrencyExchangeSDK = core.NewCurrencyExchangeSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
