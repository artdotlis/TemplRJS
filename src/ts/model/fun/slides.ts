import $, { Cash } from 'cash-dom';
import mergeURIs from '../../functions/files/fix_uri';
import { SlideConf } from '../../interfaces/configuration';

async function initSlides(
    slCont: Cash,
    mdSlides: SlideConf[],
    root: string
): Promise<void> {
    for (const slide of mdSlides) {
        slCont.before(
            $(
                `<section 
                data-markdown='.${mergeURIs([root, slide.md])}'
                data-separator='${slide.dataSeparator}' 
                data-separator-vertical='${slide.dataSeparatorVertical}' 
                data-separator-notes='${slide.dataSeparatorNotes}'
                ></section>`
            )
        );
    }
    slCont.remove();
}

export default initSlides;
