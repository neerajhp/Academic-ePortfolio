import React, { useState } from "react";
import { Formik } from "formik";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import FormikField from "../../../utils/FormikField";
import validationSchema from "./Validation";
import API from "../../../../api/API";

/* ================ Component ================ */

const PersonalInformationForm = ({ user, globalClasses }) => {
  const [Submitted, setSubmitted] = useState(false);
  const fieldSubmitted = Submitted ? globalClasses.fieldSubmitted : "";

  return (
    <Paper className={globalClasses.card}>
      <div className={globalClasses.title}>
        <Typography variant="h2">Personal information</Typography>
      </div>
      <div className={globalClasses.formContainer}>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            birthDate: user.birthDate,
          }}
          onSubmit={(values, actions) => {
            setSubmitted(false);
            API.editUserInformation({
              firstName: values.firstName,
              lastName: values.lastName,
              mobileNumber: values.mobileNumber,
              birthDate: values.birthDate,
            })
              .then((res) => {
                setSubmitted(true);
                actions.setSubmitting(false);
              })
              .catch((err) => {
                console.log(err);
                actions.setFieldError("mobileNumber", err.response.data);
                actions.setSubmitting(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <form
              className={globalClasses.form}
              onSubmit={formikProps.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    label="FirstName"
                    formikProps={formikProps}
                    formikKey="firstName"
                    required
                    defaultValue={user.firstName}
                    className={`${globalClasses.field} ${fieldSubmitted}`}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    label="LastName"
                    formikProps={formikProps}
                    formikKey="lastName"
                    required
                    defaultValue={user.lastName}
                    className={`${globalClasses.field} ${fieldSubmitted}`}
                  />
                </Grid>
              </Grid>
              <FormikField
                label="Mobile Number"
                formikProps={formikProps}
                formikKey="mobileNumber"
                required
                defaultValue={user.mobileNumber}
                className={`${globalClasses.field} ${fieldSubmitted}`}
              />

              <FormikField
                label="Date of Birth"
                formikProps={formikProps}
                formikKey="birthDate"
                type="date"
                required
                defaultValue={
                  user.birthDate !== undefined && user.birthDate !== null
                    ? user.birthDate.substring(0, 10)
                    : new Date()
                }
                className={`${globalClasses.field} ${fieldSubmitted}`}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className={globalClasses.buttonWrapper}>
                <Button
                  type="Submit"
                  fullWidth
                  variant="contained"
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                  color="secondary"
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

export default PersonalInformationForm;
