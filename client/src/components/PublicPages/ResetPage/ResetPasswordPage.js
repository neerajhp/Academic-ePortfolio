import React, { useState } from "react";
import { Formik } from "formik";
import { Typography, Avatar, Grid, Link, Button } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FormikField from "../../utils/FormikField";
import { passwordValidationSchema } from "./Validation";
import API from "../../../api/API";

/* ================ Component ================ */

const ResetPasswordPage = ({ globalClasses, match }) => {
  const classes = globalClasses;

  const [Submitted, setSubmitted] = useState(false);

  if (Submitted) {
    return (
      <div className={classes.formContainer}>
        <div className={classes.successBoard}>
          <Avatar className={classes.avatar}>
            <ThumbUpIcon className={classes.icon} />
          </Avatar>

          <Typography variant="h4" align="center">
            Your password has been reset
          </Typography>

          <Typography variant="h4" align="center">
            <Link href="/home/login" variant="h4" color="textSecondary">
              Log In Here!
            </Link>
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={globalClasses.banner}>
        <Typography variant="h1" color="textSecondary">
          Reset your password
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.formPaper}>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, actions) => {
              API.resetPassword(match.params.token, values.password)
                .then((res) => {
                  setSubmitted(true);
                })
                .catch((err) => {
                  actions.setFieldError("password", err.response.data);
                  actions.setSubmitting(false);
                });
            }}
            validationSchema={passwordValidationSchema}
          >
            {(formikProps) => (
              <form
                className={classes.form}
                onSubmit={formikProps.handleSubmit}
              >
                <FormikField
                  label="Password"
                  formikProps={formikProps}
                  formikKey="password"
                  type="password"
                  required
                  className={classes.inputField}
                />
                <FormikField
                  label="Confirm Password"
                  formikProps={formikProps}
                  formikKey="confirmPassword"
                  type="password"
                  required
                  className={classes.inputField}
                />
                <Button
                  type="Submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  disabled={!formikProps.isValid}
                  color="primary"
                >
                  <Typography>Reset</Typography>
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="/home/login"
                      variant="body2"
                      color="textSecondary"
                    >
                      Back to Log In
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPasswordPage;
