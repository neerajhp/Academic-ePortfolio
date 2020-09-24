import * as yup from 'yup';

const validationSchema = yup.object().shape({
  schools: yup.array().of(
    yup.object().shape({
      schoolName: yup
        .string()
        .test('alphabets', 'Name must only contain alphabets', (value) => {
          return /^[A-Za-z ]+$/.test(value);
        })
        .required('Required'),
      edu_type: yup
        .string()
        .test('alphabets', 'Name must only contain alphabets', (value) => {
          return /^[A-Za-z ]+$/.test(value);
        })
        .required('Required'),
    })
  ),
});

export default validationSchema;
