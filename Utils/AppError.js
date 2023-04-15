class AppError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error'
        this.oprational = true 
        Error.captureStackTrace(this, this.constructor);

    }
}
module.exports = AppError;