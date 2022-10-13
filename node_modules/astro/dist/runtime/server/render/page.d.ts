import type { SSRResult } from '../../../@types/astro';
import type { AstroComponentFactory } from './index';
declare const needsHeadRenderingSymbol: unique symbol;
declare type NonAstroPageComponent = {
    name: string;
    [needsHeadRenderingSymbol]: boolean;
};
export declare function renderPage(result: SSRResult, componentFactory: AstroComponentFactory | NonAstroPageComponent, props: any, children: any, streaming: boolean): Promise<Response>;
export {};
