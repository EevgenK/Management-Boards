import createHttpError from 'http-errors';
export const handleValidationError = (error, _doc, next) => {
    if (error) {
        next(createHttpError(400, error.message));
    }
    else {
        next();
    }
};
