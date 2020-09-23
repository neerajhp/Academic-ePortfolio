import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import {
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  TextField,
  Table,
  TableBody,
  TableRow,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SchoolIcon from '@material-ui/icons/School';
import FormikField from '../../FormikField';
import validationSchema from './Validation';
import API from '../../../utils/API';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  periodInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: theme.spacing(3),
  },
  graduatedButton: {
    color: theme.palette.text.secondary,
  },
  addButton: {
    marginTop: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    marginTop: '5%',
    backgroundColor: 'transparent',
  },
}));

// Input Fields
const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      color: theme.palette.text.secondary,
    },
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

/* ================ Component ================ */

const EducationForm = ({ handleClose, records }) => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{
        schools: records,
      }}
      onSubmit={(values, actions) => {
        API.userSignup({})
          .then((res) => {
            setSubmitted(true);
          })
          .catch((err) => {
            actions.setFieldError('email', err.response.data);
            actions.setSubmitting(false);
          });
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <form>
          <Table>
            <TableBody>
              <FieldArray
                name='schools'
                render={(fieldArrayProps) => (
                  <React.Fragment>
                    {formikProps.values.schools.map((school, i) => (
                      <TableRow>
                        <Field name={`schools[${i}].edu_type`}>
                          {({ field, form, meta }) => (
                            <CssTextField
                              variant='outlined'
                              margin='dense'
                              fullWidth
                              label={'Education Type'}
                              value={school.edu_type}
                              helperText={
                                meta.touched && meta.errors ? meta.errors : ' '
                              }
                            />
                          )}
                        </Field>
                        <Field name={`schools[${i}].schoolName`}>
                          {({ field, form, meta }) => (
                            <CssTextField
                              variant='outlined'
                              margin='dense'
                              fullWidth
                              label={'School Name'}
                              value={school.schoolName}
                              helperText={
                                meta.touched && meta.errors ? meta.errors : ' '
                              }
                            />
                          )}
                        </Field>
                      </TableRow>
                    ))}
                    <Button
                      className={classes.button}
                      onClick={() =>
                        fieldArrayProps.push({ edu_type: '', schoolName: '' })
                      }
                      color='primary'
                    >
                      Add another School{' '}
                    </Button>
                  </React.Fragment>
                )}
              />
            </TableBody>
          </Table>

          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              onClick={() => handleClose()}
              color='primary'
            >
              <Typography>Cancel</Typography>
            </Button>
            <Button
              type='Submit'
              className={classes.button}
              disabled={!formikProps.isValid}
              color='primary'
            >
              <Typography>Update</Typography>
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EducationForm;
