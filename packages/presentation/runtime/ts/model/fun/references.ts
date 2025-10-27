import AttrHtml from '../../constants/html/attr';
import ClassHtml from '../../constants/html/class';
import IdHtml from '../../constants/html/id';
import KnownError from '../../constants/known_error';

function refContainerHtml(
    classN: DOMTokenList,
    sectId: string
): [HTMLElement, HTMLElement] {
    const newSection = document.createElement('section');
    newSection.classList.add(...classN, ClassHtml.noFooter);
    const h4Ref = document.createElement('h4');
    h4Ref.textContent = 'References';
    newSection.append(h4Ref);
    const divCot = document.createElement('div');
    divCot.classList.add(ClassHtml.refSCon);
    newSection.setAttribute(AttrHtml.slideVisUnc[0], AttrHtml.slideVisUnc[1]);
    divCot.id = sectId;
    newSection.append(divCot);
    return [newSection, divCot];
}

function addRefLines(
    con: HTMLElement,
    limiter: number,
    curI: number,
    hiddenRefs: Element[]
): [number, RefMap] {
    const refMap: RefMap = {};
    let glL = 0;
    for (let inL = 0; inL < limiter; inL += 1) {
        glL += 1;
        const node = hiddenRefs[curI + inL];
        if (node !== undefined) {
            const copyN = document.createElement(node.tagName);
            copyN.innerHTML = node.innerHTML;
            refMap[node.getAttribute(AttrHtml.cslId) ?? 'unknown'] = curI + inL + 1;
            copyN.classList.add(ClassHtml.gridItem);
            const preC = document.createElement('div');
            preC.className = ClassHtml.gridItem;
            preC.textContent = `[${curI + inL + 1}]`;
            con.append(preC);
            con.append(copyN);
        }
    }
    return [glL, refMap];
}

function parseReferences(
    rps: number[],
    hiddenRefs: Element[],
    slides: HTMLElement
): RefMap {
    let refMap: RefMap = {};
    let runId = 0;
    for (let inG = 0; inG < hiddenRefs.length; inG += 1) {
        const curId = IdHtml.refSConId + runId;
        const curCont = refContainerHtml(slides.classList, curId);
        const limiter = rps[runId] ?? 5;
        const res = addRefLines(curCont[1], limiter, inG, hiddenRefs);
        inG += res[0];
        refMap = { ...refMap, ...res[1] };
        slides.append(curCont[0]);
        runId += 1;
    }
    return refMap;
}

function initRefSlides(container: HTMLElement, slides: HTMLElement, rps: number[]): void {
    const hiddenRefs = [];
    for (const ref of container.children) {
        for (const cit of ref.children) {
            hiddenRefs.push(cit);
        }
    }
    if (hiddenRefs.length === 0) {
        throw new KnownError('could not find reference container');
    }
    const resMap: RefMap = parseReferences(rps, hiddenRefs, slides);
    if (hiddenRefs.length === 0) {
        slides.remove();
    }
    if (resMap.unknown !== undefined) {
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
    const refCont = document.querySelectorAll(`.${ClassHtml.replRef}`);
    for (const ele of refCont) {
        const attrRepl = ele.getAttribute(AttrHtml.replRef) ?? '';
        ele.innerHTML = `[${window.RefMap[attrRepl] ?? 'U'}]`;
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
