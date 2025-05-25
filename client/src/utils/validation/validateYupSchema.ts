import * as yup from 'yup';

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export const validateYupSchema = async <T extends yup.Maybe<yup.AnyObject>>(
  schema: yup.ObjectSchema<T>,
  values: T,
): Promise<{ isValid: boolean; errors: ValidationErrors<T> }> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: ValidationErrors<T> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          errors[error.path as keyof T] = error.message;
        }
      });
      return { isValid: false, errors };
    }

    throw err;
  }
};
