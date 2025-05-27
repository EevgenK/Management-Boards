import Joi from 'joi';
export const objectIdPattern = /^[0-9a-fA-F]{24}$/;
export const createCommonStringValidation = ({ element, required, minLength = 0, maxLength = 100, }) => {
    let validation = Joi.string()
        .min(minLength)
        .max(maxLength)
        .messages({
        'string.base': `${element} value should be a string`,
        'string.min': `${element} should have at least {#limit} characters`,
        'string.max': `${element} should have not more than {#limit} characters`,
    });
    if (required) {
        validation = validation.required().messages({
            'any.required': `${element} is required`,
        });
    }
    return validation;
};
export const createNumberValidation = ({ element, required, minValue = 0, maxValue = 100, }) => {
    let validation = Joi.number()
        .min(minValue)
        .max(maxValue)
        .messages({
        'number.base': `${element} value should be a number`,
        'number.min': `${element} value cannot be less than {#limit}`,
        'number.max': `${element} value cannot be more than {#limit}`,
    });
    if (required) {
        validation = validation.required().messages({
            'any.required': `${element} is required`,
        });
    }
    return validation;
};
export const createEnumValidation = (el) => Joi.string()
    .valid('todo', 'inprogress', 'done')
    .required()
    .messages({
    'string.base': `${el} should be a string`,
    'any.only': `${el} should be either 'todo','inprogress' or 'done'`,
    'any.required': `${el} is required`,
});
export const inputIdSchema = Joi.string()
    .min(5)
    .max(30)
    .pattern(/^[a-zA-Z0-9_-]+$/)
    .required()
    .messages({
    'string.base': `inputId should be a string`,
    'string.min': `inputId should have at least {#limit} characters`,
    'string.max': `inputId should have not more than {#limit} characters`,
    'string.pattern.base': `inputId may only contain letters, numbers, underscores (_) and hyphens (-)`,
    'any.required': `inputId is a required field`,
});
