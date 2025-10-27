import KnownError from './constants/known_error';
import IndCtrl from './controller/IndCtrl';

import ProjectConf from './controller/ProjectConf';
// styles
import '@phosphor-icons/web/regular';
import '@fontsource-variable/rubik';

import 'reveal.js/dist/reveal.css';

import '../css/reveal_js.scss';
// ---------------------------------------------

import '../css/index.css';

window.bootstrap = (): void => {
    try {
        new ProjectConf().init();
        new IndCtrl().init();
    } catch (err) {
        if (err instanceof KnownError) {
            alert(err);
        }
        throw err;
    }
};

console.log('index loaded');
