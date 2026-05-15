package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewConvertEntityFunc func(client *CurrencyExchangeSDK, entopts map[string]any) CurrencyExchangeEntity

var NewRateEntityFunc func(client *CurrencyExchangeSDK, entopts map[string]any) CurrencyExchangeEntity

