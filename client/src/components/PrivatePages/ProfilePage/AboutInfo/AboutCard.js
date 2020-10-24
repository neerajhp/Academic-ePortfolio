import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import API from "../../../../api/API";
import AboutDialog from "./AboutDialog";

const useStyles = makeStyles((theme) => ({
  characterCard: {
    margin: "0 0 1% 1%",
    width: "100%",
    background: theme.palette.primary.light,
    padding: "5%",
    height:"20%",
  },
  bio: {
    marginLeft: "5%",
    flexGrow: 1,
    color: "white !important ",
  },
}));

const AboutCard = () => {
  const classes = useStyles();
  const [records, setRecords] = useState({});


  useEffect(() => {
    API.getAboutMe()
      .then(({ data }) => {
        setRecords({ aboutMe: data });
      })
      .catch();
  }, []);



  return (
    <Paper className={classes.characterCard}>
      <div className={classes.bio}>
        <Typography style={{ color: "#fff" }} variant="h2">
          About
        </Typography>
        <Typography>Add an introduction of your eprotfolio</Typography>
        <Typography>{records.aboutMe}</Typography>
        <AboutDialog records={records} setRecords={setRecords} />
      </div>
    </Paper>
  );
};

export default AboutCard;
