import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Upload, message } from "antd";
import API from '../../../../api/API';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import Avatar from 'react-avatar-edit'


/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  characterCard: {
    margin: '0 0 1% 1%',
    width: '100%',
    background: theme.palette.primary.light,
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePicture: {
    height: '5em',
    width: '5em',
  },
  bio: {
    marginLeft: '5%',
    flexGrow: 1,
    color: 'white !important ',
  },
}));
/* ================ Component ================ */

const CharacterCard = ({ user }) => {

  const classes = useStyles();
  const {profileImg} = API.getProfilePic();
  console.log(profileImg[0]);  

  const onBeforeFileLoad = (elem) => {
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }
  



  return (
    <Paper className={classes.characterCard}>
        <Upload
            name="profile-pic"
            accept="image/*"
            showUploadList={false}
            action="/api/upload/profile-pic"
            headers={{
              Authorization: "Bearer: " + JSON.parse(localStorage.getItem("token")),
            }}
        >
          <Avatar 
          // src = "https://pbs.twimg.com/profile_images/671299074285510656/r51-ZRuY_400x400.jpg"
          src = "https://documents-eportfolio.s3.ap-southeast-2.amazonaws.com/user-5f63b39e62542f607b5a4720/cartman-profile.png"
          className={classes.profilePicture} 
          onBeforeFileLoad={onBeforeFileLoad}
          />
        </Upload>

      <div className={classes.bio}>
        <Typography variant='h2'>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography>{user.bio}</Typography>
      </div>
    </Paper>
  );
};

export default CharacterCard;
