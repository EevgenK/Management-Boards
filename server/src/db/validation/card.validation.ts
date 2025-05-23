import Joi from 'joi';
import {
  createCommonStringValidation,
  createEnumValidation,
  createNumberValidation,
  inputIdSchema,
  objectIdPattern,
} from '../../utils/commonValidation';

export const createCardSchema = Joi.object({
  boardId: inputIdSchema,
  title: createCommonStringValidation({
    element: 'title',
    required: true,
    minLength: 5,
    maxLength: 20,
  }),
  description: createCommonStringValidation({
    element: 'description',
    required: false,
    minLength: 5,
    maxLength: 40,
  }),
  status: createEnumValidation('status'),
  order: createNumberValidation({
    element: 'order',
    required: true,
  }),
});
export const updateCardSchema = Joi.object({
  _id: Joi.string().pattern(objectIdPattern).required().messages({
    'string.pattern.base': '"_id" must be a valid ObjectId',
    'string.base': '"_id" must be a string',
    'any.required': '"_id" is required',
  }),
  title: createCommonStringValidation({
    element: 'title',
    required: true,
    minLength: 5,
    maxLength: 20,
  }),
  description: createCommonStringValidation({
    element: 'description',
    required: false,
    minLength: 5,
    maxLength: 40,
  }),
  status: createEnumValidation('status'),
  order: createNumberValidation({
    element: 'order',
    required: true,
  }),
});
export const deleteCardSchema = Joi.object({
  _id: Joi.string().pattern(objectIdPattern).required().messages({
    'string.pattern.base': '"_id" must be a valid ObjectId',
    'string.base': '"_id" must be a string',
    'any.required': '"_id" is required',
  }),
});
