import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

// Input Fields
const CssTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
}))(TextField);

/* ================ Components ================ */

const FormikField = ({ label, formikProps, formikKey, ...rest }) => {
  return (
    <CssTextField
      variant='outlined'
      margin='dense'
      fullWidth
      label={label}
      helperText={
        formikProps.touched[formikKey] && formikProps.errors[formikKey]
          ? formikProps.errors[formikKey]
          : ' '
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
