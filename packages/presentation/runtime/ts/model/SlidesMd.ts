import type { SlideConf } from '../@types/configuration';
import IdHtml from '../constants/html/id';
import KnownError from '../constants/known_error';
import initSlides from './fun/slides';

class SlidesMd {
    private readonly root: string;

    private readonly slidesConf: SlideConf[];

    private readonly slidesCon: HTMLElement;

    constructor(slidesConf: SlideConf[], root: string) {
        this.root = root;
        const slidesContainer = document.getElementById(IdHtml.slidesMd);
        if (slidesContainer === null) {
            throw new KnownError('Slides container not found');
        }
        this.slidesCon = slidesContainer;
        this.slidesConf = slidesConf;
        window.Slides = undefined;
    }

    public initSlides(): void {
        void initSlides(this.slidesCon, this.slidesConf, this.root).then(() => {
            window.Slides = 'loaded';
        });
    }
}

export default SlidesMd;
