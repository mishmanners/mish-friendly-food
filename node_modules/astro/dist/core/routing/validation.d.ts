import type { ComponentInstance, GetStaticPathsResult } from '../../@types/astro';
import type { LogOptions } from '../logger/core';
/** Throws error for invalid parameter in getStaticPaths() response */
export declare function validateGetStaticPathsParameter([key, value]: [string, any]): void;
/** Warn or error for deprecated or malformed route components */
export declare function validateDynamicRouteModule(mod: ComponentInstance, { ssr, logging, }: {
    ssr: boolean;
    logging: LogOptions;
}): void;
/** Throw error for malformed getStaticPaths() response */
export declare function validateGetStaticPathsResult(result: GetStaticPathsResult, logging: LogOptions): void;
