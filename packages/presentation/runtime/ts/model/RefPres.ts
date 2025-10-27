import type { CiteJsConf } from '../@types/configuration';
import IdHtml from '../constants/html/id';
import KnownError from '../constants/known_error';
import mergeURIs from '../functions/files/fix_uri';
import { formatCitation, initCitation } from './fun/citation';
import { initRefSlides, replaceRefPr } from './fun/references';

class RefPres {
    private readonly refCont: HTMLElement;

    private readonly refHid: HTMLElement;

    private readonly refConf: CiteJsConf;

    private readonly root: string;

    constructor(refConf: CiteJsConf, root: string) {
        const refC = document.getElementById(IdHtml.slidesRef);
        const refH = document.getElementById(IdHtml.refCont);
        if (refC === null || refH === null) {
            throw new KnownError('Reference container not found');
        }
        this.refCont = refC;
        this.refHid = refH;
        this.refConf = refConf;
        this.root = root;
        window.CiteJs = undefined;
        window.RefMap = undefined;
    }

    public initRef(): void {
        this.refCont.innerHTML = '';
        let rps = this.refConf.refsPerSection;
        if (rps.length < 1) {
            rps = [5];
        }
        initCitation(
            mergeURIs([this.root, this.refConf.reference]),
            this.refConf.style,
            this.refConf.language,
            mergeURIs([this.root, this.refConf.template]),
            mergeURIs([this.root, this.refConf.local])
        )
            .then(() => {
                this.refHid.innerHTML = formatCitation(
                    this.refConf.template,
                    this.refConf.language
                );
                initRefSlides(this.refHid, this.refCont, this.refConf.refsPerSection);
                this.refHid.innerHTML = '';
                replaceRefPr();
            })
            .catch((err: unknown) => console.error(err));
    }
}

export default RefPres;
