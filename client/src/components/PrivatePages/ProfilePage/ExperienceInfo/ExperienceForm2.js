import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, useFormik } from 'formik';
import {
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  TextField,
  IconButton,
  MenuItem,
  Grid,
  DialogContentText,
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import validationSchema from './Validation';
import API from '../../../../api/API';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  expEntry: {
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
    <Field name={`experiences[${index}].${type}`}>
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

const FormExpSelect = ({ record, index }) => {
  return (
    <Field name={`experiences[${index}].type`}>
      {({ field, meta }) => {
        return (
          <TextField
            fullWidth
            select
            variant='outlined'
            margin='dense'
            label='Experience Type'
            value={record}
            helperText={meta.touched && meta.error ? meta.error : ' '}
            onChange={field.onChange(field.name)}
            error={meta.touched && Boolean(meta.error)}
          >
            <MenuItem value={'Work'}>Employed</MenuItem>
            <MenuItem value={'Volunteer'}>Volunteer</MenuItem>
            <MenuItem value={'Extracurricular'}>Extra Curricular</MenuItem>
          </TextField>
        );
      }}
    </Field>
  );
};

const FormStatusSelect = ({ record, index }) => {
  return (
    <Field name={`experiences[${index}].employeeStatus`}>
      {({ field, meta }) => {
        return (
          <TextField
            fullWidth
            select
            variant='outlined'
            margin='dense'
            label='Status'
            value={record}
            helperText={meta.touched && meta.error ? meta.error : ' '}
            onChange={field.onChange(field.name)}
            error={meta.touched && Boolean(meta.error)}
          >
            <MenuItem value={'Full Time'}>Full Time</MenuItem>
            <MenuItem value={'Part Time'}>Part Time</MenuItem>
            <MenuItem value={'Casual'}>Casual</MenuItem>
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
    <Field name={`experiences[${index}].${milestone}`}>
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
    <Field name={`experiences[${index}].${milestone}`}>
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

const ExperienceForm = ({ handleClose, records }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      experiences: records,
    },
    onSubmit: (values, actions) => {
      values.experiences.forEach((expInfo) => {
        if (expInfo._id) {
          //Update existing record
          API.editExperience(expInfo, expInfo._id)
            .then((res) => {
              handleClose();
            })
            .catch((err) => {
              actions.setSubmitting(false);
            });
        } else {
          //Create new record
          API.createExperience(expInfo)
            .then((res) => {
              handleClose();
            })
            .catch((err) => {
              actions.setSubmitting(false);
            });
        }
      });
    },
    validationSchema: { validationSchema },
  });

  return (
    <form classes={classes.form} onSubmit={formik.handleSubmit}>
      <DialogContent dividers>
        <FieldArray
          name='experiences'
          render={(fieldArrayProps) => (
            <React.Fragment>
              {formik.values.experiences.map((exp, i) => (
                <React.Fragment key={i}>
                  <div className={classes.expEntry}>
                    <WorkIcon color='primary' style={{ fontSize: 40 }} />
                    <div className={classes.form}>
                      <FormExpSelect record={exp.type} index={i} />

                      <FormField
                        type={'organization'}
                        label={'Organization'}
                        index={i}
                        record={exp.organization}
                        required
                      />
                      <FormField
                        type={'role'}
                        label={'Role'}
                        index={i}
                        record={exp.role}
                        required
                      />

                      <div className={classes.periodInfo}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={2}>
                            <Typography>From: </Typography>
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <FormMonthSelect
                              record={exp.monthStart}
                              index={i}
                              milestone={'monthStart'}
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <FormYearSelect
                              record={exp}
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
                              record={exp.monthEnd}
                              index={i}
                              milestone={'monthEnd'}
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <FormYearSelect
                              record={exp}
                              index={i}
                              milestone={'yearEnd'}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div className={classes.periodInfo}>
                        <FormStatusSelect
                          record={exp.employeeStatus}
                          index={i}
                        />
                      </div>
                      <FormField
                        type={'description'}
                        label={'Describe your experience'}
                        index={i}
                        record={exp.description}
                        multiline
                        rows={4}
                      />
                    </div>

                    <div>
                      <IconButton
                        onClick={() => {
                          API.deleteExperience(exp._id)
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
                      type: '',
                      organization: '',
                      role: '',
                      employeeStatus: '',
                      monthStart: 1,
                      yearStart: YEAR,
                      monthEnd: 12,
                      yearEnd: YEAR,
                      description: '',
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
            disabled={!formik.isValid}
            color='primary'
          >
            <Typography>Update</Typography>
          </Button>
        </div>
      </DialogContent>
    </form>
  );
};

export default ExperienceForm;
