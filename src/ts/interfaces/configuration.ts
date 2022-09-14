import { ChartType, ChartOptions } from 'chart.js';

interface RevealJsConf {
    defaultTiming?: number | undefined;
    totalTime: number;
}

interface RevealJsDefConf {
    controls: boolean;
    controlsTutorial: boolean;
    controlsLayout: 'edges' | 'bottom-right';
    controlsBackArrows: 'faded' | 'hidden' | 'visible';
    progress: boolean;
    slideNumber: boolean | 'h.v' | 'h/v' | 'c' | 'c/t';
    showSlideNumber: 'all' | 'print' | 'speaker';
    hashOneBasedIndex: boolean;
    hash: boolean;
    respondToHashChanges: boolean;
    history: boolean;
    keyboard: boolean;
    keyboardCondition?: 'focused' | undefined;
    disableLayout: boolean;
    overview: boolean;
    center: boolean;
    touch: boolean;
    loop: boolean;
    rtl: boolean;
    navigationMode: 'default' | 'linear' | 'grid';
    shuffle: boolean;
    fragments: boolean;
    fragmentInURL: boolean;
    embedded: boolean;
    help: boolean;
    pause: boolean;
    showNotes: boolean;
    autoPlayMedia?: boolean | undefined;
    preloadIframes?: boolean | undefined;
    autoAnimate: boolean;
    autoAnimateMatcher?: string | undefined;
    autoAnimateEasing: string;
    autoAnimateDuration: number;
    autoAnimateUnmatched: boolean;
    autoAnimateStyles: string[];
    autoSlide: false | number;
    autoSlideStoppable: boolean;
    autoSlideMethod?: string | undefined;
    mouseWheel: boolean;
    previewLinks: boolean;
    postMessage: boolean;
    postMessageEvents: boolean;
    focusBodyOnPageVisibilityChange: boolean;
    transition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
    transitionSpeed: 'default' | 'fast' | 'slow';
    backgroundTransition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
    pdfMaxPagesPerSlide: number;
    pdfSeparateFragments: boolean;
    pdfPageHeightOffset: number;
    viewDistance: number;
    mobileViewDistance: number;
    display: string;
    hideInactiveCursor: boolean;
    hideCursorTime: number;
    margin: number;
    width: number;
    height: number;
    minScale: number;
    maxScale: number;
}

interface CiteJsConf {
    reference: string;
    refsPerSection: number[];
    language: string;
    style: string;
    template: string;
    local: string;
}

interface SlideConf {
    md: string;
    dataSeparator: string;
    dataSeparatorVertical: string;
    dataSeparatorNotes: string;
}

interface ChartConf {
    id: string;
    type: ChartType;
    data: string;
    options?: ChartOptions | undefined;
}

interface FooterConf {
    logoRight: string;
    logoLeft: string;
    text: string;
}

interface PresConfCon {
    revealJs: RevealJsConf;
    citeJs: CiteJsConf;
    slides: SlideConf[];
    charts: ChartConf[];
    footer: FooterConf;
}

export {
    PresConfCon,
    RevealJsConf,
    RevealJsDefConf,
    CiteJsConf,
    SlideConf,
    FooterConf,
    ChartConf,
};
