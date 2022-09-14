import $, { Cash } from 'cash-dom';
import IdHtml from '../constants/html/id';
import { SlideConf } from '../interfaces/configuration';
import initSlides from './fun/slides';

class SlidesMd {
    private readonly root: string;

    private readonly slidesConf: SlideConf[];

    private readonly slidesCon: Cash;

    constructor(slidesConf: SlideConf[], root: string) {
        this.root = root;
        this.slidesCon = $(`#${IdHtml.slidesMd}`);
        this.slidesConf = slidesConf;
        window.Slides = undefined;
    }

    public initSlides(): void {
        initSlides(this.slidesCon, this.slidesConf, this.root).then(() => {
            window.Slides = 'loaded';
        });
    }
}

export default SlidesMd;
