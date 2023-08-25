import * as yup from 'yup';

export const businessValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  contact_number: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
