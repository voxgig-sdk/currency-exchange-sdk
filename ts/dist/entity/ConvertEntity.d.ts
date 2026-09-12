import { CurrencyExchangeEntityBase } from '../CurrencyExchangeEntityBase';
import type { CurrencyExchangeSDK } from '../CurrencyExchangeSDK';
import type { Control } from '../types';
import type { Convert, ConvertLoadMatch } from '../CurrencyExchangeTypes';
declare class ConvertEntity extends CurrencyExchangeEntityBase<Convert> {
    constructor(client: CurrencyExchangeSDK, entopts: any);
    make(this: ConvertEntity): ConvertEntity;
    load(this: any, reqmatch?: ConvertLoadMatch, ctrl?: Control): Promise<ConvertEntity>;
}
export { ConvertEntity };
