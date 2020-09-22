import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import {
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
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

/* ================ Component ================ */

const EducationForm = ({ handleClose, records }) => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{
        schoolName: '',
        courseName: '',
        monthStart: '',
        yearStart: '',
        monthEnd: '',
        yearEnd: '',
        graduated: false,
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
        <form className={classes.form} onSubmit={formikProps.handleSubmit}>
          <FormikField
            label='School Name'
            formikProps={formikProps}
            formikKey='schoolName'
            required
          />
          <FormikField
            label='Course Name'
            formikProps={formikProps}
            formikKey='courseName'
            required
          />
          <div className={classes.periodInfo}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                variant='inline'
                openTo='year'
                views={['year', 'month']}
                label='Start Month and Year'
              />
              <DatePicker
                variant='inline'
                openTo='year'
                views={['year', 'month']}
                label='End Month and year'
              />
            </MuiPickersUtilsProvider>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<SchoolIcon />}
                  checkedIcon={<SchoolIcon color='secondary' />}
                  size='small'
                  inputProps={{ 'aria-label': 'checkbox with small size' }}
                />
              }
              label='Graduated'
              className={classes.graduatedButton}
            />
          </div>
          <Divider />
          <Button className={classes.addButton} fullWidth variant='contained'>
            Add another school
          </Button>

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
