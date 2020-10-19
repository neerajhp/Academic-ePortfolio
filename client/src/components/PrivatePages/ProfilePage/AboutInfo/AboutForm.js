import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@material-ui/core';
import FormikField from '../../../utils/FormikField';
import { Formik } from 'formik';
import API from '../../../../api/API';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Editor, EditorState } from 'draft-js';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    marginLeft: 8,
  },
  rte: {
    backgroundColor: theme.palette.secondary.veryLight,
  },
}));

const AboutForm = ({ handleClose, records }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        aboutMe: records,
      }}
      onSubmit={(values, actions) => {
        API.editAboutMe(values.aboutMe).then(handleClose());
      }}
    >
      {(formikProps) => (
        <React.Fragment>
          <DialogContent dividers>
            <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
              <FormikField
                label='Describe yourself'
                type='description'
                formikKey='aboutMe'
                formikProps={formikProps}
                multiline
                rows={6}
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

// const local_theme_overrides = {
//   overrides: {
//     MUIRichTextEditor: {
//       root: {
//         marginTop: 20,
//         width: '80%',
//       },
//       editor: {
//         border: '1px solid gray',
//         borderRadius: 4,
//       },
//     },
//   },
// };

// const AboutForm2 = ({ handleClose, records }) => {
//   const classes = useStyles();

//   const [isSubmitting, setSubmitting] = useState(false);

//   const localTheme = useTheme();
//   Object.assign({ ...localTheme }, local_theme_overrides);

//   return (
//     <React.Fragment>
//       <DialogContent dividers>
//         <ThemeProvider theme={localTheme}>
//           <MUIRichTextEditor
//             label='Start typing...'
//             controls={['title', 'bold', 'italic', 'underline']}
//           />
//         </ThemeProvider>
//       </DialogContent>
//       <DialogActions>
//         <Button className={classes.button} onClick={() => handleClose()}>
//           <Typography>Cancel</Typography>
//         </Button>
//         <div>
//           <Button
//             type='Submit'
//             className={classes.button}
//             onClick={() => console.log('Submitting')}
//           >
//             <Typography>Update</Typography>
//           </Button>
//           {isSubmitting && (
//             <CircularProgress size={24} className={classes.buttonProgress} />
//           )}
//         </div>
//       </DialogActions>
//     </React.Fragment>
//   );
// };

// const AboutForm = ({ handleClose, records }) => {
//   const classes = useStyles();

//   const [isSubmitting, setSubmitting] = useState(false);

//   const [editorState, setEditorState] = React.useState(() =>
//     EditorState.createEmpty()
//   );

//   const editor = React.useRef(null);
//   function focusEditor() {
//     editor.current.focus();
//   }

//   return (
//     <React.Fragment>
//       <DialogContent dividers>
//         <Editor
//           ref={editor}
//           editorState={editorState}
//           onChange={setEditorState}
//           placeholder='Write something!'
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button className={classes.button} onClick={() => handleClose()}>
//           <Typography>Cancel</Typography>
//         </Button>
//         <div>
//           <Button
//             type='Submit'
//             className={classes.button}
//             onClick={() => console.log('Submitting')}
//           >
//             <Typography>Update</Typography>
//           </Button>
//           {isSubmitting && (
//             <CircularProgress size={24} className={classes.buttonProgress} />
//           )}
//         </div>
//       </DialogActions>
//     </React.Fragment>
//   );
// };

export default AboutForm;
