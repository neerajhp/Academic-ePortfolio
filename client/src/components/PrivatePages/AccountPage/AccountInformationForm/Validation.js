import * as yup from 'yup';

export const emailValidationSchema = yup.object().shape({
  email: yup.string().label('Email').email().required(),
});

export const passwordValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .label('Password')
    .required()
    .min(5, 'Password should be a minimum of 5 characters')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
  confirmNewPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords do not match', function (value) {
      return this.parent.newPassword === value;
    }),
});
