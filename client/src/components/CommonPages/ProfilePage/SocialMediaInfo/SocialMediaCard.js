import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SocialMediaDialog from './SocialMediaDialog';
import { SocialIcon } from 'react-social-icons';


/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  social: {
    flexGrow: 1,
    padding: '0 5% 0 5%',
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary, // or black
    },
  },
}));


/* ================ Component ================ */

const SocialMediaCard = ({ socialMedia , editable }) => {
  const classes = useStyles();
  const [records, setRecords] = useState(socialMedia);

 

  return (
    <Paper className={classes.card}>

      <div className={classes.social}>
      <SocialIcon url="http://twitter.com/jaketrent" />
      {/* <SocialMediaIconsReact icon="linkedin" url=""/>
      <SocialMediaIconsReact icon="twitter" url=""/>
      <SocialMediaIconsReact icon="instagram" url=""/>
      <SocialMediaIconsReact icon="youtube" url=""/>
      <SocialMediaIconsReact icon="facebook" url=""/> */}

        {editable && <SocialMediaDialog records={records} setRecords={setRecords} />}
      </div>
    </Paper>
  );
};

export default SocialMediaCard;

