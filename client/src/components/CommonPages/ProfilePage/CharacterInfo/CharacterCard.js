import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CharacterDialog from "./CharacterDialog";
import { Upload, message } from "antd";
import { DropzoneArea } from "material-ui-dropzone";
import { Field, FieldArray } from "formik";

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

/* ================ function ================ */

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

/* ================ Component ================ */

const CharacterCard = ({ user, editable }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(user.profilePic.fileLink);
  const [bio, setBio] = useState(user.bio);

  var profilePic;

  const getRecord = () => {
    if (bio) {
      return <Typography> {bio} </Typography>;
    } else {
      return <Typography> add your bio </Typography>;
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      // setLoading({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        // setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  profilePic = (
    <Avatar src={imageUrl} alt="avatar" className={classes.profilePicture} />
  );
  //Upload interface if owner
  if (editable) {
    profilePic = (
      <Upload
        name="profile-pic"
        accept="image/*"
        showUploadList={false}
        action="/api/upload/profile-pic"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{
          Authorization: "Bearer: " + JSON.parse(localStorage.getItem("token")),
        }}
      >
        <Avatar
          src={imageUrl}
          alt="avatar"
          className={classes.profilePicture}
        />
      </Upload>
    );
  }

  return (
    <Paper className={classes.characterCard}>
      {profilePic}

      <div className={classes.bio}>
        <Typography variant="h2">
          {user.firstName} {user.lastName}
        </Typography>
        {getRecord(bio)}
        {editable && <CharacterDialog records={bio} setRecords={setBio} />}
      </div>
    </Paper>
  );
};

export default CharacterCard;
