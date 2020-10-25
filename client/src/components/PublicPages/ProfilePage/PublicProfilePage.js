import React, { useState, useEffect } from 'react';
import API from '../../../api/API';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  CircularProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import CharacterCard from './CharacterInfo/PublicCharacterCard';
import EducationCard from './EducationInfo/PublicEducationCard';
import ExperienceCard from './ExperienceInfo/PublicExperienceCard';
import SkillsCard from './SkillsInfo/PublicSkillsCard';
import ReflectionCard from './ReflectionInfo/PublicReflectionCard';
import ProjectCard from './ProjectInfo/PublicProjectCard';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
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
  card: {
    margin: '0 0 1% 1%',
    width: '100%',

    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { width: '100%' },
  icon: { fontSize: 80 },
}));

/* ================ Component ================ */

const PublicProfilePage = ({ match, location }) => {
  const {
    params: { userId },
  } = match;

  // Styling
  const classes = useStyles();
  const [section, setSection] = useState(1);

  //Profile Information
  //!! NEED TO MANAGE ERROR MESSAGE AT SOME POINT
  const [user, setUser] = useState(null);
  const [userExperience, setExperience] = useState(null);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const [profilePrivate, setProfilePrivate] = useState(false);

  //Load user data

  useEffect(() => {
    API.viewerGetProfile(userId)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log('Not Found');
          setProfileNotFound(true);
        } else if (err.response.status === 403) {
          setProfilePrivate(true);
        }
      });

    API.viewerGetAllExperience(userId)
      .then(({ data }) => {
        setExperience(data);
      })
      .catch();
  }, [userId]);

  const checkExperience = () => {
    console.log(userExperience);
    return (
      userExperience.volunteering.length === 0 &&
      userExperience.employment.length === 0 &&
      userExperience.extracurricular.length === 0
    );
  };

  const checkEducation = () => {
    return user.education.length === 0;
  };

  const checkSkills = () => {
    return user.skills.length === 0;
  };

  var pageContent;

  if (profileNotFound) {
    pageContent = (
      <div>
        <div className={classes.loading}>
          <SentimentDissatisfiedIcon className={classes.icon} />
          <Typography variant='h2'>Profile Not Found</Typography>
          <Link variant='h2' component={RouterLink} to='/home/landing'>
            Click here to return Home
          </Link>
        </div>
      </div>
    );
  } //If Private profile
  else if (profilePrivate) {
    pageContent = (
      <div>
        <div className={classes.loading}>
          <VisibilityOffIcon className={classes.icon} />
          <Typography variant='h2'>This profile is private</Typography>
          <Link variant='h2' component={RouterLink} to='/home/landing'>
            Click here to return Home
          </Link>
        </div>
      </div>
    );
  } //If profile hasn't been fetched yet
  else if (!(user && userExperience)) {
    pageContent = (
      <div>
        <div className={classes.loading}>
          <CircularProgress />
          <Typography variant='h2'>Fetching this Portfolio</Typography>
        </div>
      </div>
    );
  } //If username doesn't match existing profile
  else {
    // Profile content
    pageContent = (
      <div>
        <div className={classes.container}>
          <div className={classes.navSection}>
            <Paper className={classes.navBar}>
              <List>
                <ListItem button onClick={() => setSection(1)}>
                  <ListItemIcon>
                    <FaceIcon className={classes.navBarIcon} />
                  </ListItemIcon>
                  <ListItemText primary='My Profile'></ListItemText>
                </ListItem>
                <ListItem button onClick={() => setSection(2)}>
                  <ListItemIcon>
                    <CreateIcon className={classes.navBarIcon} />
                  </ListItemIcon>
                  <ListItemText primary='My Reflections'></ListItemText>
                </ListItem>
                <ListItem button onClick={() => setSection(3)}>
                  <ListItemIcon>
                    <MenuBookIcon className={classes.navBarIcon} />
                  </ListItemIcon>
                  <ListItemText primary='My Projects'></ListItemText>
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
              <CharacterCard user={user} globalClasses={classes} />

              {!checkExperience() && (
                <ExperienceCard
                  experience={userExperience}
                  globalClasses={classes}
                />
              )}
              {!checkEducation() && (
                <EducationCard
                  education={user.education}
                  globalClasses={classes}
                />
              )}
              {!checkSkills() && (
                <SkillsCard skills={user.skills} globalClasses={classes} />
              )}
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
  }

  return pageContent;
};

export default PublicProfilePage;
