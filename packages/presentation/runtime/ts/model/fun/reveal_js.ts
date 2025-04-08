import addFooter from './footer';

function finishSync(loading: HTMLElement, interval: NodeJS.Timeout, rvjs: RevealT): void {
    if (/print-pdf/.exec(decodeURI(window.location.search)) === null) {
        loading.remove();
    }
    rvjs.sync();
    try {
        rvjs.slide(0, 0, 0);
    }
    catch (err: unknown) {
        console.error('slide finished moving', err);
    }
    console.log('synced reveal.js');
    clearInterval(interval);
}

function syncPres(loading: HTMLElement): void {
    const interval = setInterval(() => {
        if (
            window.RevealJs === undefined
            || window.RefMap === undefined
            || window.Slides === undefined
        ) {
            console.log('waiting for reveal.js to load!');
        }
        else {
            finishSync(loading, interval, window.RevealJs);
        }
    }, 2000);
    console.log('started syncing');
}

function initPres(root: string, fLogoL: string, fLogoR: string, fText: string): void {
    const interval = setInterval(() => {
        if (window.RevealJs === undefined || window.Slides === undefined) {
            console.log('waiting for slides to load!');
        }
        else {
            window.RevealJs.initialize()
                .then(() => {
                    addFooter(root, fLogoL, fLogoR, fText);
                })
                .catch((err: unknown) => console.error(err));
            console.log('initialized reveal.js');
            clearInterval(interval);
        }
    }, 500);
    console.log('started initializing');
}

export { initPres, syncPres };
