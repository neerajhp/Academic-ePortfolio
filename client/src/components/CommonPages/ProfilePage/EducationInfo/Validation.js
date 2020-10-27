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
      unicourseName: yup
        .string()
        .test('alphabets', 'Name must only contain alphabets', (value) => {
          return /^[A-Za-z ]+$/.test(value);
        }),
      monthEnd: yup
        .number()
        .test('continuity', 'Invalid month', function (value) {
          if (
            this.parent.yearStart &&
            this.parent.yearStart === this.parent.yearEnd
          ) {
            return this.parent.monthStart < value;
          } else {
            return true;
          }
        }),
    })
  ),
});

export default validationSchema;
