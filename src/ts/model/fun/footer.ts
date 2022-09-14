import $, { Cash } from 'cash-dom';
import IdHtml from '../../constants/html/id';
import ClassHtml from '../../constants/html/class';
import mergeURIs from '../../functions/files/fix_uri';
import KnownError from '../../constants/known_error';

function addFooterText(foot: Cash, text: string): boolean {
    if (text.length > 0) {
        const footer = $(`<div class="${ClassHtml.presTextFt}"></div>`);
        footer.html(text);
        foot.append(footer);
        return true;
    }
    return false;
}

function addFooterLogo(foot: Cash, root: string, logoP: string, logoCl: string): void {
    if (logoP.length > 0) {
        const footer = $(`
                <div class="${logoCl}">
                    <img src=${mergeURIs([root, logoP])} alt="NoLogo">
                </div>
            `);
        foot.append(footer);
    }
}

function checkNoFooterPdf(): void {
    const pdfSlides = $(`.${ClassHtml.presPdfP}`);
    pdfSlides
        .children(`#${IdHtml.loading}`)
        .parent()
        .find(`.${ClassHtml.presBgFt}`)
        .remove();
    pdfSlides
        .children(`.${ClassHtml.noFooter}`)
        .parent()
        .find(`.${ClassHtml.presBgFt}`)
        .remove();
}

function addFooterPdf(
    root: string,
    logoPl: string,
    logoPr: string,
    footerText: string
): void {
    const bg = $(`.${ClassHtml.presBg}`);
    const footerCon = $(`<div class="${ClassHtml.presBgFt}"></div>`);
    bg.children(`.${ClassHtml.presBgFt}`).remove();
    if (addFooterText(footerCon, footerText)) {
        addFooterLogo(footerCon, root, logoPl, ClassHtml.presLogoFtL);
        addFooterLogo(footerCon, root, logoPr, ClassHtml.presLogoFtR);
    }
    bg.append(footerCon);
    checkNoFooterPdf();
}

function addFooterSlide(
    reveal: RevealT,
    root: string,
    logoPl: string,
    logoPr: string,
    footerText: string
): void {
    const slide = reveal.getCurrentSlide();
    const slideBg = $(slide.slideBackgroundElement);
    slideBg.children(`.${ClassHtml.presBgFt}`).remove();
    const footerCon = $(`<div class="${ClassHtml.presBgFt}"></div>`);
    if (addFooterText(footerCon, footerText)) {
        addFooterLogo(footerCon, root, logoPl, ClassHtml.presLogoFtL);
        addFooterLogo(footerCon, root, logoPr, ClassHtml.presLogoFtR);
    }
    if (slide.id !== IdHtml.loading && !slide.className.includes(ClassHtml.noFooter)) {
        slideBg.append(footerCon);
    }
}

function checkIfPdfArgs(): boolean {
    const res = /print-pdf/.exec(decodeURI(window.location.search));
    return res !== null;
}

function addFooter(
    root: string,
    logoPl: string,
    logoPr: string,
    footerText: string
): void {
    if (window.RevealJs === undefined) {
        throw new KnownError('not a pres window');
    }
    const pres = window.RevealJs;
    if (checkIfPdfArgs()) {
        window.RevealJs.addKeyBinding(
            { keyCode: 70, key: 'F', description: 'add pdf footer' },
            (): void => {
                addFooterPdf(root, logoPl, logoPr, footerText);
            }
        );
    } else {
        window.RevealJs.on('slidechanged', () => {
            addFooterSlide(pres, root, logoPl, logoPr, footerText);
        });
    }
}

export default addFooter;
