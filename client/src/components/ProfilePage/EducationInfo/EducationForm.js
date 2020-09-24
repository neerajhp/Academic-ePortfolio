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
} from '@material-ui/core';
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SchoolIcon from '@material-ui/icons/School';
import validationSchema from './Validation';
import API from '../../../utils/API';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  periodInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: theme.spacing(3),
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(3),
  },
  calendar: {
    '& .MuiInputBase-root': {
      color: theme.palette.text.secondary,
    },
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
      color: theme.palette.secondary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))(TextField);

/* ================ Component ================ */

const FormField = ({ type, label, index, record }) => {
  return (
    <Field name={`schools[${index}].${type}`}>
      {({ field, meta }) => {
        return (
          <CssTextField
            variant='outlined'
            margin='dense'
            fullWidth
            label={label}
            defaultValue={record}
            helperText={meta.touched && meta.error ? meta.error : ' '}
            onChange={field.onChange(field.name)}
            onBlur={field.onBlur(field.name)}
            error={meta.touched && Boolean(meta.error)}
          />
        );
      }}
    </Field>
  );
};

const EducationForm = ({ handleClose, records }) => {
  const classes = useStyles();

  const [selectedDate, handleDateChange] = useState(new Date());
  const [Submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{
        schools: records,
      }}
      onSubmit={(values, actions) => {
        // API.userSignup({})
        //   .then((res) => {
        //     setSubmitted(true);
        //   })
        //   .catch((err) => {
        //     actions.setFieldError('email', err.response.data);
        //     actions.setSubmitting(false);
        //   });
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <form>
          <FieldArray
            name='schools'
            render={(fieldArrayProps) => (
              <React.Fragment>
                {formikProps.values.schools.map((school, i) => (
                  <React.Fragment key={i}>
                    <FormField
                      type={'edu_type'}
                      label={'Education Type'}
                      index={i}
                      record={school.edu_type}
                    />
                    <FormField
                      type={'schoolName'}
                      label={'School Name'}
                      index={i}
                      record={school.schoolName}
                    />
                    <div className={classes.periodInfo}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className={classes.calendar}
                          autoOk
                          variant='inline'
                          inputVariant='outlined'
                          label='Start Month & Year'
                          views={['year', 'month']}
                          value={selectedDate}
                          InputAdornmentProps={{ position: 'start' }}
                          onChange={(date) => handleDateChange(date)}
                        />
                        <KeyboardDatePicker
                          className={classes.calendar}
                          autoOk
                          variant='inline'
                          inputVariant='outlined'
                          label='End Month & Year'
                          views={['year', 'month']}
                          value={selectedDate}
                          InputAdornmentProps={{ position: 'start' }}
                          onChange={(date) => handleDateChange(date)}
                        />
                      </MuiPickersUtilsProvider>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<SchoolIcon />}
                            checkedIcon={<SchoolIcon color='secondary' />}
                            size='small'
                            inputProps={{
                              'aria-label': 'checkbox with small size',
                            }}
                          />
                        }
                        label='Graduated'
                        className={classes.graduatedButton}
                      />
                    </div>

                    <Divider className={classes.divider} />
                  </React.Fragment>
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
