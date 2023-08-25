import * as yup from 'yup';

export const parkingSpaceValidationSchema = yup.object().shape({
  location: yup.string().required(),
  size: yup.number().integer().required(),
  availability_times: yup.string().required(),
  restrictions: yup.string().nullable(),
  company_id: yup.string().nullable().required(),
});
