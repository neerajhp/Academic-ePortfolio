import React, { useState, useEffect } from 'react';

import API from '../../../api/API';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import InfoIcon from '@material-ui/icons/Info';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import CharacterCard from './CharacterInfo/CharacterCard';
import EducationCard from './EducationInfo/EducationCard';
import ExperienceCard from './ExperienceInfo/ExperienceCard';
import SkillsCard from './SkillsInfo/SkillsCard';
import ReflectionCard from './ReflectionInfo/ReflectionCard';
import ProjectCard from './ProjectInfo/ProjectCard';
import Tutorial from '../Tutorial/Tutorial';
import AboutCard from './AboutInfo/AboutCard';

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
    height: '100vh',
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
}));

/* ================ Component ================ */

const ProfilePage = () => {
  // Styling
  const classes = useStyles();
  const [section, setSection] = useState(1);

  //Profile Information
  //!! NEED TO MANAGE ERROR MESSAGE AT SOME POINT
  const [user, setUser] = useState(null);
  const [userEducation, setEducation] = useState(null);
  const [userExperience, setExperience] = useState(null);

  //Load user data

  useEffect(() => {
    API.getUserProfile()
      .then(({ data }) => {
        setUser(data);
      })
      .catch();

    API.getEducation()
      .then(({ data }) => {
        setEducation(data);
      })
      .catch();

    API.getAllExperience()
      .then(({ data }) => {
        setExperience(data);
      })
      .catch();
  }, []);

  //If profile hasn't been fetched yet
  var pageContent;
  if (!(user && userEducation && userExperience)) {
    pageContent = (
      <div>
        <div className={classes.loading}>
          <CircularProgress />
          <Typography variant='h2'>Fetching User Data</Typography>
        </div>
      </div>
    );
  } else {
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
                <ListItem button onClick={() => setSection(4)}>
                  <ListItemIcon>
                    <InfoIcon className={classes.navBarIcon} />
                  </ListItemIcon>
                  <ListItemText primary='About'></ListItemText>
                </ListItem>
              </List>
            </Paper>
            <Tutorial firstVisit={user.tutorial} />
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
              <ExperienceCard experience={userExperience} />
              <EducationCard education={userEducation} />
              <SkillsCard skills={user.skills} />
            </div>
            <div className={classes.section}>
              <ReflectionCard type='medium'/>
            </div>
            <div className={classes.section}>
              <ProjectCard type={'large'} />
              <ProjectCard type={'small'} />
              <ProjectCard type={'small'} />
              <ProjectCard type={'medium'} />
            </div>
            <div className={classes.section}>
              <AboutCard />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return pageContent;
};

export default ProfilePage;
