import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import API from '../../../api/API';
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
import InfoIcon from '@material-ui/icons/Info';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CharacterCard from './CharacterInfo/CharacterCard';
import EducationCard from './EducationInfo/EducationCard';
import ExperienceCard from './ExperienceInfo/ExperienceCard';
import SkillsCard from './SkillsInfo/SkillsCard';
import ReflectionCard from './ReflectionInfo/ReflectionCard';
import ProjectCard from './ProjectInfo/ProjectCard';
import ProjectDialog from './ProjectInfo/ProjectDialog';
import Tutorial from '../../PrivatePages/Tutorial/Tutorial';
import AboutCard from './AboutInfo/AboutCard';
import EmptyCard from './EmptyCard/EmptyCard';

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

    flexGrow: 1,
    paddingLeft: '25vw',
    paddingRight: '1.5em',

    alignItems: 'stretch',
    transition: 'all 700ms',
  },
  icon: { fontSize: 80 },
}));

/* ================ Component ================ */

const ProfilePage = ({ isOwner = true, match }) => {
  // Styling
  const classes = useStyles();
  const [section, setSection] = useState(1);

  //Profile Information
  //If public view a username is required from the url
  const {
    params: { userName },
  } = match;

  const [user, setUser] = useState(null);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [owner, setOwner] = useState(isOwner);

  //Load user data
  useEffect(() => {
    //Unauthorised API call if user is a public viewer
    if (!owner) {
      API.viewerGetProfile(userName)
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
    } else {
      //Authorised API call if user logged in
      API.getUserProfile()
        .then(({ data }) => {
          setUser(data);
        })
        .catch();
    }
  }, [userName]);

  //Functions to return UI for empty records
  const getExperience = () => {
    if (
      !isOwner &&
      (user.experience === undefined || user.experience.length === 0)
    ) {
      return <EmptyCard name={user.firstName} prompt={'Experience'} />;
    } else {
      return <ExperienceCard experience={user.experience} editable={owner} />;
    }
  };

  const getEducation = () => {
    if (
      !isOwner &&
      (user.education === undefined || user.experience.length === 0)
    ) {
      return <EmptyCard name={user.firstName} prompt={'Education'} />;
    } else {
      return <EducationCard education={user.education} editable={owner} />;
    }
  };

  const getSkills = () => {
    if (!isOwner && (user.skills === undefined || user.skills.length === 0)) {
      return <EmptyCard name={user.firstName} prompt={'Skills'} />;
    } else {
      return <SkillsCard skills={user.skills} editable={owner} />;
    }
  };

  const getProjects = () => {
    if (
      !isOwner &&
      (user.showcase === undefined || user.showcase.length === 0)
    ) {
      return <EmptyCard name={user.firstName} prompt={'Project'} />;
    } else {
      return (
        <React.Fragment>
          {user.showcase.map((project, i) => (
            <React.Fragment key={i}>
              <ProjectCard
                content={project}
                editable={owner}
                updateProfile={setUser}
              />
            </React.Fragment>
          ))}
          {isOwner && (
            <ProjectDialog
              empty={true}
              project={{ title: '', description: '' }}
              updateProfile={setUser}
            />
          )}
        </React.Fragment>
      );
    }
  };

  //If profile hasn't been fetched yet
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
  } else if (!user) {
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
            {owner && <Tutorial firstVisit={user.tutorial} />}
          </div>

          <div className={classes.sectionContainer}>
            <div
              className={classes.section}
              style={{ marginLeft: section * -100 + 'vw' }}
            >
              Placeholder section
            </div>
            <div className={classes.section}>
              <CharacterCard user={user} editable={owner} />
              {getExperience()}
              {getEducation()}
              {getSkills()}
            </div>
            <div className={classes.section}>
              <ReflectionCard />
              <ReflectionCard />
              <ReflectionCard />
            </div>
            <div className={classes.section}>{getProjects()}</div>
            <div className={classes.section}>
              <AboutCard about={user.aboutMe} editable={owner} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return pageContent;
};

export default ProfilePage;
