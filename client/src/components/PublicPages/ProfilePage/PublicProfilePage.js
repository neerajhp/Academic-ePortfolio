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

  //Load user data

  useEffect(() => {
    API.viewerGetProfile(userId)
      .then(({ data }) => {
        setUser(data);
        console.log(data);
      })
      .catch();

    API.viewerGetAllExperience(userId)
      .then(({ data }) => {
        setExperience(data);
      })
      .catch();
  });

  const checkExperience = () => {
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

  //If profile hasn't been fetched yet
  var pageContent;
  if (!(user && userExperience)) {
    pageContent = (
      <div>
        <div className={classes.loading}>
          <CircularProgress />
          <Typography variant='h2'>Fetching this Portfolio</Typography>
        </div>
      </div>
    );
  } else {
    console.log(userExperience.volunteering.length === 0);
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
