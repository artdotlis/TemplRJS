// @ts-ignore
import { Cite, plugins } from '@citation-js/core';

import readTextFile from '../../functions/files/reader';

import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';
import KnownError from '../../constants/known_error';

async function createRef(refFile: string): Promise<void> {
    const reference = await readTextFile(refFile);
    if (reference === undefined) {
        throw new KnownError('failed to read bibtex file');
    }
    window.CiteJs = await Cite.async(reference);
}

interface Addable {
    add(arg1: string, arg2: string): void;
}

async function configureCite(type: string, file: string, toAdd: Addable): Promise<void> {
    const res = await readTextFile(file);
    if (res !== undefined) {
        toAdd.add(type, res);
    }
}

async function initCitation(
    refFile: string,
    style: string,
    lang: string,
    template: string,
    local: string
): Promise<void> {
    await configureCite(style, template, plugins.config.get('@csl').templates);
    await configureCite(lang, local, plugins.config.get('@csl').locales);
    await createRef(refFile);
}

function formatCitation(template: string, lang: string): string {
    if (window.CiteJs !== undefined) {
        return window.CiteJs.format('bibliography', {
            format: 'html',
            template,
            lang,
        });
    }
    throw new KnownError('citation is not ready yet');
}

export { initCitation, formatCitation };
