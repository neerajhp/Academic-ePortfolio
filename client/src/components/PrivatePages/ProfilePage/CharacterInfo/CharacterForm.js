import React from 'react';
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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import API from '../../../../api/API';

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

  const CharacterForm = ({ handleClose, records }) => {
    const classes = useStyles();
  
    return (
      <Formik
        initialValues={{
          reflections : records,
        }}
        onSubmit={(values, actions) => {
          
        }}
      >
        {(formikProps) => (
          <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
            <Divider className={classes.divider} />
            <FieldArray
              name='Bio'
              render={(fieldArrayProps) => (
                <React.Fragment>
            
                <ContentField
                    type={'Content'}
                    rowsMax={4}
                    // record={reflections.title}
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
  
  export default CharacterForm;
  
  