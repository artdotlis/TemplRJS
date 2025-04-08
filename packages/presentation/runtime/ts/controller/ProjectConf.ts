import type { FromTo, ProjectConfCon, ProjectConfInt } from '../@types/project';

import PROJECT from '../constants/project';

class ProjectConf implements ProjectConfInt {
    private readonly conf: ProjectConfCon;

    constructor() {
        this.conf = PROJECT;
        window.ProjectConf = undefined;
    }

    public get assets(): FromTo {
        return this.conf.assets;
    }

    public get plugins(): FromTo {
        return this.conf.plugins;
    }

    public init(): void {
        window.ProjectConf = this;
    }
}

export default ProjectConf;
