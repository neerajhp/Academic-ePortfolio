import * as yup from "yup";

const validationSchema = yup.object().shape({
  experiences: yup.array().of(
    yup.object().shape({
      monthEnd: yup
        .number()
        .test("continuity", "Invalid month", function (value) {
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
