import Joi from 'joi';
import {
  createCommonStringValidation,
  inputIdSchema,
} from '../../utils/commonValidation';

export const getBoardSchema = Joi.object({
  inputId: inputIdSchema,
});

export const createBoardSchema = Joi.object({
  name: createCommonStringValidation({
    element: 'name',
    required: true,
    minLength: 5,
    maxLength: 20,
  }),
  inputId: inputIdSchema,
});
