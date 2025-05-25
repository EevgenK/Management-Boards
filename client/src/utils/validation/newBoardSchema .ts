import * as yup from 'yup';

export const newBoardSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .min(5, 'Name should have at least 5 characters')
    .max(20, 'Name should have not more than 20 characters'),
});
