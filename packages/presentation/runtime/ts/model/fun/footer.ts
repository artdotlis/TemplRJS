import ClassHtml from '../../constants/html/class';
import IdHtml from '../../constants/html/id';
import KnownError from '../../constants/known_error';
import mergeURIs from '../../functions/files/fix_uri';

function addFooterText(foot: HTMLElement, text: string): boolean {
    if (text.length > 0) {
        const footer = document.createElement('div');
        footer.setAttribute('class', ClassHtml.presTextFt);
        footer.innerHTML = text;
        foot.append(footer);
        return true;
    }
    return false;
}

function addFooterLogo(
    foot: HTMLElement,
    root: string,
    logoP: string,
    logoCl: string
): void {
    if (logoP.length > 0) {
        const footer = document.createElement('div');
        footer.setAttribute('class', logoCl);
        const img = document.createElement('img');
        img.src = mergeURIs([root, logoP]);
        img.alt = 'NoLogo';
        footer.append(img);
        foot.append(footer);
    }
}

function checkNoFooterPdf(): void {
    const pdfSlides = document.querySelectorAll(`.${ClassHtml.presPdfP}`);
    const toDel = [];
    for (const pdf of pdfSlides) {
        if (pdf.querySelector(`#${IdHtml.loading}`) !== null) {
            toDel.push(...pdf.querySelectorAll(`.${ClassHtml.presBgFt}`));
        } else if (pdf.querySelector(`.${ClassHtml.noFooter}`) !== null) {
            toDel.push(...pdf.querySelectorAll(`.${ClassHtml.presBgFt}`));
        }
    }
    for (const delEl of toDel) {
        delEl.remove();
    }
}

function addFooterPdf(
    root: string,
    logoPl: string,
    logoPr: string,
    footerText: string
): void {
    const bgs = document.querySelectorAll(`.${ClassHtml.presBg}`);
    const footerCon = document.createElement('div');
    footerCon.className = ClassHtml.presBgFt;
    const bgFtAll =
        document.querySelectorAll(`.${ClassHtml.presBg} .${ClassHtml.presBgFt}`) ?? [];
    for (const bgFt of bgFtAll) {
        bgFt.remove();
    }
    if (addFooterText(footerCon, footerText)) {
        addFooterLogo(footerCon, root, logoPl, ClassHtml.presLogoFtL);
        addFooterLogo(footerCon, root, logoPr, ClassHtml.presLogoFtR);
    }
    for (const bfE of bgs) {
        bfE.append(footerCon.cloneNode(true));
    }
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
    const slideBg = slide.slideBackgroundElement;
    const sliBgAll = slideBg.querySelectorAll(`.${ClassHtml.presBgFt}`) ?? [];
    for (const sliBg of sliBgAll) {
        sliBg.remove();
    }
    const footerCon = document.createElement('div');
    footerCon.className = ClassHtml.presBgFt;
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
