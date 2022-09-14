import { FromTo, ProjectConfCon, ProjectConfInt } from '../interfaces/project';
import { checkProjectConfCon } from '../functions/types/configs';

const PROJECT = require('../../../configs/dev/project.json');

class ProjectConf implements ProjectConfInt {
    private readonly conf: ProjectConfCon;

    constructor() {
        this.conf = checkProjectConfCon(PROJECT);
        window.ProjectConf = undefined;
    }

    public get assets(): FromTo {
        return this.conf.copy.assets;
    }

    public get plugins(): FromTo {
        return this.conf.copy.plugins;
    }

    public get confRoot(): string {
        return this.conf.conf;
    }

    public init(): void {
        window.ProjectConf = this;
    }
}

export default ProjectConf;
