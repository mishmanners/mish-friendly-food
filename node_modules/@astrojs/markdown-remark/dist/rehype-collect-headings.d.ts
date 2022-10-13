import type { MarkdownHeading, RehypePlugin } from './types.js';
export default function createCollectHeadings(): {
    headings: MarkdownHeading[];
    rehypeCollectHeadings: () => ReturnType<RehypePlugin>;
};
