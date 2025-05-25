import * as yup from 'yup';

export const newBoardSchema = yup.object().shape({
  name: yup
    .string()
    .required('name is a required field')
    .min(5, 'name should have at least 5 characters')
    .max(20, 'name should have not more than 20 characters'),
  // inputId: yup
  //   .string()
  //   .required('inputId is a required field')
  //   .min(5, 'inputId should have at least 5 characters')
  //   .max(30, 'inputId should have not more than 30 characters')
  //   .matches(
  //     /^[a-zA-Z0-9_-]+$/,
  //     'inputId may only contain letters, numbers, underscores (_) and hyphens (-)',
  //   ),
});
