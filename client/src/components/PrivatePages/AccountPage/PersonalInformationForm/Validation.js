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
      return /^[A-Za-z ]+$/.test(value);
    }),
  lastName: yup
    .string()
    .required()
    .label("Last Name")
    .test("length", "Last Name must have more than 1 character", (value) => {
      return value && value.length > 2;
    })
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z ]+$/.test(value);
    }),
  mobileNumber: yup
    .string()
    .label("Mobile Number")
    .test("valid", "Phone Number is not valid", (value) => {
      return /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
        value
      );
    }),
});

export default validationSchema;
