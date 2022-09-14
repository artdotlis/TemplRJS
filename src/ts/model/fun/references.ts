import $, { Cash } from 'cash-dom';
import IdHtml from '../../constants/html/id';
import ClassHtml from '../../constants/html/class';
import AttrHtml from '../../constants/html/attr';
import KnownError from '../../constants/known_error';

function refContainerHtml(classN: string, sectId: string): [Cash, Cash] {
    const newSection = $('<section></section>');
    newSection.addClass(classN);
    newSection.addClass(ClassHtml.noFooter);
    const h4Ref = $('<h4></h4>').html('References');
    newSection.append(h4Ref);
    const divCot = $('<div></div>');
    divCot.addClass(ClassHtml.refSCon);
    newSection.attr(AttrHtml.slideVisUnc[0], AttrHtml.slideVisUnc[1]);
    divCot.attr('id', sectId);
    newSection.append(divCot);
    return [newSection, divCot];
}

function addRefLines(
    con: Cash,
    limiter: number,
    curI: number,
    hiddenRefs: HTMLCollection
): [number, RefMap] {
    const refMap: RefMap = {};
    let glL = 0;
    for (let inL = 0; inL < limiter; inL += 1) {
        glL += 1;
        const node = hiddenRefs[curI + inL];
        if (node !== undefined) {
            const copyN = $(node.outerHTML);
            refMap[copyN.attr(AttrHtml.cslId) ?? 'unknown'] = curI + inL + 1;
            copyN.addClass(ClassHtml.gridItem);
            con.append($(`<div class="${ClassHtml.gridItem}">[${curI + inL + 1}]</div>`));
            con.append(copyN);
        }
    }
    return [glL, refMap];
}

function parseReferences(
    rps: number[],
    hiddenRefs: HTMLCollection,
    slides: Cash
): RefMap {
    let refMap: RefMap = {};
    let runId = 0;
    for (let inG = 0; inG < hiddenRefs.length; inG += 1) {
        const curId = IdHtml.refSConId + runId;
        const curCont = refContainerHtml(slides.attr('class') ?? '', curId);
        const limiter = rps[runId] ?? 5;
        const res = addRefLines(curCont[1], limiter, inG, hiddenRefs);
        inG += res[0];
        refMap = { ...refMap, ...res[1] };
        slides.append(curCont[0]);
        runId += 1;
    }
    return refMap;
}

function initRefSlides(container: Cash, slides: Cash, rps: number[]): void {
    const hiddenRefs = container.children()[0]?.children;
    if (hiddenRefs === undefined) {
        throw new KnownError('could not find reference container');
    }
    const resMap: RefMap = parseReferences(rps, hiddenRefs, slides);
    if (hiddenRefs.length === 0) {
        slides.remove();
    }
    if (resMap['unknown'] !== undefined) {
        throw new KnownError(
            'some references are missing a valid id or a wrong was window given'
        );
    }
    window.RefMap = resMap;
}

function replaceRef(): void {
    if (window.RefMap === undefined || window.Slides === undefined) {
        throw new KnownError('presentation not finished initializing yet');
    }
    const refCont = $(`.${ClassHtml.replRef}`);
    for (const ele of refCont) {
        const jqEle = $(ele);
        const attrRepl = jqEle.attr(AttrHtml.replRef) ?? '';
        jqEle.html(`[${window.RefMap[attrRepl]}]` ?? 'U');
    }
}

function replaceRefPr(): void {
    const interval = setInterval(() => {
        if (window.RefMap === undefined || window.Slides === undefined) {
            console.log('waiting for references to load!');
        } else {
            replaceRef();
            console.log('references replaced!');
            clearInterval(interval);
        }
    }, 500);
    console.log('started replacing refs');
}

export { initRefSlides, replaceRefPr };
