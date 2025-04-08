import KnownError from '../../constants/known_error';
import mergeURIs from '../../functions/files/fix_uri';
import readTextFile from '../../functions/files/reader';

async function findVar(varName: keyof Window, script: Promise<string>): Promise<string> {
    const scr = document.createElement('script');
    scr.type = 'text/javascript';
    scr.innerHTML = String(await script);
    document.body.append(scr);
    if (!(varName in window)) {
        throw new KnownError(`variable: ${varName} cant be found on window`);
    }
    const winVN = window[varName] as unknown;
    if (!(winVN instanceof Promise)) {
        throw new KnownError(`variable: ${varName} is not a Promise`);
    }
    return new Promise((resolve) => {
        winVN
            .then((res: unknown) => {
                if (typeof res === 'string') {
                    resolve(res);
                }
                throw new KnownError(`${varName} is not a string, ${typeof res}`);
            })
            .catch((err: unknown) => console.error(err));
    });
}

async function getChartData(id: string, root: string, chart: string): Promise<string> {
    if (chart.endsWith('.js')) {
        return findVar(id as keyof Window, readTextFile(mergeURIs([root, chart])));
    }
    if (chart.endsWith('.json')) {
        return readTextFile(mergeURIs([root, chart]));
    }
    throw new KnownError(`can not recognize chart: ${chart}`);
}

export default getChartData;
