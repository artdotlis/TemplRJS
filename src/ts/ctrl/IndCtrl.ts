import RevealJsPres from '../model/RevealJs';
import RefPres from '../model/RefPres';
import PresConf from '../model/PresConf';
import SlidesMd from '../model/SlidesMd';
import { ProjectConfInt } from '../interfaces/project';
import KnownError from '../constants/known_error';
import ChartsJs from '../model/ChartsJs';
import SlScLoad from '../model/plugin/SlScLoad';

class IndCtrl {
    private readonly confPres: PresConf;

    private readonly confProject: ProjectConfInt;

    private rjsPres?: RevealJsPres;

    private refPres?: RefPres;

    private slides?: SlidesMd;

    private charts?: ChartsJs;

    constructor() {
        if (window.ProjectConf === undefined) {
            throw new KnownError('project was not initialized');
        }
        this.confProject = window.ProjectConf;
        this.confPres = new PresConf(this.confProject.confRoot);
    }

    private async construct(): Promise<void> {
        await this.confPres.init();
        console.log('pres conf finished');
        this.charts = new ChartsJs(this.confPres.charts, this.assetsRoot);
        this.slides = new SlidesMd(this.confPres.slides, this.assetsRoot);
        const plCon = {
            conf: this.confProject.plugins,
            ext: [...this.charts.plugins, new SlScLoad()],
        };
        this.rjsPres = new RevealJsPres(
            this.confPres.revealJs,
            this.confPres.revealDefJs,
            plCon,
            this.confPres.footer,
            this.assetsRoot
        );
        this.refPres = new RefPres(this.confPres.citeJs, this.assetsRoot);
    }

    private get assetsRoot(): string {
        const { main } = this.confProject.assets;
        if (main === undefined) {
            throw new KnownError('main asset not found');
        }
        return main.to;
    }

    public init(): void {
        this.construct().then((): void => {
            this.rjsPres?.initReveal();
            this.slides?.initSlides();
            this.refPres?.initRef();
        });
    }
}

export default IndCtrl;
