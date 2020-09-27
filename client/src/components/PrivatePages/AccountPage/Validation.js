import * as yup from 'yup';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .label('First Name')
    .test('length', 'First Name must have more than 1 character', (value) => {
      return value && value.length > 2;
    })
    .test('alphabets', 'Name must only contain alphabets', (value) => {
      return /^[A-Za-z ]+$/.test(value);
    }),
  lastName: yup
    .string()
    .required()
    .label('Last Name')
    .test('length', 'Last Name must have more than 1 character', (value) => {
      return value && value.length > 2;
    })
    .test('alphabets', 'Name must only contain alphabets', (value) => {
      return /^[A-Za-z ]+$/.test(value);
    }),
});

export default validationSchema;
