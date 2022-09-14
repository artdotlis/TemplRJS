import $ from 'cash-dom';
import KnownError from '../../constants/known_error';
import mergeURIs from '../../functions/files/fix_uri';
import readTextFile from '../../functions/files/reader';

async function findVar(varName: keyof Window, script: Promise<string>): Promise<string> {
    const scr = $('<script></script>');
    scr.html(await script);
    $('body').append(scr);
    if (!(varName in window)) {
        throw new KnownError(`variable: ${varName} cant be found on window`);
    }
    if (!(window[varName] instanceof Promise<string>)) {
        throw new KnownError(`variable: ${varName} is not a Promise`);
    }
    return window[varName];
}

function getChartData(id: string, root: string, chart: string): Promise<string> {
    switch (true) {
        case chart.endsWith('.js'):
            return findVar(id as keyof Window, readTextFile(mergeURIs([root, chart])));
        case chart.endsWith('.json'):
            return readTextFile(mergeURIs([root, chart]));
        default:
            throw new KnownError(`can not recognize chart: ${chart}`);
    }
}

export default getChartData;
