interface FromToEl {
    from: string;
    to: string;
}

interface FromTo {
    [name: string]: FromToEl;
}

interface ProjectConfCon {
    plugins: FromTo;
    assets: FromTo;
}

interface ProjectConfInt {
    get assets(): FromTo;
    get plugins(): FromTo;
    init: () => void;
}

export { FromTo, FromToEl, ProjectConfCon, ProjectConfInt };
