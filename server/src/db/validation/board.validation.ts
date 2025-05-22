import Joi from 'joi';
// reusable inputId schema
const inputIdSchema = Joi.string()
  .min(5)
  .max(20)
  .pattern(/^[a-zA-Z0-9_-]+$/)
  .required()
  .messages({
    'string.base': `inputId should be a string`,
    'string.empty': `inputId cannot be empty`,
    'string.min': `inputId should have at least {#limit} characters`,
    'string.max': `inputId should have not more than {#limit} characters`,
    'string.pattern.base': `inputId may only contain letters, numbers, underscores (_) and hyphens (-)`,
    'any.required': `inputId is a required field`,
  });

export const getBoardSchema = Joi.object({
  inputId: inputIdSchema,
});

export const createBoardSchema = Joi.object({
  name: Joi.string().min(5).max(20).required().messages({
    'string.base': `name should be a string`,
    'string.empty': `name cannot be empty`,
    'string.min': `name should have at least {#limit} characters`,
    'string.max': `name should have not more than {#limit} characters`,
    'any.required': `name is a required field`,
  }),
  inputId: inputIdSchema,
});
