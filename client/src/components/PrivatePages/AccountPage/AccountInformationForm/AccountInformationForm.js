import React, { useState } from "react";
import { Formik } from "formik";
import { Paper, Typography, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormikField from "../../../utils/FormikField";
import { emailValidationSchema, passwordValidationSchema } from "./Validation";
import API from "../../../../api/API";

/* ================ Component ================ */

const AccountInformationForm = ({ user, globalClasses }) => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const emailFieldSubmitted = emailSubmitted
    ? globalClasses.fieldSubmitted
    : "";

  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const passwordFieldSubmitted = passwordSubmitted
    ? globalClasses.fieldSubmitted
    : "";

  return (
    <Paper className={globalClasses.card}>
      <div className={globalClasses.title}>
        <Typography variant="h2">Account information</Typography>
      </div>
      <div className={globalClasses.formContainer}>
        <Typography variant="h2" className={globalClasses.formTitle}>
          Update your Email
        </Typography>

        <Formik
          initialValues={{
            email: user.email,
          }}
          onSubmit={(values, actions) => {
            setEmailSubmitted(false);
            API.updateEmail({
              email: values.email,
            })
              .then((res) => {
                setEmailSubmitted(true);
                actions.setSubmitting(false);
              })
              .catch((err) => {
                console.log(err);
                actions.setFieldError("email", err.response.data);
                actions.setSubmitting(false);
              });
          }}
          validationSchema={emailValidationSchema}
        >
          {(formikProps) => (
            <form
              className={globalClasses.form}
              onSubmit={formikProps.handleSubmit}
            >
              <FormikField
                label="Email"
                formikProps={formikProps}
                formikKey="email"
                required
                className={`${globalClasses.field} ${emailFieldSubmitted}`}
                defaultValue={formikProps.initialValues.email}
              />

              <div className={globalClasses.buttonWrapper}>
                <Button
                  type="Submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                >
                  <Typography>Update</Typography>
                </Button>
                {formikProps.isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={globalClasses.buttonProgress}
                  />
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>

      <div className={globalClasses.formContainer}>
        <Typography variant="h2" className={globalClasses.formTitle}>
          Update your Password
        </Typography>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={(values, actions) => {
            setPasswordSubmitted(false);

            API.changePassword({
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            })
              .then((res) => {
                setPasswordSubmitted(true);
                actions.setSubmitting(false);
              })
              .catch((err) => {
                console.log(err);
                actions.setFieldError("oldPassword", err.response.data);
                actions.setSubmitting(false);
              });
          }}
          validationSchema={passwordValidationSchema}
        >
          {(formikProps) => (
            <form
              className={globalClasses.form}
              onSubmit={formikProps.handleSubmit}
            >
              <FormikField
                label="Current Password"
                formikProps={formikProps}
                formikKey="oldPassword"
                type="password"
                required
                className={`${globalClasses.field} ${passwordFieldSubmitted}`}
              />
              <FormikField
                label="Password"
                formikProps={formikProps}
                formikKey="newPassword"
                type="password"
                required
                className={`${globalClasses.field} ${passwordFieldSubmitted}`}
              />
              <FormikField
                label="Confirm Password"
                formikProps={formikProps}
                formikKey="confirmNewPassword"
                type="password"
                required
                className={`${globalClasses.field} ${passwordFieldSubmitted}`}
              />
              <div className={globalClasses.buttonWrapper}>
                <Button
                  type="Submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                >
                  <Typography>Update</Typography>
                </Button>
                {formikProps.isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={globalClasses.buttonProgress}
                  />
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Paper>
  );
};

export default AccountInformationForm;
