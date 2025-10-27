import type { SlideConf } from '../../@types/configuration';
import mergeURIs from '../../functions/files/fix_uri';

async function initSlides(
    slCont: HTMLElement,
    mdSlides: SlideConf[],
    root: string
): Promise<void> {
    for (const slide of mdSlides) {
        const section = document.createElement('section');
        section.setAttribute('data-markdown', `.${mergeURIs([root, slide.md])}`);
        section.setAttribute('data-separator', `${slide.dataSeparator}`);
        section.setAttribute('data-separator-vertical', `${slide.dataSeparatorVertical}`);
        section.setAttribute('data-separator-notes', `${slide.dataSeparatorNotes}`);
        slCont.before(section);
    }
    slCont.remove();
}

export default initSlides;
