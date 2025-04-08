import type { ProjectConfCon } from '../@types/project';

const PROJECT: ProjectConfCon = {
    assets: {
        main: {
            from: './assets',
            to: 'assets/',
        },
        config: {
            from: './configs',
            to: 'configs/',
        },
        root: {
            from: './public',
            to: '',
        },
    },
    plugins: {
        katex: {
            from: '../../node_modules/katex',
            to: 'js/extra/katex/',
        },
    },
};

export default PROJECT;
