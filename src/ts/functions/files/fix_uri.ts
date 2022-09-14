function mergeURIs(uri: string[]): string {
    let res = '';
    for (const part of uri) {
        res = `${res.replace(/\/$/, '')}/${part.replace(/^\//, '')}`;
    }
    return res;
}

export default mergeURIs;
