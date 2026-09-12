import { ConvertEntity } from './entity/ConvertEntity';
import { RateEntity } from './entity/RateEntity';
export type * from './CurrencyExchangeTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CurrencyExchangeEntityBase } from './CurrencyExchangeEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CurrencyExchangeSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Convert(entopts?: Record<string, any>): ConvertEntity;
    Rate(entopts?: Record<string, any>): RateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CurrencyExchangeSDK;
    tester(testopts?: any, sdkopts?: any): CurrencyExchangeSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CurrencyExchangeSDK;
export { stdutil, config, BaseFeature, CurrencyExchangeEntityBase, CurrencyExchangeSDK, SDK, };
