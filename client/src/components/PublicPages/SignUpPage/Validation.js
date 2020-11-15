import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .label("First Name")
    .test("length", "First Name must have more than 1 character", (value) => {
      return value && value.length > 2;
    })
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z\- ]+$/.test(value);
    }),
  lastName: yup
    .string()
    .required()
    .label("Last Name")
    .test("length", "Last Name must have more than 1 character", (value) => {
      return value && value.length > 2;
    })
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z\- ]+$/.test(value);
    }),
  email: yup.string().label("Email").email().required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(5, "Password should be a minimum of 5 characters")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required()
    .label("Confirm password")
    .test("passwords-match", "Passwords do not match", function (value) {
      return this.parent.password === value;
    }),
});

export default validationSchema;
