declare global {
    interface CiteT {
        format(
            style: string,
            opt: {
                format: string;
                template: string;
                lang: string;
            }
        ): string;
    }

    interface RefMap {
        [id: string]: number;
    }
}

export {};
