import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import { Typography, Button, Divider, TextField } from '@material-ui/core';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    padding: '0 5% 0 5%',
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
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
    <Field name={`projects[${index}].${type}`}>
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
    <Field name={`projects[${index}].${type}`}>
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

const ProjectForm = ({ handleClose, records }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        reflections: records,
      }}
      onSubmit={(values, actions) => {}}
    >
      {(formikProps) => (
        <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
          <Divider className={classes.divider} />
          <FieldArray
            name='projects'
            render={(fieldArrayProps) => (
              <React.Fragment>
                <Typography>Title</Typography>

                <FormField
                  type={'Title'}
                  // record={projects.title}
                />

                <Typography>Project</Typography>

                <ContentField
                  type={'Content'}
                  rowsMax={4}
                  // record={projects.title}
                />
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

export default ProjectForm;
