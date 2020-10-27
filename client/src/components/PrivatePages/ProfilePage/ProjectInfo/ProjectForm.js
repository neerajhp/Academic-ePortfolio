import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Field, FieldArray, Formik } from "formik";
import {Typography, Button, Divider, TextField, DialogContent, DialogActions} from "@material-ui/core";
import API from "../../../../api/API";
import CircularProgress from "@material-ui/core/CircularProgress";

/* ================ Styling ================ */
// Form Styles
const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    padding: "0 5% 0 5%",
    "& .MuiFormLabel-root": {
      color: theme.palette.text.primary,
    },
  },
  divider: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
  addButton: {
    marginTop: theme.spacing(3),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

/* ================ Component ================ */

// const ContentField = ({ type, label, index, record }) => {
//   return (
//       <Field name={type}>
//         {({ field, meta }) => {
//           return (
//               <TextField
//                   color="primary"
//                   variant="outlined"
//                   margin="dense"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   label={label}
//                   defaultValue={record}
//                   helperText={meta.touched && meta.error ? meta.error : " "}
//                   onChange={field.onChange(field.name)}
//                   onBlur={field.onBlur(field.name)}
//                   error={meta.touched && Boolean(meta.error)}
//               />
//           );
//         }}
//       </Field>
//   );
// };

const ContentField = ({record }) => {
  return (
      <Field name={'feature'}>
        {({ field, meta }) => {
          return (
              <TextField
                  color='primary'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  multiline
                  rows={8}
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

// const ProjectForm = ({ handleClose, records, setRecords }) => {
//   const classes = useStyles();
//
//   return (
//       <Formik
//           initialValues={{
//             ...records,
//           }}
//           onSubmit={(values, actions) => {
//             API.editFeaturedWork(values, records._id).then(({ data }) => {
//               handleClose();
//               setRecords(data);
//             });
//           }}
//       >
//         {(formikProps) => (
//             <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
//               <Divider className={classes.divider} />
//               <FieldArray
//                   name="project"
//                   render={(fieldArrayProps) => (
//                       <React.Fragment>
//                         <Typography>Title</Typography>
//                         <FormField
//                             type={"title"}
//                             record={formikProps.initialValues.title}
//                         />
//                         <Typography>Project</Typography>
//                         <ContentField
//                             type={"description"}
//                             rowsMax={4}
//                             record={formikProps.initialValues.description}
//                         />
//                       </React.Fragment>
//                   )}
//               />
//               <div className={classes.buttonContainer}>
//                 <Button
//                     className={classes.button}
//                     onClick={() => handleClose()}
//                     color="primary"
//                 >
//                   <Typography>Cancel</Typography>
//                 </Button>
//                 <Button
//                     type="Submit"
//                     className={classes.button}
//                     disabled={!formikProps.isValid}
//                     color="primary"
//                 >
//                   <Typography>Update</Typography>
//                 </Button>
//               </div>
//             </form>
//         )}
//       </Formik>
//   );
// };
const FormField = ({ type, label, index, record }) => {
  return (
      <Field name={type}>
        {({ field, meta }) => {
          return (
              <TextField
                  color="primary"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  label={label}
                  defaultValue={record}
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
const ProjectForm = ({ handleClose, records }) => {
  const classes = useStyles();

  return (
      <Formik
          initialValues={{
            'feature' : records
          }}
          onSubmit={(values, actions) => {
            API.editFeaturedWork(values, records._id).then(({ data }) => {
              handleClose();
            });
          }}
      >
        {(formikProps) => (
            <React.Fragment>
              <DialogContent dividers>
                <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
                  <Typography>Title</Typography>
                  <FormField
                      type={"title"}
                      record= {records}
                  />
                  <Typography>Project</Typography>
                  <ContentField
                      type={"description"}
                      rowsMax={4}
                      record= {records}
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


export default ProjectForm;
