class KnownError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'KnownError';
    }
}

export default KnownError;
