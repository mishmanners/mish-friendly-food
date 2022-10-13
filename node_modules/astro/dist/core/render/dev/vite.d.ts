import vite from 'vite';
/** recursively crawl the module graph to get all style files imported by parent id */
export declare function crawlGraph(viteServer: vite.ViteDevServer, _id: string, isRootFile: boolean, scanned?: Set<string>): AsyncGenerator<vite.ModuleNode, void, unknown>;
