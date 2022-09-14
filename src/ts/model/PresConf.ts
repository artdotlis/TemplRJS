import {
    PresConfCon,
    CiteJsConf,
    RevealJsConf,
    RevealJsDefConf,
    SlideConf,
    FooterConf,
    ChartConf,
} from '../interfaces/configuration';
import { checkPresConfCon, checkRevealJsDefConf } from '../functions/types/configs';
import readTextFile from '../functions/files/reader';
import mergeURIs from '../functions/files/fix_uri';
import KnownError from '../constants/known_error';

class PresConf {
    private readonly configPath: string;

    private conf?: PresConfCon;

    private rjConf?: RevealJsDefConf;

    constructor(confRoot: string) {
        this.configPath = confRoot;
    }

    public async init(): Promise<void> {
        this.conf = checkPresConfCon(
            JSON.parse(await readTextFile(mergeURIs([this.configPath, 'config.json'])))
        );
        this.rjConf = checkRevealJsDefConf(
            JSON.parse(await readTextFile(mergeURIs([this.configPath, 'reveal_js.json'])))
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
