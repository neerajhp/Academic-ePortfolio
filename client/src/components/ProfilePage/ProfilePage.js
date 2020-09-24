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
import CharacterCard from './CharacterInfo/CharacterCard';
import EducationCard from './EducationInfo/EducationCard';
import SkillsCard from './SkillsInfo/SkillsCard';
import ReflectionCard from './ReflectionInfo/ReflectionCard';
import ProjectCard from './ProjectInfo/ProjectCard';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  //Page container
  title: {
    marginLeft: '5%',
    flexGrow: 1,
  },
  banner: theme.mixins.toolbar,
  loading: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navSection: {
    position: 'fixed',
    width: '25vw',
    marginTop: '1%',
    zIndex: '100',
  },
  container: {
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  navBar: {
    marginLeft: '0.5em',
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  navBarIcon: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  sectionContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '-1',
    marginTop: '1%',
  },
  section: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexGrow: 1,
    paddingLeft: '25vw',
    paddingRight: '0.5em',
    flexFlow: 'row wrap',
    alignItems: 'stretch',
    transition: 'all 700ms',
  },
}));

/* ================ Component ================ */

const ProfilePage = () => {
  // Styling
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [section, setSection] = useState(1);

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

  useEffect(() => {
    API.getUserProfile().then(({ data }) => {
      setUser(data);
      setLoading(false);
    });

    API.getEducation().then(({ data }) => {
      setEducation(data);
    });
  }, []);

  //If profile hasn't been fetched yet
  if (isLoading) {
    return (
      <div>
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
        <div className={classes.banner}> </div>
        <div className={classes.loading}>
          <CircularProgress />
          <Typography variant='h2'>Fetching User Data</Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
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
      <div className={classes.banner}> </div>
      <div className={classes.container}>
        <div className={classes.navSection}>
          <Paper className={classes.navBar}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <FaceIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText
                  primary='My Profile'
                  onClick={() => setSection(1)}
                ></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CreateIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText
                  primary='My Reflections'
                  onClick={() => setSection(2)}
                ></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MenuBookIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText
                  primary='My Projects'
                  onClick={() => setSection(3)}
                ></ListItemText>
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

        <div className={classes.sectionContainer}>
          <div
            className={classes.section}
            style={{ marginLeft: section * -100 + 'vw' }}
          >
            Placeholder section
          </div>
          <div className={classes.section}>
            <CharacterCard user={user} />
            <EducationCard education={userEducation} />
            <SkillsCard skills={user.skills} />
          </div>
          <div className={classes.section}>
            <ReflectionCard />
            <ReflectionCard />
            <ReflectionCard />
          </div>
          <div className={classes.section}>
            <ProjectCard type={'large'} />
            <ProjectCard type={'small'} />
            <ProjectCard type={'small'} />
            <ProjectCard type={'medium'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
