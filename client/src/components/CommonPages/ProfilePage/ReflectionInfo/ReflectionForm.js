import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import {
  Typography,
  Button,
  Divider,
  TextField,
  IconButton,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import API from '../../../../api/API';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  blogEntry: {
    display: 'flex',
    paddingLeft: '5%',
    marginTop: theme.spacing(2),
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

  addButton: {
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  graduatedButton: {
    marginBottom: theme.spacing(3),
  },
}));

/* ================ Constants ================ */

/* ================ Component ================ */

const FormField = ({ type, label, index, record }) => {
  return (
    <Field name={`blogs[${index}].${type}`}>
      {({ field, meta }) => {
        return (
          <TextField
            color='primary'
            variant='outlined'
            margin='dense'
            fullWidth
            label={label}
            defaultValue={record}
            // value={record}
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
    <Field name={`blogs[${index}].${type}`}>
      {({ field, meta }) => {
        return (
          <TextField
            color="primary"
            variant="outlined"
            margin="dense"
            fullWidth
            multiline
            rows={4}
            label={label}
            defaultValue={record}
            // value={record}
            helperText={meta.touched && meta.error ? meta.error : " "}
            onChange={field.onChange(field.name)}
            onBlur={field.onBlur(field.name)}
            error={meta.touched && Boolean(meta.error)}
          />
        );
      }}
    </Field>
  );
};

const ReflectionForm = ({ handleClose, records }) => {
  const classes = useStyles();

  console.log(records);
  console.log('records');


  return (
    <Formik
      initialValues={{
        blogs: records,
      }}
      onSubmit={(values, actions) => {
        values.blogs.forEach((blogRecord) => {
          if (blogRecord._id) {
            //Update existing record
            API.editBlog(blogRecord, blogRecord._id)
              .then((res) => {
                handleClose();
              })
              .catch((err) => {
                console.log(err.response.data);
                actions.setSubmitting(false);
              });
          } else {
            //Create new record
            API.createBlog(blogRecord)
              .then((res) => {
                handleClose();
              })
              .catch((err) => {
                console.log(blogRecord);
                console.log(err.response.data);
                actions.setSubmitting(false);
              });
          }
        });
      }}
    >
      {(formikProps) => (
        <React.Fragment>
          <DialogContent dividers>
            <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
              <FieldArray
                name='blogs'
                render={(fieldArrayProps) => (
                  <React.Fragment>
                    {formikProps.values.blogs.map((blog, i) => (
                      <React.Fragment key={i}>
                        <div className={classes.blogEntry}>
                          <MenuBookIcon
                            color='primary'
                            style={{ fontSize: 30 }}
                          />
                          <div className={classes.form}>

                            <FormField
                              type={'title'}
                              label={'Title'}
                              index={i}
                              record={blog.title}
                            />
                            <ContentField
                              type={'content'}
                              label={'Content'}
                              index={i}
                              record={blog.content}
                            />
                            
                          </div>
                          <div>
                            <IconButton
                              onClick={() => {
                                API.removeBlog(blog._id)
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
                      <Button
                        className={classes.button}
                        onClick={() =>
                          fieldArrayProps.push({
                            title: '',
                            content: '', 

                          })
                        }
                        color='secondary'
                        startIcon={<AddIcon style={{ fontSize: 30 }} />}
                      >
                        Add a Reflection
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              />
            </form>
          </DialogContent>

          <DialogActions>
            <Button
              className={classes.button}
              onClick={() => handleClose()}
              color='primary'
            >
              <Typography>Cancel</Typography>
            </Button>
            <div className={classes.buttonWrapper}>
              <Button
                type='Submit'
                className={classes.submit}
                onClick={() => formikProps.handleSubmit()}
                disabled={!formikProps.isValid || formikProps.isSubmitting}
                color='primary'
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