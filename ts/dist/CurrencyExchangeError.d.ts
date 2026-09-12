import { Context } from './Context';
declare class CurrencyExchangeError extends Error {
    isCurrencyExchangeError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CurrencyExchangeError };
