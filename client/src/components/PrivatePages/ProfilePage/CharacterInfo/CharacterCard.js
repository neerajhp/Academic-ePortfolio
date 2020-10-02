import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar, Typography } from "@material-ui/core";
import { Upload } from "antd";

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  characterCard: {
    margin: "0 0 1% 1%",
    width: "100%",
    background: theme.palette.primary.light,
    padding: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profilePicture: {
    height: "5em",
    width: "5em",
    cursor: "pointer",
  },
  bio: {
    marginLeft: "5%",
    flexGrow: 1,
    color: "white !important ",
  },
}));
/* ================ Component ================ */

const CharacterCard = ({ user }) => {

  const classes = useStyles();
  const {profileImg} = API.getProfilePic();
  // console.log(profileImg[0]);  

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
          <Avatar className={classes.profilePicture} />
        </Upload>
        <div className={classes.bio}>
          <Typography variant="h2">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography>{user.bio}</Typography>
        </div>
      </Paper>
  );
};

export default CharacterCard;
