import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CharacterCard from './CharacterCard';
import EducationCard from './EducationCard';
import SkillsCard from './SkillsCard';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  //Page container
  root: {
    width: '100vw',
  },
  title: {
    marginLeft: '5%',
    flexGrow: 1,
  },

  banner: theme.mixins.toolbar,
  container: {
    marginTop: '1%',
    display: 'flex',
  },
  navSection: {
    left: 0,
    width: '25%',
  },
  navBar: {
    marginLeft: '5%',
    background: theme.palette.primary.main,
  },
  navBarIcon: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  profileContainer: {
    marginLeft: '2%',
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },

  cardsContainer: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    padding: '2%',
  },
}));

/* ================ Component ================ */

const ProfilePage = () => {
  // Styling
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);

  //Authentication Context
  const { setAuthTokens } = useAuth();

  //Log Out
  function logOut() {
    //Clears browser storage
    setAuthTokens(null);
  }

  //Profile Information
  //!! NEED TO MANAGE ERROR MESSAGE AT SOME POINT
  const [user, setUser] = useState(null);
  const [userEducation, setEducation] = useState(null);
  const [userSkills, setSkills] = useState(null);

  useEffect(() => {
    API.getUserProfile().then(({ data }) => {
      setUser(data);
      setLoading(false);
    });

    API.getEducation().then(({ data }) => {
      setEducation(data);
    });

    API.getSkills().then(({ data }) => {
      setSkills(data);
    });
  }, []);

  //If profile hasn't been fetched yet
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h3' className={classes.title}>
            ePortfolio
          </Typography>
          <Button color='inherit' onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.banner} />
      <div className={classes.container}>
        <div className={classes.navSection}>
          <Paper className={classes.navBar}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <FaceIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText primary='My Profile'></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CreateIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText primary='My Blog'></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MenuBookIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText primary='My Projects'></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText primary='My CV'></ListItemText>
              </ListItem>
            </List>
          </Paper>
        </div>
        <div className={classes.profileContainer}>
          <CharacterCard user={user} />
          <EducationCard education={userEducation} />
          <SkillsCard skills={userSkills} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
