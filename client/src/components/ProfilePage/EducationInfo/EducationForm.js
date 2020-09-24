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
  IconButton,
  MenuItem,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SchoolIcon from '@material-ui/icons/School';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AddBoxIcon from '@material-ui/icons/AddBox';
import validationSchema from './Validation';
// import API from '../../../utils/API';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  schoolEntry: {
    marginTop: theme.spacing(3),
    display: 'flex',
    paddingLeft: '5%',
  },
  form: {
    flexGrow: 1,
    padding: '0 5% 0 5%',
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary, // or black
    },
  },
  periodInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  },
  divider: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },

  addButton: {
    marginTop: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

/* ================ Component ================ */

const FormField = ({ type, label, index, record }) => {
  return (
    <Field name={`schools[${index}].${type}`}>
      {({ field, meta }) => {
        return (
          <TextField
            color='primary'
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

const FormEduSelect = ({ record, index }) => {
  return (
    <Field name={`schools[${index}].edu_type`}>
      {({ field, meta }) => {
        return (
          <TextField
            fullWidth
            select
            variant='outlined'
            margin='dense'
            label='Education Type'
            defaultValue={record}
            helperText={meta.touched && meta.error ? meta.error : ' '}
            onChange={field.onChange(field.name)}
            error={meta.touched && Boolean(meta.error)}
          >
            <MenuItem value={'Highschool'}>HighSchool</MenuItem>
            <MenuItem value={'University'}>University</MenuItem>
          </TextField>
        );
      }}
    </Field>
  );
};

const FormDatePicker = ({ field, form, label, index, ...other }) => {
  const classes = useStyles();

  const currentError = form.errors[field.name];

  return (
    <KeyboardDatePicker
      className={classes.calendar}
      autoOk
      variant='inline'
      inputVariant='outlined'
      label={label}
      views={['year', 'month']}
      InputAdornmentProps={{ position: 'start' }}
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(error) => {
        // handle as a side effect
        if (error !== currentError) {
          form.setFieldError(field.name, error);
        }
      }}
      // if you are using custom validation schema you probably want to pass `true` as third argument
      onChange={(date) => form.setFieldValue(field.name, date, false)}
      {...other}
    />
    // <KeyboardDatePicker
    //   clearable
    //   disablePast
    //   name={field.name}
    //   value={field.value}
    //   format="dd/MM/yyyy"
    //   helperText={currentError}
    //   error={Boolean(currentError)}
    //   onError={error => {
    //     // handle as a side effect
    //     if (error !== currentError) {
    //       form.setFieldError(field.name, error);
    //     }
    //   }}
    //   // if you are using custom validation schema you probably want to pass `true` as third argument
    //   onChange={date => form.setFieldValue(field.name, date, false)}
    //   {...other}
    // />
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
        console.log(values);
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
        <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
          <Divider className={classes.divider} />
          <FieldArray
            name='schools'
            render={(fieldArrayProps) => (
              <React.Fragment>
                {formikProps.values.schools.map((school, i) => (
                  <React.Fragment key={i}>
                    <div className={classes.schoolEntry}>
                      <MenuBookIcon color='primary' style={{ fontSize: 40 }} />
                      <div className={classes.form}>
                        <FormEduSelect record={school.edu_type} index={i} />

                        <FormField
                          type={'schoolName'}
                          label={'School Name'}
                          index={i}
                          record={school.schoolName}
                        />
                        {school.edu_type === 'University' ? (
                          <FormField
                            type={'courseName'}
                            label={'Course Name'}
                            index={i}
                            record={school.unicourseName}
                          />
                        ) : (
                          ''
                        )}
                        <div className={classes.periodInfo}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              className={classes.calendar}
                              autoOk
                              variant='inline'
                              inputVariant='outlined'
                              label='Start Month & Year'
                              views={['year', 'month']}
                              value={school.startDate}
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
                              value={school.endDate}
                              InputAdornmentProps={{ position: 'start' }}
                              onChange={(date) => handleDateChange(date)}
                            />
                          </MuiPickersUtilsProvider>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={school.graduated}
                                icon={<SchoolIcon color='disabled' />}
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
                      </div>
                    </div>
                    <Divider className={classes.divider} />
                  </React.Fragment>
                ))}

                <div className={classes.addButtonContainer}>
                  <IconButton
                    className={classes.button}
                    onClick={() =>
                      fieldArrayProps.push({ edu_type: '', schoolName: '' })
                    }
                    color='primary'
                  >
                    <AddBoxIcon style={{ fontSize: 30 }} />
                  </IconButton>
                </div>
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
