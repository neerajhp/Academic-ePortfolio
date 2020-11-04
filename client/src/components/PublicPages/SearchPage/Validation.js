import * as yup from "yup";

const validationSchema = yup.object().shape({
  search: yup
    .string()
    .required()
    .label("Search for someone")
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z\- ]+$/.test(value);
    }),
});

export default validationSchema;
