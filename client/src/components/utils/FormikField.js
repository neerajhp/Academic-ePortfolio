import React from "react";
import { TextField } from "@material-ui/core";

/* ================ Components ================ */

const FormikField = ({ label, formikProps, formikKey, ...rest }) => {
  return (
    <TextField
      variant="outlined"
      margin="dense"
      fullWidth
      label={label}
      helperText={
        formikProps.touched[formikKey] && formikProps.errors[formikKey]
          ? formikProps.errors[formikKey]
          : " "
      }
      onChange={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      error={
        formikProps.touched[formikKey] && Boolean(formikProps.errors[formikKey])
      }
      {...rest}
    />
  );
};
export default FormikField;
