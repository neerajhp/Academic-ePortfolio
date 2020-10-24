import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import {
  Box,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  TextField,
  IconButton,
  MenuItem,
  Grid,
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import validationSchema from './Validation';
import API from '../../../../api/API';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  expEntry: {
    marginTop: theme.spacing(2),
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
    backgroundColor: theme.palette.tertiary.main,
  },

  addButton: { marginTop: theme.spacing(1) },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

/* ================ Constants ================ */
var YEAR = new Date().getFullYear();

/* ================ Component ================ */

const FormField = ({ type, label, index, record, ...rest }) => {
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
            {...rest}
          />
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

const ExperienceForm = ({ handleClose, records, open, expType }) => {
  const classes = useStyles();

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Formik
      initialValues={{
        experiences: records,
      }}
      onSubmit={(values, actions) => {
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
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <React.Fragment>
          <DialogContent dividers>
            <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
              <FieldArray
                name='experiences'
                render={(fieldArrayProps) => (
                  <React.Fragment>
                    {formikProps.values.experiences.map((exp, i) => (
                      <React.Fragment key={i}>
                        <div className={classes.expEntry}>
                          <WorkIcon color='primary' style={{ fontSize: 40 }} />
                          <div className={classes.form}>
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
                              rows={6}
                            />
                          </div>

                          <div>
                            <IconButton
                              onClick={() => {
                                fieldArrayProps.remove(i);
                                API.deleteExperience(exp._id).catch((err) => {
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
                      <Button
                        className={classes.addButton}
                        onClick={() =>
                          fieldArrayProps.push({
                            type: expType,
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
                        color='secondary'
                        startIcon={<AddIcon style={{ fontSize: 30 }} />}
                      >
                        Add an experience
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              />
            </form>
          </DialogContent>
          <Box boxShadow={2}>
            <DialogActions>
              <Button className={classes.button} onClick={() => handleClose()}>
                <Typography>Cancel</Typography>
              </Button>
              <div>
                <Button
                  type='Submit'
                  className={classes.button}
                  onClick={() => formikProps.handleSubmit()}
                  disabled={!formikProps.isValid}
                >
                  <Typography>Update</Typography>
                </Button>
                {formikProps.isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </DialogActions>
          </Box>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default ExperienceForm;
