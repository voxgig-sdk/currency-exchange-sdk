import { CurrencyExchangeEntityBase } from '../CurrencyExchangeEntityBase';
import type { CurrencyExchangeSDK } from '../CurrencyExchangeSDK';
import type { Control } from '../types';
import type { Rate, RateLoadMatch } from '../CurrencyExchangeTypes';
declare class RateEntity extends CurrencyExchangeEntityBase<Rate> {
    constructor(client: CurrencyExchangeSDK, entopts: any);
    make(this: RateEntity): RateEntity;
    load(this: any, reqmatch?: RateLoadMatch, ctrl?: Control): Promise<RateEntity>;
}
export { RateEntity };
