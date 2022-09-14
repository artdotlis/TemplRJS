// plugins
// @ts-ignore
import RMarkdown from 'reveal.js/plugin/markdown/markdown';
// @ts-ignore
import RMath from 'reveal.js/plugin/math/math';
// @ts-ignore
import RHighlight from 'reveal.js/plugin/highlight/highlight';
// @ts-ignore
import RNotes from 'reveal.js/plugin/notes/notes';
// @ts-ignore
import RZoom from 'reveal.js/plugin/zoom/zoom';
import { FromTo } from '../../interfaces/project';
import KnownError from '../../constants/known_error';

// ----------------------------------

const revealPlugins: PluginRJS[] = [
    // markdown
    RMarkdown,
    // math
    RMath.KaTeX,
    // highlight code
    RHighlight,
    // zoom
    RZoom,
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
            plugins: [...revealPlugins, ...(notes ? [RNotes] : []), ...exPl],
        },
    };
}

export default getRPlConf;
