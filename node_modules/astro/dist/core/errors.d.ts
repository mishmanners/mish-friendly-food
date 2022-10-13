import type { ErrorPayload, Logger, LogLevel, ViteDevServer } from 'vite';
export declare enum AstroErrorCodes {
    UnknownError = 1000,
    ConfigError = 1001,
    UnknownCompilerError = 2000,
    UnknownCompilerCSSError = 2001
}
export interface ErrorWithMetadata {
    [name: string]: any;
    message: string;
    stack: string;
    code?: number;
    hint?: string;
    id?: string;
    frame?: string;
    plugin?: string;
    pluginCode?: string;
    loc?: {
        file?: string;
        line: number;
        column: number;
    };
}
export declare function cleanErrorStack(stack: string): string;
/**
 * Update the error message to correct any vite-isms that we don't want to expose to the user.
 * The `server` is required if the error may come from `server.ssrLoadModule()`.
 */
export declare function fixViteErrorMessage(_err: unknown, server?: ViteDevServer, filePath?: URL): Error;
export declare function createCustomViteLogger(logLevel: LogLevel): Logger;
/**
 * Takes any error-like object and returns a standardized Error + metadata object.
 * Useful for consistent reporting regardless of where the error surfaced from.
 */
export declare function collectErrorMetadata(e: any, filePath?: URL): ErrorWithMetadata;
export declare function getViteErrorPayload(err: ErrorWithMetadata): ErrorPayload;
