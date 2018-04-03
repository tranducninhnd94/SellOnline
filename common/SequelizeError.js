class SequelizeError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "SequelizeError";
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
    }
}

module.exports = SequelizeError;