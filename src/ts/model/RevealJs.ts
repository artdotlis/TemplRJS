import $, { Cash } from 'cash-dom';
// @ts-ignore
import Reveal from 'reveal.js';
import { initPres, syncPres } from './fun/reveal_js';
import { FooterConf, RevealJsConf, RevealJsDefConf } from '../interfaces/configuration';
import getRPlConf from './fun/plugins_rjs';
import { FromTo } from '../interfaces/project';
import IdHtml from '../constants/html/id';
import PluginRJSCon from '../interfaces/reveal_conf';

class RevealJsPres {
    private readonly revealDefJs: RevealJsDefConf;

    private readonly revealJs: RevealJsConf;

    private readonly footer: FooterConf;

    private readonly loading: Cash;

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
        this.loading = $(`#${IdHtml.loading}`);
        this.revealJs = revealJs;
        this.revealDefJs = revealJsDef;
        this.plConf = plugins.conf;
        this.plExt = plugins.ext;
        this.footer = footer;
        window.RevealJs = undefined;
    }

    public initReveal(): void {
        window.RevealJs = new Reveal({
            ...getRPlConf(true, this.plConf, this.plExt),
            ...this.revealJs,
            ...this.revealDefJs,
        });
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
