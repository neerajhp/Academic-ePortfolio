import React, { useState } from "react";
import { Avatar, Button, Link, Typography } from "@material-ui/core";
import { Formik } from "formik";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FormikField from "../../utils/FormikField";
import validationSchema from "./Validation";
import API from "../../../api/API";

/* ================ Component ================ */

const AccountVerifiedPage = ({ globalClasses, match }) => {
  const [verified, setVerified] = useState(false);

  if (verified) {
    return (
      <div className={globalClasses.formContainer}>
        <div className={globalClasses.successBoard}>
          <Avatar className={globalClasses.avatar}>
            <ThumbUpIcon className={globalClasses.icon} />
          </Avatar>
          <Typography variant="h2">Congratulations!</Typography>
          <Typography>
            You now have an academic ePorfolio, login and start editing!
          </Typography>
          <Button
            type="Submit"
            fullWidth
            variant="contained"
            className={globalClasses.landingButton}
          >
            <Link
              href="/home/login"
              variant="body2"
              color="inherit"
              underline="none"
            >
              Click here to login
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={globalClasses.formContainer}>
        <div className={globalClasses.successBoard}>
          <Avatar className={globalClasses.avatar}>
            <CheckCircleIcon className={globalClasses.icon} />
          </Avatar>
          <Typography variant="h2" align="center">
            Input your Email to verify
          </Typography>

          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values, actions) => {
              // Submit login information
              API.emailVerified(match.params.token, values.email)
                .then((result) => {
                  if (result.status === 200) {
                    //Login information matches records
                    setVerified(true);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  actions.setErrors({
                    email: err.response.data,
                  });
                });
            }}
            validationSchema={validationSchema}
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
                  className={globalClasses.inputField}
                />

                <Button
                  type="Submit"
                  fullWidth
                  variant="contained"
                  className={globalClasses.submit}
                  disabled={!formikProps.isValid}
                >
                  <Typography>Verify</Typography>
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountVerifiedPage;
