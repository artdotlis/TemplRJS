import $, { Cash } from 'cash-dom';
import mergeURIs from '../functions/files/fix_uri';
import { CiteJsConf } from '../interfaces/configuration';
import IdHtml from '../constants/html/id';
import { formatCitation, initCitation } from './fun/citation';
import { initRefSlides, replaceRefPr } from './fun/references';

class RefPres {
    private readonly refCont: Cash;

    private readonly refHid: Cash;

    private readonly refConf: CiteJsConf;

    private readonly root: string;

    constructor(refConf: CiteJsConf, root: string) {
        this.refCont = $(`#${IdHtml.slidesRef}`);
        this.refHid = $(`#${IdHtml.refCont}`);
        this.refConf = refConf;
        this.root = root;
        window.CiteJs = undefined;
        window.RefMap = undefined;
    }

    public initRef(): void {
        this.refCont.html('');
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
        ).then(() => {
            this.refHid.html(
                formatCitation(this.refConf.template, this.refConf.language)
            );
            initRefSlides(this.refHid, this.refCont, this.refConf.refsPerSection);
            this.refHid.html('');
            replaceRefPr();
        });
    }
}

export default RefPres;
