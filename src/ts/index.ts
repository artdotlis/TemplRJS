import IndCtrl from './ctrl/IndCtrl';
import initFontAwesome from './functions/libs/font';
import ProjectConf from './ctrl/ProjectConf';

// styles
import 'reveal.js/dist/reveal.css';
import '../css/reveal_js.scss';
import '../css/index.css';
import KnownError from './constants/known_error';

initFontAwesome();

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
