import KnownError from '../../constants/known_error';
import { PresConfCon, RevealJsDefConf } from '../../interfaces/configuration';
import { FromTo, ProjectConfCon } from '../../interfaces/project';

function check4Prop(obj2Test: object, propList: string[]): void {
    for (const prop of propList) {
        if (!(prop in obj2Test)) {
            throw new KnownError(`missing property ${prop}`);
        }
    }
}

function isPresConfCon(config: unknown): config is PresConfCon {
    if (typeof config !== 'object' || config === null) {
        return false;
    }
    check4Prop(config, ['revealJs', 'citeJs', 'slides', 'charts', 'footer']);
    return true;
}

function isProjectConfCon(config: unknown): config is ProjectConfCon {
    if (typeof config !== 'object' || config === null) {
        return false;
    }
    check4Prop(config, ['copy', 'conf']);
    return true;
}

function isRevealJsDefConf(config: unknown): config is RevealJsDefConf {
    if (typeof config !== 'object' || config === null) {
        return false;
    }
    check4Prop(config, [
        'controls',
        'controlsTutorial',
        'controlsLayout',
        'controlsBackArrows',
        'progress',
        'slideNumber',
        'showSlideNumber',
        'hashOneBasedIndex',
        'hash',
        'respondToHashChanges',
        'history',
        'keyboard',
        'keyboardCondition',
        'disableLayout',
        'overview',
        'center',
        'touch',
        'loop',
        'rtl',
        'navigationMode',
        'shuffle',
        'fragments',
        'fragmentInURL',
        'embedded',
        'help',
        'pause',
        'showNotes',
        'autoPlayMedia',
        'preloadIframes',
        'autoAnimate',
        'autoAnimateMatcher',
        'autoAnimateEasing',
        'autoAnimateDuration',
        'autoAnimateUnmatched',
        'autoAnimateStyles',
        'autoSlide',
        'autoSlideStoppable',
        'autoSlideMethod',
        'mouseWheel',
        'previewLinks',
        'postMessage',
        'postMessageEvents',
        'focusBodyOnPageVisibilityChange',
        'transition',
        'transitionSpeed',
        'backgroundTransition',
        'pdfMaxPagesPerSlide',
        'pdfSeparateFragments',
        'pdfPageHeightOffset',
        'viewDistance',
        'mobileViewDistance',
        'display',
        'hideInactiveCursor',
        'hideCursorTime',
        'margin',
        'width',
        'height',
        'minScale',
        'maxScale',
    ]);
    return true;
}

function checkPresSlides(config: PresConfCon): void {
    for (const slide of config.slides) {
        check4Prop(slide, [
            'md',
            'dataSeparator',
            'dataSeparatorVertical',
            'dataSeparatorNotes',
        ]);
    }
}
function checkPresCharts(config: PresConfCon): void {
    for (const chart of config.charts) {
        check4Prop(chart, ['type', 'data', 'options', 'id']);
    }
}

function checkPresConfCon(config: unknown): PresConfCon {
    if (isPresConfCon(config)) {
        check4Prop(config.revealJs, ['defaultTiming', 'totalTime']);
        check4Prop(config.citeJs, [
            'reference',
            'refsPerSection',
            'language',
            'style',
            'template',
            'local',
        ]);
        check4Prop(config.footer, ['logoLeft', 'logoRight', 'text']);
        checkPresSlides(config);
        checkPresCharts(config);

        return config;
    }
    throw new KnownError('config is not a valid object');
}

function disableOnPdf(config: RevealJsDefConf): RevealJsDefConf {
    const modConfig = structuredClone(config);
    if (/print-pdf/.exec(decodeURI(window.location.search)) !== null) {
        modConfig.slideNumber = false;
    }
    return modConfig;
}

function checkRevealJsDefConf(config: unknown): RevealJsDefConf {
    if (isRevealJsDefConf(config)) {
        return disableOnPdf(config);
    }
    throw new KnownError('config is not a valid object');
}

function checkProjectElements(toCopy: FromTo): void {
    for (const frto in toCopy) {
        if (frto in toCopy) {
            if (typeof toCopy[frto] !== 'object') {
                throw new KnownError(`copy->${toCopy}->${frto} is not an object`);
            }
            check4Prop(toCopy[frto] ?? {}, ['from', 'to']);
        }
    }
}

function checkProjectConfCon(config: unknown): ProjectConfCon {
    if (isProjectConfCon(config)) {
        check4Prop(config.copy, ['plugins', 'assets']);
        checkProjectElements(config.copy.assets);
        checkProjectElements(config.copy.plugins);
        return config;
    }
    throw new KnownError('config is not a valid object');
}

export { checkProjectConfCon, checkPresConfCon, checkRevealJsDefConf };
