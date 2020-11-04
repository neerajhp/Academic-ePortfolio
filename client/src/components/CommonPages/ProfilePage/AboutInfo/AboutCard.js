import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AboutDialog from "./AboutDialog";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0 0 1% 1%",
    width: "100%",
    height: "fit-content",
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { width: "100%" },
  bio: {
    marginTop: theme.spacing(2),
    width: "100%",
    flexGrow: 1,
    display: "flex",
    alignItems: "flex-start",
  },
  editDialogContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
  },
}));

const AboutCard = ({ about, isEditable }) => {
  const classes = useStyles();

  const [records, setRecords] = useState(about);
  const [editable] = useState(isEditable);

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant="h2">
        About Me{" "}
      </Typography>
      <div className={classes.bio}>
        <Typography>{records}</Typography>
      </div>
      <div className={classes.editDialogContainer}>
        {editable && (
          <AboutDialog
            records={records}
            setRecords={setRecords}
            empty={records === "" || records === undefined}
          />
        )}
      </div>
    </Paper>
  );
};

export default AboutCard;
