export class ErrorWithStatusCode extends Error {
    statusCode = -1;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'ErrorWithStatusCode';
        this.statusCode = statusCode;
    }
}
