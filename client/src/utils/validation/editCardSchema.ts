import * as yup from 'yup';
export interface ICardFormValues {
  title: string;
  description?: string;
}
export const editCardSchema: yup.ObjectSchema<ICardFormValues> = yup
  .object()
  .shape({
    title: yup
      .string()
      .required('Title is a required field')
      .min(5, 'Title should have at least 5 characters')
      .max(20, 'Title should have not more than 20 characters'),
    description: yup
      .string()
      .min(0)
      .max(100, 'Description should have not more than 100 characters'),
  });
