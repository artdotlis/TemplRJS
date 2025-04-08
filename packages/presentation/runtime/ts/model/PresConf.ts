import type {
    ChartConf,
    CiteJsConf,
    FooterConf,
    PresConfCon,
    RevealJsConf,
    RevealJsDefConf,
    SlideConf,
} from '../@types/configuration';
import KnownError from '../constants/known_error';
import mergeURIs from '../functions/files/fix_uri';
import readTextFile from '../functions/files/reader';
import DeckConfig from '../schema/deck';
import RevealJSConfig from '../schema/revealjs';

const CONFIG_PATH = 'configs';

class PresConf {
    private conf?: PresConfCon;

    private rjConf?: RevealJsDefConf;

    public async init(): Promise<void> {
        this.conf = DeckConfig.parse(
            JSON.parse(await readTextFile(mergeURIs([CONFIG_PATH, 'deck.config.json']))),
        );
        this.rjConf = RevealJSConfig.parse(
            JSON.parse(
                await readTextFile(mergeURIs([CONFIG_PATH, 'revealjs.config.json'])),
            ),
        );
    }

    private get getConf(): PresConfCon {
        if (this.conf === undefined) {
            throw new KnownError('conf was not initialized');
        }
        return this.conf;
    }

    public get citeJs(): CiteJsConf {
        return this.getConf.citeJs;
    }

    public get revealJs(): RevealJsConf {
        return this.getConf.revealJs;
    }

    public get revealDefJs(): RevealJsDefConf {
        if (this.rjConf === undefined) {
            throw new KnownError('rj-conf was not initialized');
        }
        return this.rjConf;
    }

    public get slides(): SlideConf[] {
        return this.getConf.slides;
    }

    public get charts(): ChartConf[] {
        return this.getConf.charts;
    }

    public get footer(): FooterConf {
        return this.getConf.footer;
    }
}

export default PresConf;
