import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import React from "react";

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  emptyCard: {
    width: "100%",
    background: "transparent",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    padding: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));
/* ================ Component ================ */

const EmptyCard = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.emptyCard}>
      <Typography variant="h2">{message}</Typography>
    </div>
  );
};

export default EmptyCard;
