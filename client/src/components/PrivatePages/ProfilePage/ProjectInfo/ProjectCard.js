import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import { Button, message } from "antd";
import axios from "axios";

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0 0 1% 1%",
    background: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  description: {
    marginLeft: "5%",
    color: "white !important ",
  },
  large: {
    background: theme.palette.secondary.light,
    width: "100%",
    height: "60%",
  },
  medium: {
    width: "100%",
    height: "30%",
  },
  small: {
    width: "49%",
    height: "30%",
  },
  upload: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  hidden: {
    display: "none",
  },
}));
/* ================ Component ================ */
const ProjectCard = ({ type }) => {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [loading, setLoading] = useState(false);
  //Default  card size is large
  var cardSize;

  switch (type) {
    case "large":
      cardSize = classes.large;
      break;
    case "medium":
      cardSize = classes.medium;
      break;
    case "small":
      cardSize = classes.small;
      break;
    default:
      cardSize = classes.large;
  }

  const handleChoseImg = (e) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file.length) {
      return false;
    }
    if (file.length < 6) {
      setLoading(true);
      let param = new FormData();
      for (const key in file) {
        if (file.hasOwnProperty(key)) {
          const item = file[key];
          param.append("image", item);
        }
      }
      axios({
        method: "post",
        url: "/api/upload/images",
        data: param,
        headers: {
          Authorization: "Bearer: " + JSON.parse(localStorage.getItem("token")),
        },
        responseType: "blob",
      }).then((result) => {
        setLoading(false);
      });
    } else {
      message.info("the max number is 5");
    }
  };

  return (
      <Paper className={`${classes.card}  ${cardSize}`}>
        <div className={classes.bio}>
          <Typography className={classes.title} variant="h2">
            This is a {type} Project Card
          </Typography>
          <Typography>This is the project description</Typography>
          {type === "small" && (
              <>
                <input
                    className={classes.hidden}
                    type="file"
                    ref={inputEl}
                    accept="image/*"
                    multiple
                    onChange={handleChoseImg}
                />
                <div className={classes.upload}>
                  <Button loading={loading} onClick={() => inputEl.current.click()}>
                    Upload
                  </Button>
                </div>
              </>
          )}
        </div>
      </Paper>
  );
};

export default ProjectCard;
