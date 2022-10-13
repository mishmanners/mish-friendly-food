import type * as vite from 'vite';
export declare type TransformHook = (code: string, id: string, ssr?: boolean) => Promise<vite.TransformResult>;
interface TransformStyleWithViteOptions {
    id: string;
    source: string;
    lang: string;
    ssr?: boolean;
    viteDevServer?: vite.ViteDevServer;
}
export interface TransformStyleWithVite {
    (options: TransformStyleWithViteOptions): Promise<{
        code: string;
        map: vite.TransformResult['map'];
        deps: Set<string>;
    } | null>;
}
export declare function createTransformStyleWithViteFn(viteConfig: vite.ResolvedConfig): TransformStyleWithVite;
export {};
