import type { SSRResult } from '../../../@types/astro';
export declare function renderHead(result: SSRResult): Promise<string>;
export declare function maybeRenderHead(result: SSRResult): AsyncIterable<string>;
