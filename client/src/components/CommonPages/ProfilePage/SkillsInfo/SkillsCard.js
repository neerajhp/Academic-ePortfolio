import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Chip, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import API from "../../../../api/API";
import SkillsDialog from "./SkillsDialog";

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0 0 1% 1%",
    width: "100%",
    height: "20%",
    // background: theme.palette.primary.light,
    // color: theme.palette.text.secondary,
    padding: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: { width: "100%" },
  skillsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  skill: {
    position: "relative",
  },
  del: {
    position: "absolute",
    width: "10px",
    height: "10px",
    top: "-3px",
    right: "-3px",
    color: "red",
    cursor: "pointer",
    border: "1px solid red",
    borderRadius: "50%",
  },
}));

/* ================ Constants ================ */
const COLOURS = ["primary", "secondary"];

/* ================ Component ================ */
const SkillsCard = ({ editable }) => {
  const classes = useStyles();
  const [skills, setSkills] = useState([]);

  const handleDel = (skill) => {
    API.removeSkills({ skills: [skill] })
      .then(({ data }) => {
        setSkills(data);
      })
      .catch();
  };

  const getSkills = () => {
    if (!(Array.isArray(skills) && skills.length)) {
      return <Typography> Add Some of your skills!</Typography>;
    } else {
      return (
        <div
          className={classes.skillsContainer}
          style={{ height: 10 * skills.length }}
        >
          {skills.map((skill, i) => (
            <div className={classes.skill} key={i}>
              <CloseIcon
                onClick={() => handleDel(skill)}
                className={classes.del}
              />
              <Chip
                label={skill}
                color={COLOURS[Math.floor(Math.random() * COLOURS.length)]}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  const getData = () => {
    API.getSkills()
      .then(({ data }) => {
        setSkills(data);
      })
      .catch();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant="h2">
        What I'm Good At
      </Typography>
      {getSkills()}
      {editable && <SkillsDialog getData={getData} skills={skills} />}
    </Paper>
  );
};

export default SkillsCard;
