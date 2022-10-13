import { Data } from 'vfile';
import type { AstroConfig, MarkdownAstroData } from '../@types/astro';
export declare function getFileInfo(id: string, config: AstroConfig): {
    fileId: string;
    fileUrl: string | undefined;
};
export declare function safelyGetAstroData(vfileData: Data): MarkdownAstroData;
