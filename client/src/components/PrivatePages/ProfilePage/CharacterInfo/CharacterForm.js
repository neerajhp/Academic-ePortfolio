import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import {
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField
} from '@material-ui/core';
import FormikField from '../../../utils/FormikField';
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

const ContentField = ({record }) => {
  return (
    <Field name={'bio'}>
      {({ field, meta }) => {
        return (
          <TextField
            color='primary'
            variant='outlined'
            margin='dense'
            fullWidth
            multiline
            rows={4}
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
              <ContentField record = {records}/>
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


// const CharacterForm = ({ handleClose, records }) => {
//   const classes = useStyles();

//   return (
//     <Formik
//       initialValues={{
//         reflections: records,
//       }}
//       onSubmit={(values, actions) => {}}
//     >
//       {(formikProps) => (
//         <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
//           <Divider className={classes.divider} />
//           <FieldArray
//             name='Bio'
//             render={(fieldArrayProps) => (
//               <React.Fragment>
//                 <ContentField
//                   type={'Content'}
//                   rowsMax={4}
//                   // record={reflections.title}
//                 />
//               </React.Fragment>
//             )}
//           />

//           <div className={classes.buttonContainer}>
//             <Button
//               className={classes.button}
//               onClick={() => handleClose()}
//               color='primary'
//             >
//               <Typography>Cancel</Typography>
//             </Button>
//             <Button
//               type='Submit'
//               className={classes.button}
//               disabled={!formikProps.isValid}
//               color='primary'
//             >
//               <Typography>Update</Typography>
//             </Button>
//           </div>
//         </form>
//       )}
//     </Formik>
//   );
// };

export default CharacterForm;
