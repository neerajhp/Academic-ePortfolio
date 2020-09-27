import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  Grid,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import validationSchema from './Validation';
import API from '../../../utils/API';

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
  graduatedButton: {
    marginBottom: theme.spacing(3),
  },
}));

/* ================ Constants ================ */
var YEAR = new Date().getFullYear();

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
            value={record}
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

const FormMonthSelect = ({ record, index, milestone }) => {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Field name={`schools[${index}].${milestone}`}>
      {({ field, meta }) => {
        return (
          <TextField
            fullWidth
            select
            variant='outlined'
            margin='dense'
            label='Month'
            value={record}
            helperText={meta.error ? meta.error : ' '}
            onChange={field.onChange(field.name)}
            error={Boolean(meta.error)}
          >
            {MONTHS.map((month, i) => (
              <MenuItem key={i} value={i + 1}>
                {month}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    </Field>
  );
};

const FormYearSelect = ({ record, index, milestone }) => {
  var years = Array.from(new Array(20), (val, index) => YEAR - index);

  if (milestone === 'yearEnd') {
    const year = record.yearStart;
    years = Array.from(new Array(20), (val, index) => year + index);
  }

  return (
    <Field name={`schools[${index}].${milestone}`}>
      {({ field, meta }) => {
        return (
          <TextField
            fullWidth
            select
            variant='outlined'
            margin='dense'
            label='Year'
            value={
              milestone === 'yearStart' ? record.yearStart : record.yearEnd
            }
            onChange={field.onChange(field.name)}
          >
            {years.map((year, i) => (
              <MenuItem key={i} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    </Field>
  );
};

const FormGraduatedCheckBox = ({ index }) => {
  const classes = useStyles();
  return (
    <Field name={`schools[${index}].graduated`}>
      {({ field, meta }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value}
                icon={<SchoolIcon color='disabled' />}
                checkedIcon={<SchoolIcon color='secondary' />}
                size='medium'
                {...field}
              />
            }
            label='Graduated'
            className={classes.graduatedButton}
          />
        );
      }}
    </Field>
  );
};

const EducationForm = ({ handleClose, records }) => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={{
        schools: records,
      }}
      onSubmit={(values, actions) => {
        values.schools.forEach((schoolRecord) => {
          if (schoolRecord._id) {
            //Update existing record
            API.updateEducation(schoolRecord, schoolRecord._id)
              .then((res) => {
                setSubmitted(true);
                handleClose();
              })
              .catch((err) => {
                console.log(err.response.data);
                actions.setSubmitting(false);
              });
          } else {
            //Create new record
            API.postEducation(schoolRecord)
              .then((res) => {
                setSubmitted(true);
                handleClose();
              })
              .catch((err) => {
                console.log(err.response.data);
                actions.setSubmitting(false);
              });
          }
        });
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
                            type={'unicourseName'}
                            label={'Course Name'}
                            index={i}
                            record={school.unicourseName}
                          />
                        ) : (
                          ''
                        )}
                        <div className={classes.periodInfo}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                              <Typography>From: </Typography>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <FormMonthSelect
                                record={school.monthStart}
                                index={i}
                                milestone={'monthStart'}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <FormYearSelect
                                record={school}
                                index={i}
                                milestone={'yearStart'}
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <div className={classes.periodInfo}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                              <Typography>To: </Typography>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <FormMonthSelect
                                record={school.monthEnd}
                                index={i}
                                milestone={'monthEnd'}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <FormYearSelect
                                record={school}
                                index={i}
                                milestone={'yearEnd'}
                              />
                            </Grid>
                          </Grid>
                        </div>
                        <div className={classes.periodInfo}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={2} align='center'>
                              <FormGraduatedCheckBox index={i} />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      <div>
                        <IconButton
                          onClick={() => {
                            API.deleteEducation(school._id)
                              .then((res) => {
                                fieldArrayProps.remove(i);
                              })
                              .catch((err) => {
                                console.log(err.response.data);
                              });
                          }}
                        >
                          <DeleteIcon style={{ fontSize: 30 }} />
                        </IconButton>
                      </div>
                    </div>
                    <Divider className={classes.divider} />
                  </React.Fragment>
                ))}

                <div className={classes.addButtonContainer}>
                  <IconButton
                    className={classes.button}
                    onClick={() =>
                      fieldArrayProps.push({
                        edu_type: '',
                        schoolName: '',
                        unicourseName: '',
                        unimajorname: '',
                        monthStart: 1,
                        yearStart: YEAR,
                        monthEnd: 12,
                        yearEnd: YEAR,
                        graduated: false,
                      })
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
