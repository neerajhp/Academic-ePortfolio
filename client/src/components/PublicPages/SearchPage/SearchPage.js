import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, InputAdornment } from '@material-ui/core';
import { Formik } from 'formik';
import FormikField from '../../utils/FormikField';
import validationSchema from './Validation';
import API from '../../../api/API';
import SearchIcon from '@material-ui/icons/Search';
import SearchCard from './SearchCard';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => {
  return {
    searchContainer: {
      height: '50vh',
    },
    searchBar: {
      width: '40%',
      marginLeft: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
    },

    iconButton: {
      color: '#FFFFFF',
    },
    searchResults: {
      marginLeft: theme.spacing(3),

      width: '50vw',
      display: 'flex',
      flexDirection: 'column',
    },
  };
});
/* ================ Component ================ */

const SearchPage = ({ globalClasses }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      <div className={globalClasses.banner}>
        <Typography variant='h1' color='textSecondary'>
          Search for Someone
        </Typography>
      </div>
      <div className={classes.searchBar}>
        <Formik
          initialValues={{
            search: '',
          }}
          onSubmit={(values, actions) => {
            console.log(values.search);
            API.userSearch(values.search)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <form className={classes.form} onSubmit={formikProps.handleSubmit}>
              <FormikField
                formikProps={formikProps}
                formikKey='search'
                required
                className={globalClasses.inputField}
                label='Search for someone'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        type='submit'
                        className={classes.iconButton}
                        aria-label='search'
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

      <div className={classes.searchResults}>
        <SearchCard />
      </div>
    </div>
  );
};

export default SearchPage;
