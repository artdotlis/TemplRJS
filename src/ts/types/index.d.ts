import { ProjectConfInt } from '../interfaces/project';

declare global {
    interface WindowPres {
        RevealJs?: RevealT | undefined;
        CiteJs?: CiteT | undefined;
        RefMap?: RefMap | undefined;
        Slides?: 'loaded' | undefined;
    }

    interface WindowProject {
        ProjectConf?: ProjectConfInt | undefined;
    }
    interface Window extends WindowPres, WindowProject {
        bootstrap(): void;
    }
}
export {};
