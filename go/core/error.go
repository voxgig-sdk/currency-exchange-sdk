package core

type CurrencyExchangeError struct {
	IsCurrencyExchangeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCurrencyExchangeError(code string, msg string, ctx *Context) *CurrencyExchangeError {
	return &CurrencyExchangeError{
		IsCurrencyExchangeError: true,
		Sdk:              "CurrencyExchange",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CurrencyExchangeError) Error() string {
	return e.Msg
}
