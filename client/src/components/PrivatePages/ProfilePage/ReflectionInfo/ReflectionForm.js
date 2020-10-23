import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import API from '../../../../api/API';

import {
    DialogContent,
    DialogActions,
    Typography,
    Button,
    TextField
  } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
    form: {
        flexGrow: 1,
        padding: '0 5% 0 5%',
        '& .MuiFormLabel-root': {
            color: theme.palette.text.primary, // or black
        },
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
        <Field name={`reflections[${index}].${type}`}>
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

const ContentField = ({ type, label, index, record }) => {
    return (
        <Field name={`reflections[${index}].${type}`}>
            {({ field, meta }) => {
                return (
                    <TextField
                        color='primary'
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        multiline
                        rows={4}
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

//   const ContentField = ({ type, label, index, record })=>{
//       return
//   }

const ReflectionForm = ({ handleClose, records }) => {
    const classes = useStyles();
  
    return (
      <Formik
          initialValues={{
           'bio' : records
          }}
        onSubmit={(values, actions) => {
          console.log(values)
          API.updateBio(values).then(handleClose());
        }}
      >
        {(formikProps) => (
          <React.Fragment>
            <DialogContent dividers>
              <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
              <FieldArray
                        name='reflections'
                        render={(fieldArrayProps) => (
                            <React.Fragment>
                                <Typography>Title</Typography>

                                <FormField
                                    type={'Title'}
                                    // record={reflections.title}
                                />

                                <Typography>Reflection</Typography>

                                <ContentField
                                    type={'Content'}
                                    rowsMax={4}
                                    // record={reflections.title}
                                />
                            </React.Fragment>
                        )}
                    />
              </form>
            </DialogContent>
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
          </React.Fragment>
        )}
      </Formik>
    );
  };
  
  
export default ReflectionForm;