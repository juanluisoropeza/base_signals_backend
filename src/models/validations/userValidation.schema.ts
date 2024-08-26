import * as yup from 'yup';

const userSchema = yup
  .object({
    name: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().required().oneOf(['male', 'female', 'other']),
    phone: yup.string().required(),
    password: yup.string().required(),
    active: yup.boolean(),
  })
  .strict()
  .noUnknown();

const updateUserSchema = yup
  .object()
  .shape({
    name: yup.string(),
    lastname: yup.string(),
    email: yup.string().email(),
    gender: yup.string(),
    phone: yup.string(),
    password: yup.string(),
    active: yup.boolean(),
  })
  .strict()
  .noUnknown();

const authSchema = yup
  .object()
  .shape({
    email: yup.string().email(),
    password: yup.string(),
  })
  .strict()
  .noUnknown();

export { authSchema, updateUserSchema, userSchema };
