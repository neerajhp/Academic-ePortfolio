import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Link,
} from "@material-ui/core";
import { Formik } from "formik";
import FormikField from "../../utils/FormikField";
import validationSchema from "./Validation";
import API from "../../../api/API";
import SearchIcon from "@material-ui/icons/Search";
import SearchCard from "./SearchCard";
import EmptyCard from "./EmptyCard";
import { Link as RouterLink } from "react-router-dom";

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => {
  return {
    searchContainer: {
      height: "50vh",
    },

    searchBar: {
      width: "40%",
      marginLeft: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
    },

    iconButton: {
      color: "#FFFFFF",
    },
    searchResults: {
      background: "transparent",
      maxHeight: "50vh",
      marginLeft: theme.spacing(3),
      overflow: "auto",
      width: "50vw",
      display: "flex",
      flexDirection: "column",
    },
    loginContainer: {
      position: "fixed",
      bottom: 0,
      marginBottom: theme.spacing(2),
    },
  };
});
/* ================ Component ================ */

const SearchPage = ({ globalClasses }) => {
  const classes = useStyles();

  const [results, setResults] = useState(null);
  var searchResults;

  if (results === null) {
    searchResults = <EmptyCard message={"...Start typing to search!"} />;
  } else if (results === []) {
    searchResults = <EmptyCard message={"We can't find a profile to match"} />;
  } else {
    searchResults = results.map((result, i) => (
      <SearchCard user={result} key={i} />
    ));
  }

  return (
    <React.Fragment>
      <div className={classes.searchContainer}>
        <div className={globalClasses.banner}>
          <Typography variant="h1" color="textSecondary">
            Search for Someone
          </Typography>
        </div>
        <div className={classes.searchBar}>
          <Formik
            initialValues={{
              search: "",
            }}
            onSubmit={(values, actions) => {
              console.log(values.search);
              API.userSearch(values.search)
                .then((res) => setResults(res.data))
                .catch((err) => console.log(err));
            }}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <form
                className={classes.form}
                onSubmit={formikProps.handleSubmit}
              >
                <FormikField
                  formikProps={formikProps}
                  formikKey="search"
                  required
                  className={globalClasses.inputField}
                  label="Search for someone"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          className={classes.iconButton}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            )}
          </Formik>
        </div>

        <Paper elevation={0} className={classes.searchResults}>
          {searchResults}
        </Paper>
      </div>
      <div className={classes.loginContainer}>
        {" "}
        <Link
          component={RouterLink}
          to="/home/login"
          variant="h3"
          color="textSecondary"
        >
          Login
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
