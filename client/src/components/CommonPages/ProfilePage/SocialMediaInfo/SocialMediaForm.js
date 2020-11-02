import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Formik } from 'formik';
import {
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import API from '../../../../api/API';
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
    <Field name={type}>
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

//   const ContentField = ({ type, label, index, record })=>{
//       return
//   }

const SocialMediaForm = ({ handleClose, records }) => {
  const classes = useStyles();

  return (
    <Formik
        initialValues={{
          
          'linkedIn': records.linkedIn,
          'twitter': records.twitter,
          'instagram': records.instagram,
          'youtube': records.youtube,
          'facebook': records.facebook,

        //  'socialMedia' : records,
        }}
      onSubmit={(values, actions) => {
        console.log(values)
        // API.editSocialMedia(values).then(handleClose())
        API.editSocialMedia(values)
        .then((res) => {
          console.log(res);
          handleClose();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      }}
    >
      {(formikProps) => (
        <React.Fragment>
          <DialogContent dividers>
            <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
              {/* <ContentField record = {records}/> */}
              {/* // e.g. [{site: "facebook", link: "www.facebook.com"}, {site: "linkedIn", link: "www.linkedIn.com"}] */}
{/* 
              <FormField label='Linkedin url' type='socialMedia.linkedIn'/>
              <FormField label='Twitter url' type='socialMedia.twitter'/>
              <FormField label='Instagram url' type='socialMedia.instagram'/>
              <FormField label='Youtube url' type='socialMedia.youtube'/>
              <FormField label='Facebook url' type='socialMedia.facebook'/> */}

              <FormField label='Linkedin url' type='linkedIn'/>
              <FormField label='Facebook url' type='facebook'/> 
              <FormField label='Instagram url' type='instagram'/>
              <FormField label='Youtube url' type='youtube'/>
              <FormField label='Twitter url' type='twitter'/>


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

export default SocialMediaForm;
