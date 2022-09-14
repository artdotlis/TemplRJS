interface FromTo {
    [name: string]: {
        from: string;
        to: string;
    };
}
interface PrCopy {
    plugins: FromTo;
    assets: FromTo;
}

interface ProjectConfCon {
    copy: PrCopy;
    conf: string;
}

interface ProjectConfInt {
    get assets(): FromTo;
    get plugins(): FromTo;
    get confRoot(): string;
    init(): void;
}

export { ProjectConfCon, PrCopy, FromTo, ProjectConfInt };
