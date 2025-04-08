import type { FromTo } from '../../@types/project';
// @ts-expect-error: JavaScript
import RHighlight from 'reveal.js/plugin/highlight/highlight';
// plugins
// @ts-expect-error: JavaScript
import RMarkdown from 'reveal.js/plugin/markdown/markdown';
// @ts-expect-error: JavaScript
import RMath from 'reveal.js/plugin/math/math';
// @ts-expect-error: JavaScript
import RNotes from 'reveal.js/plugin/notes/notes';
// @ts-expect-error: JavaScript
import RZoom from 'reveal.js/plugin/zoom/zoom';
import KnownError from '../../constants/known_error';

// ----------------------------------
const { KaTeX } = RMath as {
    KaTeX: PluginRJS;
};

const revealPlugins: PluginRJS[] = [
    // markdown
    RMarkdown as PluginRJS,
    // math
    KaTeX,
    // highlight code
    RHighlight as PluginRJS,
    // zoom
    RZoom as PluginRJS,
];

function getRevealPluginsConf(plugins: FromTo): ConfET {
    const { katex } = plugins;
    if (katex === undefined) {
        throw new KnownError('katex plugin not found');
    }
    return {
        markdown: {
            smartypants: true,
        },
        katex: {
            local: katex.to,
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true },
            ],
        },
    };
}
interface ConfET {
    markdown: {
        smartypants: boolean;
    };
    katex: {
        local: string;
        delimiters: { left: string; right: string; display: boolean }[];
    };
}
interface ConfT extends ConfET {
    plugins: PluginRJS[];
}

function getRPlConf(notes: boolean, pConf: FromTo, exPl: PluginRJS[]): ConfT {
    return {
        ...getRevealPluginsConf(pConf),
        ...{
            plugins: [...revealPlugins, ...(notes ? [RNotes as PluginRJS] : []), ...exPl],
        },
    };
}

export default getRPlConf;
