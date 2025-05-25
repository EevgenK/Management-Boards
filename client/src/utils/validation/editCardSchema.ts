import * as yup from 'yup';

export const editCardSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is a required field')
    .min(5, 'Title should have at least 5 characters')
    .max(20, 'Title should have not more than 20 characters'),
  description: yup
    .string()
    .min(5, 'Description should have at least 5 characters')
    .max(100, 'Description should have not more than 100 characters'),
});
