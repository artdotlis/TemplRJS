import type { FooterConf, RevealJsConf, RevealJsDefConf } from '../@types/configuration';
import type { FromTo } from '../@types/project';
import type PluginRJSCon from '../@types/reveal_conf';
// @ts-expect-error: JavaScript
import Reveal from 'reveal.js';
import IdHtml from '../constants/html/id';
import KnownError from '../constants/known_error';
import getRPlConf from './fun/plugins_rjs';
import { initPres, syncPres } from './fun/reveal_js';

class RevealJsPres {
    private readonly revealDefJs: RevealJsDefConf;

    private readonly revealJs: RevealJsConf;

    private readonly footer: FooterConf;

    private readonly loading: HTMLElement;

    private readonly plConf: FromTo;

    private readonly plExt: PluginRJS[];

    private readonly root: string;

    constructor(
        revealJs: RevealJsConf,
        revealJsDef: RevealJsDefConf,
        plugins: PluginRJSCon,
        footer: FooterConf,
        root: string
    ) {
        this.root = root;
        const load = document.getElementById(IdHtml.loading);
        if (load === null) {
            throw new KnownError('Reference container not found');
        }
        this.loading = load;
        this.revealJs = revealJs;
        this.revealDefJs = revealJsDef;
        this.plConf = plugins.conf;
        this.plExt = plugins.ext;
        this.footer = footer;
        window.RevealJs = undefined;
    }

    public initReveal(): void {
        // eslint-disable-next-line ts/no-unsafe-call
        window.RevealJs = new Reveal({
            ...getRPlConf(true, this.plConf, this.plExt),
            ...this.revealJs,
            ...this.revealDefJs,
        }) as RevealT;
        syncPres(this.loading);
        initPres(
            this.root,
            this.footer.logoLeft,
            this.footer.logoRight,
            this.footer.text
        );
    }
}

export default RevealJsPres;
