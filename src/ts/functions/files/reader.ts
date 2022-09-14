import KnownError from '../../constants/known_error';

async function readTextFile(file: string): Promise<string> {
    return fetch(file).then((results: Response): Promise<string> => {
        if (!results.ok) {
            throw new KnownError(`could not read file ${file}`);
        }
        return results.text();
    });
}

export default readTextFile;
